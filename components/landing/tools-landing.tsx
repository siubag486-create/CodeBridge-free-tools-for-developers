import {
  ArrowLeftRight,
  Binary,
  Braces,
  Clock,
  Database,
  FileText,
  Fingerprint,
  Key,
  Link2,
  Palette,
  Search,
  ShieldCheck,
  Split,
  Timer,
} from "lucide-react";

const TOOLS = [
  {
    cmd: "json-formatter",
    desc: "Format & validate JSON",
    href: "/tools/json-formatter",
    icon: <Braces size={22} />,
  },
  {
    cmd: "regex-tester",
    desc: "Test regex in realtime",
    href: "/tools/regex-tester",
    icon: <Search size={22} />,
  },
  {
    cmd: "text-diff",
    desc: "Compare texts side-by-side",
    href: "/tools/text-diff",
    icon: <Split size={22} />,
  },
  {
    cmd: "base64",
    desc: "Encode / decode Base64",
    href: "/tools/base64",
    icon: <Binary size={22} />,
  },
  {
    cmd: "jwt-decoder",
    desc: "Decode & verify JWT tokens",
    href: "/tools/jwt-decoder",
    icon: <Key size={22} />,
  },
  {
    cmd: "uuid-generator",
    desc: "Generate UUID v1 / v4 / v7",
    href: "/tools/uuid-generator",
    icon: <Fingerprint size={22} />,
  },
  {
    cmd: "hash-generator",
    desc: "MD5 / SHA-256 / SHA-512 & HMAC",
    href: "/tools/hash-generator",
    icon: <ShieldCheck size={22} />,
  },
  {
    cmd: "yaml-to-json",
    desc: "YAML ↔ JSON converter",
    href: "/tools/yaml-to-json",
    icon: <ArrowLeftRight size={22} />,
  },
  {
    cmd: "url-encoder",
    desc: "URL encode / decode & query parser",
    href: "/tools/url-encoder",
    icon: <Link2 size={22} />,
  },
  {
    cmd: "timestamp-converter",
    desc: "Unix timestamp ↔ datetime & timezone",
    href: "/tools/timestamp-converter",
    icon: <Clock size={22} />,
  },
  {
    cmd: "sql-formatter",
    desc: "Format, beautify & minify SQL queries",
    href: "/tools/sql-formatter",
    icon: <Database size={22} />,
  },
  {
    cmd: "color-converter",
    desc: "HEX / RGB / HSL / OKLCH converter",
    href: "/tools/color-converter",
    icon: <Palette size={22} />,
  },
  {
    cmd: "cron-expression-parser",
    desc: "Parse, validate & generate cron expressions",
    href: "/tools/cron-expression-parser",
    icon: <Timer size={22} />,
  },
  {
    cmd: "markdown-preview",
    desc: "GFM editor with live preview & TOC",
    href: "/tools/markdown-preview",
    icon: <FileText size={22} />,
  },
];

const COMING_SOON = [
  { icon: "STR", cmd: "string-case-converter", desc: "camel ↔ snake ↔ kebab" },
  { icon: "BAS", cmd: "number-base-converter", desc: "Bin / Oct / Dec / Hex" },
];

export default function ToolsLanding() {
  return (
    <section
      style={{
        height: "100%",
        backgroundColor: "var(--terminal-bg)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "72px",
        paddingBottom: "48px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1152px", padding: "0 24px" }}>
        {/* Section header */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.75rem",
              color: "var(--comment-gray)",
              marginBottom: "6px",
            }}
          >
            <span style={{ color: "var(--terminal-green)", opacity: 0.6 }}>$</span>{" "}
            omnidev --list-tools
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.85rem",
              color: "var(--terminal-green)",
            }}
          >
            {TOOLS.length} tools available —{" "}
            <span style={{ color: "var(--comment-gray)" }}>no install required</span>
          </div>
        </div>

        {/* Tool grid */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.97)",
            borderRadius: "0px",
            overflow: "hidden",
            fontFamily: "var(--font-geist-mono), monospace",
            marginBottom: "32px",
          }}
        >
          {/* mini titlebar */}
          <div
            style={{
              borderBottom: "1px solid rgba(0,255,136,0.1)",
              padding: "8px 16px",
              fontSize: "0.7rem",
              color: "#3a4a5a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "var(--terminal-green)", opacity: 0.45 }}>$</span>
            omnidev --list-tools --status=ready
          </div>

          {/* 3-column feature grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {TOOLS.map((tool, i) => (
              <a
                key={tool.cmd}
                href={tool.href}
                className="group/feature relative flex flex-col py-8 px-6"
                style={{
                  textDecoration: "none",
                  borderRight: i % 3 !== 2 ? "1px solid rgba(0,255,136,0.08)" : "none",
                  borderBottom: i < TOOLS.length - 3 ? "1px solid rgba(0,255,136,0.08)" : "none",
                }}
              >
                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/feature:opacity-100 bg-gradient-to-t from-[rgba(0,255,136,0.07)] to-transparent" />

                {/* Left accent bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] bg-[rgba(0,255,136,0.15)] transition-all duration-200 group-hover/feature:h-10 group-hover/feature:bg-[#00ff88]" />

                {/* Icon */}
                <div
                  className="relative z-10 mb-4 transition-colors duration-200 text-[#00ff88] group-hover/feature:text-[#00ff88]"
                >
                  {tool.icon}
                </div>

                {/* Command title */}
                <div className="relative z-10 mb-2 text-sm font-semibold">
                  <span className="inline-block transition-transform duration-200 group-hover/feature:translate-x-2 text-[#00ff88] group-hover/feature:text-[#00ff88]">
                    <span style={{ color: "#00ff88", marginRight: "4px" }}>$</span>
                    {tool.cmd}
                  </span>
                </div>

                {/* Description */}
                <p className="relative z-10 text-xs transition-colors duration-200 text-[#6e7681] group-hover/feature:text-[rgba(255,255,255,0.45)]">
                  # {tool.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Coming soon section */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: "0px",
            overflow: "hidden",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid rgba(110,118,129,0.1)",
              padding: "8px 16px",
              fontSize: "0.7rem",
              color: "#3a4a5a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "var(--comment-gray)", opacity: 0.4 }}>$</span>
            omnidev --list-tools --status=coming-soon
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {COMING_SOON.map((tool, i) => (
              <div
                key={tool.cmd}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 18px",
                  gap: "6px",
                  borderRight: i % 3 !== 2 ? "1px solid rgba(110,118,129,0.07)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(110,118,129,0.07)" : "none",
                  opacity: 0.5,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "34px",
                      height: "24px",
                      border: "1px solid rgba(110,118,129,0.25)",
                      borderRadius: "0px",
                      fontSize: "0.6rem",
                      color: "var(--comment-gray)",
                      flexShrink: 0,
                      fontWeight: 600,
                    }}
                  >
                    {tool.icon}
                  </span>
                  <span style={{ color: "rgba(110,118,129,0.4)", fontSize: "0.72rem", flexShrink: 0 }}>$</span>
                  <span style={{ color: "var(--comment-gray)", fontSize: "0.8rem", flex: 1 }}>{tool.cmd}</span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "#58a6ff",
                      border: "1px solid rgba(88,166,255,0.3)",
                      borderRadius: "0px",
                      padding: "1px 5px",
                      flexShrink: 0,
                    }}
                  >
                    soon
                  </span>
                </div>
                <span style={{ color: "rgba(110,118,129,0.6)", fontSize: "0.73rem", paddingLeft: "2px" }}>
                  # {tool.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
