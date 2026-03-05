import type { Metadata } from "next";
import JsonFormatterClient from "@/components/tools/json-formatter/json-formatter-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best JSON Formatter & Validator — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Format, validate, and minify JSON instantly in your browser. No server required. Fast, free JSON beautifier with syntax highlighting and error detection.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "format json online",
    "json minifier",
  ],
  openGraph: {
    title: "The Best JSON Formatter & Validator — Free, Instant, Secured, No Server | OmniDev",
    description: "Format, validate, and minify JSON instantly in your browser. No server required. Fast, free JSON beautifier with syntax highlighting and error detection.",
    url: "https://www.omnidevtools.com/tools/json-formatter",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev JSON Formatter" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function JsonFormatterPage() {
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
            "name": "JSON Formatter & Validator",
            "description": "Format, validate, and minify JSON instantly in your browser. No server required.",
            "url": "https://www.omnidevtools.com/tools/json-formatter",
            "image": "https://www.omnidevtools.com/og-image.jpg",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          }),
        }}
      />
      {/* Grid lines background — matches hero */}
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
              {/* Breadcrumb */}
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
                <span style={{ color: "var(--electric-blue)" }}>
                  json-formatter
                </span>
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
                JSON Formatter{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  &amp;
                </span>{" "}
                Validator
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
                Format, minify, and validate JSON{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — runs entirely in your browser. Zero server calls, zero data sent.
              </p>
            </div>

            {/* Right: How to use tips box */}
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
                {/* Basic usage */}
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
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Paste JSON into the left pane\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Validation runs automatically\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Hit Auto-fix if there are errors\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Choose Format or Minify mode\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Copy the result from right pane\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Drag & drop .json files also work"}</span>
                </pre>
                {/* Tree View */}
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
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// Tree View\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Switch to Tree in output header\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Click ▶ / ▼ to expand / collapse\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Click key name to copy its path\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Use search bar to filter nodes\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* e.g.  users[0].profile.name"}</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Tool */}
          <JsonFormatterClient />

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
              What is JSON?
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
              JSON (JavaScript Object Notation) is a lightweight, human-readable
              data interchange format derived from JavaScript object syntax. It was
              popularised by Douglas Crockford in the early 2000s and is now
              defined by{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>RFC 8259</span>{" "}
              and{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>ECMA-404</span>.
              JSON has effectively replaced XML as the dominant format for REST
              APIs, configuration files, NoSQL databases, and inter-service
              communication.
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
              JSON supports exactly{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>six data types</span>:{" "}
              <span style={{ color: "rgba(255,200,100,0.8)" }}>string</span>,{" "}
              <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>number</span>,{" "}
              <span style={{ color: "rgba(150,200,255,0.8)" }}>boolean</span>{" "}(true/false),{" "}
              <span style={{ color: "rgba(150,200,255,0.8)" }}>null</span>,{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>object</span>{" "}(key-value pairs), and{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>array</span>{" "}(ordered list). Every
              other data type must be serialized as one of these six.
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
              JSON Data Types with Examples
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
              JSON supports exactly six data types, and every value in a document must be one of them. Understanding these types is essential because strict parsers will reject anything that doesn&apos;t conform — using JavaScript&apos;s <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>undefined</code>, Python&apos;s <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>None</code>, or a raw <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>Date</code> object will all cause parse failures. Below is a complete breakdown with examples and the common gotchas for each type.
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
                { type: "string",  color: "rgba(255,200,100,0.85)",  example: '"Hello, World!"',     note: "Must use double quotes. Supports Unicode and escape sequences (\\n, \\t, \\\")." },
                { type: "number",  color: "var(--terminal-green)",   example: "42, 3.14, -7, 1e10",  note: "Integers and floats. No hex, octal, or Infinity. No leading zeros except 0.x." },
                { type: "boolean", color: "rgba(150,200,255,0.85)",  example: "true, false",         note: "Must be lowercase. Not True, False, TRUE, or FALSE." },
                { type: "null",    color: "rgba(150,200,255,0.65)",  example: "null",                note: "Represents the intentional absence of a value. Not undefined, None, or nil." },
                { type: "object",  color: "rgba(255,255,255,0.55)",  example: '{ "key": "value" }',  note: "Unordered collection of key-value pairs. Keys must be unique strings." },
                { type: "array",   color: "rgba(255,255,255,0.45)",  example: '[1, "two", true]',    note: "Ordered list of any JSON values. Elements can be mixed types." },
              ].map(({ type, color, example, note }, i) => (
                <div
                  key={type}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "10px 16px",
                    borderBottom: i < 5 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "flex-start",
                  }}
                >
                  <code
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color,
                      minWidth: "52px",
                      flexShrink: 0,
                      paddingTop: "1px",
                    }}
                  >
                    {type}
                  </code>
                  <div style={{ flex: 1 }}>
                    <code
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        color: "var(--comment-gray)",
                        display: "block",
                        marginBottom: "3px",
                      }}
                    >
                      {example}
                    </code>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.7rem",
                        color: "var(--comment-gray)",
                        opacity: 0.6,
                        lineHeight: 1.5,
                      }}
                    >
                      {note}
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
              Valid JSON Rules & Common Mistakes
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
              JSON has a deliberately minimal and strict syntax. While that makes parsers easy to implement, it also means small mistakes — a trailing comma after the last item, a single-quoted string, or an inline comment — will cause the entire document to fail validation. These are the errors that come up most often when copying JSON from browser DevTools, log files, or configuration templates.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              <div
                style={{
                  border: "1px solid rgba(255,100,100,0.2)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255,100,100,0.03)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "6px 14px",
                    borderBottom: "1px solid rgba(255,100,100,0.1)",
                    backgroundColor: "rgba(255,100,100,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.65rem",
                      color: "rgba(255,100,100,0.8)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    // Invalid JSON
                  </p>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: "12px 14px",
                    fontFamily: monoFont,
                    fontSize: "0.72rem",
                    lineHeight: "1.9",
                    color: "rgba(255,100,100,0.6)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {`{
  'key': 'value',
  "trailing": true,
  // comment here
  "num": 01,
}`}
                </pre>
              </div>
              <div
                style={{
                  border: "1px solid rgba(0,255,136,0.15)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,255,136,0.02)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "6px 14px",
                    borderBottom: "1px solid rgba(0,255,136,0.1)",
                    backgroundColor: "rgba(0,255,136,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.65rem",
                      color: "var(--terminal-green)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      opacity: 0.8,
                    }}
                  >
                    // Valid JSON
                  </p>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: "12px 14px",
                    fontFamily: monoFont,
                    fontSize: "0.72rem",
                    lineHeight: "1.9",
                    color: "var(--terminal-green)",
                    opacity: 0.75,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {`{
  "key": "value",
  "trailing": true,
  "num": 1
}`}
                </pre>
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
              JSON vs XML vs YAML
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
              JSON didn&apos;t emerge in a vacuum — it was designed as a lighter alternative to XML and has since been joined by YAML as another human-friendly format. The right choice depends on context: REST APIs favour JSON for its compact size and native browser support, CI/CD pipelines favour YAML for its readability and comment support, and enterprise integrations sometimes still require XML for its schema validation and namespace capabilities.
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
                { fmt: "JSON",  pro: "Universal support, fast parsing, compact",           con: "No comments, strict syntax, no multiline strings" },
                { fmt: "XML",   pro: "Namespaces, schemas (XSD), attributes, comments",     con: "Verbose, complex parsing, heavyweight for APIs" },
                { fmt: "YAML",  pro: "Human-readable, supports comments and multiline",     con: "Indentation-sensitive, parsing quirks, not for APIs" },
              ].map(({ fmt, pro, con }, i) => (
                <div
                  key={fmt}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 1fr",
                    gap: "12px",
                    padding: "10px 16px",
                    borderBottom: i < 2 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "flex-start",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {fmt}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: "var(--terminal-green)",
                      opacity: 0.7,
                      lineHeight: 1.6,
                    }}
                  >
                    + {pro}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: "rgba(255,100,100,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    - {con}
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
              Key Features of This Tool
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
              This formatter was built to handle the real-world messiness of JSON — not just well-formed inputs. Whether you&apos;re debugging a malformed API response, exploring a deeply nested structure, or comparing two versions of a config file, every feature here is designed to reduce the time between &quot;something is wrong&quot; and &quot;now I understand it.&quot;
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "12px",
                maxWidth: "720px",
              }}
            >
              {[
                { label: "Format", desc: "Beautify JSON with 2-space indentation and syntax highlighting" },
                { label: "Minify", desc: "Strip all whitespace for the smallest possible payload size" },
                { label: "Validate", desc: "Detect and report exact syntax errors with line/column numbers" },
                { label: "Auto-fix", desc: "Repair trailing commas, single quotes, and other common mistakes" },
                { label: "Tree View", desc: "Explore deeply nested structures with expand/collapse and path copy" },
                { label: "Diff View", desc: "Compare two JSON documents side-by-side with highlighted changes" },
              ].map(({ label, desc }) => (
                <div
                  key={label}
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
                      marginBottom: "4px",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.72rem",
                      color: "var(--comment-gray)",
                      opacity: 0.7,
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
        <ToolNavSidebar currentTool="json-formatter" />
      </div>
    </main>
  );
}
