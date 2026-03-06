import type { Metadata } from "next";
import CronParserClient from "@/components/tools/cron-expression-parser/cron-parser-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";
import AdUnit from "@/components/ads/ad-unit";

export const metadata: Metadata = {
  title: "The Best Cron Expression Parser & Generator — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Parse and generate cron expressions in real time. Get human-readable descriptions, next execution times with timezone support, an interactive builder, and 20+ presets. Runs entirely in your browser.",
  keywords: [
    "cron expression parser",
    "cron expression generator",
    "cron parser online",
    "cron expression validator",
    "cron schedule generator",
    "cron next run time",
    "cron builder",
    "crontab parser",
    "cron expression tester",
    "cron job scheduler",
    "unix cron",
  ],
  openGraph: {
    title: "The Best Cron Expression Parser & Generator — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Parse and generate cron expressions instantly. Human-readable description, next execution times, interactive builder, and 20+ presets — all in your browser.",
    url: "https://www.omnidevtools.com/tools/cron-expression-parser",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Cron Expression Parser" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Cron Expression Parser & Generator — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Parse and generate cron expressions instantly. Human-readable description, next execution times, interactive builder, and 20+ presets.",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function CronParserPage() {
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
            name: "Cron Expression Parser & Generator",
            description:
              "Parse and generate cron expressions with real-time human-readable descriptions, next execution times, timezone support, and interactive builder.",
            url: "https://www.omnidevtools.com/tools/cron-expression-parser",
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
                <span style={{ color: "var(--electric-blue)" }}>cron-expression-parser</span>
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
                Cron Expression{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>Parser & Generator</span>
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
                Parse, validate, and generate cron expressions{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>instantly</span>{" "}
                — with human-readable descriptions, next run times, timezone support, and 20+ presets.
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
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Paste or type a cron expression\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Read the plain-English description\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Check next run times with timezone\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Use Builder tab to create from scratch\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Pick from 20+ presets or try the special char guide"}</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <CronParserClient />

          <AdUnit />

          {/* Description section */}
          <div style={{ marginTop: "60px" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(0,255,136,0.1)", marginBottom: "40px" }} />

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
              What is a Cron Expression? How to Parse & Generate One?
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
              A cron expression is a string that defines a schedule for recurring tasks. It originates
              from the Unix cron daemon and consists of{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>5 fields</span>{" "}
              (or 6 with seconds) representing minute, hour, day of month, month, and day of week.
              Tools like AWS EventBridge, GitHub Actions, Kubernetes CronJobs, and most CI/CD
              systems use this format.
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
                { title: "Scheduled Jobs",      desc: "Run database backups, cleanup tasks, or batch jobs on a schedule" },
                { title: "CI/CD Pipelines",     desc: "Trigger nightly builds or automated test runs with GitHub Actions" },
                { title: "AWS EventBridge",     desc: "Schedule Lambda functions or Step Functions using cron rules" },
                { title: "Kubernetes CronJobs", desc: "Define recurring pod execution schedules in k8s manifests" },
                { title: "Data Pipelines",      desc: "Orchestrate ETL workflows in tools like Airflow or dbt" },
                { title: "Monitoring",          desc: "Check system health, send reports, or rotate logs on a schedule" },
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
                  <p style={{ fontFamily: monoFont, fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: "5px" }}>{title}</p>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--comment-gray)", lineHeight: 1.6, opacity: 0.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="cron-expression-parser" />
      </div>
    </main>
  );
}
