import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "rgba(8, 8, 8, 0.88)",
backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            style={{
              backgroundColor: "rgba(0, 255, 136, 0.1)",
              border: "1px solid rgba(0, 255, 136, 0.3)",
              borderRadius: "6px",
              padding: "4px 6px",
              transition: "all 0.2s",
            }}
            className="group-hover:bg-[rgba(0,255,136,0.2)]"
          >
            <Terminal
              size={14}
              style={{ color: "var(--terminal-green)" }}
            />
          </div>
          <span
            style={{
              fontFamily: "'RoundedFixedsys', var(--font-space-mono), monospace",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "var(--terminal-green)",
              letterSpacing: "0.05em",
            }}
          >
            OmniDev
          </span>
          <span
            style={{
              fontFamily: "'RoundedFixedsys', var(--font-geist-mono), monospace",
              fontSize: "0.7rem",
              color: "var(--code-comment)",
              marginLeft: "-2px",
            }}
          >
            _
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {[
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'RoundedFixedsys', var(--font-geist-mono), monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.04em",
                textDecoration: "none",
                padding: "5px 13px",
                borderRadius: "5px",
                transition: "all 0.2s",
                color: "rgba(200, 210, 220, 0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#58a6ff";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(88,166,255,0.35)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(88,166,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200, 210, 220, 0.85)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.04)";
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
