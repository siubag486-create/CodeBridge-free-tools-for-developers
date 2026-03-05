import type { Metadata } from "next";
import UrlEncoderClient from "@/components/tools/url-encoder/url-encoder-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best URL Encoder/Decoder — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Encode and decode URLs using percent-encoding instantly in your browser. Parse query string parameters into a readable table. No server required.",
  keywords: [
    "url encoder",
    "url decoder",
    "percent encoding",
    "url encode online",
    "query string parser",
    "urlencode",
    "encodeURIComponent",
  ],
  openGraph: {
    title: "The Best URL Encoder/Decoder — Free, Instant, Secured, No Server | OmniDev",
    description: "Encode and decode URLs using percent-encoding instantly in your browser. Parse query string parameters into a readable table. No server required.",
    url: "https://www.omnidevtools.com/tools/url-encoder",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev URL Encoder/Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function UrlEncoderPage() {
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
            "name": "URL Encoder/Decoder",
            "description": "Encode and decode URLs using percent-encoding instantly in your browser. Parse query string parameters into a readable table.",
            "url": "https://www.omnidevtools.com/tools/url-encoder",
            "image": "https://www.omnidevtools.com/og-image.jpg",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          }),
        }}
      />
      {/* Grid lines background */}
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
                  url-encoder
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
                URL{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  Encoder
                </span>{" "}
                /{" "}
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
                Encode and decode URLs using percent-encoding{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — and parse query strings into a readable table. Runs entirely
                in your browser.
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
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// URL Encode / Decode\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Select Encode or Decode mode\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Type or paste your input\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Result appears instantly\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Use Swap to flip input/output\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Uses encodeURIComponent / decodeURIComponent"}</span>
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
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// Query String Parser\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Paste a full URL or query string\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Parameters are decoded and listed\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Copy individual values instantly\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Handles + and %20 as spaces\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Works with API URLs, OAuth redirects, etc."}</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Tool */}
          <UrlEncoderClient />

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
              What is URL Encoding?
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
              URL encoding (also called percent-encoding) is a mechanism for
              encoding special characters in a URL so they can be safely
              transmitted over the internet. URLs can only contain a limited set
              of characters — letters, digits, and a few symbols like{" "}
              <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>
                - _ . ~
              </code>
              . Any other character must be represented using a percent sign
              followed by two hexadecimal digits representing the character's
              ASCII code.
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
              For example, a space becomes{" "}
              <code
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}
              >
                %20
              </code>
              , a{" "}
              <code
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}
              >
                &
              </code>{" "}
              becomes{" "}
              <code
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}
              >
                %26
              </code>
              , and{" "}
              <code
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}
              >
                =
              </code>{" "}
              becomes{" "}
              <code
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}
              >
                %3D
              </code>
              . This encoding is defined in{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>RFC 3986</span>.
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
              encodeURI vs encodeURIComponent
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
              JavaScript provides two encoding functions with different scopes.
              This tool uses{" "}
              <code
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}
              >
                encodeURIComponent
              </code>
              , which is the safer choice for encoding individual values within
              a URL.
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
                  fn: "encodeURI()",
                  desc: "Encodes a full URL. Preserves reserved URL characters like /, ?, &, =, #, and :. Use when encoding a complete URL where you want its structure intact.",
                  safe: "Keeps: / ? & = # : @ ! $ ' ( ) * + , ;",
                },
                {
                  fn: "encodeURIComponent()",
                  desc: "Encodes a URL component (a single value). Encodes all special characters including /, ?, &, =, and #. Use when encoding parameter values or path segments.",
                  safe: "Keeps: - _ . ! ~ * ' ( )",
                },
              ].map(({ fn, desc, safe }, i) => (
                <div
                  key={fn}
                  style={{
                    padding: "14px 18px",
                    borderBottom:
                      i === 0 ? "1px solid rgba(88,166,255,0.08)" : undefined,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    <code
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--terminal-green)",
                        opacity: 0.85,
                      }}
                    >
                      {fn}
                    </code>
                  </div>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--comment-gray)",
                      lineHeight: 1.7,
                      opacity: 0.8,
                      marginBottom: "4px",
                    }}
                  >
                    {desc}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.68rem",
                      color: "rgba(88,166,255,0.5)",
                      lineHeight: 1.5,
                    }}
                  >
                    {safe}
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
                  title: "API Query Parameters",
                  desc: "Safely encode user search inputs before appending to API request URLs",
                },
                {
                  title: "OAuth Redirect URIs",
                  desc: "Encode redirect_uri values in OAuth 2.0 authorization requests",
                },
                {
                  title: "Form Submission",
                  desc: "HTML forms use percent-encoding to transmit field values in GET requests",
                },
                {
                  title: "Deep Links",
                  desc: "Encode full URLs embedded inside other URLs (e.g., return_to parameters)",
                },
                {
                  title: "Debugging API Calls",
                  desc: "Decode encoded URLs from server logs or network inspector to inspect values",
                },
                {
                  title: "Korean / CJK Text in URLs",
                  desc: "Non-ASCII characters like Korean, Chinese, or Arabic are always percent-encoded",
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
        <ToolNavSidebar currentTool="url-encoder" />
      </div>
    </main>
  );
}
