import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — CodeBridge",
  description:
    "CodeBridge Terms of Service. Read the conditions for using our free developer tools.",
};

const monoFont = "'RoundedFixedsys', var(--font-geist-mono), monospace";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2
        style={{
          fontFamily: monoFont,
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--terminal-green)",
          marginBottom: "12px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: monoFont,
          fontSize: "0.82rem",
          color: "var(--comment-gray)",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
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
      <div
        className="grid-lines-bg"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "60px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              color: "var(--comment-gray)",
              marginBottom: "10px",
              letterSpacing: "0.04em",
              opacity: 0.6,
            }}
          >
            <span style={{ color: "var(--terminal-green)" }}>~</span>
            /terms
          </p>
          <h1
            style={{
              fontFamily: monoFont,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--terminal-green)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            Terms of Service
          </h1>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: "0.75rem",
              color: "var(--comment-gray)",
              opacity: 0.6,
            }}
          >
            Last updated: March 1, 2026
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(0,255,136,0.12)",
            marginBottom: "40px",
          }}
        />

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using CodeBridge (&quot;the Service&quot;), you
            accept and agree to be bound by these Terms of Service. If you do
            not agree, please do not use the Service.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            CodeBridge provides free, browser-based developer utility tools
            including JSON Formatter, Regex Tester, Text Diff, Base64
            Encoder/Decoder, JWT Decoder, and other tools. All processing
            occurs locally in your browser. We do not store, transmit, or
            process any user-submitted data on our servers.
          </p>
        </Section>

        <Section title="3. Use of the Service">
          <p style={{ marginBottom: "10px" }}>
            You agree to use the Service only for lawful purposes. You must not:
          </p>
          <ul style={{ paddingLeft: "20px", lineHeight: 2 }}>
            <li>
              Use the Service in any way that violates applicable laws or
              regulations
            </li>
            <li>
              Attempt to interfere with or disrupt the integrity or performance
              of the Service
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Service
            </li>
            <li>
              Use automated means to access or scrape the Service excessively
            </li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            The CodeBridge website, its design, and original content are the
            property of PSWK DEV. The tools are provided for personal and
            professional use. You may not reproduce or redistribute the site
            code without permission.
          </p>
        </Section>

        <Section title="5. Disclaimer of Warranties">
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind, express or implied. We do not warrant that the Service will be
            error-free, uninterrupted, or produce accurate results in all cases.
            Use at your own discretion and verify critical results independently.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, PSWK DEV shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising from your use of — or inability to use — the
            Service. This includes any data loss or business interruption.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>
            The Service may include third-party advertisements served by Google
            AdSense. We are not responsible for the content or practices of
            third-party advertisers. Clicking third-party links is done at your
            own risk.
          </p>
        </Section>

        <Section title="8. Changes to Terms">
          <p>
            We reserve the right to modify these Terms at any time. Changes
            will be posted on this page with an updated date. Continued use of
            the Service after changes constitutes acceptance of the new Terms.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable laws. Any disputes shall be resolved in the appropriate
            jurisdiction.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            For questions about these Terms, contact us at{" "}
            <a
              href="/contact"
              style={{ color: "var(--electric-blue)" }}
            >
              codebridge.contact@gmail.com
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
