import type { Metadata } from "next";
import RegexTesterClient from "@/components/tools/regex-tester/regex-tester-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best Regex Tester — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Test regular expressions in real-time. See matches highlighted instantly, explore capture groups, and toggle flags. No server required.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex debugger",
    "online regex",
    "javascript regex",
  ],
  openGraph: {
    title: "The Best Regex Tester — Free, Instant, Secured, No Server | OmniDev",
    description: "Test regular expressions in real-time. See matches highlighted instantly, explore capture groups, and toggle flags. No server required.",
    url: "https://www.omnidevtools.com/tools/regex-tester",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Regex Tester" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function RegexTesterPage() {
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
            "name": "Regex Tester",
            "description": "Test regular expressions in real-time. See matches highlighted instantly, explore capture groups, and toggle flags.",
            "url": "https://www.omnidevtools.com/tools/regex-tester",
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
                <span style={{ color: "var(--electric-blue)" }}>regex-tester</span>
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
                Regex Tester
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
                Write and test regular expressions{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — matches highlighted in real-time. Zero server calls, zero data sent.
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
                minWidth: "300px",
                maxWidth: "400px",
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
                  padding: "12px 20px",
                  fontFamily: monoFont,
                  fontSize: "0.7rem",
                  lineHeight: "1.85",
                  color: "var(--code-comment)",
                  whiteSpace: "pre",
                }}
              >
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Type your pattern in the regex field\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Enter test text in the area below\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Matches highlight in real-time\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Toggle flags (g, i, m) as needed\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Capture groups appear in the panel\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>
                  {"* \\ auto-converts from Korean \\ key"}
                </span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <RegexTesterClient />

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
              What is a Regular Expression?
            </h2>
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
              A regular expression (regex) is a sequence of characters that
              defines a search pattern. They are used to match, search, replace,
              and validate strings in text. Regex is supported natively in
              JavaScript, Python, Java, Go, and virtually every programming
              language. Mastering regex dramatically speeds up string processing
              tasks.
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
              Common Patterns
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
              Rather than memorizing the full regex syntax upfront, most real-world tasks can be solved by combining a small set of recurring building blocks. The patterns below cover the vast majority of day-to-day use cases — from extracting numbers and words to matching boundaries and whitespace. Once these become second nature, you can compose them to handle increasingly complex patterns.
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
                { pattern: "\\d+", desc: "One or more digits (0–9)" },
                { pattern: "\\w+", desc: "One or more word characters (a-z, A-Z, 0-9, _)" },
                { pattern: "\\s+", desc: "One or more whitespace characters" },
                { pattern: "^Hello", desc: "String that starts with 'Hello'" },
                { pattern: "world$", desc: "String that ends with 'world'" },
                { pattern: "[a-zA-Z]+", desc: "One or more letters" },
                { pattern: "(\\d{3})-\\d{4}", desc: "Phone pattern with capture group" },
                { pattern: "\\b\\w+@\\w+\\.\\w+\\b", desc: "Simple email-like pattern" },
              ].map(({ pattern, desc }, i) => (
                <div
                  key={pattern}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "9px 16px",
                    borderBottom: i < 7 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                  }}
                >
                  <code
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--terminal-green)",
                      opacity: 0.85,
                      minWidth: "180px",
                      flexShrink: 0,
                    }}
                  >
                    {pattern}
                  </code>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--comment-gray)",
                    }}
                  >
                    {desc}
                  </span>
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
              Flags
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
              A regex pattern on its own only matches exactly what it describes. Flags change how the entire expression behaves — whether matching is case-sensitive, whether it finds all occurrences or just the first, and how line boundaries are interpreted. Using the wrong flag (or forgetting the <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>g</code> flag when you expect multiple results) is one of the most common sources of subtle regex bugs.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "10px",
                maxWidth: "720px",
              }}
            >
              {[
                { flag: "g", name: "global", desc: "Find all matches, not just the first" },
                { flag: "i", name: "insensitive", desc: "Case-insensitive matching" },
                { flag: "m", name: "multiline", desc: "^ and $ match line boundaries" },
                { flag: "s", name: "dotAll", desc: ". matches newline characters too" },
              ].map(({ flag, name, desc }) => (
                <div
                  key={flag}
                  style={{
                    padding: "12px 14px",
                    border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0,255,136,0.02)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                    <code
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--terminal-green)",
                      }}
                    >
                      /{flag}
                    </code>
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: "0.68rem",
                        color: "var(--comment-gray)",
                        opacity: 0.6,
                      }}
                    >
                      {name}
                    </span>
                  </div>
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

            <h2
              style={{
                fontFamily: monoFont,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--terminal-green)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
                marginTop: "28px",
              }}
            >
              Quantifiers
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
              Quantifiers control how many times the preceding token must appear for a match to succeed. The distinction between greedy and lazy matching is especially important: greedy quantifiers consume as much input as possible, which can cause a pattern to match far more than you intend — a classic pitfall when parsing HTML or extracting content between delimiters. Adding <code style={{ color: "rgba(255,255,255,0.5)", fontFamily: monoFont }}>?</code> after any quantifier switches it to lazy mode, matching as little as possible instead.
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
                { q: "*",     desc: "0 or more of the preceding token (greedy)" },
                { q: "+",     desc: "1 or more of the preceding token (greedy)" },
                { q: "?",     desc: "0 or 1 — makes preceding token optional" },
                { q: "{n}",   desc: "Exactly n repetitions" },
                { q: "{n,}",  desc: "n or more repetitions" },
                { q: "{n,m}", desc: "Between n and m repetitions" },
                { q: "*?",    desc: "0 or more, lazy (match as few as possible)" },
                { q: "+?",    desc: "1 or more, lazy (match as few as possible)" },
              ].map(({ q, desc }, i) => (
                <div
                  key={q}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "9px 16px",
                    borderBottom: i < 7 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "center",
                  }}
                >
                  <code
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.82rem",
                      color: "var(--terminal-green)",
                      opacity: 0.85,
                      minWidth: "60px",
                      flexShrink: 0,
                    }}
                  >
                    {q}
                  </code>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--comment-gray)",
                    }}
                  >
                    {desc}
                  </span>
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
              Groups & Anchors
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
              Groups and anchors are what elevate regex from simple pattern matching to a structured data extraction tool. Capturing groups let you isolate specific parts of a match — pulling just the domain from an email address, or the version number from a release string — while anchors constrain where in the input a match is allowed to occur. Lookaheads and lookbehinds take this further, letting you write conditions like &quot;followed by&quot; or &quot;preceded by&quot; without those surrounding characters becoming part of the match result.
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
                  border: "1px solid rgba(0,255,136,0.08)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,255,136,0.02)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "6px 14px",
                    borderBottom: "1px solid rgba(0,255,136,0.06)",
                    backgroundColor: "rgba(0,255,136,0.04)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.65rem",
                      color: "var(--terminal-green)",
                      opacity: 0.7,
                      fontWeight: 700,
                    }}
                  >
                    // Groups
                  </p>
                </div>
                {[
                  { syn: "(abc)",   d: "Capturing group — stores the match" },
                  { syn: "(?:abc)", d: "Non-capturing group — groups without storing" },
                  { syn: "(?=abc)", d: "Positive lookahead — followed by" },
                  { syn: "(?!abc)", d: "Negative lookahead — not followed by" },
                  { syn: "(?<=abc)",d: "Positive lookbehind — preceded by" },
                  { syn: "(?<!abc)",d: "Negative lookbehind — not preceded by" },
                ].map(({ syn, d }) => (
                  <div key={syn} style={{ padding: "8px 14px", borderBottom: "1px solid rgba(0,255,136,0.04)" }}>
                    <code style={{ fontFamily: monoFont, fontSize: "0.7rem", color: "var(--terminal-green)", opacity: 0.8, display: "block", marginBottom: "2px" }}>{syn}</code>
                    <p style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--comment-gray)", opacity: 0.65 }}>{d}</p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  border: "1px solid rgba(88,166,255,0.12)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(88,166,255,0.02)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "6px 14px",
                    borderBottom: "1px solid rgba(88,166,255,0.08)",
                    backgroundColor: "rgba(88,166,255,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.65rem",
                      color: "var(--electric-blue)",
                      opacity: 0.8,
                      fontWeight: 700,
                    }}
                  >
                    // Anchors & Special
                  </p>
                </div>
                {[
                  { syn: "^",   d: "Start of string (or line with /m)" },
                  { syn: "$",   d: "End of string (or line with /m)" },
                  { syn: "\\b", d: "Word boundary" },
                  { syn: "\\B", d: "Non-word boundary" },
                  { syn: ".",   d: "Any character except newline" },
                  { syn: "[^abc]", d: "Any character NOT in the set" },
                  { syn: "a|b", d: "Alternation — match a OR b" },
                ].map(({ syn, d }) => (
                  <div key={syn} style={{ padding: "8px 14px", borderBottom: "1px solid rgba(88,166,255,0.04)" }}>
                    <code style={{ fontFamily: monoFont, fontSize: "0.7rem", color: "var(--electric-blue)", opacity: 0.8, display: "block", marginBottom: "2px" }}>{syn}</code>
                    <p style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--comment-gray)", opacity: 0.65 }}>{d}</p>
                  </div>
                ))}
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
              Real-World Regex Examples
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
              The fastest way to internalize regex is through practical examples that map to problems you&apos;ve already encountered. The patterns below cover recurring validation and extraction tasks in web development, scripting, and data processing — email validation, IP addresses, URL parsing, date formats, and more. Each one can be copied directly into the tester above and modified to fit your specific requirements.
            </p>
            <div
              style={{
                border: "1px solid rgba(88,166,255,0.12)",
                borderRadius: "6px",
                backgroundColor: "rgba(88,166,255,0.02)",
                overflow: "hidden",
                maxWidth: "720px",
              }}
            >
              {[
                { label: "Email (basic)",    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
                { label: "IPv4 address",     pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
                { label: "Hex color",        pattern: "#[0-9a-fA-F]{3,6}\\b" },
                { label: "URL (https)",      pattern: "https?:\\/\\/[\\w.-]+(?:\\/[\\w./?#&=-]*)?" },
                { label: "ISO date",         pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])" },
                { label: "Semver version",   pattern: "\\d+\\.\\d+\\.\\d+(?:-[\\w.]+)?" },
                { label: "Korean phone no.", pattern: "0\\d{1,2}-\\d{3,4}-\\d{4}" },
                { label: "JWT token",        pattern: "[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+" },
              ].map(({ label, pattern }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    padding: "10px 16px",
                    borderBottom: i < 7 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.7rem",
                      color: "var(--comment-gray)",
                      opacity: 0.6,
                    }}
                  >
                    {label}
                  </p>
                  <code
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--terminal-green)",
                      opacity: 0.85,
                      wordBreak: "break-all",
                    }}
                  >
                    {pattern}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="regex-tester" />
      </div>
    </main>
  );
}
