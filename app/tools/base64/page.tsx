import type { Metadata } from "next";
import Base64Client from "@/components/tools/base64/base64-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best Base64 Encoder/Decoder — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Encode and decode Base64 strings, URL-safe Base64, and images instantly in your browser. No server required. Supports UTF-8 text, drag & drop image upload, and data URL output.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 online",
    "url safe base64",
    "image to base64",
    "data url generator",
  ],
  openGraph: {
    title: "The Best Base64 Encoder/Decoder — Free, Instant, Secured, No Server | OmniDev",
    description: "Encode and decode Base64 strings, URL-safe Base64, and images instantly in your browser. No server required.",
    url: "https://www.omnidevtools.com/tools/base64",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Base64 Encoder/Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function Base64Page() {
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
            "name": "Base64 Encoder/Decoder",
            "description": "Encode and decode Base64 strings, URL-safe Base64, and images instantly in your browser. No server required.",
            "url": "https://www.omnidevtools.com/tools/base64",
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
                <span style={{ color: "var(--electric-blue)" }}>base64</span>
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
                Base64{" "}
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
                Encode and decode Base64{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — text, URL-safe, and images. Runs entirely in your browser.
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
                {/* Text / URL Safe */}
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
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Text / URL Safe tabs\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Type or paste text to encode\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Switch Encode / Decode mode\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Use Swap to flip input/output\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* URL Safe replaces +/= with -_"}</span>
                </pre>
                {/* Image */}
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
                  <span style={{ color: "rgba(88,166,255,0.7)", fontWeight: 700 }}>{"// Image Tab\n"}</span>
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Drag & drop or click to upload\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Copy as data URL, img tag, CSS\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" PNG, JPG, GIF, SVG, WebP supported\n"}
                  <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Preview shown alongside Base64\n"}
                  <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>{"* Not encryption — anyone can decode"}</span>
                </pre>
              </div>
            </div>
          </div>

          {/* Tool */}
          <Base64Client />

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
              What is Base64?
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
              Base64 is a binary-to-text encoding scheme that represents binary
              data using a set of 64 printable ASCII characters: A–Z, a–z, 0–9,
              +, and /. The name "Base64" refers to this 64-character alphabet.
              It was originally designed to allow binary data (such as images,
              audio, or executable files) to be safely transmitted over
              text-only channels such as email (SMTP) or embedded in XML and
              JSON payloads.
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
              Base64 is defined in{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>RFC 4648</span>.
              It is not encryption — it is a reversible encoding. Anyone with
              the encoded string can trivially decode it. Never use Base64 as a
              security measure.
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
              How Base64 Encoding Works
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
              Base64 works by taking 3 bytes (24 bits) of input at a time and
              splitting them into 4 groups of 6 bits each. Each 6-bit group is
              then mapped to one of the 64 printable characters. Because
              3 bytes become 4 characters, Base64-encoded data is approximately
              33% larger than the original binary data.
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
              <pre
                style={{
                  margin: 0,
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  lineHeight: "1.8",
                  color: "var(--comment-gray)",
                  whiteSpace: "pre-wrap",
                }}
              >
                <span style={{ color: "rgba(88,166,255,0.6)" }}>{`// Encoding "Man" → "TWFu"\n`}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Input:  </span><span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>{"M        a        n\n"}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>ASCII:  </span>{"77       97       110\n"}
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Binary: </span>{"01001101 01100001 01101110\n"}
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Groups: </span><span style={{ color: "var(--electric-blue)", opacity: 0.8 }}>{"010011  010110  000101  101110\n"}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Index:  </span>{"19      22      5       46\n"}
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Output: </span><span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>{"T       W       F       u"}</span>
              </pre>
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
              Standard vs URL-Safe Base64
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
              Not all Base64 is the same. Standard Base64 uses two characters — <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>+</code> and <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>/</code> — that have reserved meanings in URLs. If you place a standard Base64 string directly into a URL query parameter, those characters will be misinterpreted by browsers and servers. URL-Safe Base64 solves this by replacing them with <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>-</code> and <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>_</code>, making the encoded string safe to use anywhere a URL can appear — including JWT tokens, OAuth state parameters, and filename-safe identifiers.
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
                  label: "Standard Base64",
                  chars: "+ / =",
                  note: "Uses + and / as special characters. The = sign pads output to a multiple of 4 characters. Safe for most text transmission but NOT safe in URLs.",
                },
                {
                  label: "URL-Safe Base64",
                  chars: "- _ (no padding)",
                  note: "Replaces + with -, / with _, and omits = padding. Safe to include directly in URLs and filenames without percent-encoding. Used in JWTs, OAuth tokens, and web APIs.",
                },
              ].map(({ label, chars, note }, i) => (
                <div
                  key={label}
                  style={{
                    padding: "14px 18px",
                    borderBottom: i === 0 ? "1px solid rgba(88,166,255,0.08)" : undefined,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                    <p
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {label}
                    </p>
                    <code
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.72rem",
                        color: "var(--terminal-green)",
                        opacity: 0.7,
                      }}
                    >
                      {chars}
                    </code>
                  </div>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--comment-gray)",
                      lineHeight: 1.7,
                      opacity: 0.8,
                    }}
                  >
                    {note}
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
              Base64 encoding appears in more places in web development than most developers realize. Because it converts any binary data into a sequence of printable ASCII characters, it acts as a universal adapter — letting images, files, and credentials travel through systems that were originally designed only for text. You&apos;ll encounter it in HTTP headers, JSON payloads, CSS stylesheets, and authentication protocols.
            </p>
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
                  title: "Embedding Images",
                  desc: "Inline images in HTML/CSS as data: URLs — no extra HTTP request needed",
                },
                {
                  title: "JWT Tokens",
                  desc: "JSON Web Tokens use URL-safe Base64 to encode header and payload segments",
                },
                {
                  title: "Basic Auth",
                  desc: 'HTTP Basic Authentication encodes "username:password" in Base64 in headers',
                },
                {
                  title: "Email Attachments",
                  desc: "MIME encoding uses Base64 to embed binary files in plain-text email messages",
                },
                {
                  title: "API Payloads",
                  desc: "Sending binary data (PDFs, images) in JSON or XML API request bodies",
                },
                {
                  title: "CSS Backgrounds",
                  desc: "Embedding small icons and SVGs as base64 data URIs in CSS background-image",
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
              Data URL Format
            </h2>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--comment-gray)",
                lineHeight: 1.85,
                marginBottom: "12px",
                maxWidth: "720px",
              }}
            >
              A Data URL (or data URI) embeds file content directly in a URL
              string. It follows the format:
            </p>
            <div
              style={{
                border: "1px solid rgba(0,255,136,0.1)",
                borderRadius: "6px",
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: "14px 18px",
                marginBottom: "14px",
                maxWidth: "720px",
              }}
            >
              <code
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  color: "var(--terminal-green)",
                  opacity: 0.85,
                }}
              >
                data:[mediatype][;base64],[data]
              </code>
            </div>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.78rem",
                color: "var(--comment-gray)",
                lineHeight: 1.7,
                maxWidth: "720px",
                opacity: 0.75,
              }}
            >
              Example:{" "}
              <code
                style={{
                  color: "rgba(88,166,255,0.7)",
                  fontSize: "0.72rem",
                }}
              >
                data:image/png;base64,iVBORw0KGgo...
              </code>{" "}
              — can be used directly as an img src, CSS background-image, or
              href attribute. The Image tab in this tool generates all three
              formats automatically.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="base64" />
      </div>
    </main>
  );
}
