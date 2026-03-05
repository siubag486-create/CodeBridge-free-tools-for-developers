import type { Metadata } from "next";
import JwtDecoderClient from "@/components/tools/jwt-decoder/jwt-decoder-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best JWT Decoder & Verifier — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Decode and inspect JWT tokens instantly. View Header, Payload, and Signature with live expiry countdown. Verify HMAC signatures with your secret key. Runs entirely in your browser — zero server calls.",
  keywords: [
    "jwt decoder",
    "jwt inspector",
    "jwt debugger",
    "json web token decoder",
    "jwt verify",
    "jwt expiry checker",
    "hs256 verify",
  ],
  openGraph: {
    title: "The Best JWT Decoder & Verifier — Free, Instant, Secured, No Server | OmniDev",
    description: "Decode and inspect JWT tokens instantly. View Header, Payload, and Signature with live expiry countdown. Verify HMAC signatures. Runs entirely in your browser.",
    url: "https://www.omnidevtools.com/tools/jwt-decoder",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev JWT Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function JwtDecoderPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--terminal-bg)",
        minHeight: "100vh",
        paddingTop: "56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JWT Decoder & Verifier",
            "description": "Decode and inspect JWT tokens instantly. View Header, Payload, and Signature with live expiry countdown. Runs entirely in your browser.",
            "url": "https://www.omnidevtools.com/tools/jwt-decoder",
            "image": "https://www.omnidevtools.com/og-image.jpg",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          }),
        }}
      />
      <div
        className="grid-lines-bg"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "40px 24px 60px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Page header */}
          <div
            style={{
              marginBottom: "28px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Left: title block */}
            <div>
              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "var(--code-comment)",
                  marginBottom: "10px",
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: "var(--terminal-green)" }}>~</span>
                <span style={{ opacity: 0.5 }}>/tools/</span>
                <span style={{ color: "var(--electric-blue)" }}>jwt-decoder</span>
              </p>

              <h1
                style={{
                  fontFamily: monoFont,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "var(--terminal-green)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: "8px",
                }}
              >
                JWT{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  Decoder
                </span>
              </h1>

              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.82rem",
                  color: "var(--code-comment)",
                  lineHeight: 1.6,
                  maxWidth: "540px",
                }}
              >
                Decode Header, Payload, and Signature.{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.85 }}>
                  Live expiry countdown
                </span>{" "}
                and HMAC signature verification — all in your browser, zero server calls.
              </p>
            </div>

            {/* Right: How to use */}
            <div
              style={{
                border: "1px solid rgba(88,166,255,0.18)",
                borderRadius: "7px",
                backgroundColor: "rgba(88,166,255,0.03)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  padding: "6px 12px",
                  borderBottom: "1px solid rgba(88,166,255,0.12)",
                  backgroundColor: "rgba(88,166,255,0.06)",
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  color: "#58a6ff",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                // How to use
              </div>
              <div style={{ display: "flex" }}>
                <pre
                  style={{
                    margin: 0,
                    padding: "10px 14px",
                    fontFamily: monoFont,
                    fontSize: "0.7rem",
                    lineHeight: "1.85",
                    color: "var(--code-comment)",
                    whiteSpace: "pre",
                    borderRight: "1px solid rgba(88,166,255,0.1)",
                  }}
                >
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Paste JWT token into the input\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Header, Payload, Signature decoded\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Check live expiry on exp claim\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Enter secret + Verify for HS256\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* all processing done in browser"}</span>
                </pre>
                <pre
                  style={{
                    margin: 0,
                    padding: "10px 14px",
                    fontFamily: monoFont,
                    fontSize: "0.7rem",
                    lineHeight: "1.85",
                    color: "var(--code-comment)",
                    whiteSpace: "pre",
                  }}
                >
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// Standard Claims\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>iss</span>{" Issuer    "}<span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>sub</span>{" Subject\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>aud</span>{" Audience  "}<span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>jti</span>{" JWT ID\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>exp</span>{" Expiry    "}<span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>iat</span>{" Issued At\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>nbf</span>{" Not Before\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* highlighted in payload section"}</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Tool */}
          <JwtDecoderClient />

          {/* Description section */}
          <div style={{ marginTop: "60px" }}>
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(0,255,136,0.1)",
                marginBottom: "40px",
              }}
            />

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              What is a JWT?
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "14px",
                maxWidth: "720px",
              }}
            >
              JSON Web Token (JWT) is an open standard (
              <span style={{ color: "rgba(255,255,255,0.65)" }}>RFC 7519</span>)
              that defines a compact, self-contained way to securely transmit
              information between parties as a JSON object. JWTs are widely
              used for authentication and authorization in modern web
              applications — particularly in REST APIs and Single Page Apps
              (SPAs). After a user logs in, the server issues a JWT that the
              client sends with every subsequent request to prove identity.
            </p>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              A JWT looks like three Base64URL-encoded strings separated by
              dots:{" "}
              <code
                style={{
                  fontFamily: monoFont,
                  color: "var(--terminal-green)",
                  opacity: 0.85,
                  fontSize: "0.78rem",
                }}
              >
                xxxxx.yyyyy.zzzzz
              </code>
            </p>

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Three-Part Structure
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "16px",
                maxWidth: "720px",
              }}
            >
              Every JWT is made up of exactly three parts separated by dots. This structure is not arbitrary — each part serves a distinct security purpose. Understanding what belongs in each section, and crucially what should never be placed there, is the foundation of using JWTs safely in production. A common misconception is that Base64-encoding the payload provides some protection; it does not — the payload is trivially decodable by anyone who holds the token.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "12px",
                marginBottom: "32px",
                maxWidth: "720px",
              }}
            >
              {[
                {
                  part: "Header",
                  color: "rgba(255,150,100,0.85)",
                  desc: "Contains metadata about the token — the algorithm used to sign it (alg) and the token type (typ). Common algorithms: HS256, RS256, ES256.",
                  example: `{\n  "alg": "HS256",\n  "typ": "JWT"\n}`,
                },
                {
                  part: "Payload",
                  color: "rgba(100,200,255,0.85)",
                  desc: "The claims — statements about the user and any additional data. Contains registered claims (exp, iat, sub) and custom application data.",
                  example: `{\n  "sub": "user_123",\n  "name": "Alice",\n  "exp": 1893456000\n}`,
                },
                {
                  part: "Signature",
                  color: "rgba(150,255,150,0.7)",
                  desc: "Created by signing the encoded header and payload with a secret key (HMAC) or private key (RSA/ECDSA). Verifies the token has not been tampered with.",
                  example: "HMACSHA256(\n  base64(header) +\n  \".\" +\n  base64(payload),\n  secret\n)",
                },
              ].map(({ part, color, desc, example }) => (
                <div
                  key={part}
                  style={{
                    border: `1px solid ${color.replace("0.85", "0.2").replace("0.7", "0.15")}`,
                    borderRadius: "6px",
                    backgroundColor: color.replace("0.85", "0.03").replace("0.7", "0.03"),
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "6px 14px",
                      borderBottom: `1px solid ${color.replace("0.85", "0.1").replace("0.7", "0.08")}`,
                      backgroundColor: color.replace("0.85", "0.06").replace("0.7", "0.05"),
                    }}
                  >
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {part}
                    </p>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.73rem",
                        color: "var(--comment-gray)",
                        lineHeight: 1.7,
                        marginBottom: "10px",
                        opacity: 0.85,
                      }}
                    >
                      {desc}
                    </p>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: monoFont,
                        fontSize: "0.68rem",
                        color: "var(--comment-gray)",
                        opacity: 0.55,
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {example}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Standard Claims (Registered)
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "16px",
                maxWidth: "720px",
              }}
            >
              The JWT specification defines a set of reserved claim names with well-known meanings across all JWT libraries and services. Using these standard claims — rather than inventing your own field names — ensures interoperability with any framework that validates tokens. Of these, <code style={{ color: "var(--terminal-green)", fontFamily: monoFont, opacity: 0.85 }}>exp</code> is the most critical: a token without an expiry can never be invalidated short of rotating your entire signing secret, which is a serious operational problem in production systems.
            </p>
            <div
              style={{
                border: "1px solid rgba(88,166,255,0.12)",
                borderRadius: "6px",
                backgroundColor: "rgba(88,166,255,0.02)",
                overflow: "hidden",
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              {[
                { claim: "iss", name: "Issuer", desc: "Identifies the party that issued the JWT. Usually the authentication server URL." },
                { claim: "sub", name: "Subject", desc: "Identifies the principal — typically a user ID or account identifier." },
                { claim: "aud", name: "Audience", desc: "Identifies the recipients the JWT is intended for. The API or service that should accept it." },
                { claim: "exp", name: "Expiration Time", desc: "UNIX timestamp after which the token must not be accepted. Always validate this claim." },
                { claim: "iat", name: "Issued At", desc: "UNIX timestamp when the token was issued. Used to determine the token's age." },
                { claim: "nbf", name: "Not Before", desc: "UNIX timestamp before which the token must not be accepted. Useful for future-dated tokens." },
                { claim: "jti", name: "JWT ID", desc: "Unique identifier for the JWT. Can be used to prevent replay attacks." },
              ].map(({ claim, name, desc }, i) => (
                <div
                  key={claim}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "10px 16px",
                    borderBottom: i < 6 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "flex-start",
                  }}
                >
                  <code
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.78rem",
                      color: "var(--terminal-green)",
                      opacity: 0.85,
                      minWidth: "32px",
                      flexShrink: 0,
                      paddingTop: "1px",
                    }}
                  >
                    {claim}
                  </code>
                  <div>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.55)",
                        marginBottom: "2px",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        color: "var(--comment-gray)",
                        lineHeight: 1.6,
                        opacity: 0.75,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Signing Algorithms
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "16px",
                maxWidth: "720px",
              }}
            >
              The algorithm you choose determines who can verify the token and what key material is required. Symmetric algorithms like HS256 use the same secret for both signing and verification — simple and fast, but every service that needs to validate tokens must share that secret. Asymmetric algorithms like RS256 and ES256 split this responsibility: only the issuer holds the private key, while any downstream service can verify tokens using only the public key, without ever having access to the signing secret.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "10px",
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              {[
                {
                  alg: "HS256 / HS384 / HS512",
                  type: "HMAC + SHA-2",
                  desc: "Symmetric — same secret key signs and verifies. Fast and simple. Secret must be kept private on the server.",
                },
                {
                  alg: "RS256 / RS384 / RS512",
                  type: "RSA + SHA-2",
                  desc: "Asymmetric — private key signs, public key verifies. Clients can verify tokens without knowing the secret.",
                },
                {
                  alg: "ES256 / ES384 / ES512",
                  type: "ECDSA + SHA-2",
                  desc: "Asymmetric — like RS but using elliptic curves. Produces shorter signatures with equivalent security.",
                },
                {
                  alg: "PS256 / PS384 / PS512",
                  type: "RSA-PSS + SHA-2",
                  desc: "Asymmetric — RSA with probabilistic signature scheme. More secure than RS variants against certain attacks.",
                },
              ].map(({ alg, type, desc }) => (
                <div
                  key={alg}
                  style={{
                    padding: "12px 14px",
                    border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0,255,136,0.02)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: "3px",
                    }}
                  >
                    {alg}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.68rem",
                      color: "var(--electric-blue)",
                      opacity: 0.7,
                      marginBottom: "6px",
                    }}
                  >
                    {type}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: "var(--comment-gray)",
                      lineHeight: 1.6,
                      opacity: 0.75,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Security Considerations
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "16px",
                maxWidth: "720px",
              }}
            >
              JWTs are widely misused from a security perspective. Because decoding a token is trivial — it&apos;s just Base64 — developers sometimes assume the encoding provides confidentiality. It does not. The security of a JWT comes entirely from its signature, and only if the server validates that signature correctly on every single request. Skipping even one validation step opens the door to token forgery, privilege escalation, and session hijacking. These are the vulnerabilities that come up most often in real-world security audits and bug bounty reports.
            </p>
            <div
              style={{
                border: "1px solid rgba(255,100,100,0.18)",
                borderRadius: "6px",
                backgroundColor: "rgba(255,100,100,0.03)",
                padding: "16px 20px",
                maxWidth: "720px",
              }}
            >
              <pre
                style={{
                  margin: 0,
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  lineHeight: "2",
                  color: "var(--comment-gray)",
                  whiteSpace: "pre-wrap",
                }}
              >
                <span style={{ color: "rgba(255,100,100,0.8)", fontWeight: 700 }}>{"// Security Warnings\n"}</span>
                <span style={{ color: "rgba(255,150,100,0.7)" }}>!</span>{" alg:none — tokens with no algorithm are unsigned and must always be rejected\n"}
                <span style={{ color: "rgba(255,150,100,0.7)" }}>!</span>{" Weak secrets — HS256 secrets shorter than 32 bytes are brute-forceable\n"}
                <span style={{ color: "rgba(255,150,100,0.7)" }}>!</span>{" Algorithm confusion — always validate the algorithm server-side; never trust the header alone\n"}
                <span style={{ color: "rgba(255,150,100,0.7)" }}>!</span>{" JWT payload is only Base64-encoded, not encrypted — never store sensitive data in claims\n"}
                <span style={{ color: "rgba(255,150,100,0.7)" }}>!</span>{" Always validate exp, iss, and aud claims server-side on every request\n"}
                <span style={{ color: "rgba(255,150,100,0.7)" }}>!</span>{" Use short expiry times (15–60 min) and refresh token rotation for long sessions\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.68rem" }}>{"* This inspector decodes for inspection only — always verify tokens server-side in production"}</span>
              </pre>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="jwt-decoder" />
      </div>
    </main>
  );
}
