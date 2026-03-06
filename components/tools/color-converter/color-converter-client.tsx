"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check, ShieldCheck, Pipette } from "lucide-react";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

// ─── Types ────────────────────────────────────────────────────────────────────
type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };
type OKLCH = { l: number; c: number; h: number };
type FormatKey = "hex" | "rgb" | "hsl" | "oklch";

// ─── Color Math ───────────────────────────────────────────────────────────────
function clamp(n: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, n)); }

function hexToRgb(hex: string): RGB | null {
  const h = hex.replace(/^#/, "").trim().toLowerCase();
  if (/^[0-9a-f]{3}$/.test(h)) return { r: parseInt(h[0]+h[0],16), g: parseInt(h[1]+h[1],16), b: parseInt(h[2]+h[2],16) };
  if (/^[0-9a-f]{6}$/.test(h)) return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
  return null;
}

function rgbToHex({ r, g, b }: RGB): string {
  return "#" + [r,g,b].map(v => clamp(Math.round(v),0,255).toString(16).padStart(2,"0")).join("");
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn=r/255, gn=g/255, bn=b/255;
  const max=Math.max(rn,gn,bn), min=Math.min(rn,gn,bn), l=(max+min)/2;
  if (max===min) return { h:0, s:0, l:l*100 };
  const d=max-min, s=l>0.5?d/(2-max-min):d/(max+min);
  let h: number;
  if (max===rn) h=((gn-bn)/d+(gn<bn?6:0))/6;
  else if (max===gn) h=((bn-rn)/d+2)/6;
  else h=((rn-gn)/d+4)/6;
  return { h:h*360, s:s*100, l:l*100 };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const hn=h/360, sn=s/100, ln=l/100;
  if (sn===0) { const v=Math.round(ln*255); return { r:v, g:v, b:v }; }
  const q=ln<0.5?ln*(1+sn):ln+sn-ln*sn, p=2*ln-q;
  function hue(t: number) {
    if (t<0) t+=1; if (t>1) t-=1;
    if (t<1/6) return p+(q-p)*6*t;
    if (t<1/2) return q;
    if (t<2/3) return p+(q-p)*(2/3-t)*6;
    return p;
  }
  return { r:Math.round(hue(hn+1/3)*255), g:Math.round(hue(hn)*255), b:Math.round(hue(hn-1/3)*255) };
}

function toLinear(c: number) { c=clamp(c/255); return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); }
function fromLinear(c: number) { c=clamp(c); return c<=0.0031308?c*12.92:1.055*Math.pow(c,1/2.4)-0.055; }

function rgbToOklch({ r, g, b }: RGB): OKLCH {
  const lr=toLinear(r), lg=toLinear(g), lb=toLinear(b);
  const lm=0.4121656120*lr+0.5362752080*lg+0.0514575653*lb;
  const mm=0.2118591070*lr+0.6807189584*lg+0.1074065790*lb;
  const sm=0.0883097947*lr+0.2818474174*lg+0.6302613616*lb;
  const l_=Math.cbrt(lm), m_=Math.cbrt(mm), s_=Math.cbrt(sm);
  const L=0.2104542553*l_+0.7936177850*m_-0.0040720468*s_;
  const a=1.9779984951*l_-2.4285922050*m_+0.4505937099*s_;
  const bk=0.0259040371*l_+0.7827717662*m_-0.8086757660*s_;
  const C=Math.sqrt(a*a+bk*bk);
  let H=Math.atan2(bk,a)*180/Math.PI;
  if (H<0) H+=360;
  return { l:L*100, c:C, h:H };
}

function oklchToRgb({ l, c, h }: OKLCH): RGB {
  const L=l/100;
  const a=c*Math.cos(h*Math.PI/180), bk=c*Math.sin(h*Math.PI/180);
  const l_=L+0.3963377774*a+0.2158037573*bk;
  const m_=L-0.1055613458*a-0.0638541728*bk;
  const s_=L-0.0894841775*a-1.2914855480*bk;
  const lm=l_*l_*l_, mm=m_*m_*m_, sm=s_*s_*s_;
  const lr=+4.0767416621*lm-3.3077115913*mm+0.2309699292*sm;
  const lg=-1.2684380046*lm+2.6097574011*mm-0.3413193965*sm;
  const lb=-0.0041960863*lm-0.7034186147*mm+1.7076147010*sm;
  return { r:Math.round(clamp(fromLinear(lr))*255), g:Math.round(clamp(fromLinear(lg))*255), b:Math.round(clamp(fromLinear(lb))*255) };
}

function luminance({ r, g, b }: RGB) { return 0.2126*toLinear(r)+0.7152*toLinear(g)+0.0722*toLinear(b); }
function contrastRatio(a: RGB, b: RGB) {
  const la=luminance(a)+0.05, lb=luminance(b)+0.05;
  return la>lb?la/lb:lb/la;
}
function wcagRating(ratio: number, large = false): "AAA" | "AA" | "Fail" {
  if (large) return ratio>=4.5?"AAA":ratio>=3?"AA":"Fail";
  return ratio>=7?"AAA":ratio>=4.5?"AA":"Fail";
}

// ─── HSV (for custom picker) ───────────────────────────────────────────────
function rgbToHsv({ r, g, b }: RGB): { h: number; s: number; v: number } {
  const rn=r/255, gn=g/255, bn=b/255;
  const max=Math.max(rn,gn,bn), min=Math.min(rn,gn,bn), v=max, d=max-min;
  const s = max===0 ? 0 : d/max;
  let h=0;
  if (max!==min) {
    if (max===rn) h=((gn-bn)/d+(gn<bn?6:0))/6;
    else if (max===gn) h=((bn-rn)/d+2)/6;
    else h=((rn-gn)/d+4)/6;
  }
  return { h:h*360, s:s*100, v:v*100 };
}
function hsvToRgb(h: number, s: number, v: number): RGB {
  h/=360; s/=100; v/=100;
  const i=Math.floor(h*6), f=h*6-i, p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
  let r=0,g=0,b=0;
  switch(i%6){case 0:r=v;g=t;b=p;break;case 1:r=q;g=v;b=p;break;case 2:r=p;g=v;b=t;break;case 3:r=p;g=q;b=v;break;case 4:r=t;g=p;b=v;break;default:r=v;g=p;b=q;}
  return { r:Math.round(r*255), g:Math.round(g*255), b:Math.round(b*255) };
}

// ─── Format strings ───────────────────────────────────────────────────────────
function fmtHex(rgb: RGB) { return rgbToHex(rgb).toUpperCase(); }
function fmtRgb({ r, g, b }: RGB) { return `rgb(${r}, ${g}, ${b})`; }
function fmtHsl(rgb: RGB) {
  const { h, s, l } = rgbToHsl(rgb);
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}
function fmtOklch(rgb: RGB) {
  const { l, c, h } = rgbToOklch(rgb);
  return `oklch(${l.toFixed(1)}% ${c.toFixed(3)} ${Math.round(h)})`;
}

// ─── Parsers ──────────────────────────────────────────────────────────────────
function parseHex(s: string): RGB | null { return hexToRgb(s.trim()); }

function parseRgb(s: string): RGB | null {
  const nums = s.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return null;
  const r=Math.round(+nums[0]), g=Math.round(+nums[1]), b=Math.round(+nums[2]);
  if ([r,g,b].some(isNaN) || r>255 || g>255 || b>255) return null;
  return { r, g, b };
}

function parseHsl(s: string): RGB | null {
  const nums = s.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return null;
  const h=+nums[0], sl=+nums[1], l=+nums[2];
  if ([h,sl,l].some(isNaN) || h>360 || sl>100 || l>100) return null;
  return hslToRgb({ h, s:sl, l });
}

function parseOklch(s: string): RGB | null {
  const nums = s.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return null;
  let l=+nums[0];
  if (l>1) l=l/100;
  const c=+nums[1], h=+nums[2];
  if ([l,c,h].some(isNaN)) return null;
  return oklchToRgb({ l:l*100, c, h });
}

// ─── Named CSS colors ─────────────────────────────────────────────────────────
const CSS_COLORS: Record<string, string> = {
  red:"#ff0000", green:"#008000", blue:"#0000ff", white:"#ffffff", black:"#000000",
  yellow:"#ffff00", cyan:"#00ffff", magenta:"#ff00ff", orange:"#ffa500", purple:"#800080",
  pink:"#ffc0cb", brown:"#a52a2a", gray:"#808080", grey:"#808080", silver:"#c0c0c0",
  gold:"#ffd700", lime:"#00ff00", navy:"#000080", teal:"#008080", maroon:"#800000",
  olive:"#808000", coral:"#ff7f50", salmon:"#fa8072", khaki:"#f0e68c", indigo:"#4b0082",
  violet:"#ee82ee", turquoise:"#40e0d0", crimson:"#dc143c", tomato:"#ff6347",
  orchid:"#da70d6", skyblue:"#87ceeb", dodgerblue:"#1e90ff", hotpink:"#ff69b4",
  deeppink:"#ff1493", springgreen:"#00ff7f", chartreuse:"#7fff00", aquamarine:"#7fffd4",
  lavender:"#e6e6fa", beige:"#f5f5dc", chocolate:"#d2691e", sienna:"#a0522d",
  aqua:"#00ffff", fuchsia:"#ff00ff", lightblue:"#add8e6", lightgreen:"#90ee90",
  lightcoral:"#f08080", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa",
  mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370db",
  mediumseagreen:"#3cb371", mediumturquoise:"#48d1cc", midnightblue:"#191970",
  palegreen:"#98fb98", paleturquoise:"#afeeee", royalblue:"#4169e1",
  saddlebrown:"#8b4513", sandybrown:"#f4a460", seagreen:"#2e8b57",
  steelblue:"#4682b4", tan:"#d2b48c", yellowgreen:"#9acd32",
  rebeccapurple:"#663399", wheat:"#f5deb3", plum:"#dda0dd",
};

function parseAny(s: string): RGB | null {
  const t = s.trim();
  if (!t) return null;
  const lc = t.toLowerCase();
  if (CSS_COLORS[lc]) return hexToRgb(CSS_COLORS[lc]);
  return parseHex(t) ?? parseRgb(t) ?? parseHsl(t) ?? parseOklch(t);
}

function findNamedColor(rgb: RGB): string | null {
  const hexLower = rgbToHex(rgb).toLowerCase();
  for (const [name, hex] of Object.entries(CSS_COLORS)) {
    if (hex === hexLower) return name;
  }
  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function CopyBtn({ text, small = false }: { text: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })}
      style={{
        display: "flex", alignItems: "center", gap: "4px",
        padding: small ? "3px 8px" : "5px 12px",
        border: `1px solid ${copied ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "4px",
        backgroundColor: copied ? "rgba(0,255,136,0.08)" : "transparent",
        color: copied ? "var(--terminal-green)" : "var(--code-comment)",
        fontFamily: monoFont, fontSize: small ? "0.68rem" : "0.72rem",
        cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── Custom Color Picker ──────────────────────────────────────────────────────
function ColorPicker({ rgb, onChange }: { rgb: RGB; onChange: (rgb: RGB) => void }) {
  const [hue, setHue] = useState(() => rgbToHsv(rgb).h);
  const areaRef = useRef<HTMLDivElement>(null);
  const hueTrackRef = useRef<HTMLDivElement>(null);
  const areaDragging = useRef(false);
  const hueDragging  = useRef(false);

  // Refs to avoid stale closures in window listeners
  const hueR   = useRef(hue);
  const rgbR   = useRef(rgb);
  hueR.current = hue;
  rgbR.current = rgb;

  // Sync hue when colour is changed externally (skip near-grey to preserve hue)
  useEffect(() => {
    const { s, h } = rgbToHsv(rgb);
    if (s > 4) setHue(h);
  }, [rgb]);

  // Global pointer move/up for drag
  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (areaDragging.current && areaRef.current) {
        const rect = areaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left)  / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top)   / rect.height));
        onChange(hsvToRgb(hueR.current, x*100, (1-y)*100));
      }
      if (hueDragging.current && hueTrackRef.current) {
        const rect = hueTrackRef.current.getBoundingClientRect();
        const x    = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newH = x * 360;
        setHue(newH);
        const { s, v } = rgbToHsv(rgbR.current);
        onChange(hsvToRgb(newH, s, v));
      }
    }
    function onUp() { areaDragging.current = false; hueDragging.current = false; }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup",   onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hsv          = rgbToHsv(rgb);
  const pureHue      = `hsl(${hue},100%,50%)`;
  const handleX      = hsv.s;       // % from left
  const handleY      = 100 - hsv.v; // % from top
  const hexStr       = rgbToHex(rgb).toUpperCase();

  return (
    <div style={{
      border:"1px solid rgba(0,255,136,0.22)",
      borderRadius:"8px",
      backgroundColor:"#0c0c0c",
      overflow:"hidden",
      boxShadow:"0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,255,136,0.06)",
    }}>
      {/* ── 2-D area ─────────────────────────────── */}
      <div
        ref={areaRef}
        style={{
          position:"relative", height:200,
          background:`linear-gradient(to bottom,transparent,#000),linear-gradient(to right,#fff,${pureHue})`,
          cursor:"crosshair", userSelect:"none", touchAction:"none",
        }}
        onPointerDown={e => {
          areaDragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          const rect = e.currentTarget.getBoundingClientRect();
          const x = Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
          const y = Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height));
          onChange(hsvToRgb(hue, x*100, (1-y)*100));
        }}
      >
        {/* Crosshair handle */}
        <div style={{
          position:"absolute",
          left:`${handleX}%`, top:`${handleY}%`,
          width:16, height:16, borderRadius:"50%",
          border:"2px solid #fff",
          boxShadow:`0 0 0 1.5px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.5)`,
          backgroundColor:hexStr,
          transform:"translate(-50%,-50%)",
          pointerEvents:"none", transition:"background-color 0.04s",
        }} />
      </div>

      {/* ── Sliders + info ───────────────────────── */}
      <div style={{ padding:"14px 18px", display:"flex", flexDirection:"column", gap:"12px", borderTop:"1px solid rgba(0,255,136,0.08)" }}>

        {/* Hue slider */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontFamily:monoFont, fontSize:"0.58rem", color:"rgba(0,255,136,0.45)", letterSpacing:"0.1em", width:30, flexShrink:0 }}>HUE</span>
          <div
            ref={hueTrackRef}
            style={{
              flex:1, height:13, borderRadius:"7px", position:"relative", cursor:"pointer",
              background:"linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)",
              boxShadow:"inset 0 0 0 1px rgba(0,0,0,0.35)", userSelect:"none", touchAction:"none",
            }}
            onPointerDown={e => {
              hueDragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              const rect = e.currentTarget.getBoundingClientRect();
              const x    = Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
              const newH = x * 360;
              setHue(newH);
              onChange(hsvToRgb(newH, hsv.s, hsv.v));
            }}
          >
            <div style={{
              position:"absolute",
              left:`${hue/360*100}%`, top:"50%",
              width:19, height:19, borderRadius:"50%",
              backgroundColor:pureHue,
              border:"2.5px solid #fff",
              boxShadow:"0 0 0 1.5px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.35)",
              transform:"translate(-50%,-50%)",
              pointerEvents:"none",
            }} />
          </div>
          <span style={{ fontFamily:monoFont, fontSize:"0.62rem", color:"rgba(255,255,255,0.3)", width:32, textAlign:"right" }}>
            {Math.round(hue)}°
          </span>
        </div>

        {/* Bottom info row */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          {/* Color chip */}
          <div style={{
            width:38, height:38, borderRadius:"6px", flexShrink:0,
            backgroundColor:hexStr,
            border:"1px solid rgba(255,255,255,0.14)",
            boxShadow:"inset 0 0 0 1px rgba(0,0,0,0.2)",
            transition:"background-color 0.04s",
          }} />
          {/* Hex + RGB */}
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:monoFont, fontSize:"0.8rem", fontWeight:700, color:"rgba(255,255,255,0.82)", letterSpacing:"0.06em" }}>
              {hexStr}
            </div>
            <div style={{ fontFamily:monoFont, fontSize:"0.6rem", color:"var(--code-comment)", opacity:0.5, marginTop:2 }}>
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </div>
          {/* HSV readout */}
          <div style={{ textAlign:"right" }}>
            {[["S", Math.round(hsv.s)+"%"], ["V", Math.round(hsv.v)+"%"]].map(([k,v]) => (
              <div key={k} style={{ fontFamily:monoFont, fontSize:"0.6rem", color:"var(--code-comment)", opacity:0.45, lineHeight:1.85 }}>
                <span style={{ color:"rgba(0,255,136,0.5)", marginRight:4 }}>{k}</span>{v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const DEFAULT_RGB: RGB = { r: 0, g: 255, b: 136 };

export default function ColorConverterClient() {
  const [rgb, setRgb] = useState<RGB>(DEFAULT_RGB);
  const [editing, setEditing] = useState<FormatKey | null>(null);
  const [editVal, setEditVal] = useState("");
  const [hasError, setHasError] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [freeVal, setFreeVal]     = useState("");
  const [freeErr, setFreeErr]     = useState(false);
  const [freeFocus, setFreeFocus] = useState(false);

  const colorHex = rgbToHex(rgb);
  const namedColor = findNamedColor(rgb);
  const hsl = rgbToHsl(rgb);
  const lum = luminance(rgb);
  const overlayText = lum > 0.35 ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.92)";

  const WHITE: RGB = { r:255, g:255, b:255 };
  const BLACK: RGB = { r:0, g:0, b:0 };
  const crWhite = contrastRatio(rgb, WHITE);
  const crBlack = contrastRatio(rgb, BLACK);

  const palette = [
    { label: "Base",        rgb: rgb },
    { label: "Complement",  rgb: hslToRgb({ h:(hsl.h+180)%360, s:hsl.s, l:hsl.l }) },
    { label: "Lighter",     rgb: hslToRgb({ h:hsl.h, s:hsl.s, l:Math.min(95,hsl.l+20) }) },
    { label: "Darker",      rgb: hslToRgb({ h:hsl.h, s:hsl.s, l:Math.max(5,hsl.l-20) }) },
    { label: "Muted",       rgb: hslToRgb({ h:hsl.h, s:Math.max(0,hsl.s-50), l:hsl.l }) },
    { label: "Triadic 1",   rgb: hslToRgb({ h:(hsl.h+120)%360, s:hsl.s, l:hsl.l }) },
    { label: "Triadic 2",   rgb: hslToRgb({ h:(hsl.h+240)%360, s:hsl.s, l:hsl.l }) },
  ];

  const formats: { key: FormatKey; label: string; value: string; parse: (s:string)=>RGB|null }[] = [
    { key:"hex",   label:"HEX",   value:fmtHex(rgb),   parse:parseHex },
    { key:"rgb",   label:"RGB",   value:fmtRgb(rgb),   parse:parseRgb },
    { key:"hsl",   label:"HSL",   value:fmtHsl(rgb),   parse:parseHsl },
    { key:"oklch", label:"OKLCH", value:fmtOklch(rgb), parse:parseOklch },
  ];

  function handleFocus(key: FormatKey, value: string) {
    setEditing(key); setEditVal(value); setHasError(false);
  }
  function handleChange(key: FormatKey, val: string) {
    setEditVal(val);
    const f = formats.find(f => f.key===key)!;
    const parsed = f.parse(val);
    if (parsed) { setRgb(parsed); setHasError(false); }
    else setHasError(true);
  }
  function handleBlur() { setEditing(null); setHasError(false); }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key==="Enter"||e.key==="Escape") (e.target as HTMLElement).blur();
  }

  const cssVarFull = `:root {\n  --color: ${colorHex.toLowerCase()};\n  --color-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n}`;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>

      {/* Client-side badge */}
      <div style={{
        display:"flex", alignItems:"center", gap:"6px",
        padding:"6px 12px", borderRadius:"6px",
        border:"1px solid rgba(0,255,136,0.15)",
        backgroundColor:"rgba(0,255,136,0.05)", width:"fit-content",
      }}>
        <ShieldCheck size={12} style={{ color:"var(--terminal-green)", flexShrink:0 }} />
        <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)" }}>
          100% client-side — no data leaves your browser
        </span>
      </div>

      {/* Main panel */}
      <div style={{
        border:"1px solid rgba(0,255,136,0.15)", borderRadius:"8px",
        backgroundColor:"rgba(0,0,0,0.35)", overflow:"hidden",
      }}>
        {/* Title bar */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"10px 16px", borderBottom:"1px solid rgba(0,255,136,0.1)",
          backgroundColor:"rgba(0,255,136,0.03)",
        }}>
          <div style={{ display:"flex", gap:"5px" }}>
            {(["#ff5f56","#ffbd2e","#27c93f"] as const).map(c => (
              <div key={c} style={{ width:10, height:10, borderRadius:"50%", backgroundColor:c, opacity:0.85 }} />
            ))}
          </div>
          <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:"var(--code-comment)", opacity:0.6 }}>
            color — converter
          </span>
          <div style={{ width:52 }} />
        </div>

        <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"20px" }}>

          {/* ── Color Swatch ─────────────────────────────────────────── */}
          <div
            style={{
              position:"relative", height:128, borderRadius:"8px",
              backgroundColor:colorHex, overflow:"hidden",
              border:"1px solid rgba(255,255,255,0.1)",
              transition:"background-color 0.06s",
            }}
          >
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 50%,rgba(0,0,0,0.12) 100%)" }} />
            {/* hex + name label */}
            <div style={{ position:"absolute", bottom:16, left:20 }}>
              <span style={{ fontFamily:monoFont, fontSize:"1.5rem", fontWeight:700, color:overlayText, letterSpacing:"0.07em", display:"block" }}>
                {fmtHex(rgb)}
              </span>
              {namedColor && (
                <span style={{ fontFamily:monoFont, fontSize:"0.7rem", color:overlayText, opacity:0.65 }}>
                  css: {namedColor}
                </span>
              )}
            </div>
            {/* HSL quick info */}
            <div style={{ position:"absolute", bottom:16, right:20, textAlign:"right" }}>
              <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:overlayText, opacity:0.55, display:"block", lineHeight:1.7 }}>
                H {Math.round(hsl.h)}° &nbsp; S {Math.round(hsl.s)}% &nbsp; L {Math.round(hsl.l)}%
              </span>
              <span style={{ fontFamily:monoFont, fontSize:"0.68rem", color:overlayText, opacity:0.55 }}>
                lum {(lum*100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* ── Color Picker Row ──────────────────────────────────────── */}
          <div
            onClick={() => setPickerOpen(o => !o)}
            className="color-picker-row"
            style={{
              position:"relative", display:"flex", alignItems:"center", gap:"10px",
              padding:"11px 16px", borderRadius:"6px", overflow:"hidden",
              border:`1px solid ${pickerOpen ? "rgba(0,255,136,0.35)" : "rgba(0,255,136,0.12)"}`,
              backgroundColor: pickerOpen ? "rgba(0,255,136,0.05)" : "rgba(0,0,0,0.28)",
              cursor:"pointer", transition:"border-color 0.15s, background-color 0.15s",
            }}
          >
            {/* Subtle color wash on left */}
            <div style={{
              position:"absolute", left:0, top:0, bottom:0, width:"35%",
              background:`linear-gradient(90deg, ${colorHex}28 0%, transparent 100%)`,
              pointerEvents:"none", transition:"background 0.06s",
            }} />

            {/* Pipette icon */}
            <Pipette size={13} style={{ color:"var(--terminal-green)", opacity:0.85, flexShrink:0, position:"relative", zIndex:1 }} />

            {/* Terminal label */}
            <span style={{ fontFamily:monoFont, fontSize:"0.7rem", color:"var(--code-comment)", position:"relative", zIndex:1 }}>
              <span style={{ color:"var(--terminal-green)", opacity:0.55, marginRight:5 }}>$</span>
              pick-color
            </span>

            <div style={{ flex:1 }} />

            {/* Hex readout */}
            <span style={{ fontFamily:monoFont, fontSize:"0.7rem", color:"rgba(255,255,255,0.38)", position:"relative", zIndex:1, letterSpacing:"0.06em" }}>
              {colorHex.toLowerCase()}
            </span>

            {/* Color chip */}
            <div style={{
              width:18, height:18, borderRadius:"3px",
              backgroundColor:colorHex,
              border:"1px solid rgba(255,255,255,0.18)",
              flexShrink:0, position:"relative", zIndex:1,
              transition:"background-color 0.06s",
            }} />

            {/* Toggle hint */}
            <span style={{ fontFamily:monoFont, fontSize:"0.62rem", color:"var(--terminal-green)", opacity:0.45, position:"relative", zIndex:1, letterSpacing:"0.04em" }}>
              {pickerOpen ? "close ↑" : "open ↓"}
            </span>
          </div>

          {/* ── Custom Color Picker Panel ─────────────────────────────── */}
          {pickerOpen && (
            <ColorPicker rgb={rgb} onChange={setRgb} />
          )}

          <style>{`
            .color-picker-row:hover {
              border-color: rgba(0,255,136,0.28) !important;
              background-color: rgba(0,255,136,0.04) !important;
            }
          `}</style>

          {/* ── Free-form Color Input ────────────────────────────────── */}
          <div style={{
            border:`1px solid ${freeErr?"rgba(255,80,80,0.35)":freeFocus?"rgba(0,255,136,0.35)":"rgba(0,255,136,0.12)"}`,
            borderRadius:"6px", overflow:"hidden",
            backgroundColor: freeFocus ? "rgba(0,255,136,0.03)" : "rgba(0,0,0,0.25)",
            transition:"border-color 0.15s, background-color 0.15s",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px" }}>
              {/* Prompt symbol */}
              <span style={{
                fontFamily:monoFont, fontSize:"0.78rem",
                color: freeErr ? "rgba(255,100,100,0.7)" : "var(--terminal-green)",
                opacity: freeErr ? 1 : 0.6, flexShrink:0, userSelect:"none",
              }}>›</span>

              <input
                value={freeVal}
                placeholder="enter any color — hex, rgb(), hsl(), oklch(), css name…"
                spellCheck={false}
                onFocus={() => setFreeFocus(true)}
                onBlur={() => { setFreeFocus(false); if (!freeVal.trim()) { setFreeErr(false); } }}
                onChange={e => {
                  const v = e.target.value;
                  setFreeVal(v);
                  if (!v.trim()) { setFreeErr(false); return; }
                  const parsed = parseAny(v);
                  if (parsed) { setRgb(parsed); setFreeErr(false); }
                  else setFreeErr(true);
                }}
                onKeyDown={e => { if (e.key==="Escape") { setFreeVal(""); setFreeErr(false); (e.target as HTMLElement).blur(); } }}
                style={{
                  flex:1, background:"none", border:"none", outline:"none",
                  fontFamily:monoFont, fontSize:"0.8rem",
                  color: freeErr ? "rgba(255,100,100,0.85)" : "rgba(255,255,255,0.82)",
                  minWidth:0,
                }}
              />

              {/* Status badge */}
              {freeVal.trim() && (
                <span style={{
                  fontFamily:monoFont, fontSize:"0.6rem", letterSpacing:"0.06em",
                  color: freeErr ? "rgba(255,100,100,0.7)" : "var(--terminal-green)",
                  border: `1px solid ${freeErr ? "rgba(255,100,100,0.3)" : "rgba(0,255,136,0.3)"}`,
                  borderRadius:"3px", padding:"1px 6px", flexShrink:0,
                }}>
                  {freeErr ? "invalid" : "ok"}
                </span>
              )}
            </div>
            {/* Hint bar */}
            <div style={{
              borderTop:`1px solid ${freeFocus?"rgba(0,255,136,0.08)":"rgba(255,255,255,0.04)"}`,
              padding:"5px 14px",
              display:"flex", alignItems:"center", gap:"12px",
            }}>
              <span style={{ fontFamily:monoFont, fontSize:"0.58rem", color:"var(--code-comment)", opacity:0.35 }}>
                supports:
              </span>
              {["#hex","rgb()","hsl()","oklch()","css name"].map(fmt => (
                <span key={fmt} style={{ fontFamily:monoFont, fontSize:"0.58rem", color:"var(--code-comment)", opacity:0.3 }}>
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* ── Format Inputs ────────────────────────────────────────── */}
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {formats.map(({ key, label, value }) => {
              const isEditing = editing===key;
              const displayVal = isEditing ? editVal : value;
              const isError = isEditing && hasError;
              return (
                <div
                  key={key}
                  style={{
                    display:"flex", alignItems:"center", gap:"12px",
                    padding:"10px 14px",
                    border:`1px solid ${isEditing?(isError?"rgba(255,80,80,0.4)":"rgba(0,255,136,0.3)"):"rgba(0,255,136,0.1)"}`,
                    borderRadius:"6px",
                    backgroundColor:isEditing?"rgba(0,255,136,0.03)":"rgba(0,0,0,0.2)",
                    transition:"border-color 0.15s, background-color 0.15s",
                  }}
                >
                  <span style={{
                    fontFamily:monoFont, fontSize:"0.63rem",
                    color:isEditing?"var(--terminal-green)":"var(--code-comment)",
                    opacity:isEditing?1:0.5, letterSpacing:"0.08em",
                    textTransform:"uppercase", width:44, flexShrink:0,
                    transition:"color 0.15s, opacity 0.15s",
                  }}>
                    {label}
                  </span>
                  <input
                    value={displayVal}
                    onFocus={() => handleFocus(key, value)}
                    onChange={e => handleChange(key, e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    style={{
                      flex:1, background:"none", border:"none", outline:"none",
                      fontFamily:monoFont, fontSize:"0.82rem",
                      color:isError?"rgba(255,100,100,0.9)":(isEditing?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.75)"),
                      minWidth:0, cursor:"text",
                    }}
                  />
                  <div style={{ width:16, height:16, borderRadius:3, backgroundColor:colorHex, border:"1px solid rgba(255,255,255,0.15)", flexShrink:0 }} />
                  <CopyBtn text={value} small />
                </div>
              );
            })}
          </div>

          {/* ── Bottom 2-column: WCAG + CSS Var ─────────────────────── */}
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>

            {/* WCAG Contrast */}
            <div style={{ flex:"1 1 260px" }}>
              <p style={{ fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", opacity:0.5, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"10px" }}>
                // WCAG Contrast
              </p>
              {([
                { label:"vs White (#fff)", bg:WHITE, ratio:crWhite },
                { label:"vs Black (#000)", bg:BLACK, ratio:crBlack },
              ] as { label:string; bg:RGB; ratio:number }[]).map(({ label, bg, ratio }) => {
                const nr = wcagRating(ratio, false);
                const lr = wcagRating(ratio, true);
                const rc = (r: string) => r==="AAA"?"var(--terminal-green)":r==="AA"?"#e3b341":"rgba(255,100,100,0.8)";
                return (
                  <div key={label} style={{
                    display:"flex", alignItems:"center", gap:"10px",
                    padding:"9px 12px", marginBottom:"6px",
                    border:"1px solid rgba(255,255,255,0.07)", borderRadius:"5px",
                    backgroundColor:"rgba(0,0,0,0.2)",
                  }}>
                    <div style={{ width:16, height:16, borderRadius:3, backgroundColor:bg===WHITE?"#fff":"#000", border:"1px solid rgba(255,255,255,0.2)", flexShrink:0 }} />
                    <span style={{ fontFamily:monoFont, fontSize:"0.72rem", color:"var(--code-comment)", flex:1 }}>{label}</span>
                    <span style={{ fontFamily:monoFont, fontSize:"0.78rem", color:"rgba(255,255,255,0.65)", fontWeight:700, letterSpacing:"0.02em" }}>
                      {ratio.toFixed(2)}:1
                    </span>
                    <span style={{ fontFamily:monoFont, fontSize:"0.6rem", color:rc(nr), border:`1px solid ${rc(nr)}`, borderRadius:"3px", padding:"1px 5px", opacity:0.9 }}>
                      {nr}
                    </span>
                    <span style={{ fontFamily:monoFont, fontSize:"0.58rem", color:"var(--code-comment)", opacity:0.45 }}>
                      lg:{lr}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CSS Variable */}
            <div style={{ flex:"1 1 220px" }}>
              <p style={{ fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", opacity:0.5, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"10px" }}>
                // CSS Variable
              </p>
              <div style={{
                padding:"10px 14px",
                border:"1px solid rgba(88,166,255,0.15)", borderRadius:"6px",
                backgroundColor:"rgba(88,166,255,0.03)",
                display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"10px",
              }}>
                <pre style={{ margin:0, fontFamily:monoFont, fontSize:"0.72rem", lineHeight:1.75, color:"rgba(255,255,255,0.55)", flex:1 }}>
                  <span style={{ color:"#9cdcfe" }}>:root</span>{" {\n  "}
                  <span style={{ color:"#569cd6" }}>--color</span>
                  {": "}
                  <span style={{ color:"#ce9178" }}>{colorHex.toLowerCase()}</span>
                  {";\n  "}
                  <span style={{ color:"#569cd6" }}>--color-rgb</span>
                  {": "}
                  <span style={{ color:"#b5cea8" }}>{rgb.r}, {rgb.g}, {rgb.b}</span>
                  {";\n}"}
                </pre>
                <CopyBtn text={cssVarFull} small />
              </div>
            </div>
          </div>

          {/* ── Color Palette ─────────────────────────────────────────── */}
          <div>
            <p style={{ fontFamily:monoFont, fontSize:"0.63rem", color:"var(--code-comment)", opacity:0.5, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"10px" }}>
              // Color Palette — click to apply
            </p>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              {palette.map(({ label, rgb: pr }) => (
                <div key={label} style={{ display:"flex", flexDirection:"column", gap:"4px", alignItems:"center" }}>
                  <button
                    onClick={() => setRgb(pr)}
                    title={fmtHex(pr)}
                    style={{
                      width:44, height:44, borderRadius:"6px",
                      backgroundColor:rgbToHex(pr),
                      border:pr===rgb?"2px solid rgba(0,255,136,0.8)":"1px solid rgba(255,255,255,0.12)",
                      cursor:"pointer", padding:0,
                      transition:"transform 0.12s, border-color 0.12s",
                      outline:"none",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform="scale(1.1)")}
                    onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                  />
                  <span style={{ fontFamily:monoFont, fontSize:"0.57rem", color:"var(--code-comment)", opacity:0.55, textAlign:"center", maxWidth:50 }}>
                    {label}
                  </span>
                  <span style={{ fontFamily:monoFont, fontSize:"0.6rem", color:"var(--code-comment)", opacity:0.4 }}>
                    {fmtHex(pr)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
