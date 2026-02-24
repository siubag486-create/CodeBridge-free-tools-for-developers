"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Trash2, AlertCircle } from "lucide-react";

type Status = "idle" | "ready" | "match" | "nomatch" | "error";

interface Flags {
  g: boolean;
  i: boolean;
  m: boolean;
  s: boolean;
}

interface Segment {
  text: string;
  isMatch: boolean;
}

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

const toolbarBtnBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontFamily: monoFont,
  fontSize: "0.75rem",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "1px solid transparent",
  transition: "all 0.15s ease",
  lineHeight: 1,
  background: "none",
};

function WindowDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      {["#ff5f56", "#ffbd2e", "#27c93f"].map((color) => (
        <div
          key={color}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0.85,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function buildSegments(text: string, matches: RegExpMatchArray[]): Segment[] {
  if (!text) return [];
  if (!matches.length) return [{ text, isMatch: false }];

  const segments: Segment[] = [];
  let lastIndex = 0;

  for (const match of matches) {
    const start = match.index ?? 0;
    const matchText = match[0];
    const end = start + matchText.length;

    if (start > lastIndex) {
      segments.push({ text: text.slice(lastIndex, start), isMatch: false });
    }

    if (matchText.length > 0) {
      segments.push({ text: matchText, isMatch: true });
      lastIndex = end;
    } else {
      // Zero-length match — advance to avoid infinite loop
      lastIndex = start + 1;
    }
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isMatch: false });
  }

  return segments;
}

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Flags>({
    g: true,
    i: false,
    m: false,
    s: false,
  });
  const [testString, setTestString] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!pattern) {
      setStatus("idle");
      setMatches([]);
      setErrorMessage("");
      return;
    }
    if (!testString) {
      setStatus("ready");
      setMatches([]);
      setErrorMessage("");
      return;
    }
    try {
      // Always include 'g' so matchAll works; apply user flags on top
      const flagStr = [
        "g",
        flags.i ? "i" : "",
        flags.m ? "m" : "",
        flags.s ? "s" : "",
      ].join("");

      const normalizedPattern = pattern.replace(/₩/g, "\\");
      const re = new RegExp(normalizedPattern, flagStr);
      const allMatches = [...testString.matchAll(re)];

      // If user hasn't toggled g, only show the first match
      const displayMatches = flags.g ? allMatches : allMatches.slice(0, 1);

      setMatches(displayMatches);
      setStatus(displayMatches.length > 0 ? "match" : "nomatch");
      setErrorMessage("");
    } catch (e) {
      setStatus("error");
      setErrorMessage(
        e instanceof Error ? e.message : "Invalid regular expression",
      );
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  async function handleCopyPattern() {
    if (!pattern) return;
    const flagStr = Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join("");
    await navigator.clipboard.writeText(`/${pattern}/${flagStr}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClear() {
    setPattern("");
    setTestString("");
    setStatus("idle");
    setMatches([]);
    setErrorMessage("");
  }

  function toggleFlag(flag: keyof Flags) {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  }

  const segments = buildSegments(testString, matches);

  const statusBorderColor =
    status === "match" || status === "ready"
      ? "rgba(0,255,136,0.35)"
      : status === "nomatch" || status === "error"
        ? "rgba(255,123,114,0.35)"
        : "var(--terminal-border-bright)";

  const activeFlag: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "rgba(0,255,136,0.1)",
    border: "1px solid rgba(0,255,136,0.3)",
    color: "var(--terminal-green)",
    padding: "4px 9px",
    fontWeight: 700,
  };

  const inactiveFlag: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "transparent",
    border: "1px solid var(--terminal-border-bright)",
    color: "var(--code-comment)",
    padding: "4px 9px",
  };

  const actionBtn: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "transparent",
    border: "1px solid var(--terminal-border-bright)",
    color: "var(--code-comment)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Pattern Input Panel */}
      <div
        style={{
          border: `1px solid ${statusBorderColor}`,
          borderRadius: "10px",
          overflow: "hidden",
          transition: "border-color 0.2s",
          backgroundColor: "var(--terminal-surface)",
        }}
      >
        {/* Title bar with pattern input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 14px",
            backgroundColor: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid var(--terminal-border)",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: dots + pattern input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: 1,
              minWidth: "180px",
            }}
          >
            <WindowDots />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flex: 1,
              }}
            >
              <span
                style={{
                  color: "var(--code-comment)",
                  fontFamily: monoFont,
                  fontSize: "1.1rem",
                  opacity: 0.5,
                  userSelect: "none",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                /
              </span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value.replace(/₩/g, "\\"))}
                placeholder="pattern"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                style={{
                  flex: 1,
                  minWidth: "80px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: monoFont,
                  fontSize: "0.9rem",
                  color:
                    status === "error"
                      ? "var(--code-red)"
                      : "var(--terminal-green)",
                  caretColor: "var(--terminal-green)",
                  lineHeight: 1.4,
                }}
              />
              <span
                style={{
                  color: "var(--code-comment)",
                  fontFamily: monoFont,
                  fontSize: "1.1rem",
                  opacity: 0.5,
                  userSelect: "none",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                /
              </span>
            </div>
          </div>

          {/* Right: flag toggles + action buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            {(["g", "i", "m", "s"] as const).map((flag) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                style={flags[flag] ? activeFlag : inactiveFlag}
              >
                {flag}
              </button>
            ))}
            <div
              style={{
                width: "1px",
                height: "18px",
                backgroundColor: "var(--terminal-border)",
                margin: "0 3px",
                flexShrink: 0,
              }}
            />
            <button
              onClick={handleCopyPattern}
              disabled={!pattern}
              style={{
                ...actionBtn,
                opacity: pattern ? 1 : 0.35,
                cursor: pattern ? "pointer" : "default",
                color: copied ? "var(--terminal-green)" : "var(--code-comment)",
                borderColor: copied
                  ? "rgba(0,255,136,0.3)"
                  : "var(--terminal-border-bright)",
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={handleClear}
              disabled={!pattern && !testString}
              style={{
                ...actionBtn,
                opacity: pattern || testString ? 1 : 0.35,
                cursor: pattern || testString ? "pointer" : "default",
              }}
            >
              <Trash2 size={13} />
              Clear
            </button>
          </div>
        </div>

        {/* Status row */}
        <div
          style={{
            padding: "7px 14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: monoFont,
            fontSize: "0.72rem",
            minHeight: "34px",
          }}
        >
          {status === "idle" && (
            <span style={{ color: "var(--code-comment)", opacity: 0.45 }}>
              Enter a pattern above to start matching
            </span>
          )}
          {status === "ready" && (
            <>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--terminal-green)",
                  boxShadow: "0 0 6px var(--terminal-green)",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--terminal-green)" }}>
                Ready
              </span>
            </>
          )}
          {status === "match" && (
            <>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--terminal-green)",
                  boxShadow: "0 0 6px var(--terminal-green)",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--terminal-green)" }}>
                {matches.length} match{matches.length !== 1 ? "es" : ""} found
              </span>
            </>
          )}
          {status === "nomatch" && (
            <>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--code-red)",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--code-red)" }}>No match</span>
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle
                size={13}
                style={{ color: "var(--code-red)", flexShrink: 0 }}
              />
              <span style={{ color: "var(--code-red)" }}>{errorMessage}</span>
            </>
          )}
        </div>
      </div>

      {/* Two-Pane Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "12px",
          minHeight: "500px",
        }}
      >
        {/* Left: Test String */}
        <div
          style={{
            border: `1px solid ${status === "ready" ? "rgba(0,255,136,0.3)" : "var(--terminal-border-bright)"}`,
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.2s",
            boxShadow:
              status === "ready" ? "0 0 12px rgba(0,255,136,0.06)" : "none",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "9px 14px",
              backgroundColor:
                status === "ready"
                  ? "rgba(0,255,136,0.04)"
                  : "rgba(255,255,255,0.03)",
              borderBottom: "1px solid var(--terminal-border)",
              transition: "background-color 0.2s",
            }}
          >
            <WindowDots />
            <span
              style={{
                color:
                  status === "ready"
                    ? "var(--terminal-green)"
                    : "var(--code-comment)",
                fontSize: "0.68rem",
                fontFamily: monoFont,
                letterSpacing: "0.08em",
                fontWeight: 600,
                transition: "color 0.2s",
              }}
            >
              test-string
            </span>
            {status === "ready" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginLeft: "auto",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--terminal-green)",
                    boxShadow: "0 0 6px var(--terminal-green)",
                    animation: "cursor-blink 1s step-end infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.62rem",
                    color: "var(--terminal-green)",
                    fontFamily: monoFont,
                    opacity: 0.8,
                  }}
                >
                  enter test string
                </span>
              </div>
            )}
          </div>

          {/* Textarea */}
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder={
              "Enter test string here...\n\nPaste any text and watch matches highlight in real-time."
            }
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            style={{
              flex: 1,
              width: "100%",
              resize: "none",
              background: "var(--terminal-surface)",
              color: "var(--foreground)",
              fontFamily: monoFont,
              fontSize: "0.8rem",
              padding: "14px 16px",
              border: "none",
              outline: "none",
              lineHeight: "1.65",
              caretColor: "var(--terminal-green)",
            }}
          />
        </div>

        {/* Right: Match Output */}
        <div
          style={{
            border: "1px solid var(--terminal-border-bright)",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "9px 14px",
              backgroundColor: "rgba(255,255,255,0.02)",
              borderBottom: "1px solid var(--terminal-border)",
            }}
          >
            <WindowDots />
            <span
              style={{
                color: "var(--code-comment)",
                fontSize: "0.68rem",
                fontFamily: monoFont,
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              match-output
            </span>
          </div>

          {/* Content area */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              backgroundColor: "var(--terminal-surface-2)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Scanlines overlay */}
            <div
              className="crt-scanlines"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 1,
                opacity: 0.4,
              }}
            />

            {/* Highlighted text view */}
            {testString ? (
              <pre
                style={{
                  padding: "14px 16px",
                  margin: 0,
                  fontSize: "0.8rem",
                  lineHeight: "1.65",
                  fontFamily: monoFont,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: "var(--foreground)",
                  borderBottom:
                    matches.length > 0
                      ? "1px solid var(--terminal-border)"
                      : "none",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {segments.map((seg, i) =>
                  seg.isMatch ? (
                    <mark
                      key={i}
                      style={{
                        backgroundColor: "rgba(0,255,136,0.18)",
                        color: "var(--terminal-green)",
                        borderRadius: "2px",
                        padding: "0 1px",
                        fontWeight: 600,
                      }}
                    >
                      {seg.text}
                    </mark>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  ),
                )}
              </pre>
            ) : (
              <div
                style={{
                  padding: "14px 16px",
                  color: "var(--code-comment)",
                  fontFamily: monoFont,
                  fontSize: "0.8rem",
                  opacity: 0.4,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Matched output will appear here.
              </div>
            )}

            {/* Match list */}
            {matches.length > 0 && (
              <div
                style={{
                  padding: "10px 14px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {matches.map((match, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid rgba(0,255,136,0.12)",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Match header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "5px 10px",
                        backgroundColor: "rgba(0,255,136,0.05)",
                        borderBottom: "1px solid rgba(0,255,136,0.08)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: monoFont,
                          fontSize: "0.66rem",
                          color: "var(--terminal-green)",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}
                      >
                        MATCH {i + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: monoFont,
                          fontSize: "0.64rem",
                          color: "var(--code-comment)",
                        }}
                      >
                        index {match.index}
                        <span style={{ opacity: 0.5 }}> → </span>
                        {(match.index ?? 0) + match[0].length}
                      </span>
                    </div>

                    {/* Match body */}
                    <div style={{ padding: "7px 10px" }}>
                      <div
                        style={{
                          fontFamily: monoFont,
                          fontSize: "0.78rem",
                          color: "var(--terminal-green)",
                          marginBottom: match.length > 1 ? "6px" : 0,
                        }}
                      >
                        {JSON.stringify(match[0])}
                      </div>

                      {/* Capture groups */}
                      {match.slice(1).map((group, gi) => (
                        <div
                          key={gi}
                          style={{
                            fontFamily: monoFont,
                            fontSize: "0.68rem",
                            color: "var(--code-comment)",
                            paddingLeft: "8px",
                            lineHeight: 1.7,
                            borderLeft: "1px solid rgba(88,166,255,0.2)",
                            marginLeft: "4px",
                          }}
                        >
                          <span style={{ color: "var(--electric-blue)" }}>
                            [{gi + 1}]
                          </span>{" "}
                          {group !== undefined
                            ? JSON.stringify(group)
                            : "undefined"}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
