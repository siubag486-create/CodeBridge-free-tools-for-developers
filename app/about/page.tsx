import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — OmniDev",
  description:
    "About OmniDev — free browser-based developer tools built by PSWK DEV. No sign-up, no server, just fast tools for developers.",
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function AboutPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--terminal-bg)",
        minHeight: "100vh",
        paddingTop: "56px",
        position: "relative",
      }}
    >
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
          maxWidth: "760px",
          margin: "0 auto",
          padding: "60px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "var(--comment-gray)",
              marginBottom: "10px",
              opacity: 0.6,
            }}
          >
            <span style={{ color: "var(--terminal-green)" }}>~</span>
            /about
          </p>
          <h1
            style={{
              fontFamily: monoFont,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--terminal-green)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            About OmniDev
          </h1>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.85rem",
              color: "var(--comment-gray)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Free, fast developer tools that run entirely in your browser.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(0,255,136,0.12)",
            marginBottom: "40px",
          }}
        />

        {/* What is OmniDev */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: monoFont,
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--terminal-green)",
              marginBottom: "14px",
            }}
          >
            What is OmniDev?
          </h2>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.82rem",
              color: "var(--comment-gray)",
              lineHeight: 1.8,
              marginBottom: "12px",
            }}
          >
            OmniDev is a collection of free, open-use developer utilities
            designed to help engineers, designers, and curious people work
            faster. Every tool runs{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>
              entirely in your browser
            </span>{" "}
            — no account, no sign-up, no data sent to a server.
          </p>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.82rem",
              color: "var(--comment-gray)",
              lineHeight: 1.8,
            }}
          >
            We built OmniDev because we got tired of copy-pasting between
            fragmented tools. One place, zero friction, instant results.
          </p>
        </section>

        {/* Tools */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: monoFont,
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--terminal-green)",
              marginBottom: "14px",
            }}
          >
            Current Tools
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              {
                name: "JSON Formatter & Validator",
                desc: "Format, validate, auto-fix, and minify JSON with tree view",
              },
              {
                name: "Regex Tester",
                desc: "Real-time regex matching with capture group display",
              },
              {
                name: "Text Diff",
                desc: "Line-by-line text comparison in split and unified views",
              },
              {
                name: "Base64 Encoder/Decoder",
                desc: "Text, URL-safe, and image Base64 encoding/decoding",
              },
              {
                name: "JWT Decoder",
                desc: "Decode JWTs, verify signatures, and monitor expiry live",
              },
              {
                name: "UUID Generator",
                desc: "Generate UUID v4 and v1 identifiers in bulk with format options",
              },
              {
                name: "Hash Generator",
                desc: "MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashing with HMAC and file support",
              },
              {
                name: "YAML to JSON Converter",
                desc: "Convert YAML ↔ JSON instantly with syntax highlighting, file upload, and download",
              },
              {
                name: "URL Encoder / Decoder",
                desc: "Encode and decode URLs with percent-encoding and query string parsing",
              },
              {
                name: "Timestamp Converter",
                desc: "Convert Unix timestamps to human-readable dates with timezone support and ISO 8601",
              },
              {
                name: "SQL Formatter",
                desc: "Format, beautify, and minify SQL queries with dialect support for MySQL, PostgreSQL, T-SQL, SQLite, BigQuery, and more",
              },
              {
                name: "Color Converter",
                desc: "Convert between HEX, RGB, HSL, and OKLCH with WCAG contrast ratios, CSS variable output, and color palette generation",
              },
              {
                name: "Markdown Editor & Preview",
                desc: "Write GitHub Flavored Markdown with real-time preview, syntax-highlighted code blocks, table of contents generation, README templates, and HTML export",
              },
              {
                name: "JSON ↔ CSV Converter",
                desc: "Convert JSON arrays to CSV and CSV back to JSON with nested object flattening, custom delimiters, type inference, and one-click file download",
              },
            ].map(({ name, desc }) => (
              <div
                key={name}
                style={{
                  padding: "12px 16px",
                  border: "1px solid rgba(0,255,136,0.1)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,255,136,0.02)",
                }}
              >
                <p
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.75)",
                    marginBottom: "3px",
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.75rem",
                    color: "var(--comment-gray)",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: monoFont,
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--terminal-green)",
              marginBottom: "14px",
            }}
          >
            Coming Soon
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              {
                name: "Markdown Preview",
                desc: "Live Markdown rendering with GitHub-flavored syntax support",
              },
              {
                name: "Cron Expression Parser",
                desc: "Parse cron expressions and preview upcoming execution times",
              },
              {
                name: "String Case Converter",
                desc: "Convert between camelCase, snake_case, kebab-case, and PascalCase",
              },
            ].map(({ name, desc }) => (
              <div
                key={name}
                style={{
                  padding: "12px 16px",
                  border: "1px solid rgba(88,166,255,0.1)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(88,166,255,0.02)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.68rem",
                    color: "var(--electric-blue)",
                    opacity: 0.6,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    paddingTop: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  soon
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "3px",
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--comment-gray)",
                      opacity: 0.7,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: monoFont,
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--terminal-green)",
              marginBottom: "14px",
            }}
          >
            Who We Are
          </h2>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.82rem",
              color: "var(--comment-gray)",
              lineHeight: 1.8,
            }}
          >
            OmniDev is built and maintained by{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>PSWK DEV</span>,
            a small team of software developers who enjoy building tools that
            make everyday development tasks easier. We believe great tooling
            should be accessible to everyone — free of charge and free of
            sign-up walls.
          </p>
        </section>

        {/* Mission */}
        <section
          style={{
            padding: "20px 24px",
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "8px",
            backgroundColor: "rgba(0,255,136,0.03)",
          }}
        >
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "var(--terminal-green)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
              opacity: 0.7,
            }}
          >
            // Mission
          </p>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
            }}
          >
            To provide fast, reliable, privacy-respecting developer utilities
            that run entirely in the browser — with no tracking of your work,
            no vendor lock-in, and no paywalls.
          </p>
        </section>
      </div>
    </main>
  );
}
