import type { Metadata } from "next";
import UuidGeneratorClient from "@/components/tools/uuid-generator/uuid-generator-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best UUID Generator — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Generate UUID v4, v1, and v7 identifiers instantly in your browser. Bulk generation, uppercase/lowercase, with or without hyphens. No server required.",
  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "uuid v1 generator",
    "online uuid",
    "random uuid",
    "generate guid",
    "bulk uuid generator",
  ],
  openGraph: {
    title: "The Best UUID Generator — Free, Instant, Secured, No Server | OmniDev",
    description: "Generate UUID v4, v1, and v7 identifiers instantly in your browser. Bulk generation, uppercase/lowercase, with or without hyphens. No server required.",
    url: "https://www.omnidevtools.com/tools/uuid-generator",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev UUID Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function UuidGeneratorPage() {
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
            "name": "UUID Generator",
            "description": "Generate UUID v4, v1, and v7 identifiers instantly in your browser. Bulk generation, uppercase/lowercase, with or without hyphens.",
            "url": "https://www.omnidevtools.com/tools/uuid-generator",
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
                <span style={{ color: "var(--electric-blue)" }}>uuid-generator</span>
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
                UUID{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  Generator
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
                Generate UUID v4, v1, and v7 identifiers{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — bulk generation, format options. Runs entirely in your browser, zero server calls.
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
                minWidth: "220px",
                maxWidth: "300px",
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
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Select version (v4, v1, or v7)\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Choose how many to generate\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Set format and hyphen options\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Click Generate\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Copy individually or use Copy All\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>* all generation happens in browser</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <UuidGeneratorClient />

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
              What is a UUID?
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
              A UUID (Universally Unique Identifier) is a 128-bit identifier
              standardised in{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>RFC 4122</span>.
              It is designed to be unique across all space and time without
              requiring a central registration authority. In its canonical form,
              a UUID is represented as 32 hexadecimal digits separated by
              hyphens into five groups:{" "}
              <code
                style={{
                  fontFamily: monoFont,
                  color: "var(--terminal-green)",
                  opacity: 0.85,
                  fontSize: "0.78rem",
                }}
              >
                xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
              </code>
              .
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
              UUIDs are also commonly referred to as GUIDs (Globally Unique
              Identifiers), a term popularised by Microsoft. Despite the
              different name, a GUID and a UUID are the same thing — the terms
              are interchangeable in modern usage.
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
              UUID Versions
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
              The UUID specification defines several versions, each with a
              different generation strategy. The version number is encoded in
              the UUID itself (the first digit of the third group), so you can
              always identify how a UUID was generated just by looking at it.
              For most new applications, v4 is the right choice — it requires
              no configuration and produces statistically unique identifiers
              with negligible collision probability.
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
                {
                  ver: "v1",
                  strategy: "Time-based",
                  desc: "Generated from the current timestamp and the MAC address of the machine. Monotonically increasing, which makes it sortable by creation time. The node portion is randomised in this tool since MAC addresses are not accessible in browsers.",
                },
                {
                  ver: "v2",
                  strategy: "DCE Security",
                  desc: "A variant of v1 that embeds POSIX UID/GID into the UUID. Rarely used outside of DCE/RPC systems. Not widely supported by UUID libraries.",
                },
                {
                  ver: "v3",
                  strategy: "Name-based (MD5)",
                  desc: "Deterministic — generates the same UUID for the same namespace and name every time, using MD5 hashing. Useful when you need consistent identifiers for well-known inputs.",
                },
                {
                  ver: "v4",
                  strategy: "Random",
                  desc: "122 bits of cryptographic randomness. No input required. The overwhelming choice for generating unique identifiers in web applications, databases, and distributed systems.",
                },
                {
                  ver: "v5",
                  strategy: "Name-based (SHA-1)",
                  desc: "Like v3 but uses SHA-1 instead of MD5. Preferred over v3 when deterministic UUIDs are needed, due to SHA-1's better collision resistance.",
                },
                {
                  ver: "v7",
                  strategy: "Unix-time ordered",
                  desc: "Introduced in RFC 9562 (2024). Combines a millisecond-precision Unix timestamp prefix with random bits. Naturally sortable by creation time — ideal for use as database primary keys.",
                },
              ].map(({ ver, strategy, desc }, i) => (
                <div
                  key={ver}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "12px 18px",
                    borderBottom:
                      i < 5 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "flex-start",
                  }}
                >
                  <code
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color:
                        ver === "v4" || ver === "v1" || ver === "v7"
                          ? "var(--terminal-green)"
                          : "rgba(255,255,255,0.35)",
                      opacity: ver === "v4" || ver === "v1" || ver === "v7" ? 0.9 : 0.6,
                      minWidth: "24px",
                      flexShrink: 0,
                      paddingTop: "1px",
                    }}
                  >
                    {ver}
                  </code>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.5)",
                        marginBottom: "3px",
                      }}
                    >
                      {strategy}
                    </p>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        color: "var(--comment-gray)",
                        lineHeight: 1.65,
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
              UUID v4 Structure
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
              A v4 UUID looks random, but its structure encodes two fixed pieces
              of metadata that identify it as a valid UUID. These bits are set
              deterministically regardless of the random content around them,
              which means you can verify a v4 UUID just by inspecting two
              character positions in the string.
            </p>
            <div
              style={{
                border: "1px solid rgba(0,255,136,0.1)",
                borderRadius: "6px",
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: "16px 20px",
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  color: "var(--comment-gray)",
                  marginBottom: "12px",
                  opacity: 0.5,
                }}
              >
                // Example v4 UUID — annotated
              </p>
              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  lineHeight: 2,
                }}
              >
                <span style={{ color: "var(--comment-gray)", opacity: 0.6 }}>
                  550e8400-e29b-
                </span>
                <span
                  style={{ color: "var(--terminal-green)", fontWeight: 700 }}
                >
                  4
                </span>
                <span style={{ color: "var(--comment-gray)", opacity: 0.6 }}>
                  1d4-
                </span>
                <span
                  style={{ color: "var(--electric-blue)", fontWeight: 700 }}
                >
                  a
                </span>
                <span style={{ color: "var(--comment-gray)", opacity: 0.6 }}>
                  716-446655440000
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  marginTop: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--terminal-green)",
                    }}
                  >
                    4
                  </span>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: "var(--comment-gray)",
                      opacity: 0.65,
                    }}
                  >
                    Version bit — always &quot;4&quot; for UUID v4
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--electric-blue)",
                    }}
                  >
                    8, 9, a, b
                  </span>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: "var(--comment-gray)",
                      opacity: 0.65,
                    }}
                  >
                    Variant bits — first char of 4th group is always one of these
                  </span>
                </div>
              </div>
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
              Common Use Cases
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
              UUIDs are used wherever a system needs to assign a unique
              identifier without coordinating with a central authority. This
              makes them especially valuable in distributed systems, offline
              applications, and microservice architectures where sequential
              integer IDs would require a shared database sequence or a
              central ID-generation service.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "10px",
                maxWidth: "720px",
              }}
            >
              {[
                {
                  title: "Database Primary Keys",
                  desc: "Assign IDs to records without a database round-trip. Especially useful in insert-heavy or offline-first applications.",
                },
                {
                  title: "API Resources",
                  desc: "Expose resource identifiers in REST or GraphQL APIs that don't leak enumeration information the way sequential integers do.",
                },
                {
                  title: "Session & Token IDs",
                  desc: "Generate unguessable session tokens, CSRF tokens, or one-time links for password resets and email verification.",
                },
                {
                  title: "File & Asset Names",
                  desc: "Rename uploaded files to avoid collisions and prevent users from guessing other files' URLs.",
                },
                {
                  title: "Distributed Tracing",
                  desc: "Tag requests with a trace ID as they move across microservices so logs from multiple systems can be correlated.",
                },
                {
                  title: "Idempotency Keys",
                  desc: "Send a UUID with payment or mutation requests so the server can safely retry without causing duplicate operations.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
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
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: "5px",
                    }}
                  >
                    {title}
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
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="uuid-generator" />
      </div>
    </main>
  );
}
