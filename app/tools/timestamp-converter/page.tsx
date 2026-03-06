import type { Metadata } from "next";
import TimestampConverterClient from "@/components/tools/timestamp-converter/timestamp-converter-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";
import AdUnit from "@/components/ads/ad-unit";

export const metadata: Metadata = {
  title: "The Best Timestamp Converter — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Convert Unix timestamps to human-readable dates and back. Supports seconds and milliseconds, multiple timezones, ISO 8601, UTC, and relative time. Runs entirely in your browser.",
  keywords: [
    "unix timestamp converter",
    "timestamp to date",
    "date to unix timestamp",
    "epoch converter",
    "unix time",
    "epoch time",
    "timestamp decoder",
    "iso 8601 converter",
    "timezone converter",
  ],
  openGraph: {
    title: "The Best Timestamp Converter — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Convert Unix timestamps to human-readable dates and back. Supports seconds and milliseconds, multiple timezones, ISO 8601, UTC, and relative time.",
    url: "https://www.omnidevtools.com/tools/timestamp-converter",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Timestamp Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Timestamp Converter — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Convert Unix timestamps to human-readable dates and back. Supports seconds and milliseconds, multiple timezones, ISO 8601, UTC, and relative time.",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function TimestampConverterPage() {
  return (
    <main
      className="tool-page-main"
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
            name: "Timestamp Converter",
            description:
              "Convert Unix timestamps to human-readable dates and back. Supports seconds, milliseconds, multiple timezones, ISO 8601, UTC, and relative time.",
            url: "https://www.omnidevtools.com/tools/timestamp-converter",
            image: "https://www.omnidevtools.com/og-image.jpg",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div
        className="grid-lines-bg"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
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
        className="tool-page-layout"
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
                <span style={{ color: "var(--electric-blue)" }}>timestamp-converter</span>
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
                Timestamp{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>Converter</span>
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
                Convert Unix timestamps to human-readable dates{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>instantly</span>{" "}
                — and back. Supports seconds, milliseconds, multiple timezones, and ISO 8601.
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
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// Unix → Date\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Paste a Unix timestamp\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Choose seconds or milliseconds\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Select a timezone\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Copy any result format\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Use 'Now' to insert the current timestamp"}</span>
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
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// Date → Unix\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Pick a date and time\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Select the source timezone\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Get Unix seconds and ms\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Copy ISO 8601 or UTC string\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Relative time updates live"}</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Tool */}
          <TimestampConverterClient />

          <AdUnit />

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
              What is a Unix Timestamp?
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
              A Unix timestamp (also called Epoch time) is the number of seconds
              that have elapsed since{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>
                January 1, 1970, 00:00:00 UTC
              </span>
              . It is a widely used standard for representing points in time in
              computer systems, databases, APIs, and log files.
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
              Most programming languages and databases store time as Unix
              timestamps internally. JavaScript uses milliseconds
              (
              <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>
                Date.now()
              </code>
              ), while Unix systems and most backend languages use seconds.
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
              Common Use Cases
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "10px",
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              {[
                {
                  title: "Log File Debugging",
                  desc: "Convert raw timestamps in server logs to readable local time",
                },
                {
                  title: "API Response Parsing",
                  desc: "Decode created_at / updated_at fields from REST or GraphQL APIs",
                },
                {
                  title: "Database Queries",
                  desc: "Build WHERE clauses using Unix timestamps for time-range filtering",
                },
                {
                  title: "JWT Expiry (exp)",
                  desc: "Check if a JWT token has expired by converting its exp claim",
                },
                {
                  title: "Cron / Scheduler",
                  desc: "Verify that scheduled job execution times match expectations",
                },
                {
                  title: "Timezone Conversion",
                  desc: "See how the same moment appears in different timezones worldwide",
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
        <ToolNavSidebar currentTool="timestamp-converter" />
      </div>
    </main>
  );
}
