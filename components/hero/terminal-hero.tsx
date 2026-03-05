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

function handleExplore() {
  document
    .getElementById("tools-section")
    ?.scrollIntoView({ behavior: "smooth" });
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
        @keyframes chevron-fade {
          0%   { opacity: 0; transform: translateY(-6px) rotate(45deg); }
          50%  { opacity: 1; transform: translateY(0px)  rotate(45deg); }
          100% { opacity: 0; transform: translateY(6px)  rotate(45deg); }
        }
        .chevron-wrap {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .chevron-wrap .chv {
          display: block;
          width: 22px;
          height: 22px;
          border-right: 2.5px solid;
          border-bottom: 2.5px solid;
          animation: chevron-fade 1.6s ease-in-out infinite;
        }
        .chevron-wrap .chv:nth-child(1) { animation-delay: 0s;    border-color: rgba(0,255,136,0.25); }
        .chevron-wrap .chv:nth-child(2) { animation-delay: 0.2s;  border-color: rgba(0,255,136,0.5); }
        .chevron-wrap .chv:nth-child(3) { animation-delay: 0.4s;  border-color: rgba(0,255,136,0.8); }
        .explore-btn {
          cursor: pointer;
          background: transparent;
          border: 1px solid rgba(0,255,136,0.5);
          outline: none;
          padding: 12px 36px;
          font-family: 'RoundedFixedsys', var(--font-geist-mono), monospace;
          font-size: 0.95rem;
          color: #00ff88;
          letter-spacing: 0.06em;
          white-space: nowrap;
          transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .explore-btn:hover {
          background-color: #00ff88;
          color: #0a0a0a;
          border-color: #00ff88;
          box-shadow: 0 0 24px rgba(0,255,136,0.3);
        }
      `}</style>
      <section
        className="flex flex-col items-center relative overflow-hidden"
        style={{
          height: "100%",
          backgroundColor: "var(--terminal-bg)",
          paddingTop: "140px",
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
              backgroundColor: "rgba(0, 0, 0, 0.97)",
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
            <div
              className="animate-fade-up"
              style={{
                marginTop: "120px",
                paddingBottom: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
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

              <button className="explore-btn" onClick={handleExplore}>
                Explore Our Tools
              </button>
            </div>
          )}

          {/* Chevron scroll indicator */}
          {showCta && (
            <div
              className="chevron-wrap"
              onClick={handleExplore}
              style={{
                position: "absolute",
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                userSelect: "none",
              }}
            >
              <span className="chv" />
              <span className="chv" />
              <span className="chv" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
