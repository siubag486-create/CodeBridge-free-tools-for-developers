import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CodeBridge",
  description:
    "About CodeBridge — free browser-based developer tools built by PSWK DEV. No sign-up, no server, just fast tools for developers.",
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
            About CodeBridge
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

        {/* What is CodeBridge */}
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
            What is CodeBridge?
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
            CodeBridge is a collection of free, open-use developer utilities
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
            We built CodeBridge because we got tired of copy-pasting between
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
            CodeBridge is built and maintained by{" "}
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
