import type { Metadata } from "next";
import YamlToJsonClient from "@/components/tools/yaml-to-json/yaml-to-json-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best YAML to JSON Converter — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Convert YAML to JSON (or JSON to YAML) instantly in your browser. Real-time conversion, syntax highlighting, file upload, download output. 100% free, no server required.",
  keywords: [
    "yaml to json",
    "yaml to json converter",
    "json to yaml",
    "json to yaml converter",
    "yaml parser online",
    "convert yaml",
    "yaml formatter",
    "online yaml converter",
    "free yaml tool",
  ],
  openGraph: {
    title: "The Best YAML to JSON Converter — Free, Instant, Secured, No Server | OmniDev",
    description: "Convert YAML to JSON or JSON to YAML instantly in your browser. Real-time conversion, syntax highlighting, file upload & download. 100% free, no server required.",
    url: "https://www.omnidevtools.com/tools/yaml-to-json",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev YAML to JSON Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function YamlToJsonPage() {
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
            "name": "YAML to JSON Converter",
            "description": "Convert YAML to JSON or JSON to YAML instantly in your browser. Real-time conversion, syntax highlighting, file upload & download.",
            "url": "https://www.omnidevtools.com/tools/yaml-to-json",
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
                <span style={{ color: "var(--electric-blue)" }}>yaml-to-json</span>
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
                YAML to JSON{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  Converter
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
                Convert YAML to JSON or JSON to YAML{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — real-time conversion, syntax highlighting, file upload &amp; download. Runs entirely in your browser.
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
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Select mode (YAML→JSON or JSON→YAML)\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Paste input or upload a file\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Output appears instantly on the right\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Copy output or download as file\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Use Swap to reverse direction\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>* all conversion happens in browser</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <YamlToJsonClient />

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
              What is YAML?
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
              YAML (YAML Ain&apos;t Markup Language) is a human-readable data serialisation
              standard. It was designed to be easy to write and easy to read, making it
              a popular choice for configuration files, CI/CD pipelines (GitHub Actions,
              GitLab CI), Kubernetes manifests, Docker Compose files, and Ansible playbooks.
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
              Unlike JSON, YAML supports comments, multi-line strings, and multiple documents
              in a single file. It uses indentation (spaces only — never tabs) to express
              structure, which makes it more concise than JSON for deeply nested data.
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
              YAML vs JSON — Key Differences
            </h2>
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
                  feature: "Comments",
                  yaml: "Supported (# prefix)",
                  json: "Not supported",
                },
                {
                  feature: "Syntax",
                  yaml: "Indentation-based",
                  json: "Braces & brackets",
                },
                {
                  feature: "Verbosity",
                  yaml: "Concise, minimal quotes",
                  json: "Explicit, all strings quoted",
                },
                {
                  feature: "Multi-line strings",
                  yaml: "| (literal) or > (folded)",
                  json: "\\n escape only",
                },
                {
                  feature: "Data types",
                  yaml: "Richer (dates, binary, etc.)",
                  json: "String, number, bool, null",
                },
                {
                  feature: "Readability",
                  yaml: "More readable for humans",
                  json: "More predictable, strict",
                },
                {
                  feature: "Tooling",
                  yaml: "Config files, CI/CD, K8s",
                  json: "APIs, web data, databases",
                },
              ].map(({ feature, yaml, json }, i) => (
                <div
                  key={feature}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr 1fr",
                    gap: "0",
                    borderBottom:
                      i < 6 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRight: "1px solid rgba(88,166,255,0.06)",
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRight: "1px solid rgba(88,166,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        color: "var(--terminal-green)",
                        opacity: 0.8,
                      }}
                    >
                      {yaml}
                    </span>
                  </div>
                  <div style={{ padding: "10px 16px" }}>
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        color: "var(--electric-blue)",
                        opacity: 0.8,
                      }}
                    >
                      {json}
                    </span>
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
              Common Use Cases
            </h2>
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
                  title: "CI/CD Configuration",
                  desc: "GitHub Actions, GitLab CI, and Bitbucket Pipelines all use YAML for pipeline definitions. Convert to JSON for tooling that expects structured data.",
                },
                {
                  title: "Kubernetes Manifests",
                  desc: "K8s uses YAML for all resource definitions. Convert to JSON when working with the API directly or using kubectl with JSON patches.",
                },
                {
                  title: "Docker Compose",
                  desc: "Compose files are YAML. Convert to JSON for validation, documentation generation, or integration with JSON-only tools.",
                },
                {
                  title: "API Development",
                  desc: "OpenAPI/Swagger specs can be written in YAML for readability, then converted to JSON for tools that require JSON Schema format.",
                },
                {
                  title: "Config Migration",
                  desc: "Migrate application config between formats. Many tools accept either YAML or JSON — converting lets you standardise on one format.",
                },
                {
                  title: "Data Interchange",
                  desc: "Convert configuration data from human-friendly YAML into JSON for storage in databases, REST APIs, or message queues.",
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
        <ToolNavSidebar currentTool="yaml-to-json" />
      </div>
    </main>
  );
}
