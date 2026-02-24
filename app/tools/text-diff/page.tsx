import type { Metadata } from "next";
import TextDiffClient from "@/components/tools/text-diff/text-diff-client";

export const metadata: Metadata = {
  title: "Text Diff Tool — Free Online Comparison | CodeBridge",
  description:
    "Compare two texts, code files, or configs with instant line-by-line diff. Split and unified views, syntax highlighting, ignore whitespace. 100% client-side.",
  keywords: [
    "text diff",
    "code diff",
    "file comparison",
    "diff viewer",
    "online diff tool",
  ],
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
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 24px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Page header */}
        <div style={{ marginBottom: "28px" }}>
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

        {/* Tool */}
        <TextDiffClient />
      </div>
    </main>
  );
}
