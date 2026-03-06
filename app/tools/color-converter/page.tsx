import type { Metadata } from "next";
import ColorConverterClient from "@/components/tools/color-converter/color-converter-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";
import AdUnit from "@/components/ads/ad-unit";

export const metadata: Metadata = {
  title: "The Best Color Converter — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Convert colors between HEX, RGB, HSL, and OKLCH instantly in your browser. WCAG contrast ratios, CSS variables, color palette generator — no server required.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hsl",
    "oklch converter",
    "color picker online",
    "css color converter",
    "wcag contrast checker",
    "hex color tool",
    "hsl to rgb",
    "color format converter",
  ],
  openGraph: {
    title: "The Best Color Converter — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Convert colors between HEX, RGB, HSL, and OKLCH instantly. WCAG contrast ratios, CSS variables, color palette — no server required.",
    url: "https://www.omnidevtools.com/tools/color-converter",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Color Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Color Converter — Free, Instant, Secured, No Server | OmniDev",
    description:
      "Convert colors between HEX, RGB, HSL, and OKLCH instantly. WCAG contrast ratios, CSS variables, color palette.",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function ColorConverterPage() {
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
            name: "Color Converter",
            description:
              "Convert colors between HEX, RGB, HSL, and OKLCH instantly in your browser. WCAG contrast ratios, CSS variables, and color palette generator included.",
            url: "https://www.omnidevtools.com/tools/color-converter",
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
                <span style={{ color: "var(--electric-blue)" }}>color-converter</span>
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
                Color{" "}
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
                Convert between{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  HEX, RGB, HSL, and OKLCH
                </span>{" "}
                instantly. Includes WCAG contrast checker, CSS variable output, and color palette generator. Runs entirely in your browser.
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
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Click swatch to open color picker\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Or type any format to convert\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" HEX / RGB / HSL / OKLCH all editable\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Copy any format with one click\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Click palette swatches to apply\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>* WCAG contrast ratios auto-calculated</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <ColorConverterClient />

          <AdUnit />

          {/* Description section */}
          <div style={{ marginTop: "60px" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(0,255,136,0.1)", marginBottom: "40px" }} />

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              What is a Color Converter?
            </h2>
            <p style={{ fontFamily: monoFont, fontSize: "0.82rem", color: "var(--code-comment)", lineHeight: 1.85, marginBottom: "14px", maxWidth: "720px" }}>
              A color converter translates a color value from one representation into equivalent values in other formats. Since different systems and tools use different color models — CSS might expect HEX, a design tool might use HSL, and modern browsers increasingly support OKLCH — a converter lets you move between them without manual calculation.
            </p>
            <p style={{ fontFamily: monoFont, fontSize: "0.82rem", color: "var(--code-comment)", lineHeight: 1.85, marginBottom: "28px", maxWidth: "720px" }}>
              This tool converts between four formats: HEX (the classic web standard), RGB (the screen model), HSL (human-friendly hue/saturation/lightness), and OKLCH (the modern perceptually uniform CSS Color Level 4 format). All conversions happen instantly in your browser.
            </p>

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              Color Formats Explained
            </h2>

            <div
              style={{
                border: "1px solid rgba(88,166,255,0.12)", borderRadius: "6px",
                backgroundColor: "rgba(88,166,255,0.02)", overflow: "hidden",
                marginBottom: "28px", maxWidth: "720px",
              }}
            >
              {[
                { format: "HEX (#RRGGBB)", desc: "The oldest and most common web color format. A 6-character hexadecimal string encoding red, green, and blue channels (00–FF each). Supported universally in CSS, HTML, and design tools. 3-digit shorthand (#RGB) is also valid." },
                { format: "RGB (red, green, blue)", desc: "Defines color as a mix of red, green, and blue light (0–255 each). Maps directly to how screens work. rgba() extends this with an alpha channel for transparency. Widely used in canvas APIs, image processing, and CSS." },
                { format: "HSL (hue, saturation, lightness)", desc: "A human-intuitive model where hue is the color angle (0–360°), saturation is color intensity (0–100%), and lightness is the brightness from black to white (0–100%). Easier to reason about when adjusting colors programmatically." },
                { format: "OKLCH (lightness, chroma, hue)", desc: "CSS Color Level 4's perceptually uniform color space. Unlike HSL, equal numeric changes produce visually equal perceptual changes. L is perceptual lightness (0–1), C is chroma (color intensity, 0–0.4+), H is hue angle. Recommended for modern design systems and CSS custom properties." },
              ].map(({ format, desc }, i) => (
                <div
                  key={format}
                  style={{
                    display: "flex", gap: "16px", padding: "12px 18px",
                    borderBottom: i < 3 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flexShrink: 0, width: "160px" }}>
                    <code style={{ fontFamily: monoFont, fontSize: "0.73rem", fontWeight: 700, color: "var(--terminal-green)" }}>
                      {format}
                    </code>
                  </div>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--code-comment)", lineHeight: 1.65, opacity: 0.75 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              WCAG Contrast Explained
            </h2>
            <p style={{ fontFamily: monoFont, fontSize: "0.82rem", color: "var(--code-comment)", lineHeight: 1.85, marginBottom: "14px", maxWidth: "720px" }}>
              WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios to ensure text is readable by people with low vision. Contrast ratio is calculated from relative luminance: (lighter + 0.05) / (darker + 0.05).
            </p>
            <div
              style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: "10px", maxWidth: "720px", marginBottom: "28px",
              }}
            >
              {[
                { title: "AA (Normal text)", desc: "Minimum ratio of 4.5:1 for body text under 18pt (or 14pt bold). Required for basic accessibility compliance in most public-facing web content." },
                { title: "AAA (Normal text)", desc: "Enhanced ratio of 7:1 for normal text. Recommended for body text in high-accessibility contexts such as legal, medical, or government sites." },
                { title: "AA (Large text)", desc: "Minimum ratio of 3:1 for large text (18pt or 14pt bold). Also applies to UI components, icons, and graphical elements." },
                { title: "AAA (Large text)", desc: "Enhanced ratio of 4.5:1 for large text. The gold standard for headings and prominent UI elements in accessible design systems." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "14px 16px", border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "6px", backgroundColor: "rgba(0,255,136,0.02)",
                  }}
                >
                  <p style={{ fontFamily: monoFont, fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: "6px" }}>{title}</p>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--code-comment)", lineHeight: 1.6, opacity: 0.75 }}>{desc}</p>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700, color: "var(--terminal-green)", marginBottom: "16px" }}>
              Common Use Cases
            </h2>
            <div
              style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
                gap: "10px", maxWidth: "720px",
              }}
            >
              {[
                { title: "Design System Tokens", desc: "Convert brand colors from HEX (provided by designers) into OKLCH CSS custom properties for modern design token systems." },
                { title: "Accessibility Audit", desc: "Check foreground/background color pairs for WCAG AA or AAA compliance before shipping UI components." },
                { title: "CSS Color Level 4 Migration", desc: "Convert legacy HEX and RGB values to OKLCH for perceptually uniform color manipulation in modern CSS." },
                { title: "Palette Generation", desc: "Use the built-in complement, triadic, lighter, darker, and muted swatches to build cohesive color palettes from a single seed color." },
                { title: "Cross-tool Color Sync", desc: "Figma exports HEX, Tailwind uses HEX, SVGs use RGB, and WebGL shaders use normalized 0–1 floats. Convert once to use everywhere." },
                { title: "Theme Development", desc: "Generate both light and dark variants of a hue by adjusting the lightness channel in HSL or OKLCH without losing hue consistency." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "12px 14px", border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "6px", backgroundColor: "rgba(0,255,136,0.02)",
                  }}
                >
                  <p style={{ fontFamily: monoFont, fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: "5px" }}>{title}</p>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--code-comment)", lineHeight: 1.6, opacity: 0.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="color-converter" />
      </div>
    </main>
  );
}
