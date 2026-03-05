import type { Metadata } from "next";
import TextDiffClient from "@/components/tools/text-diff/text-diff-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best Text Diff Tool — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Compare two texts, code files, or configs with instant line-by-line diff. Split and unified views, syntax highlighting, ignore whitespace. 100% client-side.",
  keywords: [
    "text diff",
    "code diff",
    "file comparison",
    "diff viewer",
    "online diff tool",
  ],
  openGraph: {
    title: "The Best Text Diff Tool — Free, Instant, Secured, No Server | OmniDev",
    description: "Compare two texts, code files, or configs with instant line-by-line diff. Split and unified views, syntax highlighting, ignore whitespace. 100% client-side.",
    url: "https://www.omnidevtools.com/tools/text-diff",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Text Diff Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function TextDiffPage() {
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
            "name": "Text Diff Tool",
            "description": "Compare two texts, code files, or configs with instant line-by-line diff. Split and unified views, syntax highlighting.",
            "url": "https://www.omnidevtools.com/tools/text-diff",
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
                <span style={{ color: "var(--electric-blue)" }}>text-diff</span>
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
                Text Diff
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
                Compare two texts{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  instantly
                </span>{" "}
                — line-by-line diff with split and unified views. Zero server calls,
                zero data sent.
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
                minWidth: "220px",
                maxWidth: "340px",
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
                  whiteSpace: "pre-wrap",
                }}
              >
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Paste original text into the left pane\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Paste modified text into the right pane\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Differences highlight automatically\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Switch between Split / Unified views\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Toggle to ignore whitespace changes\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>
                  {"* Green = added  /  Red = removed"}
                </span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <TextDiffClient />

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
              What is a Diff?
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
              A diff (short for &quot;difference&quot;) is an algorithm-generated
              comparison between two text inputs that pinpoints exactly what was
              added, removed, or remained unchanged. The concept was popularised
              by the Unix{" "}
              <code
                style={{
                  fontFamily: monoFont,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.78rem",
                }}
              >
                diff
              </code>{" "}
              command, first released in 1974, and has since become foundational
              to version control systems like Git, code review platforms like
              GitHub and GitLab, and deployment tooling.
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
              The most common diff algorithm is{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>
                Myers&apos; algorithm (1986)
              </span>
              , which finds the shortest edit script (SES) — the minimum number
              of insertions and deletions to transform one text into another.
              This is the same algorithm used by Git internally.
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
              View Modes
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
              Most diff tools offer two ways to display changes, and the best choice depends on the size and nature of your edit. Split view gives you spatial context by placing original and modified side by side — ideal when you need to see the before and after at the same time. Unified view is more compact, merging both versions into a single column in the same format you&apos;ll see in Git commit histories and pull request reviews on GitHub or GitLab.
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
              {[
                {
                  name: "Split View",
                  desc: "Original on the left, modified on the right. Deleted lines appear only on the left, added lines only on the right. Best for reviewing short-to-medium changes.",
                },
                {
                  name: "Unified View",
                  desc: "Both versions merged into a single column. Lines marked with + (green) are additions, lines with - (red) are deletions. Familiar from Git diffs and patch files.",
                },
              ].map(({ name, desc }) => (
                <div
                  key={name}
                  style={{
                    padding: "16px",
                    border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0,255,136,0.02)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: "8px",
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontFamily: monoFont,
                      fontSize: "0.75rem",
                      color: "var(--comment-gray)",
                      lineHeight: 1.7,
                      opacity: 0.8,
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
              A diff tool is useful whenever you need to understand exactly what changed between two versions of any text-based content. While most commonly associated with source code, developers reach for it across a wide range of everyday tasks — from auditing config changes before a deployment to proofreading a document revision. The unifying theme is always the same: you have two versions of something and you need to know precisely what is different.
            </p>
            <div
              style={{
                border: "1px solid rgba(88,166,255,0.12)",
                borderRadius: "6px",
                backgroundColor: "rgba(88,166,255,0.02)",
                padding: "16px 20px",
                maxWidth: "720px",
              }}
            >
              <pre
                style={{
                  margin: 0,
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  lineHeight: "2",
                  color: "var(--comment-gray)",
                  whiteSpace: "pre-wrap",
                }}
              >
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Comparing two versions of a config file (nginx, docker-compose)\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Reviewing changes in a code snippet before committing\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Checking what changed between two API responses (REST, GraphQL)\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Proofreading document edits and contract revisions\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Diffing SQL migrations or database schema changes\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Comparing environment variable files (.env.local vs .env.production)\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Auditing Dockerfile or GitHub Actions workflow changes\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>-</span>{" Comparing two versions of a localization/translation file\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.68rem" }}>{"* Enable 'Ignore whitespace' to focus on semantic changes only"}</span>
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
                marginTop: "28px",
              }}
            >
              How to Read a Diff
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
              If you&apos;re new to reading diffs, the format can look noisy at first glance. Once you learn the three symbols — <code style={{ color: "var(--terminal-green)", fontFamily: monoFont, opacity: 0.85 }}>+</code> for added, <code style={{ color: "rgba(255,100,100,0.8)", fontFamily: monoFont }}>-</code> for removed, and a plain space for unchanged — you can parse any diff output instantly, whether it comes from this tool, a Git pull request, or a patch file shared by a colleague. The example below uses the same unified format Git uses internally.
            </p>
            <div
              style={{
                border: "1px solid rgba(0,255,136,0.1)",
                borderRadius: "6px",
                backgroundColor: "rgba(0,0,0,0.3)",
                overflow: "hidden",
                maxWidth: "720px",
              }}
            >
              <div
                style={{
                  padding: "6px 14px",
                  borderBottom: "1px solid rgba(0,255,136,0.08)",
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
                    letterSpacing: "0.06em",
                  }}
                >
                  // Unified diff example (Git-style)
                </p>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "14px 16px",
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  lineHeight: "1.9",
                  whiteSpace: "pre-wrap",
                }}
              >
                <span style={{ color: "var(--comment-gray)", opacity: 0.5 }}>{"@@ -1,5 +1,5 @@\n"}</span>
                <span style={{ color: "var(--comment-gray)", opacity: 0.6 }}>{" const config = {\n"}</span>
                <span style={{ color: "rgba(255,100,100,0.75)" }}>-{"  timeout: 3000,\n"}</span>
                <span style={{ color: "var(--terminal-green)", opacity: 0.75 }}>+{"  timeout: 5000,\n"}</span>
                <span style={{ color: "var(--comment-gray)", opacity: 0.6 }}>{"  retries: 3,\n"}</span>
                <span style={{ color: "rgba(255,100,100,0.75)" }}>-{"  debug: false\n"}</span>
                <span style={{ color: "var(--terminal-green)", opacity: 0.75 }}>+{"  debug: true\n"}</span>
                <span style={{ color: "var(--comment-gray)", opacity: 0.6 }}>{" };"}</span>
              </pre>
              <div
                style={{
                  borderTop: "1px solid rgba(88,166,255,0.08)",
                  padding: "10px 16px",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <p style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "rgba(255,100,100,0.6)" }}>
                  - Red / removed
                </p>
                <p style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--terminal-green)", opacity: 0.7 }}>
                  + Green / added
                </p>
                <p style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--comment-gray)", opacity: 0.5 }}>
                  (space) unchanged
                </p>
                <p style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "rgba(88,166,255,0.5)" }}>
                  @@ hunk header
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="text-diff" />
      </div>
    </main>
  );
}
