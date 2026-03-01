"use client";

import Link from "next/link";

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "rgba(8, 8, 8, 0.95)",
        borderTop: "1px solid rgba(0, 255, 136, 0.1)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: monoFont,
                fontSize: "0.75rem",
                color: "var(--terminal-green)",
                fontWeight: 700,
              }}
            >
              OmniDev
            </span>
            <span
              style={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "rgba(110,118,129,0.4)",
              }}
            >
              —
            </span>
            <span
              style={{
                fontFamily: monoFont,
                fontSize: "0.72rem",
                color: "rgba(110,118,129,0.5)",
              }}
            >
              Free developer tools, runs in your browser.
            </span>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {links.map(({ href, label }) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(110,118,129,0.08)",
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: monoFont,
            fontSize: "0.68rem",
            color: "rgba(110,118,129,0.4)",
          }}
        >
          © 2026 PSWK DEV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: monoFont,
        fontSize: "0.72rem",
        color: "var(--comment-gray)",
        textDecoration: "none",
        padding: "3px 9px",
        borderRadius: "4px",
        border: "1px solid rgba(110,118,129,0.18)",
        transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--terminal-green)";
        e.currentTarget.style.borderColor = "rgba(0,255,136,0.28)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--comment-gray)";
        e.currentTarget.style.borderColor = "rgba(110,118,129,0.18)";
      }}
    >
      {label}
    </Link>
  );
}
