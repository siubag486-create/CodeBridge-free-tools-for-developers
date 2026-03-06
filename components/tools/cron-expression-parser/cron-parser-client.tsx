"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Check, ShieldCheck, ChevronDown, RefreshCw, Play, Zap, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

// ─── Field Metadata ───────────────────────────────────────────────────────────

const FIELD_COLORS = {
  second:  { text: "#c678dd", bg: "rgba(198,120,221,0.12)", border: "rgba(198,120,221,0.3)"  },
  minute:  { text: "#58a6ff", bg: "rgba(88,166,255,0.1)",   border: "rgba(88,166,255,0.25)"  },
  hour:    { text: "#39d0d8", bg: "rgba(57,208,216,0.08)",  border: "rgba(57,208,216,0.2)"   },
  dom:     { text: "#00ff88", bg: "rgba(0,255,136,0.08)",   border: "rgba(0,255,136,0.2)"    },
  month:   { text: "#ffa657", bg: "rgba(255,166,87,0.1)",   border: "rgba(255,166,87,0.25)"  },
  dow:     { text: "#e3b341", bg: "rgba(227,179,65,0.08)",  border: "rgba(227,179,65,0.2)"   },
} as const;

type FieldKey = keyof typeof FIELD_COLORS;

const MONTH_NAMES  = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const DOW_NAMES    = ["sun","mon","tue","wed","thu","fri","sat"];
const MONTH_FULL   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW_FULL     = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// ─── Cron Engine ──────────────────────────────────────────────────────────────

interface ParsedField {
  raw: string;
  values: number[];
  isL?: boolean;
  isW?: boolean;
  hashVal?: [number, number];
}
interface CronParsed { ok: true;  fields: ParsedField[]; isSeconds: boolean }
interface CronError  { ok: false; error: string; fieldIndex?: number }
type CronResult = CronParsed | CronError;

const SHORTCUTS: Record<string, string> = {
  "@yearly":    "0 0 1 1 *",
  "@annually":  "0 0 1 1 *",
  "@monthly":   "0 0 1 * *",
  "@weekly":    "0 0 * * 0",
  "@daily":     "0 0 * * *",
  "@midnight":  "0 0 * * *",
  "@hourly":    "0 * * * *",
};

function parseFieldValues(
  raw: string, min: number, max: number, names?: string[]
): { values: number[]; isL?: boolean; isW?: boolean; hashVal?: [number, number] } | null {
  let f = raw.trim();
  if (names) names.forEach((n, i) => { f = f.replace(new RegExp(`\\b${n}\\b`, "gi"), String(min + i)); });

  if (f === "L") return { values: [-1], isL: true };
  if (/^\d+L$/.test(f)) { const d = parseInt(f); return { values: [d], isL: true }; }
  if (f.endsWith("W")) { const d = parseInt(f); if (isNaN(d)) return null; return { values: [d], isW: true }; }
  if (f.includes("#")) {
    const [a, b] = f.split("#");
    const dow = parseInt(a), n = parseInt(b);
    if (isNaN(dow) || isNaN(n)) return null;
    return { values: [dow], hashVal: [dow, n] };
  }

  const values = new Set<number>();
  for (const part of f.split(",")) {
    if (part === "*" || part === "?") {
      for (let i = min; i <= max; i++) values.add(i);
    } else if (part.includes("/")) {
      const si = part.lastIndexOf("/");
      const range = part.slice(0, si);
      const step = parseInt(part.slice(si + 1));
      if (isNaN(step) || step <= 0) return null;
      let lo = min, hi = max;
      if (range !== "*" && range !== "?") {
        if (range.includes("-")) { const [a,b] = range.split("-"); lo = parseInt(a); hi = parseInt(b); }
        else { lo = parseInt(range); if (isNaN(lo)) return null; }
      }
      if (isNaN(lo) || isNaN(hi)) return null;
      for (let i = lo; i <= hi; i += step) if (i >= min && i <= max) values.add(i);
    } else if (part.includes("-")) {
      const [a, b] = part.split("-");
      const lo = parseInt(a), hi = parseInt(b);
      if (isNaN(lo) || isNaN(hi) || lo > hi) return null;
      for (let i = lo; i <= hi; i++) if (i >= min && i <= max) values.add(i);
    } else {
      const n = parseInt(part);
      if (isNaN(n) || n < min || n > max) return null;
      values.add(n);
    }
  }
  return { values: Array.from(values).sort((a, b) => a - b) };
}

function parseCron(expr: string): CronResult {
  const norm = SHORTCUTS[expr.trim().toLowerCase()] ?? expr.trim();
  const parts = norm.split(/\s+/);
  const isSeconds = parts.length === 6;
  if (parts.length < 5 || parts.length > 6) return { ok: false, error: `Expected 5 or 6 fields, got ${parts.length}` };

  const defs = isSeconds
    ? [{ name: "second", min: 0, max: 59 }, { name: "minute", min: 0, max: 59 }, { name: "hour", min: 0, max: 23 }, { name: "day", min: 1, max: 31 }, { name: "month", min: 1, max: 12, names: MONTH_NAMES }, { name: "weekday", min: 0, max: 7, names: DOW_NAMES }]
    : [{ name: "minute", min: 0, max: 59 }, { name: "hour", min: 0, max: 23 }, { name: "day", min: 1, max: 31 }, { name: "month", min: 1, max: 12, names: MONTH_NAMES }, { name: "weekday", min: 0, max: 7, names: DOW_NAMES }];

  const fields: ParsedField[] = [];
  for (let i = 0; i < parts.length; i++) {
    const def = defs[i] as { name: string; min: number; max: number; names?: string[] };
    const r = parseFieldValues(parts[i], def.min, def.max, def.names);
    if (!r) return { ok: false, error: `Invalid ${def.name}: "${parts[i]}"`, fieldIndex: i };
    let vals = r.values.map(v => (def.name === "weekday" && v === 7) ? 0 : v);
    vals = [...new Set(vals)].sort((a, b) => a - b);
    fields.push({ raw: parts[i], values: vals, isL: r.isL, isW: r.isW, hashVal: r.hashVal });
  }
  return { ok: true, fields, isSeconds };
}

// ─── Date parts helper ────────────────────────────────────────────────────────

interface DateParts { month: number; day: number; hour: number; minute: number; second: number; dow: number }

function getDateParts(date: Date, tz: string): DateParts {
  if (tz === "UTC") {
    return {
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
      dow: date.getUTCDay(),
    };
  }
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz === "local" ? undefined : tz,
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric",
    hour12: false, weekday: "short",
  });
  const p = fmt.formatToParts(date);
  const g = (type: string) => { const v = p.find(x => x.type === type)?.value ?? "0"; return parseInt(v.replace(/\D/g, "") || "0"); };
  const wd = p.find(x => x.type === "weekday")?.value?.slice(0, 3) ?? "Sun";
  const dowMap: Record<string,number> = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };
  let hour = g("hour"); if (hour === 24) hour = 0;
  return { month: g("month"), day: g("day"), hour, minute: g("minute"), second: g("second"), dow: dowMap[wd] ?? 0 };
}

function getDaysInMonth(year: number, month: number) { return new Date(year, month, 0).getDate(); }

// ─── Next Executions ──────────────────────────────────────────────────────────

function getNextExecutions(expr: string, count: number, tz: string): Date[] {
  const r = parseCron(expr);
  if (!r.ok) return [];
  const { fields, isSeconds } = r;

  const fi = isSeconds
    ? { sec: 0, min: 1, hour: 2, dom: 3, month: 4, dow: 5 }
    : { sec: -1, min: 0, hour: 1, dom: 2, month: 3, dow: 4 };

  const domRaw = fields[fi.dom].raw;
  const dowRaw = fields[fi.dow].raw;
  const domWild = domRaw === "*" || domRaw === "?";
  const dowWild = dowRaw === "*" || dowRaw === "?";

  const matches = (date: Date): boolean => {
    const { month, day, hour, minute, second, dow } = getDateParts(date, tz);
    if (!fields[fi.month].values.includes(month)) return false;
    if (!fields[fi.hour].values.includes(hour)) return false;
    if (!fields[fi.min].values.includes(minute)) return false;
    if (isSeconds && fi.sec >= 0 && !fields[fi.sec].values.includes(second)) return false;

    if (domWild && dowWild) return true;
    if (domWild) return fields[fi.dow].values.includes(dow);
    if (dowWild) {
      if (fields[fi.dom].isL) {
        // Get year for this date in tz
        const fmtY = new Intl.DateTimeFormat("en-US", { timeZone: tz === "local" ? undefined : tz, year: "numeric", month: "numeric" });
        const yp = fmtY.formatToParts(date);
        const yr = parseInt(yp.find(x => x.type === "year")?.value ?? "0");
        const mo = parseInt(yp.find(x => x.type === "month")?.value ?? "0");
        return day === getDaysInMonth(yr, mo);
      }
      return fields[fi.dom].values.includes(day);
    }
    return fields[fi.dom].values.includes(day) || fields[fi.dow].values.includes(dow);
  };

  const step = isSeconds ? 1000 : 60000;
  const now = Date.now();
  let cur = Math.ceil((now + 1000) / step) * step;
  const maxIter = 200000;
  const results: Date[] = [];

  for (let i = 0; i < maxIter && results.length < count; i++, cur += step) {
    if (matches(new Date(cur))) results.push(new Date(cur));
  }
  return results;
}

// ─── Description ─────────────────────────────────────────────────────────────

function describeValue(raw: string, type: FieldKey): string {
  if (raw === "*" || raw === "?") return "every";
  let f = raw;
  if (type === "month")  MONTH_NAMES.forEach((n,i) => { f = f.replace(new RegExp(`\\b${n}\\b`,"gi"), String(i+1)); });
  if (type === "dow")    DOW_NAMES.forEach((n,i)   => { f = f.replace(new RegExp(`\\b${n}\\b`,"gi"), String(i)); });

  if (f === "L") return "last day";
  if (f.startsWith("*/")) {
    const s = f.slice(2);
    const unit = { second:"sec", minute:"min", hour:"hr", dom:"day", month:"mo", dow:"day" }[type];
    return `every ${s} ${unit}${s === "1" ? "" : "s"}`;
  }
  if (f.includes("/")) {
    const [range, step] = f.split("/");
    if (range.includes("-")) { const [a,b] = range.split("-"); return `${a}–${b}/${step}`; }
    return `${range}+${step}`;
  }
  if (f.includes(",")) {
    const vals = f.split(",");
    if (type === "month") return vals.map(v => MONTH_FULL[parseInt(v)-1]?.slice(0,3) ?? v).join(",");
    if (type === "dow")   return vals.map(v => DOW_FULL[parseInt(v)]?.slice(0,3) ?? v).join(",");
    return vals.join(",");
  }
  if (f.includes("-")) {
    const [a, b] = f.split("-");
    if (type === "month") return `${MONTH_FULL[parseInt(a)-1]?.slice(0,3) ?? a}–${MONTH_FULL[parseInt(b)-1]?.slice(0,3) ?? b}`;
    if (type === "dow")   return `${DOW_FULL[parseInt(a)]?.slice(0,3) ?? a}–${DOW_FULL[parseInt(b)]?.slice(0,3) ?? b}`;
    return `${a}–${b}`;
  }
  if (type === "month") return MONTH_FULL[parseInt(f)-1] ?? f;
  if (type === "dow")   return DOW_FULL[parseInt(f)] ?? f;
  if (type === "hour") {
    const h = parseInt(f);
    if (h === 0) return "12 AM"; if (h < 12) return `${h} AM`; if (h === 12) return "12 PM"; return `${h-12} PM`;
  }
  return f;
}

function fmtTime(hour: number, minute: number): string {
  const ampm = hour < 12 ? "AM" : "PM";
  const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h}:${String(minute).padStart(2,"0")} ${ampm}`;
}

function ordinal(n: string): string {
  const i = parseInt(n);
  if (isNaN(i)) return n;
  const s = ["th","st","nd","rd"];
  const v = i % 100;
  return i + (s[(v - 20) % 10] || s[v] || s[0]);
}

function describeCron(expr: string): string {
  const sc: Record<string, string> = {
    "@yearly":"Every year on January 1st at 12:00 AM",
    "@annually":"Every year on January 1st at 12:00 AM",
    "@monthly":"Every month on the 1st at 12:00 AM",
    "@weekly":"Every Sunday at 12:00 AM",
    "@daily":"Every day at 12:00 AM",
    "@midnight":"Every day at 12:00 AM",
    "@hourly":"Every hour at minute 0",
  };
  const low = expr.trim().toLowerCase();
  if (sc[low]) return sc[low];

  const r = parseCron(expr);
  if (!r.ok) return "Invalid expression";
  const { fields, isSeconds } = r;
  const fi = isSeconds
    ? { sec: 0, min: 1, hour: 2, dom: 3, month: 4, dow: 5 }
    : { sec: -1, min: 0, hour: 1, dom: 2, month: 3, dow: 4 };

  const minR = fields[fi.min].raw;
  const hrR  = fields[fi.hour].raw;
  const domR = fields[fi.dom].raw;
  const monR = fields[fi.month].raw;
  const dowR = fields[fi.dow].raw;
  const secR = isSeconds ? fields[fi.sec].raw : null;

  const domWild = domR === "*" || domR === "?";
  const dowWild = dowR === "*" || dowR === "?";
  const monWild = monR === "*";

  const mins  = fields[fi.min].values;
  const hours = fields[fi.hour].values;

  // ── Time string ──────────────────────────────────────────────────────────────
  let timeStr = "";
  if (isSeconds && secR && secR !== "*" && minR === "*" && hrR === "*") {
    timeStr = `at second ${secR} of every minute`;
  } else if (isSeconds && secR === "*" && minR === "*" && hrR === "*") {
    timeStr = "every second";
  } else if (minR === "*" && hrR === "*") {
    timeStr = "every minute";
  } else if (minR.startsWith("*/") && hrR === "*") {
    const s = minR.slice(2);
    timeStr = `every ${s} minute${s === "1" ? "" : "s"}`;
  } else if (hrR.startsWith("*/")) {
    const s = hrR.slice(2);
    timeStr = `every ${s} hour${s === "1" ? "" : "s"}${minR !== "0" ? ` at minute ${minR}` : ""}`;
  } else if (hrR === "*") {
    timeStr = `every hour at minute ${minR}`;
  } else if (hours.length === 1 && mins.length === 1) {
    timeStr = `at ${fmtTime(hours[0], mins[0])}`;
  } else if (hours.length > 1 && mins.length === 1) {
    const hList = hours.map(h => fmtTime(h, mins[0])).join(", ");
    timeStr = `at ${hList}`;
  } else {
    timeStr = `at minute ${minR} past hour ${hrR}`;
  }

  // ── Period string (day/month) ─────────────────────────────────────────────
  let periodStr = "";
  const monthSuffix = !monWild ? ` in ${describeValue(monR,"month")}` : "";

  if (domWild && dowWild) {
    // Every day
    periodStr = `every day${monthSuffix}`;
  } else if (domWild && !dowWild) {
    // Specific day(s) of week
    let dowLabel = describeValue(dowR, "dow");
    // make range more readable: "Monday–Friday" → "weekday (Mon–Fri)"
    if (dowR === "1-5") dowLabel = "weekday (Mon–Fri)";
    else if (dowR === "0-6" || dowR === "1-7") dowLabel = "day";
    periodStr = `every ${dowLabel}${monthSuffix}`;
  } else if (!domWild && dowWild) {
    // Specific day of month
    if (domR === "L") periodStr = `every month on the last day${monthSuffix}`;
    else periodStr = `every month on the ${ordinal(domR)}${monthSuffix}`;
  } else {
    // Both DOM and DOW specified
    periodStr = `every ${describeValue(dowR,"dow")} or ${ordinal(domR)} of the month${monthSuffix}`;
  }

  // ── Combine ──────────────────────────────────────────────────────────────────
  // For pure frequency expressions (every minute, every N minutes, etc.) show as-is
  if (["every second","every minute"].includes(timeStr) || timeStr.startsWith("every ") || timeStr.startsWith("at second")) {
    if (domWild && dowWild && monWild) {
      return timeStr.replace(/^./, c => c.toUpperCase());
    }
  }

  return `${periodStr.replace(/^./, c => c.toUpperCase())}, ${timeStr}`;
}

// ─── Field plain description (for breakdown panel) ───────────────────────────

function fieldExplain(raw: string, type: FieldKey): string {
  if (raw === "*" || raw === "?") return { second:"every second", minute:"every minute", hour:"every hour", dom:"every day", month:"every month", dow:"every day of week" }[type];
  if (raw === "L") return type === "dom" ? "last day of month" : "last weekday";
  if (raw.startsWith("*/")) { const s = raw.slice(2); return `every ${s} ${type === "minute" ? "minute" : type === "hour" ? "hour" : type === "second" ? "second" : type === "dom" ? "day" : type === "month" ? "month" : "day"}s`; }
  return describeValue(raw, type);
}

// ─── Timezone Dropdown (reused pattern) ──────────────────────────────────────

const TIMEZONES = [
  "UTC","local","America/New_York","America/Los_Angeles","America/Chicago","America/Denver",
  "America/Toronto","America/Sao_Paulo","Europe/London","Europe/Paris","Europe/Berlin",
  "Europe/Moscow","Europe/Istanbul","Asia/Seoul","Asia/Tokyo","Asia/Shanghai",
  "Asia/Singapore","Asia/Kolkata","Asia/Dubai","Australia/Sydney","Pacific/Auckland",
];

function TzSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top:0, left:0, width:0 });
  const ref = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY + 4, left: r.left + window.scrollX, width: Math.max(r.width, 200) });
    }
    setOpen(o => !o);
  };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const d = document.getElementById("cron-tz-drop");
      if (ref.current && !ref.current.contains(e.target as Node) && d && !d.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const dropdown = open && typeof document !== "undefined" ? createPortal(
    <div id="cron-tz-drop" style={{ position:"absolute", top:pos.top, left:pos.left, width:pos.width, zIndex:9999, border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", background:"#0a0a0a", boxShadow:"0 8px 24px rgba(0,0,0,0.6)", maxHeight:220, overflowY:"auto" }}>
      {TIMEZONES.map(tz => (
        <button key={tz} onClick={() => { onChange(tz); setOpen(false); }} style={{ display:"block", width:"100%", textAlign:"left", padding:"7px 12px", background: tz === value ? "rgba(0,255,136,0.08)":"none", border:"none", cursor:"pointer", fontFamily:monoFont, fontSize:"0.7rem", color: tz === value ? "var(--terminal-green)":"var(--code-comment)" }}>
          {tz}
        </button>
      ))}
    </div>, document.body
  ) : null;

  return (
    <div style={{ position:"relative" }}>
      <button ref={ref} onClick={toggle} style={{ display:"flex", alignItems:"center", gap:6, fontFamily:monoFont, fontSize:"0.7rem", padding:"5px 10px", borderRadius:6, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(0,0,0,0.8)", color:"var(--code-comment)", cursor:"pointer", minWidth:160, justifyContent:"space-between" }}>
        <span>{value}</span>
        <ChevronDown size={11} style={{ opacity:0.5, transform: open ? "rotate(180deg)":"none", transition:"transform 0.15s" }} />
      </button>
      {dropdown}
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyBtn({ text, size = "sm" }: { text: string; size?: "sm" | "xs" }) {
  const [copied, setCopied] = useState(false);
  const handle = () => navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  const pad = size === "xs" ? "2px 7px" : "4px 10px";
  const fs = size === "xs" ? "0.65rem" : "0.7rem";
  return (
    <button onClick={handle} style={{ display:"flex", alignItems:"center", gap:4, fontFamily:monoFont, fontSize:fs, padding:pad, borderRadius:4, cursor:"pointer", border: copied ? "1px solid rgba(0,255,136,0.5)":"1px solid rgba(255,255,255,0.1)", background: copied ? "rgba(0,255,136,0.08)":"rgba(255,255,255,0.04)", color: copied ? "var(--terminal-green)":"var(--code-comment)", transition:"all 0.15s", flexShrink:0 }}>
      {copied ? <Check size={10}/> : <Copy size={10}/>}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── Relative time ────────────────────────────────────────────────────────────

function relTime(date: Date): string {
  const diff = date.getTime() - Date.now();
  if (diff < 0) return "past";
  const s = Math.floor(diff / 1000);
  if (s < 60) return `in ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `in ${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `in ${h}h ${m % 60}m`;
  const d = Math.floor(h / 24);
  return `in ${d}d`;
}

function formatExecDate(date: Date, tz: string): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: tz === "local" ? undefined : tz,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).format(date).replace(" ", "T").replace("T", "  ");
}

// ─── WindowDots ───────────────────────────────────────────────────────────────

function WindowDots() {
  return (
    <div style={{ display:"flex", gap:5 }}>
      {(["#ff5f56","#ffbd2e","#27c93f"] as const).map(c => (
        <div key={c} style={{ width:10, height:10, borderRadius:"50%", backgroundColor:c, opacity:0.85 }} />
      ))}
    </div>
  );
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS = [
  { label: "@hourly",       expr: "@hourly",       desc: "Once an hour" },
  { label: "@daily",        expr: "@daily",         desc: "Once a day at midnight" },
  { label: "@weekly",       expr: "@weekly",        desc: "Once a week, Sunday midnight" },
  { label: "@monthly",      expr: "@monthly",       desc: "1st of every month" },
  { label: "@yearly",       expr: "@yearly",        desc: "January 1st every year" },
  { label: "Every minute",  expr: "* * * * *",      desc: "Every minute" },
  { label: "Every 5 min",   expr: "*/5 * * * *",    desc: "Every 5 minutes" },
  { label: "Every 15 min",  expr: "*/15 * * * *",   desc: "Every 15 minutes" },
  { label: "Every 30 min",  expr: "*/30 * * * *",   desc: "Every 30 minutes" },
  { label: "Every 6 hours", expr: "0 */6 * * *",    desc: "Every 6 hours" },
  { label: "Weekdays 9 AM", expr: "0 9 * * 1-5",    desc: "Mon–Fri at 9:00 AM" },
  { label: "Weekdays 9-17", expr: "0 9-17 * * 1-5", desc: "Mon–Fri, every hour 9–17" },
  { label: "Every Sunday",  expr: "0 0 * * 0",      desc: "Sunday at midnight" },
  { label: "Every weekday", expr: "0 0 * * 1-5",    desc: "Mon–Fri at midnight" },
  { label: "Midnight daily",expr: "0 0 * * *",      desc: "Every day at 00:00" },
  { label: "Noon daily",    expr: "0 12 * * *",     desc: "Every day at 12:00" },
  { label: "1st of month",  expr: "0 0 1 * *",      desc: "1st of every month at midnight" },
  { label: "Last min of hr",expr: "59 * * * *",     desc: "At minute 59 of every hour" },
  { label: "Every Jan 1",   expr: "0 0 1 1 *",      desc: "Jan 1 at midnight" },
  { label: "Every Friday",  expr: "0 0 * * 5",      desc: "Friday at midnight" },
  { label: "Twice daily",   expr: "0 0,12 * * *",   desc: "At midnight and noon" },
  { label: "Q start",       expr: "0 0 1 1,4,7,10 *", desc: "Start of each quarter" },
];

// ─── Builder helpers ──────────────────────────────────────────────────────────

type BuildMode = "every" | "step" | "specific" | "range";
interface FieldState { mode: BuildMode; step: string; specific: string; rangeFrom: string; rangeTo: string }

function fieldStateToExpr(state: FieldState, min: number, max: number): string {
  switch (state.mode) {
    case "every": return "*";
    case "step":  return `*/${state.step || "1"}`;
    case "specific": return state.specific || String(min);
    case "range": return `${state.rangeFrom || min}-${state.rangeTo || max}`;
  }
}

const defaultFieldState = (): FieldState => ({ mode: "every", step: "", specific: "", rangeFrom: "", rangeTo: "" });

// ─── Main Component ───────────────────────────────────────────────────────────

type TabId = "parser" | "builder";

export default function CronParserClient() {
  const [tab, setTab] = useState<TabId>("parser");
  const [expr, setExpr] = useState("");
  const [tz, setTz] = useState("UTC");
  const [count] = useState(10);
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Builder state
  const [builderFields, setBuilderFields] = useState<{
    minute: FieldState; hour: FieldState; dom: FieldState; month: FieldState; dow: FieldState;
  }>({ minute: defaultFieldState(), hour: defaultFieldState(), dom: defaultFieldState(), month: defaultFieldState(), dow: defaultFieldState() });

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const parseResult = parseCron(expr);
  const description = describeCron(expr);
  const executions = parseResult.ok ? getNextExecutions(expr, count, tz) : [];

  // Field breakdown
  const fieldDefs: { key: FieldKey; label: string; idx: number }[] = parseResult.ok && parseResult.isSeconds
    ? [
        { key: "second", label: "SECOND",  idx: 0 },
        { key: "minute", label: "MINUTE",  idx: 1 },
        { key: "hour",   label: "HOUR",    idx: 2 },
        { key: "dom",    label: "DAY",     idx: 3 },
        { key: "month",  label: "MONTH",   idx: 4 },
        { key: "dow",    label: "WEEKDAY", idx: 5 },
      ]
    : [
        { key: "minute", label: "MINUTE",  idx: 0 },
        { key: "hour",   label: "HOUR",    idx: 1 },
        { key: "dom",    label: "DAY",     idx: 2 },
        { key: "month",  label: "MONTH",   idx: 3 },
        { key: "dow",    label: "WEEKDAY", idx: 4 },
      ];

  // Sync builder → parser expr
  const builderExpr = [
    fieldStateToExpr(builderFields.minute, 0, 59),
    fieldStateToExpr(builderFields.hour, 0, 23),
    fieldStateToExpr(builderFields.dom, 1, 31),
    fieldStateToExpr(builderFields.month, 1, 12),
    fieldStateToExpr(builderFields.dow, 0, 6),
  ].join(" ");

  const updateBuilderField = useCallback((name: keyof typeof builderFields, key: keyof FieldState, val: string | BuildMode) => {
    setBuilderFields(prev => ({ ...prev, [name]: { ...prev[name], [key]: val } }));
  }, []);

  // Field parts of input for highlighting
  const inputParts = expr.trim().split(/\s+/);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Badge */}
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:6, border:"1px solid rgba(0,255,136,0.15)", backgroundColor:"rgba(0,255,136,0.05)", width:"fit-content" }}>
        <ShieldCheck size={12} style={{ color:"var(--terminal-green)", flexShrink:0 }} />
        <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)" }}>100% client-side — no data leaves your browser</span>
      </div>

      {/* Terminal card */}
      <div style={{ border:"1px solid var(--terminal-border)", borderRadius:10, overflow:"hidden", backgroundColor:"rgba(0,0,0,0.6)" }}>
        {/* Titlebar */}
        <div style={{ backgroundColor:"rgba(16,16,16,0.99)", borderBottom:"1px solid var(--terminal-border)", padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
          <WindowDots />
          <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)", opacity:0.5, letterSpacing:"0.06em" }}>
            cron-parser — expression parser &amp; generator
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid var(--terminal-border)", backgroundColor:"rgba(16,16,16,0.5)" }}>
          {(["parser","builder"] as TabId[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ fontFamily:monoFont, fontSize:"0.72rem", padding:"9px 18px", border:"none", borderBottom: tab===t ? "2px solid var(--terminal-green)" : "2px solid transparent", cursor:"pointer", background:"none", color: tab===t ? "var(--terminal-green)" : "var(--code-comment)", letterSpacing:"0.04em", transition:"all 0.15s", marginBottom:-1 }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding:20 }}>
          {tab === "parser" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

              {/* Input */}
              <div style={{ border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, overflow:"hidden" }}>
                <div style={{ padding:"6px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)", backgroundColor:"rgba(255,255,255,0.03)", fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", letterSpacing:"0.1em", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span>CRON EXPRESSION</span>
                  <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.6rem" }}>5-field (min hr dom mon dow) or 6-field with seconds</span>
                </div>
                <div style={{ position:"relative" }}>
                  <input
                    ref={el => { if (el) el.focus({ preventScroll: true }); }}
                    value={expr}
                    onChange={e => setExpr(e.target.value)}
                    spellCheck={false}
                    placeholder="Enter cron expression"
                    style={{ width:"100%", padding:"14px 16px", background:"rgba(0,0,0,0.9)", border:"none", outline:"none", fontFamily:monoFont, fontSize:"0.82rem", color: !expr.trim() ? "#e6edf3" : parseResult.ok ? "#e6edf3" : "#ff7b72", boxSizing:"border-box", letterSpacing:"0.04em" }}
                  />

                </div>

                {/* Field labels */}
                <div style={{ padding:"6px 16px 10px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                  {fieldDefs.map(({ key, label, idx }) => {
                    const col = FIELD_COLORS[key];
                    const part = inputParts[idx];
                    const isError = !parseResult.ok && parseResult.fieldIndex === idx;
                    return (
                      <div key={key} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                        <span style={{ fontFamily:monoFont, fontSize:"0.85rem", color: isError ? "#ff7b72" : col.text, fontWeight:700, letterSpacing:"0.04em", minWidth:28, textAlign:"center" }}>
                          {part ?? "?"}
                        </span>
                        <span style={{ fontFamily:monoFont, fontSize:"0.56rem", color: col.text, opacity:0.6, letterSpacing:"0.08em" }}>{label}</span>
                      </div>
                    );
                  })}
                  <div style={{ flex:1 }} />
                  <CopyBtn text={expr} />
                  <button onClick={() => setExpr("")} style={{ display:"flex", alignItems:"center", gap:4, fontFamily:monoFont, fontSize:"0.7rem", padding:"4px 10px", borderRadius:4, cursor:"pointer", border:"1px solid rgba(255,123,114,0.2)", background:"rgba(255,123,114,0.04)", color:"var(--code-comment)", transition:"all 0.15s", flexShrink:0 }}>
                    <Trash2 size={10} />
                    Clear
                  </button>
                </div>
              </div>

              {/* Quick examples */}
              {!expr.trim() && (
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", opacity:0.5 }}>quick start:</span>
                  {["* * * * *", "*/5 * * * *", "0 9 * * 1-5", "@daily", "0 0 1 * *"].map(s => (
                    <button key={s} onClick={() => setExpr(s)} style={{ fontFamily:monoFont, fontSize:"0.7rem", padding:"3px 10px", borderRadius:4, border:"1px solid rgba(0,255,136,0.2)", background:"rgba(0,255,136,0.04)", color:"var(--terminal-green)", cursor:"pointer" }}>
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Error */}
              {expr.trim() && !parseResult.ok && (
                <div style={{ fontFamily:monoFont, fontSize:"0.78rem", color:"#ff7b72", padding:"8px 12px", border:"1px solid rgba(255,123,114,0.2)", borderRadius:6, background:"rgba(255,123,114,0.04)" }}>
                  {parseResult.error}
                </div>
              )}

              {/* Description badge */}
              {parseResult.ok && (
                <div style={{ padding:"10px 14px", border:"1px solid rgba(0,255,136,0.2)", borderRadius:7, background:"rgba(0,255,136,0.04)", display:"flex", alignItems:"center", gap:8 }}>
                  <Zap size={13} style={{ color:"var(--terminal-green)", flexShrink:0 }} />
                  <span style={{ fontFamily:monoFont, fontSize:"0.82rem", color:"var(--terminal-green)" }}>{description}</span>
                </div>
              )}

              {/* Two-column: Field breakdown + Next executions */}
              {parseResult.ok && (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>

                  {/* Field breakdown */}
                  <div style={{ border:"1px solid var(--terminal-border)", borderRadius:8, overflow:"hidden" }}>
                    <div style={{ padding:"7px 12px", borderBottom:"1px solid var(--terminal-border)", backgroundColor:"rgba(16,16,16,0.7)", fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", letterSpacing:"0.1em" }}>
                      FIELD BREAKDOWN
                    </div>
                    {fieldDefs.map(({ key, label, idx }) => {
                      const col = FIELD_COLORS[key];
                      const field = parseResult.fields[idx];
                      const explain = fieldExplain(field.raw, key);
                      return (
                        <div key={key} style={{ display:"grid", gridTemplateColumns:"70px 1fr", alignItems:"center", padding:"8px 12px", borderBottom:"1px solid rgba(255,255,255,0.04)", gap:8 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                            <div style={{ width:3, height:16, borderRadius:2, backgroundColor:col.text, flexShrink:0 }} />
                            <span style={{ fontFamily:monoFont, fontSize:"0.6rem", color:col.text, letterSpacing:"0.08em" }}>{label}</span>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ fontFamily:monoFont, fontSize:"0.75rem", color:col.text, background:col.bg, border:`1px solid ${col.border}`, borderRadius:4, padding:"1px 7px", flexShrink:0 }}>{field.raw}</span>
                            <span style={{ fontFamily:monoFont, fontSize:"0.7rem", color:"var(--code-comment)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{explain}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next executions */}
                  <div style={{ border:"1px solid var(--terminal-border)", borderRadius:8, overflow:"hidden" }}>
                    <div style={{ padding:"7px 12px", borderBottom:"1px solid var(--terminal-border)", backgroundColor:"rgba(16,16,16,0.7)", fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", letterSpacing:"0.1em", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span>NEXT EXECUTIONS</span>
                      <TzSelect value={tz} onChange={setTz} />
                    </div>
                    {executions.length === 0 ? (
                      <div style={{ padding:"20px 12px", fontFamily:monoFont, fontSize:"0.72rem", color:"var(--code-comment)", opacity:0.4, textAlign:"center" }}>No executions found in next ~4 years</div>
                    ) : executions.map((d, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 12px", borderBottom:"1px solid rgba(255,255,255,0.04)", gap:8 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontFamily:monoFont, fontSize:"0.65rem", color:"rgba(0,255,136,0.4)", width:14, textAlign:"right", flexShrink:0 }}>{i+1}</span>
                          <span style={{ fontFamily:monoFont, fontSize:"0.75rem", color:"#e6edf3" }}>{formatExecDate(d, tz)}</span>
                        </div>
                        <span style={{ fontFamily:monoFont, fontSize:"0.65rem", color:"var(--electric-blue)", flexShrink:0 }}>{relTime(d)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "builder" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Generated expression */}
              <div style={{ padding:"12px 16px", border:"1px solid rgba(0,255,136,0.2)", borderRadius:8, background:"rgba(0,255,136,0.04)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontFamily:monoFont, fontSize:"0.65rem", color:"rgba(0,255,136,0.5)", letterSpacing:"0.08em" }}>GENERATED</span>
                  <span style={{ fontFamily:monoFont, fontSize:"1rem", color:"var(--terminal-green)", letterSpacing:"0.1em" }}>{builderExpr}</span>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <CopyBtn text={builderExpr} />
                  <button onClick={() => { setExpr(builderExpr); setTab("parser"); }}
                    style={{ display:"flex", alignItems:"center", gap:5, fontFamily:monoFont, fontSize:"0.7rem", padding:"4px 10px", borderRadius:4, cursor:"pointer", border:"1px solid rgba(0,255,136,0.2)", background:"rgba(0,255,136,0.06)", color:"var(--terminal-green)" }}>
                    <Play size={10} /> Test
                  </button>
                </div>
              </div>

              <div style={{ fontFamily:monoFont, fontSize:"0.8rem", color:"var(--terminal-green)", opacity:0.8 }}>
                {describeCron(builderExpr)}
              </div>

              {/* Builder fields */}
              {(["minute","hour","dom","month","dow"] as const).map(fname => {
                const fk = fname === "dom" ? "dom" : fname as FieldKey;
                const col = FIELD_COLORS[fk];
                const label = { minute:"MINUTE (0-59)", hour:"HOUR (0-23)", dom:"DAY OF MONTH (1-31)", month:"MONTH (1-12)", dow:"DAY OF WEEK (0=Sun, 6=Sat)" }[fname];
                const ranges = { minute:{min:0,max:59}, hour:{min:0,max:23}, dom:{min:1,max:31}, month:{min:1,max:12}, dow:{min:0,max:6} }[fname];
                const state = builderFields[fname];

                return (
                  <div key={fname} style={{ border:`1px solid ${col.border}`, borderRadius:8, overflow:"hidden" }}>
                    <div style={{ padding:"7px 12px", borderBottom:`1px solid ${col.border}`, backgroundColor:col.bg, fontFamily:monoFont, fontSize:"0.63rem", color:col.text, letterSpacing:"0.1em", display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:3, height:12, borderRadius:2, backgroundColor:col.text }} />
                      {label}
                    </div>
                    <div style={{ padding:"12px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                      {/* Mode selector */}
                      <div style={{ display:"flex", border:`1px solid ${col.border}`, borderRadius:6, overflow:"hidden" }}>
                        {(["every","step","specific","range"] as BuildMode[]).map(m => (
                          <button key={m} onClick={() => updateBuilderField(fname, "mode", m)}
                            style={{ fontFamily:monoFont, fontSize:"0.65rem", padding:"4px 10px", border:"none", borderRight:`1px solid ${col.border}`, cursor:"pointer", background: state.mode === m ? col.bg : "transparent", color: state.mode === m ? col.text : "var(--code-comment)", transition:"all 0.1s", whiteSpace:"nowrap" }}>
                            {m}
                          </button>
                        ))}
                      </div>

                      {/* Mode inputs */}
                      {state.mode === "step" && (
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)" }}>every</span>
                          <input value={state.step} onChange={e => updateBuilderField(fname,"step",e.target.value)} placeholder="5"
                            style={{ width:56, padding:"4px 8px", background:"rgba(0,0,0,0.9)", border:`1px solid ${col.border}`, borderRadius:4, outline:"none", fontFamily:monoFont, fontSize:"0.78rem", color:col.text }} />
                          <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)" }}>units</span>
                        </div>
                      )}
                      {state.mode === "specific" && (
                        <input value={state.specific} onChange={e => updateBuilderField(fname,"specific",e.target.value)} placeholder={`${ranges.min},${ranges.min+5}`}
                          style={{ width:120, padding:"4px 8px", background:"rgba(0,0,0,0.9)", border:`1px solid ${col.border}`, borderRadius:4, outline:"none", fontFamily:monoFont, fontSize:"0.78rem", color:col.text }} />
                      )}
                      {state.mode === "range" && (
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <input value={state.rangeFrom} onChange={e => updateBuilderField(fname,"rangeFrom",e.target.value)} placeholder={String(ranges.min)}
                            style={{ width:52, padding:"4px 8px", background:"rgba(0,0,0,0.9)", border:`1px solid ${col.border}`, borderRadius:4, outline:"none", fontFamily:monoFont, fontSize:"0.78rem", color:col.text }} />
                          <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)" }}>to</span>
                          <input value={state.rangeTo} onChange={e => updateBuilderField(fname,"rangeTo",e.target.value)} placeholder={String(ranges.max)}
                            style={{ width:52, padding:"4px 8px", background:"rgba(0,0,0,0.9)", border:`1px solid ${col.border}`, borderRadius:4, outline:"none", fontFamily:monoFont, fontSize:"0.78rem", color:col.text }} />
                        </div>
                      )}

                      <div style={{ flex:1 }} />
                      <span style={{ fontFamily:monoFont, fontSize:"0.72rem", color:col.text, background:col.bg, border:`1px solid ${col.border}`, borderRadius:4, padding:"2px 10px" }}>
                        {fieldStateToExpr(state, ranges.min, ranges.max)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Presets */}
      <div style={{ border:"1px solid var(--terminal-border)", borderRadius:10, overflow:"hidden" }}>
        <button onClick={() => setPresetsOpen(o => !o)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:"rgba(16,16,16,0.8)", border:"none", cursor:"pointer", borderBottom: presetsOpen ? "1px solid var(--terminal-border)" : "none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <RefreshCw size={12} style={{ color:"var(--terminal-green)" }} />
            <span style={{ fontFamily:monoFont, fontSize:"0.7rem", color:"var(--code-comment)", letterSpacing:"0.06em" }}>PRESET EXPRESSIONS</span>
            <span style={{ fontFamily:monoFont, fontSize:"0.6rem", color:"rgba(0,255,136,0.4)" }}>{PRESETS.length} presets</span>
            {!presetsOpen && (
              <span style={{ fontFamily:monoFont, fontSize:"0.62rem", color:"var(--electric-blue)", opacity:0.7 }}>— click to browse common schedules</span>
            )}
          </div>
          <ChevronDown size={13} style={{ color:"var(--code-comment)", opacity:0.5, transform: presetsOpen ? "rotate(180deg)":"none", transition:"transform 0.2s" }} />
        </button>

        {presetsOpen && (
          <div style={{ padding:14, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:8 }}>
            {PRESETS.map(({ label, expr: pe, desc }) => (
              <button key={pe+label} onClick={() => { setExpr(pe); setTab("parser"); }}
                style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"8px 12px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:6, background:"rgba(255,255,255,0.02)", cursor:"pointer", textAlign:"left", transition:"all 0.15s", gap:3 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(0,255,136,0.25)"; (e.currentTarget as HTMLElement).style.background="rgba(0,255,136,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.02)"; }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%" }}>
                  <span style={{ fontFamily:monoFont, fontSize:"0.72rem", color:"var(--terminal-green)" }}>{label}</span>
                  <span style={{ fontFamily:monoFont, fontSize:"0.65rem", color:"var(--electric-blue)", background:"rgba(255,255,255,0.05)", borderRadius:3, padding:"1px 6px" }}>{pe}</span>
                </div>
                <span style={{ fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", opacity:0.7 }}>{desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Special characters reference */}
      <div style={{ border:"1px solid var(--terminal-border)", borderRadius:10, overflow:"hidden" }}>
        <button onClick={() => setSpecOpen(o => !o)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:"rgba(16,16,16,0.8)", border:"none", cursor:"pointer", borderBottom: specOpen ? "1px solid var(--terminal-border)":"none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:monoFont, fontSize:"0.72rem", color:"var(--code-comment)", letterSpacing:"0.06em" }}>SPECIAL CHARACTER REFERENCE</span>
          </div>
          <ChevronDown size={13} style={{ color:"var(--code-comment)", opacity:0.5, transform: specOpen ? "rotate(180deg)":"none", transition:"transform 0.2s" }} />
        </button>
        {specOpen && (
          <div style={{ padding:14, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:8 }}>
            {[
              { char:"*",  label:"Wildcard",      ex:"* * * * *",    desc:"Match any value for this field" },
              { char:",",  label:"List",           ex:"1,3,5 * * * *", desc:"Match specific values (1, 3, and 5)" },
              { char:"-",  label:"Range",          ex:"1-5 * * * *",  desc:"Match a range of values (1 through 5)" },
              { char:"/",  label:"Step",           ex:"*/15 * * * *", desc:"Every N units (*/15 = every 15)" },
              { char:"?",  label:"No specific",    ex:"0 0 ? * 1",    desc:"Ignored (use * for DOM or DOW)" },
              { char:"L",  label:"Last",           ex:"0 0 L * *",    desc:"Last day of month in DOM field" },
              { char:"W",  label:"Weekday",        ex:"0 0 15W * *",  desc:"Nearest weekday to given day" },
              { char:"#",  label:"Nth weekday",    ex:"0 0 * * 5#3",  desc:"3rd Friday of the month" },
            ].map(({ char, label, ex, desc }) => (
              <div key={char} style={{ padding:"10px 12px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:6, background:"rgba(255,255,255,0.02)", display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontFamily:monoFont, fontSize:"1rem", color:"var(--electric-blue)", fontWeight:700, width:20 }}>{char}</span>
                  <span style={{ fontFamily:monoFont, fontSize:"0.72rem", color:"rgba(255,255,255,0.65)", fontWeight:700 }}>{label}</span>
                  <button onClick={() => setExpr(ex)} style={{ marginLeft:"auto", fontFamily:monoFont, fontSize:"0.62rem", color:"var(--terminal-green)", background:"rgba(0,255,136,0.06)", border:"1px solid rgba(0,255,136,0.15)", borderRadius:3, padding:"1px 7px", cursor:"pointer" }}>
                    try
                  </button>
                </div>
                <code style={{ fontFamily:monoFont, fontSize:"0.7rem", color:"var(--code-comment)", background:"rgba(0,0,0,0.3)", borderRadius:3, padding:"1px 6px", width:"fit-content" }}>{ex}</code>
                <span style={{ fontFamily:monoFont, fontSize:"0.65rem", color:"var(--code-comment)", opacity:0.7 }}>{desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
