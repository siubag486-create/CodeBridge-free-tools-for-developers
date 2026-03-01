import Link from "next/link";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

const tools = [
  { id: "json-formatter", label: "json-formatter", desc: "Format & Validate" },
  { id: "regex-tester",   label: "regex-tester",   desc: "Pattern Matching" },
  { id: "text-diff",      label: "text-diff",       desc: "Compare Texts"   },
  { id: "base64",         label: "base64",           desc: "Encode / Decode" },
  { id: "jwt-decoder",    label: "jwt-decoder",     desc: "Token Decoder" },
  { id: "uuid-generator", label: "uuid-generator",  desc: "ID Generator"  },
];

export default function ToolNavSidebar({ currentTool }: { currentTool: string }) {
  const others = tools.filter((t) => t.id !== currentTool);

  return (
    <aside
      style={{
        width: "192px",
        flexShrink: 0,
        position: "sticky",
        top: "80px",
        alignSelf: "flex-start",
        borderLeft: "2px solid rgba(0,255,136,0.12)",
        paddingLeft: "16px",
      }}
    >
      {/* Header */}
      <p
        style={{
          fontFamily: monoFont,
          fontSize: "0.63rem",
          color: "rgba(0,255,136,0.45)",
          letterSpacing: "0.1em",
          marginBottom: "12px",
          userSelect: "none",
        }}
      >
        {"// other tools"}
      </p>

      {/* Tool links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {others.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            style={{
              display: "block",
              padding: "9px 10px",
              borderRadius: "5px",
              textDecoration: "none",
              border: "1px solid transparent",
              transition: "all 0.18s",
            }}
            className="tool-nav-link"
          >
            {/* Arrow + name row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.7rem",
                  color: "var(--terminal-green)",
                  opacity: 0.7,
                  transition: "opacity 0.18s",
                  lineHeight: 1,
                }}
                className="tool-nav-arrow"
              >
                →
              </span>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "var(--code-comment)",
                  letterSpacing: "0.02em",
                  transition: "color 0.18s",
                }}
                className="tool-nav-label"
              >
                {tool.label}
              </span>
            </div>
            {/* Desc */}
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "0.6rem",
                color: "rgba(110,118,129,0.5)",
                marginTop: "3px",
                marginLeft: "17px",
                letterSpacing: "0.03em",
                transition: "color 0.18s",
              }}
              className="tool-nav-desc"
            >
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Hover styles injected inline */}
      <style>{`
        .tool-nav-link:hover {
          background: rgba(0,255,136,0.05) !important;
          border-color: rgba(0,255,136,0.15) !important;
        }
        .tool-nav-link:hover .tool-nav-arrow {
          opacity: 1 !important;
          transform: translateX(2px);
        }
        .tool-nav-link:hover .tool-nav-label {
          color: var(--electric-blue) !important;
        }
        .tool-nav-link:hover .tool-nav-desc {
          color: rgba(110,118,129,0.8) !important;
        }
      `}</style>
    </aside>
  );
}
