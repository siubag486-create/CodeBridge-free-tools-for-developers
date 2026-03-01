"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Check,
  Trash2,
  ShieldCheck,
  ShieldX,
  Clock,
  Key,
  AlertTriangle,
} from "lucide-react";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

const CLAIM_DESCRIPTIONS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expiration Time",
  nbf: "Not Before",
  iat: "Issued At",
  jti: "JWT ID",
  azp: "Authorized Party",
  scope: "Scope",
  sid: "Session ID",
  email: "Email",
  email_verified: "Email Verified",
  name: "Full Name",
  given_name: "First Name",
  family_name: "Last Name",
  picture: "Profile Picture",
  locale: "Locale",
};

const TIME_CLAIMS = new Set(["exp", "nbf", "iat"]);

// ── Helpers ───────────────────────────────────────────────────────────────────

function decodeJwtPart(part: string): Record<string, unknown> {
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
}

type TimeStatus = "valid" | "warning" | "expired";

interface TimestampInfo {
  absolute: string;
  relative: string;
  status: TimeStatus;
}

function formatTimestamp(ts: number, nowMs: number): TimestampInfo {
  const date = new Date(ts * 1000);
  const absolute = date.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
  const diffSec = ts - Math.floor(nowMs / 1000);

  let relative: string;
  let status: TimeStatus;

  if (diffSec < 0) {
    const ago = Math.abs(diffSec);
    if (ago < 60) relative = `expired ${ago}s ago`;
    else if (ago < 3600) relative = `expired ${Math.floor(ago / 60)}m ${ago % 60}s ago`;
    else if (ago < 86400) relative = `expired ${Math.floor(ago / 3600)}h ago`;
    else relative = `expired ${Math.floor(ago / 86400)}d ago`;
    status = "expired";
  } else {
    if (diffSec < 60) relative = `expires in ${diffSec}s`;
    else if (diffSec < 3600)
      relative = `expires in ${Math.floor(diffSec / 60)}m ${diffSec % 60}s`;
    else if (diffSec < 86400)
      relative = `expires in ${Math.floor(diffSec / 3600)}h`;
    else relative = `expires in ${Math.floor(diffSec / 86400)}d`;
    status = diffSec < 300 ? "warning" : "valid";
  }

  return { absolute, relative, status };
}

function timeColor(status: TimeStatus) {
  if (status === "expired") return "#ff7b72";
  if (status === "warning") return "#e3b341";
  return "var(--terminal-green)";
}
function timeBg(status: TimeStatus) {
  if (status === "expired") return "rgba(255,123,114,0.08)";
  if (status === "warning") return "rgba(227,179,65,0.08)";
  return "rgba(0,255,136,0.08)";
}
function timeBorder(status: TimeStatus) {
  if (status === "expired") return "rgba(255,123,114,0.3)";
  if (status === "warning") return "rgba(227,179,65,0.3)";
  return "rgba(0,255,136,0.3)";
}

type ParsedJwt =
  | { error: string }
  | {
      header: Record<string, unknown>;
      payload: Record<string, unknown>;
      signature: string;
      headerRaw: string;
      payloadRaw: string;
    };

function parseJwt(token: string): ParsedJwt | null {
  const trimmed = token.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(".");
  if (parts.length !== 3)
    return {
      error: `Invalid JWT — expected 3 dot-separated parts, got ${parts.length}`,
    };
  try {
    const header = decodeJwtPart(parts[0]);
    const payload = decodeJwtPart(parts[1]);
    return {
      header,
      payload,
      signature: parts[2],
      headerRaw: parts[0],
      payloadRaw: parts[1],
    };
  } catch {
    return { error: "Failed to decode — make sure this is a valid JWT token" };
  }
}

type VerifyStatus = "idle" | "verifying" | "valid" | "invalid" | "unsupported";

async function verifyHmacSignature(
  headerRaw: string,
  payloadRaw: string,
  signature: string,
  secret: string,
  alg: string
): Promise<"valid" | "invalid" | "unsupported"> {
  const hashMap: Record<string, string> = {
    HS256: "SHA-256",
    HS384: "SHA-384",
    HS512: "SHA-512",
  };
  const hashAlg = hashMap[alg];
  if (!hashAlg) return "unsupported";
  try {
    const data = new TextEncoder().encode(`${headerRaw}.${payloadRaw}`);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: { name: hashAlg } },
      false,
      ["sign"]
    );
    const sigBytes = await crypto.subtle.sign("HMAC", cryptoKey, data);
    const computed = btoa(
      String.fromCharCode(...new Uint8Array(sigBytes))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
    return computed === signature ? "valid" : "invalid";
  } catch {
    return "invalid";
  }
}

// ── Asymmetric signature verification ────────────────────────────────────────

function pemToBinary(pem: string): ArrayBuffer {
  const base64 = pem
    .replace(/-----BEGIN[\s\S]*?-----/, "")
    .replace(/-----END[\s\S]*?-----/, "")
    .replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function base64UrlToUint8Array(b64url: string): Uint8Array<ArrayBuffer> {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  const binary = atob(pad ? b64 + "=".repeat(4 - pad) : b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function verifyAsymmetricSignature(
  headerRaw: string,
  payloadRaw: string,
  signature: string,
  publicKeyPem: string,
  alg: string
): Promise<"valid" | "invalid" | "unsupported"> {
  try {
    const keyData = pemToBinary(publicKeyPem);
    const sigBytes = base64UrlToUint8Array(signature);
    const data = new TextEncoder().encode(`${headerRaw}.${payloadRaw}`);

    let cryptoKey: CryptoKey;
    let verifyAlgo: AlgorithmIdentifier | RsaPssParams | EcdsaParams;

    if (alg === "RS256" || alg === "RS384" || alg === "RS512") {
      const hash =
        alg === "RS256" ? "SHA-256" : alg === "RS384" ? "SHA-384" : "SHA-512";
      const importAlgo = { name: "RSASSA-PKCS1-v1_5", hash: { name: hash } };
      cryptoKey = await crypto.subtle.importKey(
        "spki",
        keyData,
        importAlgo,
        false,
        ["verify"]
      );
      verifyAlgo = importAlgo;
    } else if (alg === "PS256" || alg === "PS384" || alg === "PS512") {
      const hash =
        alg === "PS256" ? "SHA-256" : alg === "PS384" ? "SHA-384" : "SHA-512";
      const saltLength = alg === "PS256" ? 32 : alg === "PS384" ? 48 : 64;
      cryptoKey = await crypto.subtle.importKey(
        "spki",
        keyData,
        { name: "RSASSA-PSS", hash: { name: hash } },
        false,
        ["verify"]
      );
      verifyAlgo = { name: "RSASSA-PSS", saltLength };
    } else if (alg === "ES256" || alg === "ES384" || alg === "ES512") {
      const namedCurve =
        alg === "ES256" ? "P-256" : alg === "ES384" ? "P-384" : "P-521";
      const hash =
        alg === "ES256" ? "SHA-256" : alg === "ES384" ? "SHA-384" : "SHA-512";
      cryptoKey = await crypto.subtle.importKey(
        "spki",
        keyData,
        { name: "ECDSA", namedCurve },
        false,
        ["verify"]
      );
      verifyAlgo = { name: "ECDSA", hash: { name: hash } };
    } else {
      return "unsupported";
    }

    const valid = await crypto.subtle.verify(verifyAlgo, cryptoKey, sigBytes, data);
    return valid ? "valid" : "invalid";
  } catch {
    return "invalid";
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function WindowDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      {(["#ff5f56", "#ffbd2e", "#27c93f"] as const).map((color) => (
        <div
          key={color}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0.85,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: monoFont,
        fontSize: "0.68rem",
        padding: "3px 9px",
        borderRadius: "4px",
        cursor: "pointer",
        border: copied
          ? "1px solid rgba(0,255,136,0.5)"
          : "1px solid rgba(88,166,255,0.2)",
        background: copied ? "rgba(0,255,136,0.08)" : "rgba(88,166,255,0.05)",
        color: copied ? "var(--terminal-green)" : "var(--code-comment)",
        transition: "all 0.15s",
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// Color-coded token parts
function TokenVisualizer({ token }: { token: string }) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  return (
    <div
      style={{
        padding: "12px 14px",
        background: "rgba(10,14,26,0.8)",
        borderRadius: "6px",
        border: "1px solid rgba(88,166,255,0.1)",
        fontFamily: monoFont,
        fontSize: "0.72rem",
        lineHeight: "1.6",
        wordBreak: "break-all",
        whiteSpace: "pre-wrap",
      }}
    >
      <span style={{ color: "#58a6ff" }}>{parts[0]}</span>
      <span style={{ color: "var(--code-comment)", opacity: 0.35 }}>.</span>
      <span style={{ color: "var(--terminal-green)" }}>{parts[1]}</span>
      <span style={{ color: "var(--code-comment)", opacity: 0.35 }}>.</span>
      <span style={{ color: "#ff7b72" }}>{parts[2]}</span>
    </div>
  );
}

// ── Header Card ───────────────────────────────────────────────────────────────

function HeaderCard({ header }: { header: Record<string, unknown> }) {
  const alg = typeof header.alg === "string" ? header.alg : null;
  const typ = typeof header.typ === "string" ? header.typ : null;

  return (
    <div
      style={{
        border: "1px solid rgba(88,166,255,0.25)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          borderBottom: "1px solid rgba(88,166,255,0.15)",
          backgroundColor: "rgba(88,166,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: monoFont,
              fontSize: "0.68rem",
              color: "#58a6ff",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            HEADER
          </span>
          {alg && (
            <span
              style={{
                fontFamily: monoFont,
                fontSize: "0.65rem",
                padding: "2px 9px",
                borderRadius: "3px",
                border: "1px solid rgba(88,166,255,0.4)",
                color: "#58a6ff",
                background: "rgba(88,166,255,0.12)",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {alg}
            </span>
          )}
          {typ && (
            <span
              style={{
                fontFamily: monoFont,
                fontSize: "0.65rem",
                padding: "2px 9px",
                borderRadius: "3px",
                border: "1px solid rgba(88,166,255,0.15)",
                color: "var(--code-comment)",
                background: "rgba(88,166,255,0.04)",
              }}
            >
              {typ}
            </span>
          )}
        </div>
        <CopyButton text={JSON.stringify(header, null, 2)} />
      </div>

      <div>
        {Object.entries(header).map(([key, value], i, arr) => (
          <div
            key={key}
            style={{
              display: "flex",
              borderBottom:
                i < arr.length - 1
                  ? "1px solid rgba(88,166,255,0.06)"
                  : "none",
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                minWidth: "130px",
                flexShrink: 0,
                borderRight: "1px solid rgba(88,166,255,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.73rem",
                  color: "#58a6ff",
                }}
              >
                {key}
              </span>
            </div>
            <div style={{ padding: "8px 14px", flex: 1 }}>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.73rem",
                  color: "#e6edf3",
                }}
              >
                {typeof value === "string"
                  ? `"${value}"`
                  : JSON.stringify(value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Security Warnings ─────────────────────────────────────────────────────────

interface SecurityWarning {
  level: "critical" | "warn";
  title: string;
  message: string;
}

function getSecurityWarnings(header: Record<string, unknown>): SecurityWarning[] {
  const warnings: SecurityWarning[] = [];
  const alg = typeof header.alg === "string" ? header.alg : "";

  if (alg.toLowerCase() === "none") {
    warnings.push({
      level: "critical",
      title: "CRITICAL: Algorithm is 'none'",
      message:
        "This token has no cryptographic signature. Any payload can be forged by anyone — no secret required. Never accept alg:none tokens in production.",
    });
  }

  return warnings;
}

function SecurityWarnings({ header }: { header: Record<string, unknown> }) {
  const warnings = getSecurityWarnings(header);
  if (warnings.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {warnings.map((w) => (
        <div
          key={w.title}
          style={{
            border: "1px solid rgba(255,123,114,0.5)",
            borderLeft: "3px solid #ff7b72",
            borderRadius: "6px",
            background: "rgba(255,123,114,0.07)",
            padding: "12px 14px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <AlertTriangle
            size={16}
            style={{ color: "#ff7b72", flexShrink: 0, marginTop: "1px" }}
          />
          <div>
            <div
              style={{
                fontFamily: monoFont,
                fontSize: "0.76rem",
                color: "#ff7b72",
                fontWeight: 700,
                letterSpacing: "0.03em",
                marginBottom: "4px",
              }}
            >
              {w.title}
            </div>
            <div
              style={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "var(--code-comment)",
                lineHeight: 1.6,
              }}
            >
              {w.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Payload Card ──────────────────────────────────────────────────────────────

function PayloadCard({
  payload,
  nowMs,
}: {
  payload: Record<string, unknown>;
  nowMs: number;
}) {
  const exp = typeof payload.exp === "number" ? payload.exp : null;
  const nbf = typeof payload.nbf === "number" ? payload.nbf : null;
  const nowSec = Math.floor(nowMs / 1000);

  let tokenStatus: "valid" | "expired" | "not-yet-valid" = "valid";
  if (exp !== null && exp < nowSec) tokenStatus = "expired";
  else if (nbf !== null && nbf > nowSec) tokenStatus = "not-yet-valid";

  const bannerColor =
    tokenStatus === "expired"
      ? "#ff7b72"
      : tokenStatus === "not-yet-valid"
        ? "#e3b341"
        : "var(--terminal-green)";
  const bannerBg =
    tokenStatus === "expired"
      ? "rgba(255,123,114,0.06)"
      : tokenStatus === "not-yet-valid"
        ? "rgba(227,179,65,0.06)"
        : "rgba(0,255,136,0.05)";
  const bannerBorder =
    tokenStatus === "expired"
      ? "rgba(255,123,114,0.18)"
      : tokenStatus === "not-yet-valid"
        ? "rgba(227,179,65,0.18)"
        : "rgba(0,255,136,0.12)";
  const bannerLabel =
    tokenStatus === "expired"
      ? "TOKEN EXPIRED"
      : tokenStatus === "not-yet-valid"
        ? "TOKEN NOT YET VALID"
        : "TOKEN VALID";
  const BannerIcon =
    tokenStatus === "valid"
      ? ShieldCheck
      : tokenStatus === "expired"
        ? ShieldX
        : AlertTriangle;

  return (
    <div
      style={{
        border: "1px solid rgba(0,255,136,0.2)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          borderBottom: "1px solid rgba(0,255,136,0.12)",
          backgroundColor: "rgba(0,255,136,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: monoFont,
            fontSize: "0.68rem",
            color: "var(--terminal-green)",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}
        >
          PAYLOAD
        </span>
        <CopyButton text={JSON.stringify(payload, null, 2)} />
      </div>

      {/* Status banner (only shown when exp exists) */}
      {exp !== null && (
        <div
          style={{
            padding: "6px 14px",
            borderBottom: `1px solid ${bannerBorder}`,
            background: bannerBg,
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <BannerIcon size={12} style={{ color: bannerColor, flexShrink: 0 }} />
          <span
            style={{
              fontFamily: monoFont,
              fontSize: "0.68rem",
              color: bannerColor,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {bannerLabel}
          </span>
        </div>
      )}

      <div>
        {Object.entries(payload).map(([key, value], i, arr) => {
          const isTime = TIME_CLAIMS.has(key) && typeof value === "number";
          const desc = CLAIM_DESCRIPTIONS[key];
          const isStandard = key in CLAIM_DESCRIPTIONS;
          const isLast = i === arr.length - 1;

          if (isTime && typeof value === "number") {
            const info = formatTimestamp(value, nowMs);
            const isExp = key === "exp";
            const isNbf = key === "nbf";
            const isNotYetValid = isNbf && value > nowSec;

            return (
              <div
                key={key}
                style={{
                  borderBottom: isLast
                    ? "none"
                    : "1px solid rgba(0,255,136,0.06)",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      padding: "8px 14px",
                      minWidth: "130px",
                      flexShrink: 0,
                      borderRight: "1px solid rgba(0,255,136,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.73rem",
                        color: "var(--terminal-green)",
                      }}
                    >
                      {key}
                    </div>
                    {desc && (
                      <div
                        style={{
                          fontFamily: monoFont,
                          fontSize: "0.6rem",
                          color: "var(--code-comment)",
                          opacity: 0.5,
                          marginTop: "2px",
                        }}
                      >
                        {desc}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "8px 14px", flex: 1 }}>
                    <div
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.73rem",
                        color: "#79c0ff",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.68rem",
                        color: "var(--code-comment)",
                        opacity: 0.6,
                        marginTop: "2px",
                      }}
                    >
                      {formatTimestamp(value, nowMs).absolute}
                    </div>

                    {/* exp — big aggressive status block */}
                    {isExp && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "10px 14px",
                          borderRadius: "6px",
                          border: `1px solid ${timeBorder(info.status)}`,
                          background: timeBg(info.status),
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Clock
                          size={16}
                          style={{
                            color: timeColor(info.status),
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: monoFont,
                            fontSize: "0.92rem",
                            color: timeColor(info.status),
                            fontWeight: 700,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {info.relative}
                        </span>
                      </div>
                    )}

                    {/* nbf — not yet valid block */}
                    {isNotYetValid && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "10px 14px",
                          borderRadius: "6px",
                          border: "1px solid rgba(227,179,65,0.4)",
                          background: "rgba(227,179,65,0.08)",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Clock
                          size={16}
                          style={{ color: "#e3b341", flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontFamily: monoFont,
                            fontSize: "0.92rem",
                            color: "#e3b341",
                            fontWeight: 700,
                          }}
                        >
                          not yet valid
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // Value color by type
          const valColor =
            typeof value === "string"
              ? "#a5d6ff"
              : typeof value === "number"
                ? "#79c0ff"
                : typeof value === "boolean"
                  ? value
                    ? "var(--terminal-green)"
                    : "#ff7b72"
                  : "#e6edf3";

          const isNested = typeof value === "object" && value !== null;

          return (
            <div
              key={key}
              style={{
                display: "flex",
                borderBottom: isLast
                  ? "none"
                  : "1px solid rgba(0,255,136,0.06)",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  padding: "8px 14px",
                  minWidth: "130px",
                  flexShrink: 0,
                  borderRight: "1px solid rgba(0,255,136,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.73rem",
                    color: isStandard
                      ? "var(--terminal-green)"
                      : "var(--code-comment)",
                  }}
                >
                  {key}
                </div>
                {desc && (
                  <div
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.6rem",
                      color: "var(--code-comment)",
                      opacity: 0.5,
                      marginTop: "2px",
                    }}
                  >
                    {desc}
                  </div>
                )}
              </div>
              <div style={{ padding: "8px 14px", flex: 1, minWidth: 0 }}>
                {isNested ? (
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: valColor,
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                    }}
                  >
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.73rem",
                      color: valColor,
                      wordBreak: "break-all",
                    }}
                  >
                    {typeof value === "string"
                      ? `"${value}"`
                      : JSON.stringify(value)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Signature Card ────────────────────────────────────────────────────────────

function SignatureCard({
  signature,
  headerRaw,
  payloadRaw,
  algorithm,
}: {
  signature: string;
  headerRaw: string;
  payloadRaw: string;
  algorithm: string | null;
}) {
  const [secret, setSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  const isHmac = algorithm
    ? ["HS256", "HS384", "HS512"].includes(algorithm)
    : false;
  const isAsymmetric = algorithm
    ? ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"].includes(algorithm)
    : false;

  const handleVerify = useCallback(async () => {
    if (!secret.trim() || !algorithm) return;
    setVerifyStatus("verifying");
    const result = await verifyHmacSignature(
      headerRaw,
      payloadRaw,
      signature,
      secret.trim(),
      algorithm
    );
    setVerifyStatus(result);
  }, [secret, algorithm, headerRaw, payloadRaw, signature]);

  const handleVerifyAsymmetric = useCallback(async () => {
    if (!publicKey.trim() || !algorithm) return;
    setVerifyStatus("verifying");
    const result = await verifyAsymmetricSignature(
      headerRaw,
      payloadRaw,
      signature,
      publicKey.trim().replace(/\r\n/g, "\n"),
      algorithm
    );
    setVerifyStatus(result);
  }, [publicKey, algorithm, headerRaw, payloadRaw, signature]);

  const secretHasWhitespace = secret !== secret.trim();
  const publicKeyHasWhitespace = publicKey !== publicKey.trim();

  return (
    <div
      style={{
        border: "1px solid rgba(255,123,114,0.2)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          borderBottom: "1px solid rgba(255,123,114,0.12)",
          backgroundColor: "rgba(255,123,114,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: monoFont,
            fontSize: "0.68rem",
            color: "#ff7b72",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}
        >
          SIGNATURE
        </span>
        <CopyButton text={signature} />
      </div>

      <pre
        style={{
          margin: 0,
          padding: "10px 14px",
          fontFamily: monoFont,
          fontSize: "0.72rem",
          color: "#ff7b72",
          background: "rgba(10,14,26,0.8)",
          lineHeight: "1.6",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap",
          borderBottom: "1px solid rgba(255,123,114,0.1)",
        }}
      >
        {signature}
      </pre>

      {/* Verification panel */}
      <div style={{ padding: "14px 14px 16px", background: "rgba(10,14,26,0.35)" }}>
        <div
          style={{
            fontFamily: monoFont,
            fontSize: "0.63rem",
            color: "var(--code-comment)",
            letterSpacing: "0.1em",
            marginBottom: "10px",
            opacity: 0.6,
          }}
        >
          SIGNATURE VERIFICATION
        </div>

        {isHmac && (
          <>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  flex: 1,
                  border: "1px solid rgba(255,123,114,0.2)",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex",
                  background: "rgba(10,14,26,0.8)",
                }}
              >
                <div
                  style={{
                    padding: "7px 10px",
                    borderRight: "1px solid rgba(255,123,114,0.15)",
                    fontFamily: monoFont,
                    fontSize: "0.65rem",
                    color: "var(--code-comment)",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    opacity: 0.7,
                  }}
                >
                  <Key size={10} />
                  secret
                </div>
                <input
                  type="text"
                  value={secret}
                  onChange={(e) => {
                    setSecret(e.target.value);
                    setVerifyStatus("idle");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && secret.trim()) handleVerify();
                  }}
                  placeholder="your-secret-key"
                  spellCheck={false}
                  style={{
                    flex: 1,
                    padding: "7px 10px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: monoFont,
                    fontSize: "0.75rem",
                    color: "#e6edf3",
                  }}
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={!secret.trim() || verifyStatus === "verifying"}
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  padding: "7px 14px",
                  borderRadius: "5px",
                  cursor:
                    secret.trim() && verifyStatus !== "verifying"
                      ? "pointer"
                      : "not-allowed",
                  border: "1px solid rgba(88,166,255,0.25)",
                  background: "rgba(88,166,255,0.08)",
                  color:
                    secret.trim() ? "#58a6ff" : "var(--code-comment)",
                  opacity: secret.trim() ? 1 : 0.45,
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {verifyStatus === "verifying" ? "Verifying..." : "Verify"}
              </button>
            </div>

            {secretHasWhitespace && (
              <div
                style={{
                  marginTop: "6px",
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  color: "#e3b341",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <AlertTriangle size={10} />
                leading/trailing whitespace detected — will be auto-trimmed on verify
              </div>
            )}

            {verifyStatus !== "idle" && verifyStatus !== "verifying" && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 12px",
                  borderRadius: "5px",
                  border:
                    verifyStatus === "valid"
                      ? "1px solid rgba(0,255,136,0.3)"
                      : "1px solid rgba(255,123,114,0.3)",
                  background:
                    verifyStatus === "valid"
                      ? "rgba(0,255,136,0.06)"
                      : "rgba(255,123,114,0.06)",
                }}
              >
                {verifyStatus === "valid" ? (
                  <ShieldCheck
                    size={14}
                    style={{ color: "var(--terminal-green)", flexShrink: 0 }}
                  />
                ) : (
                  <ShieldX
                    size={14}
                    style={{ color: "#ff7b72", flexShrink: 0 }}
                  />
                )}
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.74rem",
                    color:
                      verifyStatus === "valid"
                        ? "var(--terminal-green)"
                        : "#ff7b72",
                    fontWeight: 700,
                  }}
                >
                  {verifyStatus === "valid"
                    ? "Signature valid — secret matches"
                    : "Signature invalid — secret does not match"}
                </span>
              </div>
            )}
          </>
        )}

        {isAsymmetric && (
          <>
            {/* Algorithm info badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  padding: "2px 8px",
                  borderRadius: "3px",
                  border: "1px solid rgba(88,166,255,0.3)",
                  color: "#58a6ff",
                  background: "rgba(88,166,255,0.08)",
                  fontWeight: 700,
                }}
              >
                {algorithm}
              </span>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.68rem",
                  color: "var(--code-comment)",
                  opacity: 0.6,
                }}
              >
                Paste your Public Key (PEM) to verify signature
              </span>
            </div>

            {/* PEM textarea */}
            <div
              style={{
                border: "1px solid rgba(255,123,114,0.2)",
                borderRadius: "5px",
                overflow: "hidden",
                background: "rgba(10,14,26,0.8)",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  padding: "6px 10px",
                  borderBottom: "1px solid rgba(255,123,114,0.12)",
                  fontFamily: monoFont,
                  fontSize: "0.63rem",
                  color: "var(--code-comment)",
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  letterSpacing: "0.06em",
                }}
              >
                <Key size={10} />
                PUBLIC KEY (PEM)
              </div>
              <textarea
                value={publicKey}
                onChange={(e) => {
                  setPublicKey(e.target.value);
                  setVerifyStatus("idle");
                }}
                placeholder={`-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----`}
                spellCheck={false}
                style={{
                  width: "100%",
                  minHeight: "110px",
                  padding: "10px 12px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "#e6edf3",
                  lineHeight: "1.6",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {publicKeyHasWhitespace && (
              <div
                style={{
                  marginBottom: "8px",
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  color: "#e3b341",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <AlertTriangle size={10} />
                leading/trailing whitespace detected — will be auto-trimmed on verify
              </div>
            )}

            <button
              onClick={handleVerifyAsymmetric}
              disabled={!publicKey.trim() || verifyStatus === "verifying"}
              style={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                padding: "7px 18px",
                borderRadius: "5px",
                cursor:
                  publicKey.trim() && verifyStatus !== "verifying"
                    ? "pointer"
                    : "not-allowed",
                border: "1px solid rgba(88,166,255,0.25)",
                background: "rgba(88,166,255,0.08)",
                color: publicKey.trim() ? "#58a6ff" : "var(--code-comment)",
                opacity: publicKey.trim() ? 1 : 0.45,
                transition: "all 0.15s",
              }}
            >
              {verifyStatus === "verifying" ? "Verifying..." : "Verify Signature"}
            </button>

            {/* Shared result block */}
            {verifyStatus !== "idle" && verifyStatus !== "verifying" && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 12px",
                  borderRadius: "5px",
                  border:
                    verifyStatus === "valid"
                      ? "1px solid rgba(0,255,136,0.3)"
                      : "1px solid rgba(255,123,114,0.3)",
                  background:
                    verifyStatus === "valid"
                      ? "rgba(0,255,136,0.06)"
                      : "rgba(255,123,114,0.06)",
                }}
              >
                {verifyStatus === "valid" ? (
                  <ShieldCheck size={14} style={{ color: "var(--terminal-green)", flexShrink: 0 }} />
                ) : (
                  <ShieldX size={14} style={{ color: "#ff7b72", flexShrink: 0 }} />
                )}
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.74rem",
                    color: verifyStatus === "valid" ? "var(--terminal-green)" : "#ff7b72",
                    fontWeight: 700,
                  }}
                >
                  {verifyStatus === "valid"
                    ? "Signature valid — public key matches"
                    : "Signature invalid — key mismatch or wrong algorithm"}
                </span>
              </div>
            )}
          </>
        )}

        {!algorithm && (
          <div
            style={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "var(--code-comment)",
              opacity: 0.4,
            }}
          >
            Paste a JWT token above to verify its signature
          </div>
        )}

        {algorithm && !isHmac && !isAsymmetric && (
          <div
            style={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "var(--code-comment)",
              opacity: 0.4,
            }}
          >
            Verification not supported for algorithm: {algorithm}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function JwtDecoderClient() {
  const [input, setInput] = useState("");
  const [nowMs, setNowMs] = useState(Date.now());

  // Live clock — updates every second for countdown
  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parsed = parseJwt(input);
  const algorithm =
    parsed && !("error" in parsed) && typeof parsed.header.alg === "string"
      ? parsed.header.alg
      : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Client-side badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid rgba(0,255,136,0.15)",
          backgroundColor: "rgba(0,255,136,0.05)",
          width: "fit-content",
        }}
      >
        <ShieldCheck size={12} style={{ color: "var(--terminal-green)", flexShrink: 0 }} />
        <span style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--code-comment)" }}>
          100% client-side — no data leaves your browser
        </span>
      </div>

      <div
        style={{
          border: "1px solid var(--terminal-border)",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "rgba(10, 14, 26, 0.6)",
        }}
      >
      {/* Window titlebar */}
      <div
        style={{
          backgroundColor: "rgba(16, 16, 16, 0.99)",
          borderBottom: "1px solid var(--terminal-border)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <WindowDots />
        <span
          style={{
            fontFamily: monoFont,
            fontSize: "0.68rem",
            color: "var(--code-comment)",
            opacity: 0.5,
            letterSpacing: "0.06em",
          }}
        >
          jwt — decoder
        </span>
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Token input */}
        <div
          style={{
            border: "1px solid rgba(88,166,255,0.15)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "6px 12px",
              borderBottom: "1px solid rgba(88,166,255,0.1)",
              backgroundColor: "rgba(88,166,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Key size={11} style={{ color: "#58a6ff", opacity: 0.7 }} />
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  color: "var(--code-comment)",
                  letterSpacing: "0.08em",
                }}
              >
                JWT TOKEN
              </span>
            </div>
            {input && (
              <button
                onClick={() => setInput("")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "1px solid rgba(255,123,114,0.2)",
                  background: "rgba(255,123,114,0.04)",
                  color: "var(--code-comment)",
                }}
              >
                <Trash2 size={10} />
                Clear
              </button>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a JWT token here...  e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...."
            spellCheck={false}
            style={{
              width: "100%",
              minHeight: "90px",
              padding: "12px",
              background: "rgba(10,14,26,0.8)",
              border: "none",
              outline: "none",
              resize: "vertical",
              fontFamily: monoFont,
              fontSize: "0.78rem",
              color: "#e6edf3",
              lineHeight: "1.6",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Color-coded token visualization */}
        {parsed && !("error" in parsed) && (
          <TokenVisualizer token={input.trim()} />
        )}

        {/* Parse error */}
        {parsed && "error" in parsed && (
          <div
            style={{
              fontFamily: monoFont,
              fontSize: "0.78rem",
              color: "#ff7b72",
              padding: "10px 14px",
              border: "1px solid rgba(255,123,114,0.2)",
              borderRadius: "7px",
              background: "rgba(255,123,114,0.04)",
            }}
          >
            {parsed.error}
          </div>
        )}

        {/* Decoded sections */}
        {parsed && !("error" in parsed) && (
          <>
            <HeaderCard header={parsed.header} />
            <SecurityWarnings header={parsed.header} />
            <PayloadCard payload={parsed.payload} nowMs={nowMs} />
            <SignatureCard
              signature={parsed.signature}
              headerRaw={parsed.headerRaw}
              payloadRaw={parsed.payloadRaw}
              algorithm={algorithm}
            />
          </>
        )}

        {/* Empty state */}
        {!parsed && (
          <div
            style={{
              fontFamily: monoFont,
              fontSize: "0.76rem",
              color: "var(--code-comment)",
              opacity: 0.35,
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Paste a JWT token above to inspect its contents
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
