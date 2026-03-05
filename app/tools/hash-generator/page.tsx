import type { Metadata } from "next";
import HashGeneratorClient from "@/components/tools/hash-generator/hash-generator-client";
import ToolNavSidebar from "@/components/layout/tool-nav-sidebar";

export const metadata: Metadata = {
  title: "The Best Hash Generator — Free, Instant, Secured, No Server | OmniDev",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser. Supports text input, file upload, HMAC, and hash comparison. No server required.",
  keywords: [
    "hash generator",
    "md5 generator",
    "sha256 generator",
    "sha512 generator",
    "sha-1 hash",
    "hmac generator",
    "file hash",
    "checksum generator",
    "online hash tool",
  ],
  openGraph: {
    title: "The Best Hash Generator — Free, Instant, Secured, No Server | OmniDev",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser. Supports text input, file upload, HMAC, and hash comparison. No server required.",
    url: "https://www.omnidevtools.com/tools/hash-generator",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev Hash Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

export default function HashGeneratorPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--terminal-bg)",
        minHeight: "100vh",
        paddingTop: "56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Hash Generator",
            "description": "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser. Supports text input, file upload, and HMAC.",
            "url": "https://www.omnidevtools.com/tools/hash-generator",
            "image": "https://www.omnidevtools.com/og-image.jpg",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          }),
        }}
      />
      <div
        className="grid-lines-bg"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "40px 24px 60px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Page header */}
          <div
            style={{
              marginBottom: "28px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Left: title block */}
            <div>
              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.72rem",
                  color: "var(--code-comment)",
                  marginBottom: "10px",
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: "var(--terminal-green)" }}>~</span>
                <span style={{ opacity: 0.5 }}>/tools/</span>
                <span style={{ color: "var(--electric-blue)" }}>hash-generator</span>
              </p>

              <h1
                style={{
                  fontFamily: monoFont,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "var(--terminal-green)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: "8px",
                }}
              >
                Hash{" "}
                <span style={{ color: "var(--code-comment)", fontWeight: 400 }}>
                  Generator
                </span>
              </h1>

              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: "0.82rem",
                  color: "var(--code-comment)",
                  lineHeight: 1.6,
                  maxWidth: "540px",
                }}
              >
                Generate{" "}
                <span style={{ color: "var(--terminal-green)", opacity: 0.8 }}>
                  MD5, SHA-1, SHA-256, SHA-384, SHA-512
                </span>{" "}
                hashes from text or any file. HMAC support included. Runs entirely in your browser, zero server calls.
              </p>
            </div>

            {/* Right: How to use */}
            <div
              style={{
                border: "1px solid rgba(88,166,255,0.18)",
                borderRadius: "7px",
                backgroundColor: "rgba(88,166,255,0.03)",
                overflow: "hidden",
                flexShrink: 0,
                minWidth: "220px",
                maxWidth: "300px",
              }}
            >
              <div
                style={{
                  padding: "6px 12px",
                  borderBottom: "1px solid rgba(88,166,255,0.12)",
                  backgroundColor: "rgba(88,166,255,0.06)",
                  fontFamily: monoFont,
                  fontSize: "0.65rem",
                  color: "#58a6ff",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                // How to use
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "10px 14px",
                  fontFamily: monoFont,
                  fontSize: "0.7rem",
                  lineHeight: "1.85",
                  color: "var(--code-comment)",
                  whiteSpace: "pre",
                }}
              >
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>1.</span>{" Select Text or File input mode\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>2.</span>{" Choose output format (hex / Base64)\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>3.</span>{" (Optional) Enable HMAC + enter key\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>4.</span>{" Type text or drop a file\n"}
                <span style={{ color: "var(--terminal-green)", opacity: 0.7 }}>5.</span>{" Copy any result or use Compare\n"}
                <span style={{ color: "rgba(88,166,255,0.5)", fontSize: "0.62rem" }}>* all hashing happens in browser</span>
              </pre>
            </div>
          </div>

          {/* Tool */}
          <HashGeneratorClient />

          {/* Description section */}
          <div style={{ marginTop: "60px" }}>
            <div style={{ height: "1px", backgroundColor: "rgba(0,255,136,0.1)", marginBottom: "40px" }} />

            <h2
              style={{
                fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700,
                color: "var(--terminal-green)", marginBottom: "16px", letterSpacing: "-0.01em",
              }}
            >
              What is a Cryptographic Hash Function?
            </h2>
            <p
              style={{
                fontFamily: monoFont, fontSize: "0.82rem", color: "var(--comment-gray)",
                lineHeight: 1.85, marginBottom: "14px", maxWidth: "720px",
              }}
            >
              A cryptographic hash function is a deterministic algorithm that maps input data of any size to a fixed-size output called a{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>hash</span>,{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>digest</span>, or{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>checksum</span>.
              The same input always produces the same output, but even a single-character change produces a completely different hash — a property known as the avalanche effect.
            </p>
            <p
              style={{
                fontFamily: monoFont, fontSize: "0.82rem", color: "var(--comment-gray)",
                lineHeight: 1.85, marginBottom: "28px", maxWidth: "720px",
              }}
            >
              A good hash function is practically irreversible (preimage resistant), collision resistant (it is computationally infeasible to find two different inputs that produce the same hash), and fast to compute. These properties make hash functions the foundation of data integrity verification, digital signatures, password storage, and many cryptographic protocols.
            </p>

            <h2
              style={{
                fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700,
                color: "var(--terminal-green)", marginBottom: "16px", letterSpacing: "-0.01em",
              }}
            >
              Algorithm Reference
            </h2>
            <p
              style={{
                fontFamily: monoFont, fontSize: "0.82rem", color: "var(--comment-gray)",
                lineHeight: 1.85, marginBottom: "16px", maxWidth: "720px",
              }}
            >
              All five algorithms are computed simultaneously so you can compare outputs side by side. MD5 and SHA-1 are considered cryptographically broken for security purposes but remain widely used for non-security checksums and legacy compatibility.
            </p>

            <div
              style={{
                border: "1px solid rgba(88,166,255,0.12)",
                borderRadius: "6px",
                backgroundColor: "rgba(88,166,255,0.02)",
                overflow: "hidden",
                marginBottom: "28px",
                maxWidth: "720px",
              }}
            >
              {[
                {
                  algo: "MD5",
                  family: "MD (Message Digest)",
                  bits: "128-bit",
                  secure: false,
                  desc: "Designed by Ron Rivest in 1991. Widely broken since 2004 — collision attacks are practical on commodity hardware in seconds. Never use for passwords, signatures, or integrity of security-critical data. Still common for non-security checksums (e.g. package registry manifests) and legacy systems.",
                },
                {
                  algo: "SHA-1",
                  family: "SHA-1 (Secure Hash Algorithm 1)",
                  bits: "160-bit",
                  secure: false,
                  desc: "Published by NIST in 1995. Practically broken since Google's SHAttered attack in 2017 demonstrated chosen-prefix collision attacks. Deprecated by NIST and browsers. Still used by Git for object addressing (non-security context) and older TLS certificates.",
                },
                {
                  algo: "SHA-256",
                  family: "SHA-2 (Secure Hash Algorithm 2)",
                  bits: "256-bit",
                  secure: true,
                  desc: "Part of the SHA-2 family published by NIST in 2001. The most widely deployed secure hash algorithm — used in TLS/HTTPS certificates, JWT signatures, HMAC, Bitcoin proof-of-work, and virtually every modern cryptographic protocol. No known practical attacks.",
                },
                {
                  algo: "SHA-384",
                  family: "SHA-2 (Secure Hash Algorithm 2)",
                  bits: "384-bit",
                  secure: true,
                  desc: "A truncated variant of SHA-512 that provides a higher security margin than SHA-256. Common in TLS 1.3, code-signing certificates, and government/compliance contexts that mandate larger output sizes. Internally uses 64-bit word operations, making it faster than SHA-256 on 64-bit hardware.",
                },
                {
                  algo: "SHA-512",
                  family: "SHA-2 (Secure Hash Algorithm 2)",
                  bits: "512-bit",
                  secure: true,
                  desc: "The largest SHA-2 variant. Provides 256-bit collision resistance (birthday bound). Used in high-security applications, backup integrity, and as the internal primitive for password hashing schemes like PBKDF2-SHA-512 and Argon2. On 64-bit CPUs it is often faster than SHA-256 due to fewer rounds per block.",
                },
              ].map(({ algo, family, bits, secure, desc }, i) => (
                <div
                  key={algo}
                  style={{
                    display: "flex", gap: "16px", padding: "14px 18px",
                    borderBottom: i < 4 ? "1px solid rgba(88,166,255,0.06)" : undefined,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flexShrink: 0, width: "80px" }}>
                    <code style={{ fontFamily: monoFont, fontSize: "0.78rem", fontWeight: 700, color: secure ? "var(--terminal-green)" : "rgba(255,190,80,0.85)" }}>
                      {algo}
                    </code>
                    <p style={{ fontFamily: monoFont, fontSize: "0.6rem", color: "var(--comment-gray)", opacity: 0.5, marginTop: "2px" }}>
                      {bits}
                    </p>
                    {!secure && (
                      <span style={{ fontFamily: monoFont, fontSize: "0.54rem", color: "rgba(255,130,50,0.7)", border: "1px solid rgba(255,130,50,0.25)", borderRadius: "2px", padding: "1px 4px", display: "inline-block", marginTop: "3px" }}>
                        LEGACY
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: monoFont, fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
                      {family}
                    </p>
                    <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--comment-gray)", lineHeight: 1.65, opacity: 0.75 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700,
                color: "var(--terminal-green)", marginBottom: "16px", letterSpacing: "-0.01em",
              }}
            >
              What is HMAC?
            </h2>
            <p
              style={{
                fontFamily: monoFont, fontSize: "0.82rem", color: "var(--comment-gray)",
                lineHeight: 1.85, marginBottom: "14px", maxWidth: "720px",
              }}
            >
              HMAC (Hash-based Message Authentication Code) combines a cryptographic hash function with a secret key to produce a message authentication code. Unlike a plain hash, an HMAC can only be verified by someone who knows the secret key — making it tamper-evident and authenticated.
            </p>
            <div
              style={{
                border: "1px solid rgba(0,255,136,0.1)", borderRadius: "6px",
                backgroundColor: "rgba(0,0,0,0.3)", padding: "16px 20px",
                marginBottom: "28px", maxWidth: "720px",
              }}
            >
              <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--comment-gray)", marginBottom: "10px", opacity: 0.45 }}>
                // HMAC construction
              </p>
              <code style={{ fontFamily: monoFont, fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 2, display: "block" }}>
                HMAC(K, m) = H&#40;(K&#39; XOR opad) || H&#40;(K&#39; XOR ipad) || m&#41;&#41;
              </code>
              <p style={{ fontFamily: monoFont, fontSize: "0.7rem", color: "var(--comment-gray)", opacity: 0.55, marginTop: "8px", lineHeight: 1.7 }}>
                K&#39; = key padded or hashed to the block size. ipad = 0x36 repeated. opad = 0x5c repeated.
                All five algorithms including HMAC-MD5 are fully supported in this tool.
              </p>
            </div>

            <h2
              style={{
                fontFamily: monoFont, fontSize: "1.1rem", fontWeight: 700,
                color: "var(--terminal-green)", marginBottom: "16px", letterSpacing: "-0.01em",
              }}
            >
              Common Use Cases
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: "10px", maxWidth: "720px",
              }}
            >
              {[
                { title: "File Integrity Verification", desc: "Generate a checksum for a file before distribution so recipients can confirm the file was not corrupted or tampered with during download." },
                { title: "API Request Signing", desc: "Sign API requests with HMAC-SHA-256 using a shared secret so the server can verify the request originated from an authorised client." },
                { title: "Password Storage", desc: "Modern systems combine hashing with salting and iteration (bcrypt, Argon2). SHA-256/512 is used as the internal primitive inside these schemes." },
                { title: "Digital Signatures", desc: "RSA, ECDSA, and EdDSA sign the hash of a document rather than the document itself, making signatures compact regardless of input size." },
                { title: "Data Deduplication", desc: "Content-addressable storage systems (Git, IPFS, Docker layers) use hashes as unique identifiers to detect duplicate data and avoid redundant storage." },
                { title: "Cache & ETag Headers", desc: "HTTP ETags often contain a hash of the response body so browsers and CDNs can reuse cached responses without re-downloading unchanged content." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "12px 14px",
                    border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0,255,136,0.02)",
                  }}
                >
                  <p style={{ fontFamily: monoFont, fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: "5px" }}>
                    {title}
                  </p>
                  <p style={{ fontFamily: monoFont, fontSize: "0.72rem", color: "var(--comment-gray)", lineHeight: 1.6, opacity: 0.75 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ToolNavSidebar currentTool="hash-generator" />
      </div>
    </main>
  );
}
