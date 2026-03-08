import type { Metadata } from "next";
import MarkdownPreviewClient from "@/components/tools/markdown-preview/markdown-preview-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";
import AdUnit from "@/components/ads/ad-unit";

export const metadata: Metadata = {
  title: "The Best Markdown Editor & Preview — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Write and preview Markdown in real-time with GitHub Flavored Markdown support. Tables, checkboxes, code blocks, syntax highlighting, TOC generation, README templates, HTML export — all in your browser.",
  keywords: [
    "markdown editor",
    "markdown preview",
    "online markdown editor",
    "github flavored markdown",
    "gfm preview",
    "markdown to html",
    "readme editor",
    "markdown live preview",
    "markdown table",
    "markdown code block",
    "free markdown editor",
  ],
  openGraph: {
    title: "The Best Markdown Editor & Preview — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Write and preview Markdown in real-time. GFM tables, checkboxes, code highlighting, TOC, README templates, HTML export — runs entirely in your browser.",
    url: "https://www.omnidevtools.com/tools/markdown-preview",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Markdown Editor & Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Markdown Editor & Preview — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Write and preview Markdown in real-time. GFM support, syntax highlighting, TOC, README templates, HTML export — all in browser.",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function MarkdownPreviewPage() {
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
            name: "Markdown Editor & Preview",
            description:
              "Write and preview Markdown in real-time with GitHub Flavored Markdown support. Tables, checkboxes, code blocks with syntax highlighting, TOC auto-generation, README templates, and HTML export.",
            url: "https://www.omnidevtools.com/tools/markdown-preview",
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
          <div style={{
            marginBottom: "28px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            {/* Left: title */}
            <div>
              <p style={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "var(--code-comment)",
                marginBottom: "10px",
                letterSpacing: "0.04em",
              }}>
                <span style={{ color: "var(--terminal-green)" }}>~</span>
                <span style={{ opacity: 0.5 }}>/tools/</span>
                <span style={{ color: "var(--electric-blue)" }}>markdown-preview</span>
              </p>

              <h1 style={{
                fontFamily: monoFont,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "var(--terminal-green)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}>
                Markdown{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  Editor & Preview
                </span>
              </h1>

              <p style={{
                fontFamily: monoFont,
                fontSize: "0.82rem",
                color: "var(--code-comment)",
                lineHeight: 1.6,
                maxWidth: "560px",
              }}>
                Write{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.85 }}>
                  GitHub Flavored Markdown
                </span>{" "}
                with real-time preview. Tables, checkboxes, syntax-highlighted code blocks, TOC generation, README templates, and HTML export — all client-side.
              </p>
            </div>

            {/* Right: How to use */}
            <div style={{
              border: "1px solid rgba(88,166,255,0.18)",
              borderRadius: "7px",
              backgroundColor: "rgba(88,166,255,0.03)",
              overflow: "hidden",
              flexShrink: 0,
              minWidth: "220px",
              maxWidth: "300px",
            }}>
              <div style={{
                padding: "6px 12px",
                borderBottom: "1px solid rgba(88,166,255,0.12)",
                backgroundColor: "rgba(88,166,255,0.06)",
                fontFamily: monoFont,
                fontSize: "0.65rem",
                color: "#58a6ff",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase",
              }}>
                // How to use
              </div>
              <pre style={{
                margin: 0,
                padding: "10px 14px",
                fontFamily: monoFont,
                fontSize: "0.7rem",
                lineHeight: "1.85",
                color: "var(--code-comment)",
                whiteSpace: "pre",
              }}>
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Type Markdown in the editor\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Preview updates in real-time\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" Use toolbar for quick formatting\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Pick a README template to start\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Copy or download as .md / .html\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>* all processing happens in browser</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <MarkdownPreviewClient />

          <AdUnit />

          {/* Description section */}
          <div style={{ marginTop: "60px" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(0,255,136,0.1)", marginBottom: "40px" }} />

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              What is GitHub Flavored Markdown?
            </h2>
            <p style={{ fontFamily: monoFont, fontSize: "0.82rem", color: "var(--code-comment)", lineHeight: 1.85, marginBottom: "14px", maxWidth: "720px" }}>
              GitHub Flavored Markdown (GFM) is a superset of standard Markdown, originally introduced by GitHub for rendering README files, issues, and pull requests. It adds syntax for tables, strikethrough text, task lists, and fenced code blocks with syntax highlighting — features that standard CommonMark doesn&apos;t support.
            </p>
            <p style={{ fontFamily: monoFont, fontSize: "0.82rem", color: "var(--code-comment)", lineHeight: 1.85, marginBottom: "28px", maxWidth: "720px" }}>
              Today GFM is the de facto standard for developer documentation. Every major platform — GitHub, GitLab, Bitbucket, Notion, Linear, Jira, and more — supports it. Understanding GFM is essential for writing effective READMEs, wikis, and technical documentation.
            </p>

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              Supported Features
            </h2>
            <div style={{
              border: "1px solid rgba(88,166,255,0.12)",
              borderRadius: "6px",
              backgroundColor: "rgba(88,166,255,0.02)",
              overflow: "hidden",
              marginBottom: "28px",
              maxWidth: "720px",
            }}>
              {[
                { feat: "Tables", desc: "Pipe-delimited tables with header rows and alignment control. Renders as a styled HTML table with alternating row colors." },
                { feat: "Task Lists", desc: "- [ ] and - [x] syntax for interactive checklists. Commonly used in project READMEs, issue tracking, and kanban-style notes." },
                { feat: "Code Blocks", desc: "Fenced code blocks with syntax highlighting for 14+ languages: JS, TS, Python, Bash, JSON, CSS, HTML, SQL, Rust, Go, YAML, Java, and more." },
                { feat: "Strikethrough", desc: "~~text~~ renders as deleted text. Useful for showing deprecated options, cancelled tasks, or corrections." },
                { feat: "Blockquotes", desc: "> prefix creates indented quote blocks. Commonly used for callouts, warnings, tips, and important notes." },
                { feat: "Auto-linking", desc: "URLs and @mentions are automatically converted to clickable links in GFM-compatible renderers." },
                { feat: "TOC Generation", desc: "Automatically extract all headings from your document and generate a navigable table of contents with anchor links." },
                { feat: "HTML Export", desc: "Convert your Markdown to clean, standalone HTML with a full CSS stylesheet ready to embed or publish anywhere." },
              ].map(({ feat, desc }, i) => (
                <div key={feat} style={{
                  display: "flex", gap: "16px", padding: "11px 18px",
                  borderBottom: i < 7 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                  alignItems: "flex-start",
                }}>
                  <div style={{ flexShrink: 0, width: "120px" }}>
                    <code style={{ fontFamily: monoFont, fontSize: "0.75rem", fontWeight: 700, color: "var(--terminal-green)" }}>
                      {feat}
                    </code>
                  </div>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--code-comment)", lineHeight: 1.65, opacity: 0.75 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              Common Use Cases
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: "10px", maxWidth: "720px",
            }}>
              {[
                { title: "README Files", desc: "Write polished project READMEs with badges, installation instructions, API docs, and contribution guides using our built-in templates." },
                { title: "Technical Docs", desc: "Draft developer documentation, API references, and architecture decision records with full GFM formatting support." },
                { title: "Blog Posts", desc: "Write and preview blog content before pasting into platforms like Dev.to, Hashnode, or Ghost which all support Markdown." },
                { title: "Meeting Notes", desc: "Take structured notes with headings, bullet points, and task lists. Export to HTML for sharing with non-technical stakeholders." },
                { title: "Code Tutorials", desc: "Write step-by-step tutorials with fenced code blocks, syntax highlighting, and sequential numbered lists." },
                { title: "Release Notes", desc: "Document changelog entries and release notes with formatted lists, links to issues/PRs, and version headers." },
              ].map(({ title, desc }) => (
                <div key={title} style={{
                  padding: "12px 14px",
                  border: "1px solid rgba(0,255,136,0.08)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,255,136,0.02)",
                }}>
                  <p style={{ fontFamily: monoFont, fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: "5px" }}>{title}</p>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--code-comment)", lineHeight: 1.6, opacity: 0.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="markdown-preview" />
      </div>
    </main>
  );
}
