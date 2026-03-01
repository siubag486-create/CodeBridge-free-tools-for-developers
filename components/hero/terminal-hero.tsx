"use client";

import { useEffect, useState } from "react";

const PROMPT = "$ omnidev --tools";
const TITLE = "OmniDev";
const SUBTITLE = "Free tools for Developers";

const CODE_COLUMNS = [
  {
    x: 4,
    opacity: 0.18,
    duration: 12,
    delay: 0,
    lines: [
      "const learn = () => {",
      "  return <Bridge />;",
      "};",
      "",
      "npm run dev",
      "git init",
      "const api = fetch(",
      "  '/api/code'",
      ");",
      "",
      "if (!code) return;",
      "export default App;",
    ],
  },
  {
    x: 14,
    opacity: 0.13,
    duration: 16,
    delay: -4,
    lines: [
      "<div className=",
      '  "terminal">',
      "</div>",
      "",
      "git commit -m",
      '  "init: setup"',
      "",
      "import React from",
      "  'react';",
      "",
      "const [state, set]",
      "  = useState(null);",
    ],
  },
  {
    x: 27,
    opacity: 0.2,
    duration: 11,
    delay: -2,
    lines: [
      "git push origin main",
      "",
      "function bridge() {",
      "  console.log(",
      "    'learning...'",
      "  );",
      "}",
      "",
      "npm install",
      "pnpm build",
      "",
      "return response.json();",
    ],
  },
  {
    x: 41,
    opacity: 0.14,
    duration: 14,
    delay: -7,
    lines: [
      "type Props = {",
      "  stage: number;",
      "  done: boolean;",
      "};",
      "",
      "git checkout -b",
      "  feature/lab",
      "",
      "async function run() {",
      "  await init();",
      "}",
      "",
      "export { OmniDev };",
    ],
  },
  {
    x: 55,
    opacity: 0.17,
    duration: 18,
    delay: -3,
    lines: [
      ".terminal {",
      "  color: #00ff88;",
      "  font-size: 0.85rem;",
      "}",
      "",
      "$ curl localhost:3000",
      "",
      "const router =",
      "  useRouter();",
      "",
      "router.push('/lab/1');",
      "",
      "// stage complete",
    ],
  },
  {
    x: 67,
    opacity: 0.15,
    duration: 13,
    delay: -6,
    lines: [
      "interface Stage {",
      "  id: number;",
      "  title: string;",
      "}",
      "",
      "pnpm dlx shadcn add",
      "",
      "git log --oneline",
      "",
      "fetch('/api/bridge')",
      "  .then(res =>",
      "    res.json()",
      "  );",
    ],
  },
  {
    x: 79,
    opacity: 0.19,
    duration: 15,
    delay: -1,
    lines: [
      "$ npm run build",
      "  > compiled ✓",
      "",
      "const url = new URL(",
      "  '/roadmap',",
      "  origin",
      ");",
      "",
      "export const meta = {",
      "  title: 'OmniDev'",
      "};",
      "",
      "git status",
    ],
  },
  {
    x: 91,
    opacity: 0.13,
    duration: 10,
    delay: -5,
    lines: [
      "useEffect(() => {",
      "  init();",
      "  return cleanup;",
      "}, []);",
      "",
      "$ pnpm dev",
      "  ready on :3000",
      "",
      "const stage = params",
      "  .stage as string;",
      "",
      "// bridge the gap",
      "learn();",
    ],
  },
];

type LineConfig = {
  text: string;
  delay: number;
  style?: React.CSSProperties;
  prefix?: string;
};

const terminalLines: LineConfig[] = [
  {
    text: "Initializing OmniDev toolset...",
    delay: 100,
    style: { color: "#6e7681" },
  },
  {
    text: "Loading tools: [====================] 100%",
    delay: 350,
    style: { color: "#7ee787" },
  },
  {
    text: "No install. No server. Running in browser...",
    delay: 600,
    style: { color: "#6e7681" },
  },
  {
    text: "All systems ready. Welcome, developer.",
    delay: 850,
    style: { color: "#58a6ff" },
  },
];

function useTypewriter(
  text: string,
  speed: number = 60,
  startDelay: number = 0,
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function TerminalLine({ text, delay, style }: LineConfig) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <div
      className="animate-fade-up"
      style={{
        fontFamily: "'RoundedFixedsys', var(--font-geist-mono), monospace",
        fontSize: "0.8rem",
        lineHeight: "1.6",
        ...style,
      }}
    >
      {text}
    </div>
  );
}

export default function TerminalHero() {
  const prompt = useTypewriter(PROMPT, 30, 50);
  const title = useTypewriter(TITLE, 45, 400);
  const subtitle = useTypewriter(SUBTITLE, 28, 900);

  const ctaCmd = useTypewriter("PSWK DEV COPYRIGHT 2026", 50, 1400);

  const [showLines, setShowLines] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLines(true), 150);
    const t2 = setTimeout(() => setShowCta(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes code-fall {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(110vh); }
        }
        .tool-btn {
          border-left: 3px solid transparent;
          transition: border-left-color 0.15s ease, background 0.15s ease;
          cursor: pointer;
        }
        .tool-btn:hover {
          border-left-color: #00ff88;
          background: rgba(0,255,136,0.09);
        }
        .tool-btn:hover .tool-icon {
          background: #00ff88;
          color: #060d0a;
          border-color: #00ff88;
        }
        .tool-btn:hover .tool-cmd {
          color: #ffffff;
        }
        .tool-btn:hover .tool-desc {
          color: rgba(255,255,255,0.5);
        }
        .tool-btn:hover .tool-arrow {
          transform: translateX(5px);
          color: #00ff88;
        }
        .tool-arrow {
          transition: transform 0.15s ease, color 0.15s ease;
        }
        .tool-icon {
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .tool-cmd {
          transition: color 0.15s ease;
        }
        .tool-desc {
          transition: color 0.15s ease;
        }
      `}</style>
      <section
        className="min-h-screen flex flex-col items-center relative overflow-hidden"
        style={{
          backgroundColor: "var(--terminal-bg)",
          paddingTop: "128px",
          justifyContent: "flex-start",
        }}
      >
        {/* Code rain columns */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden
        >
          {CODE_COLUMNS.map((col, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${col.x}%`,
                top: 0,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.72rem",
                color: "var(--terminal-green)",
                opacity: col.opacity,
                whiteSpace: "nowrap",
                lineHeight: "1.7rem",
                animationName: "code-fall",
                animationDuration: `${col.duration}s`,
                animationTimingFunction: "linear",
                animationDelay: `${col.delay}s`,
                animationIterationCount: "infinite",
                willChange: "transform",
              }}
            >
              {col.lines.map((line, j) => (
                <div key={j}>{line || "\u00A0"}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Background grid lines */}
        <div
          className="absolute inset-0 grid-lines-bg opacity-30 pointer-events-none"
          aria-hidden
        />

        {/* Radial glow at center */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "800px",
            height: "800px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(0,255,136,0.04) 0%, rgba(0,255,136,0.01) 40%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
          {/* Terminal window */}
          <div
            className="w-full terminal-glow"
            style={{
              backgroundColor: "rgba(12, 12, 12, 0.97)",
              border: "1px solid var(--terminal-border)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* Terminal titlebar */}
            <div
              style={{
                backgroundColor: "rgba(16, 16, 16, 0.99)",
                borderBottom: "1px solid var(--terminal-border)",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Window control dots */}
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ff5f57",
                  display: "inline-block",
                  boxShadow: "0 0 4px rgba(255,95,87,0.5)",
                }}
              />
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ffbd2e",
                  display: "inline-block",
                  boxShadow: "0 0 4px rgba(255,189,46,0.3)",
                }}
              />
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#28c840",
                  display: "inline-block",
                  boxShadow: "0 0 4px rgba(40,200,64,0.3)",
                }}
              />
              <span
                style={{
                  fontFamily:
                    "'RoundedFixedsys', var(--font-geist-mono), monospace",
                  fontSize: "0.7rem",
                  color: "#3a4a5a",
                  marginLeft: "auto",
                  marginRight: "auto",
                  letterSpacing: "0.05em",
                }}
              >
                omnidev — tools — 120x40
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="crt-scanlines relative"
              style={{ padding: "36px 44px", minHeight: "520px" }}
            >
              {/* Line number gutter */}
              <div
                className="absolute left-0 top-0 bottom-0"
                style={{
                  width: "48px",
                  borderRight: "1px solid rgba(30,42,58,0.8)",
                  padding: "36px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  paddingRight: "10px",
                  gap: "0",
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily:
                        "'RoundedFixedsys', var(--font-geist-mono), monospace",
                      fontSize: "0.7rem",
                      lineHeight: "1.6rem",
                      color: "rgba(110,118,129,0.3)",
                      userSelect: "none",
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Terminal content */}
              <div style={{ marginLeft: "64px" }}>
                {/* Prompt line */}
                <div
                  style={{
                    fontFamily:
                      "'RoundedFixedsys', var(--font-geist-mono), monospace",
                    fontSize: "0.85rem",
                    color: "var(--terminal-green)",
                    marginBottom: "4px",
                    lineHeight: "1.6rem",
                  }}
                >
                  {prompt.displayed}
                  {!prompt.done && (
                    <span
                      className="cursor-blink"
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "14px",
                        backgroundColor: "var(--terminal-green)",
                        marginLeft: "2px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </div>

                {/* Boot lines */}
                {showLines && (
                  <div style={{ marginBottom: "24px" }}>
                    {terminalLines.map((line, i) => (
                      <TerminalLine key={i} {...line} />
                    ))}
                  </div>
                )}

                {/* Big CODEBRIDGE title */}
                <div style={{ marginTop: "8px", marginBottom: "4px" }}>
                  <div
                    style={{
                      fontFamily:
                        "'RoundedFixedsys', var(--font-space-mono), monospace",
                      fontSize: "clamp(4rem, 10vw, 7rem)",
                      fontWeight: 700,
                      color: "var(--terminal-green)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                    }}
                    className="text-glow-green"
                  >
                    {title.displayed}
                    {!title.done && (
                      <span
                        className="cursor-blink"
                        style={{
                          display: "inline-block",
                          width: "clamp(24px, 5vw, 52px)",
                          height: "clamp(3.5rem, 8vw, 6.5rem)",
                          backgroundColor: "var(--terminal-green)",
                          marginLeft: "4px",
                          verticalAlign: "middle",
                          opacity: 0.9,
                        }}
                      />
                    )}
                  </div>

                  {/* Subtitle */}
                  {subtitle.displayed && (
                    <div
                      style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "clamp(1rem, 2vw, 1.35rem)",
                        fontWeight: 700,
                        color: "var(--electric-blue)",
                        marginTop: "10px",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <span style={{ color: "var(--code-comment)" }}>
                        {"// "}
                      </span>
                      {subtitle.displayed}
                      {!subtitle.done && (
                        <span
                          className="cursor-blink"
                          style={{ color: "var(--electric-blue)" }}
                        >
                          _
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Final prompt line */}
                {showCta && (
                  <div
                    className="animate-fade-up"
                    style={{
                      marginTop: "32px",
                      fontFamily:
                        "'RoundedFixedsys', var(--font-geist-mono), monospace",
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--code-comment)" }}>$</span>
                    <span style={{ color: "#ffffff" }}>{ctaCmd.displayed}</span>
                    {!ctaCmd.done && (
                      <span
                        className="cursor-blink"
                        style={{ color: "#ffffff" }}
                      >
                        _
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA below terminal */}
          {showCta && (
            <div className="animate-fade-up mt-15 flex flex-col items-center gap-6">
              <p
                style={{
                  fontFamily:
                    "'RoundedFixedsys', var(--font-geist-mono), monospace",
                  fontSize: "0.85rem",
                  color: "var(--code-comment)",
                  textAlign: "center",
                  maxWidth: "480px",
                  lineHeight: "1.8",
                }}
              >
                No install. No server.{" "}
                <span style={{ color: "var(--terminal-green)" }}>
                  Just paste and go.
                </span>
              </p>

              {/* Tool list — terminal button style */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  backgroundColor: "rgba(10, 14, 26, 0.92)",
                  border: "1px solid rgba(0,255,136,0.18)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  fontFamily: "var(--font-geist-mono), monospace",
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
                  <span
                    style={{ color: "var(--terminal-green)", opacity: 0.45 }}
                  >
                    $
                  </span>
                  omnidev --list-tools
                </div>
                {[
                  {
                    icon: "{ }",
                    cmd: "json-formatter",
                    desc: "Format & validate JSON",
                    href: "/tools/json-formatter",
                  },
                  {
                    icon: "/^/",
                    cmd: "regex-tester",
                    desc: "Test regex patterns in realtime",
                    href: "/tools/regex-tester",
                  },
                  {
                    icon: "+/-",
                    cmd: "text-diff",
                    desc: "Compare two texts side-by-side",
                    href: "/tools/text-diff",
                  },
                  {
                    icon: " 64",
                    cmd: "base64",
                    desc: "Encode / decode Base64",
                    href: "/tools/base64",
                  },
                  {
                    icon: "JWT",
                    cmd: "jwt-decoder",
                    desc: "Decode & verify JWT tokens",
                    href: "/tools/jwt-decoder",
                  },
                  {
                    icon: "UID",
                    cmd: "uuid-generator",
                    desc: "Generate UUID v1 / v4 / v7 identifiers",
                    href: "/tools/uuid-generator",
                  },
                ].map((tool, i, arr) => (
                  <a
                    key={tool.cmd}
                    href={tool.href}
                    className="tool-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 16px",
                      textDecoration: "none",
                      gap: "12px",
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(0,255,136,0.06)"
                          : "none",
                    }}
                  >
                    {/* Icon badge */}
                    <span
                      className="tool-icon"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "26px",
                        border: "1px solid rgba(0,255,136,0.28)",
                        borderRadius: "4px",
                        fontSize: "0.62rem",
                        color: "var(--terminal-green)",
                        flexShrink: 0,
                        letterSpacing: "0",
                        fontWeight: 600,
                      }}
                    >
                      {tool.icon}
                    </span>

                    {/* $ prefix */}
                    <span
                      style={{
                        color: "rgba(0,255,136,0.35)",
                        fontSize: "0.75rem",
                        flexShrink: 0,
                      }}
                    >
                      $
                    </span>

                    {/* Command name */}
                    <span
                      className="tool-cmd"
                      style={{
                        color: "var(--terminal-green)",
                        fontSize: "0.85rem",
                        minWidth: "145px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tool.cmd}
                    </span>

                    {/* Description */}
                    <span
                      className="tool-desc"
                      style={{
                        color: "var(--comment-gray)",
                        fontSize: "0.78rem",
                        flex: 1,
                      }}
                    >
                      # {tool.desc}
                    </span>

                    {/* Arrow */}
                    <span
                      className="tool-arrow"
                      style={{
                        color: "rgba(0,255,136,0.25)",
                        fontSize: "0.9rem",
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
