"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import hljsJS from "highlight.js/lib/languages/javascript";
import hljsTS from "highlight.js/lib/languages/typescript";
import hljsPy from "highlight.js/lib/languages/python";
import hljsBash from "highlight.js/lib/languages/bash";
import hljsJSON from "highlight.js/lib/languages/json";
import hljsCSS from "highlight.js/lib/languages/css";
import hljsXML from "highlight.js/lib/languages/xml";
import hljsSQL from "highlight.js/lib/languages/sql";
import hljsRust from "highlight.js/lib/languages/rust";
import hljsGo from "highlight.js/lib/languages/go";
import hljsYAML from "highlight.js/lib/languages/yaml";
import hljsJava from "highlight.js/lib/languages/java";
import {
  Bold, Italic, Strikethrough, Code, Link2, Image, List,
  ListOrdered, Quote, Minus, Table, CheckSquare, ChevronDown,
  X, Copy, Check, Download, ShieldCheck, FileText, Eye, Braces,
  AlignLeft, AlignCenter, AlignRight, Plus,
} from "lucide-react";

// ─── Register hljs languages ──────────────────────────────────────────────────
hljs.registerLanguage("javascript", hljsJS);
hljs.registerLanguage("js", hljsJS);
hljs.registerLanguage("typescript", hljsTS);
hljs.registerLanguage("ts", hljsTS);
hljs.registerLanguage("python", hljsPy);
hljs.registerLanguage("py", hljsPy);
hljs.registerLanguage("bash", hljsBash);
hljs.registerLanguage("sh", hljsBash);
hljs.registerLanguage("shell", hljsBash);
hljs.registerLanguage("json", hljsJSON);
hljs.registerLanguage("css", hljsCSS);
hljs.registerLanguage("html", hljsXML);
hljs.registerLanguage("xml", hljsXML);
hljs.registerLanguage("sql", hljsSQL);
hljs.registerLanguage("rust", hljsRust);
hljs.registerLanguage("go", hljsGo);
hljs.registerLanguage("yaml", hljsYAML);
hljs.registerLanguage("yml", hljsYAML);
hljs.registerLanguage("java", hljsJava);

// ─── Marked configuration ─────────────────────────────────────────────────────
marked.use({
  gfm: true,
  breaks: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code(token: any) {
      const text: string = token.text ?? "";
      const lang: string | undefined = token.lang;
      const language = lang && hljs.getLanguage(lang) ? lang : undefined;
      let highlighted: string;
      try {
        highlighted = language
          ? hljs.highlight(text, { language }).value
          : text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      } catch {
        highlighted = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return `<div class="md-code-block"><div class="md-code-header"><span class="md-code-lang">${lang || "text"}</span></div><pre class="md-pre"><code class="hljs">${highlighted}</code></pre></div>`;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heading(token: any) {
      const text: string = token.text ?? "";
      const depth: number = token.depth ?? 1;
      const plain = text.replace(/<[^>]+>/g, "").replace(/[`*_]/g, "");
      const id = plain.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-{2,}/g, "-").trim();
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    },
  } as Parameters<typeof marked.use>[0]["renderer"],
});

// ─── Constants ────────────────────────────────────────────────────────────────
const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";
type Tab = "split" | "editor" | "preview" | "html" | "toc";

// ─── Templates ────────────────────────────────────────────────────────────────
const TEMPLATES: { id: string; label: string; content: string }[] = [
  {
    id: "basic",
    label: "Basic README",
    content: `# Project Name

> A brief description of what this project does and who it's for.

## Features

- ✅ Feature one
- ✅ Feature two
- ✅ Feature three

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Usage

\`\`\`javascript
const project = require('project-name');

project.doSomething();
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](LICENSE)`,
  },
  {
    id: "library",
    label: "Open Source Library",
    content: `# Library Name

![npm](https://img.shields.io/npm/v/package-name) ![license](https://img.shields.io/npm/l/package-name)

A lightweight, zero-dependency library for doing something awesome.

## Why This Library?

- **Fast** — Optimized for performance
- **Typed** — Full TypeScript support
- **Tiny** — < 5kB gzipped

## Installation

\`\`\`bash
npm install package-name
pnpm add package-name
\`\`\`

## Quick Start

\`\`\`typescript
import { something } from 'package-name';

const result = something({ option: 'value' });
console.log(result);
\`\`\`

## API Reference

### \`something(options)\`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| \`option\` | \`string\` | \`'default'\` | What this does |
| \`timeout\` | \`number\` | \`3000\` | Timeout in ms |

**Returns:** \`Promise<Result>\`

## License

[MIT](LICENSE) © Your Name`,
  },
  {
    id: "api",
    label: "API Documentation",
    content: `# API Reference

Base URL: \`https://api.example.com/v1\`

## Authentication

All requests require a Bearer token:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

## Endpoints

### GET /users

Returns a paginated list of users.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`page\` | \`number\` | No | Page number (default: 1) |
| \`limit\` | \`number\` | No | Per page (default: 20) |

**Response**

\`\`\`json
{
  "data": [
    {
      "id": "user_abc123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "pagination": { "page": 1, "total": 100 }
}
\`\`\`

### POST /users

\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

## Error Codes

| Code | Meaning |
|------|---------|
| \`400\` | Bad Request |
| \`401\` | Unauthorized |
| \`404\` | Not Found |
| \`500\` | Server Error |`,
  },
  {
    id: "personal",
    label: "Personal Project",
    content: `# Project Name

**[Live Demo](https://your-demo.com)** · [Report Bug](https://github.com/user/repo/issues)

A short description of what this project does.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Deployment:** Vercel

## Getting Started

\`\`\`bash
git clone https://github.com/user/project.git
cd project
pnpm install
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

\`\`\`env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
\`\`\`

## Roadmap

- [x] Initial release
- [ ] Dark mode
- [ ] Mobile app
- [ ] API v2

## License

MIT`,
  },
  {
    id: "hackathon",
    label: "Hackathon Project",
    content: `# Project Name

> Built at [Hackathon Name] — [Date]

**[Live Demo](https://your-demo.com)** | **[Devpost](https://devpost.com)**

## The Problem

Describe the problem you're solving in 2-3 sentences. Make it relatable and impactful.

## Our Solution

Describe your solution clearly. What does it do? How does it solve the problem?

## How It Works

1. User does X
2. System processes Y with AI
3. User receives Z instantly

## Built With

| Technology | Purpose |
|------------|---------|
| Next.js | Frontend framework |
| OpenAI API | AI processing |
| Supabase | Database & Auth |
| Vercel | Deployment |

## Challenges

> Describe the hardest technical challenges you faced and how you solved them.

## The Team

| Name | Role | GitHub |
|------|------|--------|
| Alice | Frontend | @alice |
| Bob | Backend | @bob |

## License

MIT`,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function extractToc(markdown: string) {
  const regex = /^(#{1,6})\s+(.+)$/gm;
  const items: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    const raw = match[2].trim().replace(/[`*_[\]]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-{2,}/g, "-").trim();
    items.push({ level, text: raw, id });
  }
  return items;
}

function getStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, lines, readingTime };
}

function renderMarkdown(md: string): string {
  if (!md.trim()) return "";
  try {
    return marked.parse(md) as string;
  } catch {
    return "<p>Error rendering markdown.</p>";
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function WindowDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      {(["#ff5f56", "#ffbd2e", "#27c93f"] as const).map((c) => (
        <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: c, opacity: 0.85 }} />
      ))}
    </div>
  );
}

function CopyBtn({ text, label = "Copy", small }: { text: string; label?: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); })}
      style={{
        display: "flex", alignItems: "center", gap: "4px",
        padding: small ? "3px 8px" : "5px 12px",
        border: `1px solid ${copied ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "4px",
        backgroundColor: copied ? "rgba(0,255,136,0.08)" : "transparent",
        color: copied ? "var(--terminal-green)" : "var(--code-comment)",
        fontFamily: monoFont, fontSize: small ? "0.68rem" : "0.72rem",
        cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

function TBtn({
  title, onClick, children,
}: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "28px", height: "28px", borderRadius: "4px",
        border: "1px solid transparent",
        backgroundColor: "transparent",
        color: "var(--code-comment)",
        cursor: "pointer", transition: "all 0.12s", flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--code-comment)";
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ width: "1px", height: "18px", backgroundColor: "rgba(255,255,255,0.08)", margin: "0 2px", flexShrink: 0 }} />;
}

// ─── Table Generator ──────────────────────────────────────────────────────────
type Align = "left" | "center" | "right";

function generateMarkdownTable(rows: number, cols: number, headers: string[], aligns: Align[]): string {
  const pad = (s: string, len: number) => s + " ".repeat(Math.max(0, len - s.length));

  // Compute column widths
  const widths = Array.from({ length: cols }, (_, c) => {
    const header = headers[c] || `Column ${c + 1}`;
    return Math.max(header.length, 8); // min 8 for separator
  });

  // Header row
  const headerRow = "| " + Array.from({ length: cols }, (_, c) => pad(headers[c] || `Column ${c + 1}`, widths[c])).join(" | ") + " |";

  // Separator row with alignment
  const sepRow = "| " + Array.from({ length: cols }, (_, c) => {
    const w = widths[c];
    if (aligns[c] === "center") return ":" + "-".repeat(w - 2) + ":";
    if (aligns[c] === "right")  return "-".repeat(w - 1) + ":";
    return "-".repeat(w); // left (default)
  }).join(" | ") + " |";

  // Data rows
  const dataRows = Array.from({ length: rows }, (_, r) =>
    "| " + Array.from({ length: cols }, (_, c) => pad(`Cell ${r + 1}-${c + 1}`, widths[c])).join(" | ") + " |"
  );

  return "\n" + [headerRow, sepRow, ...dataRows].join("\n") + "\n";
}

function TableGenerator({ onInsert, onClose }: { onInsert: (md: string) => void; onClose: () => void }) {
  const [rows, setRows]       = useState(3);
  const [cols, setCols]       = useState(3);
  const [headers, setHeaders] = useState<string[]>(["Header 1", "Header 2", "Header 3"]);
  const [aligns, setAligns]   = useState<Align[]>(["left", "left", "left"]);
  const ref = useRef<HTMLDivElement>(null);

  // Sync headers/aligns arrays when cols changes
  useEffect(() => {
    setHeaders((prev) => Array.from({ length: cols }, (_, i) => prev[i] ?? `Header ${i + 1}`));
    setAligns((prev)  => Array.from({ length: cols }, (_, i) => prev[i] ?? "left"));
  }, [cols]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const preview = generateMarkdownTable(rows, cols, headers, aligns);

  const alignIcon = (a: Align) =>
    a === "center" ? <AlignCenter size={11} /> : a === "right" ? <AlignRight size={11} /> : <AlignLeft size={11} />;

  const cycleAlign = (i: number) => {
    const order: Align[] = ["left", "center", "right"];
    setAligns((prev) => prev.map((a, idx) => idx === i ? order[(order.indexOf(a) + 1) % 3] : a));
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "calc(100% + 6px)",
        left: 0,
        zIndex: 300,
        width: "420px",
        backgroundColor: "#0d1117",
        border: "1px solid rgba(0,255,136,0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px",
        borderBottom: "1px solid rgba(0,255,136,0.1)",
        backgroundColor: "rgba(0,255,136,0.04)",
      }}>
        <span style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--terminal-green)", fontWeight: 700 }}>
          // Table Generator
        </span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--code-comment)", display: "flex" }}>
          <X size={13} />
        </button>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Rows / Cols counter */}
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { label: "Rows", value: rows, min: 1, max: 10, set: setRows },
            { label: "Columns", value: cols, min: 1, max: 8, set: setCols },
          ].map(({ label, value, min, max, set }) => (
            <div key={label}>
              <p style={{ fontFamily: monoFont, fontSize: "0.63rem", color: "var(--code-comment)", opacity: 0.55, marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                // {label}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0px", border: "1px solid rgba(0,255,136,0.18)", borderRadius: "5px", overflow: "hidden" }}>
                <button
                  onClick={() => set((v) => Math.max(min, v - 1))}
                  style={{ width: "28px", height: "28px", border: "none", background: "rgba(0,0,0,0.3)", color: "var(--code-comment)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Minus size={11} />
                </button>
                <span style={{ width: "32px", textAlign: "center", fontFamily: monoFont, fontSize: "0.82rem", color: "var(--terminal-green)", fontWeight: 700 }}>
                  {value}
                </span>
                <button
                  onClick={() => set((v) => Math.min(max, v + 1))}
                  style={{ width: "28px", height: "28px", border: "none", background: "rgba(0,0,0,0.3)", color: "var(--code-comment)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Plus size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Column headers + alignment */}
        <div>
          <p style={{ fontFamily: monoFont, fontSize: "0.63rem", color: "var(--code-comment)", opacity: 0.55, marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            // Column Headers & Alignment
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", maxHeight: "180px", overflowY: "auto" }}>
            {Array.from({ length: cols }, (_, i) => (
              <div key={i} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontFamily: monoFont, fontSize: "0.63rem", color: "rgba(0,255,136,0.35)", width: "16px", flexShrink: 0, textAlign: "right" }}>
                  {i + 1}
                </span>
                <input
                  value={headers[i] ?? ""}
                  onChange={(e) => setHeaders((prev) => prev.map((h, idx) => idx === i ? e.target.value : h))}
                  placeholder={`Header ${i + 1}`}
                  style={{
                    flex: 1,
                    padding: "5px 9px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "4px",
                    fontFamily: monoFont, fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.85)",
                    outline: "none",
                  }}
                />
                {/* Alignment cycle button */}
                <button
                  onClick={() => cycleAlign(i)}
                  title={`Alignment: ${aligns[i]}`}
                  style={{
                    width: "28px", height: "28px", flexShrink: 0,
                    border: "1px solid rgba(88,166,255,0.2)",
                    borderRadius: "4px",
                    backgroundColor: "rgba(88,166,255,0.06)",
                    color: "#58a6ff",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {alignIcon(aligns[i] ?? "left")}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <p style={{ fontFamily: monoFont, fontSize: "0.63rem", color: "var(--code-comment)", opacity: 0.55, marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            // Preview
          </p>
          <pre style={{
            margin: 0,
            padding: "10px 12px",
            backgroundColor: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(0,255,136,0.1)",
            borderRadius: "5px",
            fontFamily: monoFont, fontSize: "0.72rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            overflowX: "auto",
            whiteSpace: "pre",
            maxHeight: "120px",
            overflowY: "auto",
          }}>
            {preview.trim()}
          </pre>
        </div>

        {/* Insert button */}
        <button
          onClick={() => { onInsert(preview); onClose(); }}
          style={{
            padding: "8px 0",
            borderRadius: "5px",
            border: "1px solid rgba(0,255,136,0.3)",
            backgroundColor: "rgba(0,255,136,0.1)",
            color: "var(--terminal-green)",
            fontFamily: monoFont, fontSize: "0.78rem", fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,255,136,0.18)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,255,136,0.1)"; }}
        >
          Insert Table into Editor
        </button>
      </div>
    </div>
  );
}

function TemplateDropdown({ onSelect }: { onSelect: (content: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "5px",
          padding: "4px 10px", borderRadius: "5px",
          border: "1px solid rgba(88,166,255,0.25)",
          backgroundColor: "rgba(88,166,255,0.06)",
          color: "#58a6ff", fontFamily: monoFont, fontSize: "0.7rem",
          cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        <FileText size={11} />
        Templates
        <ChevronDown size={11} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 5px)", left: 0,
          zIndex: 200, minWidth: "180px",
          backgroundColor: "#0d1117",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: "7px", overflow: "hidden",
          boxShadow: "0 8px 28px rgba(0,0,0,0.65)",
        }}>
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => { onSelect(tpl.content); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "9px 14px", fontFamily: monoFont, fontSize: "0.72rem",
                border: "none", cursor: "pointer", background: "none",
                color: "var(--code-comment)", transition: "all 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,136,0.07)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--terminal-green)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = "var(--code-comment)"; }}
            >
              {tpl.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MarkdownPreviewClient() {
  const [input, setInput] = useState(TEMPLATES[0].content);
  const [activeTab, setActiveTab] = useState<Tab>("split");
  const [splitRatio, setSplitRatio] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [showTableGen, setShowTableGen] = useState(false);
  const tableGenWrapRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef  = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const syncing = useRef<"editor" | "preview" | null>(null);

  // Mobile detection
  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (m && activeTab === "split") setActiveTab("editor");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [activeTab]);

  // Split drag
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ratio = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.max(25, Math.min(75, ratio)));
    };
    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const htmlOutput = useMemo(() => renderMarkdown(input), [input]);
  const toc = useMemo(() => extractToc(input), [input]);
  const stats = useMemo(() => getStats(input), [input]);

  // Toolbar: inline wrap
  const insert = useCallback((before: string, after = "", placeholder = "text") => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    const selected = input.substring(s, e) || placeholder;
    const next = input.substring(0, s) + before + selected + after + input.substring(e);
    setInput(next);
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      textareaRef.current.selectionStart = s + before.length;
      textareaRef.current.selectionEnd = s + before.length + selected.length;
      textareaRef.current.focus();
    });
  }, [input]);

  // Toolbar: block prefix
  const insertBlock = useCallback((prefix: string, placeholder = "text") => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const before = input.substring(0, s);
    const lineStart = before.lastIndexOf("\n") + 1;
    const lineEnd = input.indexOf("\n", s);
    const end = lineEnd === -1 ? input.length : lineEnd;
    const line = input.substring(lineStart, end) || placeholder;
    const next = input.substring(0, lineStart) + prefix + line + input.substring(end);
    setInput(next);
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      textareaRef.current.selectionStart = lineStart + prefix.length;
      textareaRef.current.selectionEnd = lineStart + prefix.length + line.length;
      textareaRef.current.focus();
    });
  }, [input]);

  const insertAtCursor = useCallback((snippet: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const next = input.substring(0, s) + snippet + input.substring(s);
    setInput(next);
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      textareaRef.current.selectionStart = s + snippet.length;
      textareaRef.current.selectionEnd = s + snippet.length;
      textareaRef.current.focus();
    });
  }, [input]);

  const onEditorScroll = useCallback(() => {
    if (syncing.current === "preview") return;
    const ta = textareaRef.current;
    const pv = previewRef.current;
    if (!ta || !pv) return;
    const ratio = ta.scrollTop / (ta.scrollHeight - ta.clientHeight || 1);
    syncing.current = "editor";
    pv.scrollTop = ratio * (pv.scrollHeight - pv.clientHeight);
    requestAnimationFrame(() => { syncing.current = null; });
  }, []);

  const onPreviewScroll = useCallback(() => {
    if (syncing.current === "editor") return;
    const ta = textareaRef.current;
    const pv = previewRef.current;
    if (!ta || !pv) return;
    const ratio = pv.scrollTop / (pv.scrollHeight - pv.clientHeight || 1);
    syncing.current = "preview";
    ta.scrollTop = ratio * (ta.scrollHeight - ta.clientHeight);
    requestAnimationFrame(() => { syncing.current = null; });
  }, []);

  const downloadMd = () => {
    const blob = new Blob([input], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "document.md"; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHtml = () => {
    const full = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Document</title>\n<style>\n  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.75; color: #24292e; }\n  pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }\n  code { font-family: monospace; font-size: 0.9em; background: #f0f0f0; padding: 2px 5px; border-radius: 3px; }\n  pre code { background: none; padding: 0; }\n  table { border-collapse: collapse; width: 100%; margin: 1em 0; }\n  th, td { border: 1px solid #d0d7de; padding: 8px 12px; }\n  th { background: #f6f8fa; }\n  blockquote { border-left: 4px solid #d0d7de; margin: 0; padding: 0 16px; color: #6e7781; }\n  img { max-width: 100%; }\n  h1 { border-bottom: 1px solid #d0d7de; padding-bottom: 8px; }\n  h2 { border-bottom: 1px solid #eaecef; padding-bottom: 6px; }\n</style>\n</head>\n<body>\n${htmlOutput}\n</body>\n</html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "document.html"; a.click();
    URL.revokeObjectURL(url);
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode; mobileHide?: boolean }[] = [
    { id: "split", label: "Split", icon: <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>⊟</span>, mobileHide: true },
    { id: "editor", label: "Editor", icon: <FileText size={12} /> },
    { id: "preview", label: "Preview", icon: <Eye size={12} /> },
    { id: "html", label: "HTML", icon: <Braces size={12} /> },
    { id: "toc", label: "TOC", icon: <List size={12} /> },
  ];

  const editorVisible = activeTab === "split" || activeTab === "editor";
  const previewVisible = activeTab === "split" || activeTab === "preview";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* ── Global styles ── */}
      <style>{`
        /* hljs tokens */
        .hljs-keyword, .hljs-operator { color: #569cd6; font-weight: 600; }
        .hljs-string, .hljs-quote { color: #ce9178; }
        .hljs-number, .hljs-literal { color: #b5cea8; }
        .hljs-comment { color: #6e7681; font-style: italic; }
        .hljs-built_in, .hljs-name { color: #dcdcaa; }
        .hljs-variable, .hljs-template-variable { color: #9cdcfe; }
        .hljs-type, .hljs-class { color: #4ec9b0; }
        .hljs-tag { color: #f28b54; }
        .hljs-attr { color: #9cdcfe; }
        .hljs-title { color: #dcdcaa; }
        .hljs-selector-class, .hljs-selector-id { color: #d7ba7d; }
        .hljs-punctuation { color: rgba(255,255,255,0.3); }
        .hljs { background: transparent; color: rgba(255,255,255,0.82); }

        /* Markdown preview typography */
        .md-preview {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif;
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(230,237,243,0.88);
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .md-preview h1, .md-preview h2, .md-preview h3,
        .md-preview h4, .md-preview h5, .md-preview h6 {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin-top: 1.6em;
          margin-bottom: 0.5em;
          line-height: 1.3;
          font-weight: 700;
          scroll-margin-top: 80px;
        }
        .md-preview h1 {
          font-size: 1.75rem;
          color: var(--terminal-green);
          border-bottom: 1px solid rgba(0,255,136,0.18);
          padding-bottom: 10px;
        }
        .md-preview h2 {
          font-size: 1.3rem;
          color: rgba(230,237,243,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding-bottom: 6px;
        }
        .md-preview h3 { font-size: 1.08rem; color: rgba(230,237,243,0.85); }
        .md-preview h4 { font-size: 0.95rem; color: rgba(230,237,243,0.75); }
        .md-preview h5, .md-preview h6 { font-size: 0.875rem; color: rgba(230,237,243,0.55); }
        .md-preview p { margin: 0.8em 0; }
        .md-preview a { color: var(--electric-blue); text-decoration: none; }
        .md-preview a:hover { text-decoration: underline; opacity: 0.85; }
        .md-preview strong { color: #fff; font-weight: 700; }
        .md-preview em { color: rgba(230,237,243,0.72); }
        .md-preview del { color: rgba(230,237,243,0.4); }
        .md-preview code {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.82em;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 2px 6px;
          color: #f47067;
        }
        .md-preview pre code { background: none; border: none; padding: 0; color: inherit; font-size: 0.82rem; }
        .md-code-block {
          margin: 1.1em 0;
          border: 1px solid rgba(0,255,136,0.12);
          border-radius: 7px;
          overflow: hidden;
          background: rgba(0,0,0,0.35);
        }
        .md-code-header {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          background: rgba(0,255,136,0.03);
          border-bottom: 1px solid rgba(0,255,136,0.08);
        }
        .md-code-lang {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.63rem;
          color: var(--code-comment);
          opacity: 0.65;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .md-pre { margin: 0; padding: 14px 16px; overflow-x: auto; font-family: var(--font-geist-mono), monospace; font-size: 0.82rem; line-height: 1.65; }
        .md-preview blockquote {
          margin: 1em 0;
          padding: 10px 18px;
          border-left: 3px solid rgba(0,255,136,0.5);
          background: rgba(0,255,136,0.03);
          border-radius: 0 6px 6px 0;
          color: rgba(230,237,243,0.58);
          font-style: italic;
        }
        .md-preview blockquote p { margin: 0.2em 0; }
        .md-preview ul, .md-preview ol { margin: 0.75em 0; padding-left: 1.75em; }
        .md-preview li { margin: 0.35em 0; }
        .md-preview li input[type="checkbox"] { margin-right: 7px; accent-color: var(--terminal-green); cursor: default; }
        .md-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.25em 0;
          font-size: 0.86rem;
        }
        .md-preview th {
          background: rgba(0,255,136,0.06);
          color: var(--terminal-green);
          font-weight: 600;
          text-align: left;
          padding: 9px 13px;
          border: 1px solid rgba(0,255,136,0.13);
        }
        .md-preview td {
          padding: 7px 13px;
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(230,237,243,0.78);
        }
        .md-preview tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .md-preview hr {
          border: none;
          border-top: 1px solid rgba(0,255,136,0.13);
          margin: 1.75em 0;
        }
        .md-preview img { max-width: 100%; border-radius: 6px; }

        /* Tab button */
        .md-tab {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 12px;
          border: 1px solid transparent;
          border-radius: 5px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          background: none;
        }
        .md-tab-active {
          background: rgba(0,255,136,0.1) !important;
          color: var(--terminal-green) !important;
          border-color: rgba(0,255,136,0.25) !important;
        }
        .md-tab:not(.md-tab-active) { color: var(--code-comment); }
        .md-tab:not(.md-tab-active):hover {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.6);
        }

        /* Drag handle */
        .split-handle {
          width: 5px;
          cursor: col-resize;
          background: rgba(0,255,136,0.06);
          flex-shrink: 0;
          position: relative;
          transition: background 0.15s;
        }
        .split-handle:hover { background: rgba(0,255,136,0.25); }
        .split-handle::before { content: ""; position: absolute; inset: 0 -4px; }

        /* Textarea */
        .md-editor-textarea {
          width: 100%; height: 100%;
          padding: 18px 16px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.82rem;
          line-height: 1.72;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255,255,255,0.85);
          resize: none;
          box-sizing: border-box;
          tab-size: 2;
          white-space: pre-wrap;
        }
        .md-editor-textarea::placeholder { color: rgba(110,118,129,0.32); }

        /* TOC link hover */
        .toc-link:hover { color: var(--electric-blue) !important; }

        @media (max-width: 767px) {
          .md-hide-mobile { display: none !important; }
          .md-editor-textarea { min-height: 380px; }
        }
      `}</style>

      {/* Security badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "6px 12px", borderRadius: "6px",
        border: "1px solid rgba(0,255,136,0.15)",
        backgroundColor: "rgba(0,255,136,0.05)", width: "fit-content",
      }}>
        <ShieldCheck size={12} style={{ color: "var(--terminal-green)", flexShrink: 0 }} />
        <span style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--code-comment)" }}>
          100% client-side — no data ever leaves your browser
        </span>
      </div>

      {/* ── Main panel ── */}
      <div style={{
        border: "1px solid rgba(0,255,136,0.15)",
        borderRadius: "8px",
        backgroundColor: "rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}>

        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(0,255,136,0.1)",
          backgroundColor: "rgba(0,255,136,0.03)",
        }}>
          <WindowDots />
          <span style={{ fontFamily: monoFont, fontSize: "0.68rem", color: "var(--code-comment)", opacity: 0.5 }}>
            markdown — live preview
          </span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontFamily: monoFont, fontSize: "0.62rem", color: "var(--code-comment)", opacity: 0.38 }}>
              {stats.words}w · {stats.lines}L · ~{stats.readingTime}min
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1px",
          padding: "7px 10px",
          borderBottom: "1px solid rgba(0,255,136,0.07)",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}>
          {/* Format */}
          <TBtn title="Bold" onClick={() => insert("**", "**", "bold text")}><Bold size={13} /></TBtn>
          <TBtn title="Italic" onClick={() => insert("*", "*", "italic text")}><Italic size={13} /></TBtn>
          <TBtn title="Strikethrough" onClick={() => insert("~~", "~~", "strikethrough")}><Strikethrough size={13} /></TBtn>
          <Divider />
          <TBtn title="Inline Code" onClick={() => insert("`", "`", "code")}><Code size={13} /></TBtn>
          <TBtn title="Code Block" onClick={() => insertAtCursor("\n```\ncode here\n```\n")}>
            <span style={{ fontFamily: monoFont, fontSize: "0.62rem", fontWeight: 700, lineHeight: 1 }}>{"{ }"}</span>
          </TBtn>
          <Divider />
          <TBtn title="Heading 1" onClick={() => insertBlock("# ")}><span style={{ fontFamily: monoFont, fontSize: "0.64rem", fontWeight: 700 }}>H1</span></TBtn>
          <TBtn title="Heading 2" onClick={() => insertBlock("## ")}><span style={{ fontFamily: monoFont, fontSize: "0.64rem", fontWeight: 700 }}>H2</span></TBtn>
          <TBtn title="Heading 3" onClick={() => insertBlock("### ")}><span style={{ fontFamily: monoFont, fontSize: "0.64rem", fontWeight: 700 }}>H3</span></TBtn>
          <Divider />
          <TBtn title="Unordered List" onClick={() => insertBlock("- ")}><List size={13} /></TBtn>
          <TBtn title="Ordered List" onClick={() => insertBlock("1. ")}><ListOrdered size={13} /></TBtn>
          <TBtn title="Task Checkbox" onClick={() => insertBlock("- [ ] ")}><CheckSquare size={13} /></TBtn>
          <Divider />
          <TBtn title="Blockquote" onClick={() => insertBlock("> ")}><Quote size={13} /></TBtn>
          <TBtn title="Horizontal Rule" onClick={() => insertAtCursor("\n---\n")}><Minus size={13} /></TBtn>
          {/* Table Generator trigger */}
          <div ref={tableGenWrapRef} style={{ position: "relative" }}>
            <button
              title="Table Generator"
              onClick={() => setShowTableGen((v) => !v)}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                height: "28px", padding: "0 8px", borderRadius: "4px",
                border: `1px solid ${showTableGen ? "rgba(0,255,136,0.3)" : "transparent"}`,
                backgroundColor: showTableGen ? "rgba(0,255,136,0.1)" : "transparent",
                color: showTableGen ? "var(--terminal-green)" : "var(--code-comment)",
                cursor: "pointer", transition: "all 0.12s", flexShrink: 0,
                fontFamily: monoFont, fontSize: "0.68rem",
              }}
              onMouseEnter={(e) => { if (!showTableGen) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)"; } }}
              onMouseLeave={(e) => { if (!showTableGen) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--code-comment)"; } }}
            >
              <Table size={13} />
              <span>Table</span>
              <span style={{
                fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.05em",
                padding: "1px 4px", borderRadius: "3px",
                backgroundColor: "rgba(88,166,255,0.18)",
                border: "1px solid rgba(88,166,255,0.35)",
                color: "#58a6ff", lineHeight: 1,
              }}>NEW</span>
            </button>
            {showTableGen && (
              <TableGenerator
                onInsert={insertAtCursor}
                onClose={() => setShowTableGen(false)}
              />
            )}
          </div>
          <TBtn title="Link" onClick={() => insert("[", "](https://)", "link text")}><Link2 size={13} /></TBtn>
          <TBtn title="Image" onClick={() => insert("![", "](https://)", "alt text")}><Image size={13} /></TBtn>

          <div style={{ flex: 1 }} />

          {/* Right: templates + clear */}
          <TemplateDropdown onSelect={setInput} />
          <button
            onClick={() => setInput("")}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              padding: "4px 9px", borderRadius: "4px",
              border: "1px solid rgba(255,80,80,0.2)",
              backgroundColor: "rgba(255,80,80,0.05)",
              color: "rgba(255,100,100,0.7)",
              fontFamily: monoFont, fontSize: "0.68rem",
              cursor: "pointer", marginLeft: "4px",
            }}
          >
            <X size={10} /> Clear
          </button>
        </div>

        {/* Tab bar + actions */}
        <div style={{
          display: "flex", alignItems: "center", gap: "3px",
          padding: "7px 12px",
          borderBottom: "1px solid rgba(0,255,136,0.08)",
          backgroundColor: "rgba(0,0,0,0.12)",
          overflowX: "auto",
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`md-tab${activeTab === tab.id ? " md-tab-active" : ""}${tab.mobileHide && isMobile ? " md-hide-mobile" : ""}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "5px", alignItems: "center", flexShrink: 0 }}>
            <CopyBtn text={input} label="Copy .md" small />
            <button
              onClick={downloadMd}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                padding: "3px 8px", borderRadius: "4px",
                border: "1px solid rgba(0,255,136,0.22)",
                backgroundColor: "rgba(0,255,136,0.05)",
                color: "var(--terminal-green)",
                fontFamily: monoFont, fontSize: "0.68rem",
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              <Download size={10} /> .md
            </button>
            <CopyBtn text={htmlOutput} label="Copy HTML" small />
            <button
              onClick={downloadHtml}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                padding: "3px 8px", borderRadius: "4px",
                border: "1px solid rgba(88,166,255,0.22)",
                backgroundColor: "rgba(88,166,255,0.05)",
                color: "#58a6ff",
                fontFamily: monoFont, fontSize: "0.68rem",
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              <Download size={10} /> .html
            </button>
          </div>
        </div>

        {/* ── Content area ── */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            height: "clamp(500px, calc(100vh - 420px), 760px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Editor pane */}
          {editorVisible && (
            <div style={{
              width: activeTab === "split" ? `${splitRatio}%` : "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              <textarea
                ref={textareaRef}
                className="md-editor-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onScroll={activeTab === "split" ? onEditorScroll : undefined}
                placeholder={"# Start writing Markdown...\n\nUse the toolbar above or type directly.\nGFM supported: tables, checkboxes, code blocks, and more."}
                spellCheck={false}
                style={{ flex: 1, overflowY: "auto", minHeight: 0 }}
              />
            </div>
          )}

          {/* Drag handle */}
          {activeTab === "split" && (
            <div
              className="split-handle"
              onMouseDown={(e) => {
                e.preventDefault();
                isDragging.current = true;
                document.body.style.cursor = "col-resize";
                document.body.style.userSelect = "none";
              }}
            />
          )}

          {/* Preview pane */}
          {previewVisible && (
            <div
              ref={previewRef}
              onScroll={activeTab === "split" ? onPreviewScroll : undefined}
              style={{
                width: activeTab === "split" ? `calc(${100 - splitRatio}% - 5px)` : "100%",
                overflowY: "auto",
                borderLeft: activeTab === "split" ? "1px solid rgba(0,255,136,0.08)" : undefined,
                padding: "22px 26px",
                boxSizing: "border-box",
              }}>
              {input.trim() ? (
                <div className="md-preview" dangerouslySetInnerHTML={{ __html: htmlOutput }} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "200px" }}>
                  <p style={{ fontFamily: monoFont, fontSize: "0.78rem", color: "var(--code-comment)", opacity: 0.28 }}>
                    // Preview appears here
                  </p>
                </div>
              )}
            </div>
          )}

          {/* HTML source */}
          {activeTab === "html" && (
            <div style={{ flex: 1, overflow: "auto", padding: "18px 20px" }}>
              {htmlOutput ? (
                <pre style={{
                  margin: 0, fontFamily: monoFont, fontSize: "0.78rem",
                  lineHeight: 1.65, color: "rgba(255,255,255,0.7)",
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                }}>
                  {htmlOutput}
                </pre>
              ) : (
                <p style={{ fontFamily: monoFont, fontSize: "0.78rem", color: "var(--code-comment)", opacity: 0.28 }}>
                  // HTML output appears here
                </p>
              )}
            </div>
          )}

          {/* TOC */}
          {activeTab === "toc" && (
            <div style={{ flex: 1, padding: "22px 26px", overflow: "auto" }}>
              {toc.length === 0 ? (
                <p style={{ fontFamily: monoFont, fontSize: "0.78rem", color: "var(--code-comment)", opacity: 0.35 }}>
                  // No headings found. Add # H1, ## H2, ### H3 to generate a table of contents.
                </p>
              ) : (
                <>
                  <p style={{ fontFamily: monoFont, fontSize: "0.63rem", color: "rgba(0,255,136,0.45)", marginBottom: "18px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    // Table of Contents — {toc.length} headings
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {toc.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        className="toc-link"
                        onClick={(e) => {
                          e.preventDefault();
                          if (activeTab === "toc" || activeTab === "html" || activeTab === "editor") setActiveTab("preview");
                          setTimeout(() => {
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 120);
                        }}
                        style={{
                          display: "block",
                          paddingLeft: `${(item.level - 1) * 18}px`,
                          paddingTop: "5px", paddingBottom: "5px",
                          fontFamily: monoFont,
                          fontSize: item.level === 1 ? "0.83rem" : item.level === 2 ? "0.78rem" : "0.72rem",
                          color: item.level === 1 ? "var(--terminal-green)" : item.level === 2 ? "rgba(255,255,255,0.65)" : "var(--code-comment)",
                          textDecoration: "none",
                          fontWeight: item.level <= 2 ? 600 : 400,
                          transition: "color 0.15s",
                          borderLeft: item.level > 1 ? "1px solid rgba(0,255,136,0.08)" : "none",
                        }}
                      >
                        <span style={{ color: "rgba(0,255,136,0.3)", marginRight: "6px" }}>{"#".repeat(item.level)}</span>
                        {item.text}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
