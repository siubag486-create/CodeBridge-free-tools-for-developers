"use client";

import { useState, useMemo } from "react";
import { diffLines, Change } from "diff";
import { Copy, Check, Trash2, ShieldCheck } from "lucide-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import json from "highlight.js/lib/languages/json";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import sql from "highlight.js/lib/languages/sql";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sql", sql);

type ViewMode = "split" | "unified";
type SyntaxLang =
  | "none"
  | "auto"
  | "javascript"
  | "typescript"
  | "python"
  | "json"
  | "css"
  | "html"
  | "bash"
  | "sql";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

interface DiffLine {
  lineNum: number | null;
  lineNumNew: number | null;
  content: string;
  type: "added" | "removed" | "unchanged";
}

interface SideBySideRow {
  rowNum: number;
  leftLineNum: number | null;
  leftContent: string | null;
  leftType: "removed" | "unchanged" | "empty";
  rightLineNum: number | null;
  rightContent: string | null;
  rightType: "added" | "unchanged" | "empty";
}

interface DiffResult {
  unifiedLines: DiffLine[];
  sideBySideRows: SideBySideRow[];
  addedCount: number;
  removedCount: number;
}

function splitLines(value: string): string[] {
  const lines = value.split("\n");
  if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightLine(content: string, lang: SyntaxLang): string {
  if (lang === "none" || !content.trim()) return escapeHtml(content);
  try {
    if (lang === "auto") return hljs.highlightAuto(content).value;
    return hljs.highlight(content, { language: lang }).value;
  } catch {
    return escapeHtml(content);
  }
}

function computeDiff(
  original: string,
  modified: string,
  ignoreWhitespace: boolean
): DiffResult {
  const changes: Change[] = diffLines(original, modified, {
    ignoreWhitespace,
  });

  const unifiedLines: DiffLine[] = [];
  const sideBySideRows: SideBySideRow[] = [];
  let addedCount = 0;
  let removedCount = 0;
  let oldLineNum = 1;
  let newLineNum = 1;

  // Build unified lines
  for (const change of changes) {
    for (const line of splitLines(change.value)) {
      if (change.added) {
        unifiedLines.push({
          lineNum: null,
          lineNumNew: newLineNum++,
          content: line,
          type: "added",
        });
        addedCount++;
      } else if (change.removed) {
        unifiedLines.push({
          lineNum: oldLineNum++,
          lineNumNew: null,
          content: line,
          type: "removed",
        });
        removedCount++;
      } else {
        unifiedLines.push({
          lineNum: oldLineNum++,
          lineNumNew: newLineNum++,
          content: line,
          type: "unchanged",
        });
      }
    }
  }

  // Build side-by-side rows
  let sbOld = 1;
  let sbNew = 1;
  let rowNum = 1;
  let i = 0;

  while (i < changes.length) {
    const change = changes[i];

    if (!change.added && !change.removed) {
      for (const line of splitLines(change.value)) {
        sideBySideRows.push({
          rowNum: rowNum++,
          leftLineNum: sbOld++,
          leftContent: line,
          leftType: "unchanged",
          rightLineNum: sbNew++,
          rightContent: line,
          rightType: "unchanged",
        });
      }
      i++;
    } else if (change.removed) {
      const removedLines = splitLines(change.value);
      const hasNext = i + 1 < changes.length && changes[i + 1].added;
      const addedLines = hasNext ? splitLines(changes[i + 1].value) : [];
      const maxLen = Math.max(removedLines.length, addedLines.length);

      for (let j = 0; j < maxLen; j++) {
        sideBySideRows.push({
          rowNum: rowNum++,
          leftLineNum: j < removedLines.length ? sbOld++ : null,
          leftContent: j < removedLines.length ? removedLines[j] : null,
          leftType: j < removedLines.length ? "removed" : "empty",
          rightLineNum: j < addedLines.length ? sbNew++ : null,
          rightContent: j < addedLines.length ? addedLines[j] : null,
          rightType: j < addedLines.length ? "added" : "empty",
        });
      }
      i += hasNext ? 2 : 1;
    } else {
      // added without preceding removed
      for (const line of splitLines(change.value)) {
        sideBySideRows.push({
          rowNum: rowNum++,
          leftLineNum: null,
          leftContent: null,
          leftType: "empty",
          rightLineNum: sbNew++,
          rightContent: line,
          rightType: "added",
        });
      }
      i++;
    }
  }

  return { unifiedLines, sideBySideRows, addedCount, removedCount };
}

function generateDiffText(original: string, modified: string): string {
  return diffLines(original, modified)
    .flatMap((change) => {
      const prefix = change.added ? "+" : change.removed ? "-" : " ";
      return splitLines(change.value).map((line) => `${prefix} ${line}`);
    })
    .join("\n");
}

const LANG_OPTIONS: { value: SyntaxLang; label: string }[] = [
  { value: "none", label: "No highlight" },
  { value: "auto", label: "Auto" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "json", label: "JSON" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "bash", label: "Bash" },
  { value: "sql", label: "SQL" },
];

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

export default function TextDiffClient() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [syntaxLang, setSyntaxLang] = useState<SyntaxLang>("none");
  const [hideUnchanged, setHideUnchanged] = useState(false);
  const [copied, setCopied] = useState(false);
  const [originalFocused, setOriginalFocused] = useState(false);
  const [modifiedFocused, setModifiedFocused] = useState(false);

  const hasDiff = original.length > 0 || modified.length > 0;
  const modifiedReady = original.length > 0 && modified.length === 0;

  const result = useMemo(
    () => (hasDiff ? computeDiff(original, modified, ignoreWhitespace) : null),
    [original, modified, ignoreWhitespace, hasDiff]
  );

  const displayedUnified = useMemo(
    () =>
      hideUnchanged && result
        ? result.unifiedLines.filter((l) => l.type !== "unchanged")
        : result?.unifiedLines ?? [],
    [result, hideUnchanged]
  );

  const displayedSplit = useMemo(
    () =>
      hideUnchanged && result
        ? result.sideBySideRows.filter(
            (r) => !(r.leftType === "unchanged" && r.rightType === "unchanged")
          )
        : result?.sideBySideRows ?? [],
    [result, hideUnchanged]
  );

  async function handleCopyDiff() {
    if (!result || !hasDiff) return;
    const text = generateDiffText(original, modified);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClear() {
    setOriginal("");
    setModified("");
  }

  const activeToggle: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "rgba(0,255,136,0.1)",
    border: "1px solid rgba(0,255,136,0.3)",
    color: "var(--terminal-green)",
    fontWeight: 700,
  };

  const inactiveToggle: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "transparent",
    border: "1px solid var(--terminal-border-bright)",
    color: "var(--code-comment)",
  };

  const activeBlue: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "rgba(88,166,255,0.1)",
    border: "1px solid rgba(88,166,255,0.3)",
    color: "var(--electric-blue)",
    fontWeight: 700,
  };

  const actionBtn: React.CSSProperties = {
    ...toolbarBtnBase,
    backgroundColor: "transparent",
    border: "1px solid var(--terminal-border-bright)",
    color: "var(--code-comment)",
  };

  const divider = (
    <div
      style={{
        width: "1px",
        height: "18px",
        backgroundColor: "var(--terminal-border)",
        margin: "0 2px",
        flexShrink: 0,
      }}
    />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Security badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid rgba(0,255,136,0.15)",
          backgroundColor: "rgba(0,255,136,0.05)",
          width: "fit-content",
        }}
      >
        <ShieldCheck
          size={12}
          style={{ color: "var(--terminal-green)", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: monoFont,
            fontSize: "0.68rem",
            color: "var(--code-comment)",
          }}
        >
          100% client-side — no data leaves your browser
        </span>
      </div>

      {/* Input panes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: "12px",
        }}
      >
        {/* Original */}
        <div
          style={{
            border: `1px solid ${originalFocused ? "rgba(255,123,114,0.4)" : "var(--terminal-border-bright)"}`,
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.2s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              backgroundColor: "rgba(255,255,255,0.03)",
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
              original.txt
            </span>
            {original && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.62rem",
                  color: "var(--code-comment)",
                  opacity: 0.5,
                  fontFamily: monoFont,
                }}
              >
                {original.split("\n").length} lines
              </span>
            )}
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            onFocus={() => setOriginalFocused(true)}
            onBlur={() => setOriginalFocused(false)}
            placeholder="Paste original text here..."
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            style={{
              flex: 1,
              minHeight: "260px",
              resize: "vertical",
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

        {/* Modified */}
        <div
          style={{
            border: `1px solid ${
              modifiedFocused
                ? "rgba(0,255,136,0.5)"
                : modifiedReady
                  ? "rgba(0,255,136,0.3)"
                  : "var(--terminal-border-bright)"
            }`,
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.2s",
            boxShadow: modifiedReady && !modifiedFocused
              ? "0 0 12px rgba(0,255,136,0.06)"
              : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              backgroundColor: modifiedReady
                ? "rgba(0,255,136,0.04)"
                : "rgba(255,255,255,0.03)",
              borderBottom: "1px solid var(--terminal-border)",
              transition: "background-color 0.2s",
            }}
          >
            <WindowDots />
            <span
              style={{
                color: modifiedReady ? "var(--terminal-green)" : "var(--code-comment)",
                fontSize: "0.68rem",
                fontFamily: monoFont,
                letterSpacing: "0.08em",
                fontWeight: 600,
                transition: "color 0.2s",
              }}
            >
              modified.txt
            </span>
            {modifiedReady && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto" }}>
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
                  paste modified text
                </span>
              </div>
            )}
            {modified && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.62rem",
                  color: "var(--code-comment)",
                  opacity: 0.5,
                  fontFamily: monoFont,
                }}
              >
                {modified.split("\n").length} lines
              </span>
            )}
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            onFocus={() => setModifiedFocused(true)}
            onBlur={() => setModifiedFocused(false)}
            placeholder="Paste modified text here..."
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            style={{
              flex: 1,
              minHeight: "260px",
              resize: "vertical",
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
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          padding: "10px 14px",
          backgroundColor: "var(--terminal-surface)",
          border: "1px solid var(--terminal-border-bright)",
          borderRadius: "8px",
        }}
      >
        {/* Left: stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: monoFont,
            fontSize: "0.74rem",
          }}
        >
          {result ? (
            result.addedCount === 0 && result.removedCount === 0 ? (
              <span style={{ color: "var(--terminal-green)" }}>
                No differences
              </span>
            ) : (
              <>
                {result.addedCount > 0 && (
                  <span style={{ color: "var(--terminal-green)" }}>
                    +{result.addedCount} added
                  </span>
                )}
                {result.removedCount > 0 && (
                  <span style={{ color: "var(--code-red)" }}>
                    -{result.removedCount} removed
                  </span>
                )}
              </>
            )
          ) : (
            <span style={{ color: "var(--code-comment)", opacity: 0.4 }}>
              Paste text above to compare
            </span>
          )}
        </div>

        {/* Right: controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          {/* Language selector */}
          <select
            value={syntaxLang}
            onChange={(e) => setSyntaxLang(e.target.value as SyntaxLang)}
            style={{
              fontFamily: monoFont,
              fontSize: "0.75rem",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid var(--terminal-border-bright)",
              backgroundColor: "transparent",
              color: "var(--code-comment)",
              cursor: "pointer",
              outline: "none",
              lineHeight: 1,
            }}
          >
            {LANG_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ backgroundColor: "#111111" }}
              >
                {opt.label}
              </option>
            ))}
          </select>

          {divider}

          {/* View mode toggle */}
          <button
            onClick={() => setViewMode("split")}
            style={viewMode === "split" ? activeToggle : inactiveToggle}
          >
            Split
          </button>
          <button
            onClick={() => setViewMode("unified")}
            style={viewMode === "unified" ? activeToggle : inactiveToggle}
          >
            Unified
          </button>

          {divider}

          {/* Ignore whitespace */}
          <button
            onClick={() => setIgnoreWhitespace((prev) => !prev)}
            style={ignoreWhitespace ? activeBlue : inactiveToggle}
          >
            Ignore WS
          </button>

          {/* Hide unchanged */}
          <button
            onClick={() => setHideUnchanged((prev) => !prev)}
            style={hideUnchanged ? activeBlue : inactiveToggle}
          >
            Hide Same
          </button>

          {divider}

          {/* Copy diff */}
          <button
            onClick={handleCopyDiff}
            disabled={!hasDiff}
            style={{
              ...actionBtn,
              opacity: hasDiff ? 1 : 0.35,
              cursor: hasDiff ? "pointer" : "default",
              color: copied ? "var(--terminal-green)" : "var(--code-comment)",
              borderColor: copied
                ? "rgba(0,255,136,0.3)"
                : "var(--terminal-border-bright)",
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy Diff"}
          </button>

          {/* Clear */}
          <button
            onClick={handleClear}
            disabled={!original && !modified}
            style={{
              ...actionBtn,
              opacity: original || modified ? 1 : 0.35,
              cursor: original || modified ? "pointer" : "default",
            }}
          >
            <Trash2 size={13} />
            Clear
          </button>
        </div>
      </div>

      {/* Diff output */}
      {result && (
        <div
          style={{
            border: "1px solid var(--terminal-border-bright)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "9px 14px",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid var(--terminal-border)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                diff-output —{" "}
                <span style={{ opacity: 0.6 }}>{viewMode} view</span>
              </span>
            </div>
            {result.addedCount === 0 && result.removedCount === 0 && (
              <span
                style={{
                  color: "var(--terminal-green)",
                  fontFamily: monoFont,
                  fontSize: "0.68rem",
                }}
              >
                files are identical
              </span>
            )}
          </div>

          {/* Output content */}
          <div
            style={{
              backgroundColor: "var(--terminal-surface-2)",
              overflow: "auto",
              maxHeight: "640px",
            }}
          >
            {result.addedCount === 0 && result.removedCount === 0 ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  fontFamily: monoFont,
                  fontSize: "0.82rem",
                  color: "var(--terminal-green)",
                  opacity: 0.7,
                }}
              >
                No differences found — files are identical
              </div>
            ) : viewMode === "unified" ? (
              <div style={{ overflowX: "auto", minWidth: "100%" }}>
                {displayedUnified.map((line, idx) => {
                  const highlighted = highlightLine(line.content, syntaxLang);
                  const bg =
                    line.type === "added"
                      ? "rgba(0,255,136,0.06)"
                      : line.type === "removed"
                        ? "rgba(255,123,114,0.08)"
                        : "transparent";
                  const prefixColor =
                    line.type === "added"
                      ? "var(--terminal-green)"
                      : line.type === "removed"
                        ? "var(--code-red)"
                        : "var(--terminal-border-bright)";
                  const prefix =
                    line.type === "added"
                      ? "+"
                      : line.type === "removed"
                        ? "-"
                        : " ";
                  const textColor =
                    line.type === "added"
                      ? "rgba(0,255,136,0.9)"
                      : line.type === "removed"
                        ? "rgba(255,123,114,0.9)"
                        : "var(--foreground)";

                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        backgroundColor: bg,
                        minHeight: "22px",
                        fontSize: "0.78rem",
                        fontFamily: monoFont,
                        lineHeight: "22px",
                      }}
                    >
                      {/* Old line number */}
                      <div
                        style={{
                          width: "44px",
                          textAlign: "right",
                          paddingRight: "8px",
                          color: "var(--code-comment)",
                          opacity: 0.4,
                          flexShrink: 0,
                          userSelect: "none",
                          borderRight: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {line.lineNum ?? ""}
                      </div>
                      {/* New line number */}
                      <div
                        style={{
                          width: "44px",
                          textAlign: "right",
                          paddingRight: "8px",
                          color: "var(--code-comment)",
                          opacity: 0.4,
                          flexShrink: 0,
                          userSelect: "none",
                          borderRight: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {line.lineNumNew ?? ""}
                      </div>
                      {/* Prefix +/- */}
                      <div
                        style={{
                          width: "24px",
                          textAlign: "center",
                          color: prefixColor,
                          fontWeight: 700,
                          flexShrink: 0,
                          userSelect: "none",
                        }}
                      >
                        {prefix}
                      </div>
                      {/* Content */}
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: "8px",
                          paddingRight: "16px",
                          color: textColor,
                          overflow: "hidden",
                          whiteSpace: "pre",
                        }}
                        dangerouslySetInnerHTML={{ __html: highlighted }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Split view */
              <div style={{ overflowX: "auto", minWidth: "100%" }}>
                {displayedSplit.map((row, idx) => {
                  const leftHighlighted =
                    row.leftContent !== null
                      ? highlightLine(row.leftContent, syntaxLang)
                      : "";
                  const rightHighlighted =
                    row.rightContent !== null
                      ? highlightLine(row.rightContent, syntaxLang)
                      : "";

                  const leftBg =
                    row.leftType === "removed"
                      ? "rgba(255,123,114,0.08)"
                      : row.leftType === "empty"
                        ? "rgba(0,0,0,0.18)"
                        : "transparent";
                  const rightBg =
                    row.rightType === "added"
                      ? "rgba(0,255,136,0.06)"
                      : row.rightType === "empty"
                        ? "rgba(0,0,0,0.18)"
                        : "transparent";

                  const leftTextColor =
                    row.leftType === "removed"
                      ? "rgba(255,123,114,0.9)"
                      : "var(--foreground)";
                  const rightTextColor =
                    row.rightType === "added"
                      ? "rgba(0,255,136,0.9)"
                      : "var(--foreground)";

                  return (
                    <div
                      key={idx}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        minHeight: "22px",
                        fontSize: "0.78rem",
                        fontFamily: monoFont,
                        lineHeight: "22px",
                        borderBottom:
                          "1px solid rgba(255,255,255,0.02)",
                      }}
                    >
                      {/* Left side */}
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: leftBg,
                          borderRight:
                            "1px solid var(--terminal-border)",
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            textAlign: "right",
                            paddingRight: "8px",
                            color: "var(--code-comment)",
                            opacity: 0.4,
                            flexShrink: 0,
                            userSelect: "none",
                            borderRight:
                              "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {row.rowNum}
                        </div>
                        {row.leftType !== "empty" ? (
                          <div
                            style={{
                              flex: 1,
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              color: leftTextColor,
                              overflow: "hidden",
                              whiteSpace: "pre",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: leftHighlighted,
                            }}
                          />
                        ) : (
                          <div style={{ flex: 1 }} />
                        )}
                      </div>

                      {/* Right side */}
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: rightBg,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            textAlign: "right",
                            paddingRight: "8px",
                            color: "var(--code-comment)",
                            opacity: 0.4,
                            flexShrink: 0,
                            userSelect: "none",
                            borderRight:
                              "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {row.rowNum}
                        </div>
                        {row.rightType !== "empty" ? (
                          <div
                            style={{
                              flex: 1,
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              color: rightTextColor,
                              overflow: "hidden",
                              whiteSpace: "pre",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: rightHighlighted,
                            }}
                          />
                        ) : (
                          <div style={{ flex: 1 }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
