import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — CodeBridge",
  description:
    "Contact the CodeBridge team. Reach out for bug reports, feature requests, or general inquiries.",
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function ContactPage() {
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
              letterSpacing: "0.04em",
              opacity: 0.6,
            }}
          >
            <span style={{ color: "var(--terminal-green)" }}>~</span>
            /contact
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
            Contact
          </h1>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.82rem",
              color: "var(--comment-gray)",
              lineHeight: 1.7,
            }}
          >
            Have a question, bug report, or feature request? We&apos;d love to
            hear from you.
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

        {/* Email card */}
        <div
          style={{
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "8px",
            backgroundColor: "rgba(0,255,136,0.025)",
            padding: "28px 28px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.65rem",
              color: "var(--terminal-green)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px",
              opacity: 0.7,
            }}
          >
            // Email
          </p>
          <a
            href="mailto:siubag486@gmail.com"
            style={{
              fontFamily: monoFont,
              fontSize: "1rem",
              color: "var(--electric-blue)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            siubag486@gmail.com
          </a>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.75rem",
              color: "var(--comment-gray)",
              marginTop: "10px",
              lineHeight: 1.6,
              opacity: 0.7,
            }}
          >
            We aim to respond within 2–3 business days.
          </p>
        </div>

        {/* What to include */}
        <section>
          <h2
            style={{
              fontFamily: monoFont,
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "14px",
              letterSpacing: "-0.01em",
            }}
          >
            When reporting a bug, include:
          </h2>
          <div
            style={{
              border: "1px solid rgba(88,166,255,0.12)",
              borderRadius: "6px",
              backgroundColor: "rgba(88,166,255,0.025)",
              overflow: "hidden",
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "16px 18px",
                fontFamily: monoFont,
                fontSize: "0.75rem",
                lineHeight: "2",
                color: "var(--comment-gray)",
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>
                -
              </span>
              {" Which tool you were using\n"}
              <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>
                -
              </span>
              {" Steps to reproduce the issue\n"}
              <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>
                -
              </span>
              {" Browser name and version\n"}
              <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>
                -
              </span>
              {" Expected vs actual behavior\n"}
              <span
                style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.68rem" }}
              >
                {"* Screenshots or sample data are always helpful"}
              </span>
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}
