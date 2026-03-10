"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

// ─── Types ────────────────────────────────────────────────────────────────────
type Direction = "json2csv" | "csv2json";
type Delimiter = "," | ";" | "\t" | "|";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Converts a value to string without scientific notation for very small numbers
function toStrNoSci(v: unknown): string {
  if (typeof v === "number" && isFinite(v) && v !== 0 && Math.abs(v) < 1e-6) {
    return v.toFixed(20).replace(/\.?0+$/, "");
  }
  return String(v ?? "");
}

function flattenObject(obj: unknown, prefix = ""): Record<string, string> {
  if (typeof obj !== "object" || obj === null) {
    return { [prefix]: toStrNoSci(obj) };
  }
  if (Array.isArray(obj)) {
    return { [prefix]: JSON.stringify(obj) };
  }
  return Object.keys(obj as Record<string, unknown>).reduce(
    (acc, key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = (obj as Record<string, unknown>)[key];
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, fullKey));
      } else {
        acc[fullKey] = Array.isArray(value) ? JSON.stringify(value) : toStrNoSci(value);
      }
      return acc;
    },
    {} as Record<string, string>
  );
}

function escapeCsv(val: string, delimiter: string): string {
  // CSV injection prevention: prefix formula-trigger chars with a single quote
  if (/^[=+\-@\t\r]/.test(val)) {
    val = "'" + val;
  }
  if (
    val.includes(delimiter) ||
    val.includes('"') ||
    val.includes("\n") ||
    val.includes("\r")
  ) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function jsonToCsv(
  jsonStr: string,
  delimiter: string,
  flatten: boolean
): { result: string; rows: number; cols: number } {
  const data = JSON.parse(jsonStr);
  const rawRows = Array.isArray(data) ? data : [data];
  if (rawRows.length === 0) throw new Error("Array is empty");

  const processed: Record<string, string>[] = rawRows.map((row) => {
    if (typeof row !== "object" || row === null || Array.isArray(row)) {
      throw new Error("Array items must be objects, not primitives or arrays");
    }
    if (flatten) return flattenObject(row);
    return Object.fromEntries(
      Object.entries(row as Record<string, unknown>).map(([k, v]) => [
        k,
        typeof v === "object" && v !== null ? JSON.stringify(v) : toStrNoSci(v),
      ])
    );
  });

  // Union of all keys (preserves order: first-seen wins)
  const seen = new Set<string>();
  processed.forEach((row) => Object.keys(row).forEach((k) => seen.add(k)));
  const headers = [...seen];

  const csvRows = [
    headers.map((h) => escapeCsv(h, delimiter)).join(delimiter),
    ...processed.map((row) =>
      headers.map((h) => escapeCsv(row[h] ?? "", delimiter)).join(delimiter)
    ),
  ];

  return { result: csvRows.join("\r\n"), rows: processed.length, cols: headers.length };
}

// Full CSV parser: handles quoted fields containing newlines (RFC 4180 compliant)
function parseCsv(csvStr: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < csvStr.length) {
    const char = csvStr[i];
    if (inQuotes) {
      if (char === '"') {
        if (csvStr[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        field += char;
        i++;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
      } else if (csvStr.slice(i, i + delimiter.length) === delimiter) {
        row.push(field);
        field = "";
        i += delimiter.length;
      } else if (char === "\r" && csvStr[i + 1] === "\n") {
        row.push(field);
        rows.push(row);
        field = "";
        row = [];
        i += 2;
      } else if (char === "\n") {
        row.push(field);
        rows.push(row);
        field = "";
        row = [];
        i++;
      } else {
        field += char;
        i++;
      }
    }
  }
  // push last field/row
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);

  return rows;
}

function csvToJson(
  csvStr: string,
  delimiter: string,
  hasHeader: boolean
): { result: string; rows: number; cols: number } {
  const allRows = parseCsv(csvStr, delimiter);
  if (allRows.length === 0) throw new Error("CSV is empty");

  let headers: string[];
  let dataRows: string[][];

  if (hasHeader) {
    headers = allRows[0];
    dataRows = allRows.slice(1);
  } else {
    const maxCols = Math.max(...allRows.map((r) => r.length));
    headers = Array.from({ length: maxCols }, (_, i) => `col${i + 1}`);
    dataRows = allRows;
  }

  if (dataRows.length === 0) throw new Error("No data rows found");

  const objects = dataRows.map((row) => {
    const obj: Record<string, unknown> = {};
    headers.forEach((h, idx) => {
      const val = row[idx] ?? "";
      if (val === "") obj[h] = "";
      else if (val === "true") obj[h] = true;
      else if (val === "false") obj[h] = false;
      else if (!isNaN(Number(val)) && val.trim() !== "") obj[h] = Number(val);
      else obj[h] = val;
    });
    return obj;
  });

  return {
    result: JSON.stringify(objects, null, 2),
    rows: objects.length,
    cols: headers.length,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function WindowDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      {(["#ff5f56", "#ffbd2e", "#27c93f"] as const).map((c) => (
        <div
          key={c}
          style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: c, opacity: 0.75 }}
        />
      ))}
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      style={{
        fontFamily: monoFont,
        fontSize: "0.68rem",
        padding: "4px 11px",
        borderRadius: "4px",
        border: `1px solid ${copied ? "rgba(0,255,136,0.5)" : "rgba(0,255,136,0.25)"}`,
        backgroundColor: copied ? "rgba(0,255,136,0.1)" : "transparent",
        color: copied ? "var(--terminal-green)" : "var(--code-comment)",
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

// ─── Sample data ──────────────────────────────────────────────────────────────
const SAMPLE_JSON = `[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 28,
    "address": {
      "city": "Seoul",
      "country": "KR"
    }
  },
  {
    "id": 2,
    "name": "Bob",
    "email": "bob@example.com",
    "age": 34,
    "address": {
      "city": "Busan",
      "country": "KR"
    }
  },
  {
    "id": 3,
    "name": "Carol",
    "email": "carol@example.com",
    "age": 25,
    "address": {
      "city": "Incheon",
      "country": "KR"
    }
  }
]`;

const SAMPLE_CSV = `id,name,email,age,city,country
1,Alice,alice@example.com,28,Seoul,KR
2,Bob,bob@example.com,34,Busan,KR
3,Carol,carol@example.com,25,Incheon,KR`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function JsonCsvClient() {
  const [direction, setDirection] = useState<Direction>("json2csv");
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [flatten, setFlatten] = useState(true);
  const [hasHeader, setHasHeader] = useState(true);
  const [stats, setStats] = useState<{ rows: number; cols: number; sizeKb: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      setStats(null);
      return;
    }
    try {
      const res =
        direction === "json2csv"
          ? jsonToCsv(input, delimiter, flatten)
          : csvToJson(input, delimiter, hasHeader);
      setOutput(res.result);
      setStats({
        rows: res.rows,
        cols: res.cols,
        sizeKb: (new Blob([res.result]).size / 1024).toFixed(1),
      });
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
      setStats(null);
    }
  }, [input, direction, delimiter, flatten, hasHeader]);

  useEffect(() => {
    const t = setTimeout(convert, 120);
    return () => clearTimeout(t);
  }, [convert]);

  const switchDirection = (dir: Direction) => {
    setDirection(dir);
    setInput(dir === "json2csv" ? SAMPLE_JSON : SAMPLE_CSV);
    setOutput("");
    setError("");
    setStats(null);
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => setInput((ev.target?.result as string) ?? "");
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  };

  const downloadOutput = () => {
    if (!output) return;
    const ext = direction === "json2csv" ? "csv" : "json";
    const mime = direction === "json2csv" ? "text/csv" : "application/json";
    // Add UTF-8 BOM for CSV so Excel correctly reads non-ASCII characters
    const bom = direction === "json2csv" ? "\uFEFF" : "";
    const blob = new Blob([bom + output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const optionBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: monoFont,
    fontSize: "0.72rem",
    padding: "4px 10px",
    borderRadius: "3px",
    border: `1px solid ${active ? "rgba(0,255,136,0.5)" : "rgba(0,255,136,0.12)"}`,
    backgroundColor: active ? "rgba(0,255,136,0.09)" : "transparent",
    color: active ? "var(--terminal-green)" : "var(--code-comment)",
    cursor: "pointer",
    transition: "all 0.12s",
  });

  return (
    <div style={{ fontFamily: monoFont }}>
      {/* Direction Toggle */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {(
          [
            ["json2csv", "JSON  →  CSV"],
            ["csv2json", "CSV  →  JSON"],
          ] as const
        ).map(([dir, label]) => (
          <button
            key={dir}
            onClick={() => switchDirection(dir)}
            style={{
              fontFamily: monoFont,
              fontSize: "0.8rem",
              padding: "8px 20px",
              borderRadius: "5px",
              border: `1px solid ${
                direction === dir ? "rgba(0,255,136,0.45)" : "rgba(0,255,136,0.1)"
              }`,
              backgroundColor:
                direction === dir ? "rgba(0,255,136,0.07)" : "transparent",
              color:
                direction === dir ? "var(--terminal-green)" : "var(--code-comment)",
              cursor: "pointer",
              transition: "all 0.15s",
              fontWeight: direction === dir ? 700 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Options Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          marginBottom: "14px",
          padding: "10px 16px",
          backgroundColor: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(0,255,136,0.08)",
          borderRadius: "6px",
        }}
      >
        {/* Delimiter */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span
            style={{ fontSize: "0.65rem", color: "rgba(0,255,136,0.45)", whiteSpace: "nowrap" }}
          >
            // delimiter
          </span>
          {([",", ";", "\t", "|"] as Delimiter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDelimiter(d)}
              style={optionBtnStyle(delimiter === d)}
            >
              {d === "\t" ? "Tab" : d}
            </button>
          ))}
        </div>

        {/* Flatten nested — JSON→CSV only */}
        {direction === "json2csv" && (
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span style={{ fontSize: "0.65rem", color: "rgba(0,255,136,0.45)" }}>
              // flatten nested
            </span>
            <button onClick={() => setFlatten(!flatten)} style={optionBtnStyle(flatten)}>
              {flatten ? "ON" : "OFF"}
            </button>
            {flatten && (
              <span
                style={{
                  fontSize: "0.62rem",
                  color: "rgba(0,255,136,0.35)",
                  fontStyle: "italic",
                }}
              >
                (address.city · arrays→json string)
              </span>
            )}
          </div>
        )}

        {/* Has Header — CSV→JSON only */}
        {direction === "csv2json" && (
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span style={{ fontSize: "0.65rem", color: "rgba(0,255,136,0.45)" }}>
              // first row = header
            </span>
            <button onClick={() => setHasHeader(!hasHeader)} style={optionBtnStyle(hasHeader)}>
              {hasHeader ? "ON" : "OFF"}
            </button>
          </div>
        )}
      </div>

      {/* Split Pane */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          height: "clamp(420px, calc(100vh - 390px), 680px)",
        }}
        className="json-csv-grid"
      >
        {/* ── INPUT ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: `1px solid ${isDragging ? "rgba(0,255,136,0.45)" : "rgba(0,255,136,0.12)"}`,
            borderRadius: "6px",
            overflow: "hidden",
            transition: "border-color 0.15s",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {/* Input header bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 12px",
              borderBottom: "1px solid rgba(0,255,136,0.08)",
              backgroundColor: "rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <WindowDots />
              <span style={{ fontSize: "0.68rem", color: "rgba(0,255,136,0.5)" }}>
                {direction === "json2csv" ? "input.json" : "input.csv"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.67rem",
                  padding: "3px 9px",
                  borderRadius: "3px",
                  border: "1px solid rgba(88,166,255,0.25)",
                  backgroundColor: "transparent",
                  color: "var(--electric-blue)",
                  cursor: "pointer",
                }}
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setInput("");
                  setOutput("");
                  setError("");
                  setStats(null);
                }}
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.67rem",
                  padding: "3px 9px",
                  borderRadius: "3px",
                  border: "1px solid rgba(0,255,136,0.12)",
                  backgroundColor: "transparent",
                  color: "var(--code-comment)",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={
              direction === "json2csv"
                ? "Paste JSON array here, or drag & drop a .json file..."
                : "Paste CSV here, or drag & drop a .csv file..."
            }
            style={{
              flex: 1,
              minHeight: 0,
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "13px 14px",
              fontFamily: monoFont,
              fontSize: "0.77rem",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.65,
              overflowY: "auto",
            }}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv,.txt"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) readFile(f);
              e.target.value = "";
            }}
          />

          {/* Drag overlay */}
          {isDragging && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,255,136,0.04)",
                border: "2px dashed rgba(0,255,136,0.4)",
                borderRadius: "6px",
                pointerEvents: "none",
              }}
            >
              <span style={{ color: "var(--terminal-green)", fontSize: "0.85rem" }}>
                Drop file here
              </span>
            </div>
          )}
        </div>

        {/* ── OUTPUT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: `1px solid ${
              error ? "rgba(255,123,114,0.3)" : "rgba(0,255,136,0.12)"
            }`,
            borderRadius: "6px",
            overflow: "hidden",
            transition: "border-color 0.15s",
          }}
        >
          {/* Output header bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 12px",
              borderBottom: "1px solid rgba(0,255,136,0.08)",
              backgroundColor: "rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <WindowDots />
              <span style={{ fontSize: "0.68rem", color: "rgba(0,255,136,0.5)" }}>
                {direction === "json2csv" ? "output.csv" : "output.json"}
              </span>
              {stats && !error && (
                <span style={{ fontSize: "0.62rem", color: "rgba(0,255,136,0.35)" }}>
                  {stats.rows} rows · {stats.cols} cols · {stats.sizeKb} KB
                </span>
              )}
              {direction === "json2csv" && output && !error && (
                <span style={{ fontSize: "0.6rem", color: "rgba(110,118,129,0.5)", fontStyle: "italic" }}>
                  // line breaks inside quotes = single field
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {output && <CopyBtn text={output} />}
              {output && (
                <button
                  onClick={downloadOutput}
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.68rem",
                    padding: "4px 11px",
                    borderRadius: "4px",
                    border: "1px solid rgba(0,255,136,0.3)",
                    backgroundColor: "rgba(0,255,136,0.06)",
                    color: "var(--terminal-green)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  ↓ Download
                </button>
              )}
            </div>
          </div>

          {error ? (
            <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
              <div
                style={{
                  padding: "13px 15px",
                  backgroundColor: "rgba(255,123,114,0.05)",
                  border: "1px solid rgba(255,123,114,0.2)",
                  borderRadius: "5px",
                }}
              >
                <p
                  style={{
                    fontFamily: monoFont,
                    fontSize: "0.68rem",
                    color: "#ff7b72",
                    marginBottom: "5px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  // parse error
                </p>
                <p style={{ fontFamily: monoFont, fontSize: "0.78rem", color: "rgba(255,123,114,0.85)", lineHeight: 1.6 }}>
                  {error}
                </p>
              </div>
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              placeholder="Converted output will appear here..."
              style={{
                flex: 1,
                minHeight: 0,
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                resize: "none",
                padding: "13px 14px",
                fontFamily: monoFont,
                fontSize: "0.77rem",
                color: output ? "rgba(255,255,255,0.75)" : "rgba(110,118,129,0.35)",
                lineHeight: 1.65,
                overflowY: "auto",
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile grid override */}
      <style>{`
        @media (max-width: 640px) {
          .json-csv-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .json-csv-grid > div {
            height: 320px;
          }
        }
      `}</style>
    </div>
  );
}
