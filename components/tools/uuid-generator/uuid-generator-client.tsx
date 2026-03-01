"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Trash2, RefreshCw } from "lucide-react";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

type Version = "v4" | "v1" | "v7";
type Format = "lower" | "upper";

// ── UUID generators ───────────────────────────────────────────────────────────

function generateV4(): string {
  return crypto.randomUUID();
}

function generateV1(): string {
  // 100-nanosecond intervals since Oct 15, 1582
  const t = BigInt(Date.now()) * 10000n + 122192928000000000n;
  const timeLow = Number(t & 0xffffffffn);
  const timeMid = Number((t >> 32n) & 0xffffn);
  const timeHiAndVersion = Number((t >> 48n) & 0x0fffn) | 0x1000;
  const clockSeq = (Math.floor(Math.random() * 0x3fff) | 0x8000);
  const node = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join("");
  return [
    timeLow.toString(16).padStart(8, "0"),
    timeMid.toString(16).padStart(4, "0"),
    timeHiAndVersion.toString(16).padStart(4, "0"),
    clockSeq.toString(16).padStart(4, "0"),
    node,
  ].join("-");
}

function generateV7(): string {
  // RFC 9562: 48-bit Unix ms timestamp + version(7) + 12 random bits + variant + 62 random bits
  const ms = BigInt(Date.now());
  const rand = crypto.getRandomValues(new Uint8Array(10));
  const r = rand.reduce((acc, b, i) => acc | (BigInt(b) << BigInt((9 - i) * 8)), 0n);
  // time_high (48 bits) | version(4) | rand_a(12) | variant(2) | rand_b(62)
  const msHex = ms.toString(16).padStart(12, "0");
  const randA = ((r >> 62n) & 0xfffn).toString(16).padStart(3, "0");
  const randB1 = (((r >> 48n) & 0x3fffn) | 0x8000n).toString(16).padStart(4, "0");
  const randB2 = (r & 0xffffffffffffn).toString(16).padStart(12, "0");
  return `${msHex.slice(0, 8)}-${msHex.slice(8)}-7${randA}-${randB1}-${randB2}`;
}

function makeUUID(version: Version, format: Format, hyphens: boolean): string {
  const raw = version === "v1" ? generateV1() : version === "v7" ? generateV7() : generateV4();
  const cased = format === "upper" ? raw.toUpperCase() : raw;
  return hyphens ? cased : cased.replace(/-/g, "");
}

// ── sub-components ────────────────────────────────────────────────────────────

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

function CopyBtn({ text, small }: { text: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  const size = small ? "0.68rem" : "0.72rem";
  return (
    <button
      onClick={handleCopy}
      title="Copy"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: small ? "3px 8px" : "4px 10px",
        border: `1px solid ${copied ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "4px",
        backgroundColor: copied ? "rgba(0,255,136,0.08)" : "transparent",
        color: copied ? "var(--terminal-green)" : "var(--comment-gray)",
        fontFamily: monoFont,
        fontSize: size,
        cursor: "pointer",
        transition: "all 0.15s",
        flexShrink: 0,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function UuidGeneratorClient() {
  const [version, setVersion] = useState<Version>("v4");
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<Format>("lower");
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(() => {
    const result = Array.from({ length: count }, () =>
      makeUUID(version, format, hyphens)
    );
    setUuids(result);
    setGenerated(true);
  }, [version, count, format, hyphens]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  const COUNTS = [1, 5, 10, 20, 50];

  const SegBtn = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        fontFamily: monoFont,
        fontSize: "0.72rem",
        border: "1px solid transparent",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.15s",
        backgroundColor: active ? "rgba(0,255,136,0.12)" : "transparent",
        color: active ? "var(--terminal-green)" : "var(--comment-gray)",
        borderColor: active ? "rgba(0,255,136,0.3)" : "transparent",
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        border: "1px solid rgba(0,255,136,0.15)",
        borderRadius: "8px",
        backgroundColor: "rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,255,136,0.1)",
          backgroundColor: "rgba(0,255,136,0.03)",
        }}
      >
        <WindowDots />
        <span
          style={{
            fontFamily: monoFont,
            fontSize: "0.68rem",
            color: "var(--comment-gray)",
            opacity: 0.6,
          }}
        >
          uuid — generator
        </span>
        <div style={{ width: "52px" }} />
      </div>

      {/* Controls */}
      <div
        style={{
          padding: "20px 20px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "flex-end",
        }}
      >
        {/* Version */}
        <div>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.65rem",
              color: "var(--comment-gray)",
              opacity: 0.55,
              marginBottom: "6px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            // Version
          </p>
          <div
            style={{
              display: "flex",
              gap: "4px",
              padding: "3px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <SegBtn active={version === "v1"} onClick={() => setVersion("v1")}>
              v1 (time)
            </SegBtn>
            <SegBtn active={version === "v4"} onClick={() => setVersion("v4")}>
              v4 (random)
            </SegBtn>
            <SegBtn active={version === "v7"} onClick={() => setVersion("v7")}>
              v7 (sortable)
            </SegBtn>
          </div>
        </div>

        {/* Count */}
        <div>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.65rem",
              color: "var(--comment-gray)",
              opacity: 0.55,
              marginBottom: "6px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            // Count
          </p>
          <div
            style={{
              display: "flex",
              gap: "4px",
              padding: "3px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            {COUNTS.map((n) => (
              <SegBtn key={n} active={count === n} onClick={() => setCount(n)}>
                {n}
              </SegBtn>
            ))}
          </div>
        </div>

        {/* Format */}
        <div>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.65rem",
              color: "var(--comment-gray)",
              opacity: 0.55,
              marginBottom: "6px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            // Format
          </p>
          <div
            style={{
              display: "flex",
              gap: "4px",
              padding: "3px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <SegBtn
              active={format === "lower"}
              onClick={() => setFormat("lower")}
            >
              lowercase
            </SegBtn>
            <SegBtn
              active={format === "upper"}
              onClick={() => setFormat("upper")}
            >
              UPPERCASE
            </SegBtn>
          </div>
        </div>

        {/* Hyphens */}
        <div>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.65rem",
              color: "var(--comment-gray)",
              opacity: 0.55,
              marginBottom: "6px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            // Hyphens
          </p>
          <div
            style={{
              display: "flex",
              gap: "4px",
              padding: "3px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <SegBtn active={hyphens} onClick={() => setHyphens(true)}>
              with
            </SegBtn>
            <SegBtn active={!hyphens} onClick={() => setHyphens(false)}>
              without
            </SegBtn>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 20px",
            backgroundColor: "rgba(0,255,136,0.12)",
            border: "1px solid rgba(0,255,136,0.35)",
            borderRadius: "6px",
            color: "var(--terminal-green)",
            fontFamily: monoFont,
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
            marginBottom: "3px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(0,255,136,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(0,255,136,0.12)";
          }}
        >
          <RefreshCw size={13} />
          Generate
        </button>
      </div>

      {/* Results */}
      <div style={{ padding: "20px" }}>
        {!generated ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              border: "1px dashed rgba(0,255,136,0.1)",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.78rem",
                color: "var(--comment-gray)",
                opacity: 0.4,
              }}
            >
              // Press Generate to create UUIDs
            </p>
          </div>
        ) : (
          <>
            {/* Result list */}
            <div
              style={{
                border: "1px solid rgba(0,255,136,0.1)",
                borderRadius: "6px",
                overflow: "hidden",
                marginBottom: "12px",
              }}
            >
              {uuids.map((uuid, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    padding: "10px 14px",
                    borderBottom:
                      i < uuids.length - 1
                        ? "1px solid rgba(0,255,136,0.06)"
                        : undefined,
                    backgroundColor:
                      i % 2 === 0 ? "transparent" : "rgba(0,255,136,0.015)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.62rem",
                        color: "var(--comment-gray)",
                        opacity: 0.35,
                        flexShrink: 0,
                        width: "18px",
                        textAlign: "right",
                      }}
                    >
                      {i + 1}
                    </span>
                    <code
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.82rem",
                        color: "var(--terminal-green)",
                        opacity: 0.9,
                        letterSpacing: "0.03em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {uuid}
                    </code>
                  </div>
                  <CopyBtn text={uuid} small />
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={copyAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  border: "1px solid rgba(88,166,255,0.25)",
                  borderRadius: "5px",
                  backgroundColor: "rgba(88,166,255,0.06)",
                  color: "var(--electric-blue)",
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                }}
              >
                <Copy size={12} />
                Copy All
              </button>
              <button
                onClick={() => { setUuids([]); setGenerated(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  color: "var(--comment-gray)",
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={12} />
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
