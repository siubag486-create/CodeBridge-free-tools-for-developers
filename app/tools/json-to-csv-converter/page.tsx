import type { Metadata } from "next";
import JsonCsvClient from "@/components/tools/json-to-csv-converter/json-to-csv-converter-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";
import AdUnit from "@/components/ads/ad-unit";

export const metadata: Metadata = {
  title: "The Best JSON to CSV Converter — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Convert JSON to CSV and CSV to JSON instantly in your browser. Supports nested JSON flattening with dot notation, custom delimiters, file upload, and download. No server, no data sent.",
  keywords: [
    "json to csv",
    "csv to json",
    "json to csv converter",
    "convert json to csv online",
    "json csv converter free",
    "flatten nested json",
    "json to csv online",
    "csv to json online",
    "json converter",
    "csv converter",
    "json to spreadsheet",
    "parse csv to json",
  ],
  openGraph: {
    title: "The Best JSON to CSV Converter — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Convert JSON to CSV and CSV to JSON instantly in your browser. Supports nested JSON flattening, custom delimiters, file upload, and download.",
    url: "https://www.omnidevtools.com/tools/json-to-csv-converter",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev JSON to CSV Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best JSON to CSV Converter — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Convert JSON to CSV and CSV to JSON instantly in your browser. Supports nested JSON flattening, custom delimiters, file upload, and download.",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function JsonCsvPage() {
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
            name: "JSON to CSV Converter",
            description:
              "Convert JSON to CSV and CSV to JSON instantly in your browser. Supports nested JSON flattening with dot notation, custom delimiters (comma, semicolon, tab, pipe), file upload, and one-click download. No server required.",
            url: "https://www.omnidevtools.com/tools/json-to-csv-converter",
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
            {/* Left: title */}
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
                <span style={{ color: "var(--electric-blue)" }}>json-to-csv-converter</span>
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
                JSON ↔ CSV{" "}
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
                  maxWidth: "560px",
                }}
              >
                Convert{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.85 }}>
                  JSON → CSV
                </span>{" "}
                and{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.85 }}>
                  CSV → JSON
                </span>{" "}
                instantly. Flattens nested objects, supports custom delimiters, and exports
                with one click. Runs entirely in your browser — nothing is sent to a server.
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
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Pick direction: JSON→CSV or CSV→JSON\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Paste data or upload a file\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Choose delimiter & flatten options\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Output updates in real time\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Copy or Download the result\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>* all processing happens in browser</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <JsonCsvClient />

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
              }}
            >
              JSON to CSV Converter — What It Does
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--code-comment)",
                lineHeight: 1.85,
                marginBottom: "14px",
                maxWidth: "720px",
              }}
            >
              This tool converts between JSON (JavaScript Object Notation) and CSV (Comma-Separated Values) formats directly in your browser. Both directions are supported: paste a JSON array to get a CSV spreadsheet, or paste CSV rows to get a structured JSON array.
            </p>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--code-comment)",
                lineHeight: 1.85,
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              Unlike most online converters, this tool handles{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>nested JSON objects</span> by
              flattening them using dot notation (e.g., <code style={{ color: "var(--terminal-green)", fontSize: "0.78rem" }}>address.city</code>). It also supports custom delimiters, proper CSV quoting per RFC 4180, and automatic type inference when converting CSV to JSON.
            </p>

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
              }}
            >
              Features
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "10px",
                maxWidth: "720px",
                marginBottom: "32px",
              }}
            >
              {[
                { title: "Bidirectional", desc: "Convert JSON → CSV or CSV → JSON with a single click toggle." },
                { title: "Nested JSON Flatten", desc: "Deep objects are flattened to dot-notation headers like address.city, user.role.name." },
                { title: "Custom Delimiters", desc: "Choose between comma, semicolon, tab, or pipe as the field separator." },
                { title: "File Upload", desc: "Drag & drop or click to upload .json or .csv files of any size." },
                { title: "One-click Download", desc: "Download the converted result as a .csv or .json file instantly." },
                { title: "Type Inference", desc: "CSV → JSON automatically converts numbers, booleans, and nulls to proper types." },
                { title: "RFC 4180 Quoting", desc: "Fields containing delimiters, quotes, or newlines are correctly quoted and escaped." },
                { title: "No Server", desc: "All conversion happens in your browser. Your data never leaves your machine." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "13px 15px",
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
                      color: "var(--code-comment)",
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
              }}
            >
              Common Use Cases
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "10px",
                maxWidth: "720px",
              }}
            >
              {[
                { title: "API → Spreadsheet", desc: "Export REST API responses directly to CSV for analysis in Excel or Google Sheets." },
                { title: "Database Export", desc: "Convert JSON-formatted database exports (MongoDB, DynamoDB) to CSV for BI tools." },
                { title: "Data Migration", desc: "Transform CSV imports from legacy systems into JSON for modern APIs and NoSQL databases." },
                { title: "Log Analysis", desc: "Convert JSON log arrays to CSV for filtering and aggregation in spreadsheet tools." },
                { title: "Config Export", desc: "Export JSON configuration objects to CSV for bulk editing and re-import." },
                { title: "Data Science Prep", desc: "Prepare JSON datasets into tabular CSV format for pandas, R, or other analysis tools." },
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
                      color: "var(--code-comment)",
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
        <ToolNavSidebar currentTool="json-to-csv-converter" />
      </div>
    </main>
  );
}
