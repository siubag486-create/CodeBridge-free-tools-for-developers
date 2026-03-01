import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CodeBridge",
  description:
    "CodeBridge Privacy Policy. Learn how we handle your data and use of Google AdSense and analytics.",
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

export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--terminal-bg)",
        minHeight: "100vh",
        paddingTop: "56px",
        position: "relative",
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
              opacity: 0.6,
            }}
          >
            <span style={{ color: "var(--terminal-green)" }}>~</span>
            /privacy-policy
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
            Privacy Policy
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

        <Section title="1. Overview">
          <p>
            CodeBridge (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a
            free online developer tools site operated by PSWK DEV. This Privacy
            Policy explains what information we collect, why we collect it, and
            how we use it. We are committed to protecting your privacy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>
              We do not collect personally identifiable information
            </strong>{" "}
            (such as names or email addresses) unless you voluntarily provide it
            via the Contact page.
          </p>
          <p style={{ marginBottom: "10px" }}>
            All tools on CodeBridge (JSON Formatter, Regex Tester, Text Diff,
            Base64, JWT Decoder) run{" "}
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>
              entirely in your browser
            </strong>
            . No input data is transmitted to our servers.
          </p>
          <p>
            We may collect non-personal, aggregated data through third-party
            services (see section 4) including:
          </p>
          <ul style={{ marginTop: "8px", paddingLeft: "20px", lineHeight: 2 }}>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
          </ul>
        </Section>

        <Section title="3. Cookies">
          <p style={{ marginBottom: "10px" }}>
            CodeBridge itself does not set first-party cookies. However,
            third-party services we use (Google AdSense, Google Analytics) may
            set cookies to serve personalised ads and measure site traffic.
          </p>
          <p>
            You can control cookie settings through your browser preferences or
            use browser extensions to block third-party cookies.
          </p>
        </Section>

        <Section title="4. Third-Party Services">
          <p style={{ marginBottom: "10px" }}>
            We use the following third-party services that may collect data
            according to their own privacy policies:
          </p>
          <ul style={{ paddingLeft: "20px", lineHeight: 2 }}>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.7)" }}>
                Google AdSense
              </strong>{" "}
              — serves advertisements. Google may use cookies to personalise ads
              based on your visits to this and other sites.{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--electric-blue)" }}
              >
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.7)" }}>
                Google Analytics
              </strong>{" "}
              — measures site traffic and usage patterns anonymously.
            </li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            To opt out of personalised advertising by Google, visit{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--electric-blue)" }}
            >
              Google Ads Settings
            </a>
            .
          </p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We do not store any user-submitted data on our servers. Aggregated
            analytics data collected by Google is retained according to
            Google&apos;s own data retention policies.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p style={{ marginBottom: "10px" }}>
            Depending on your jurisdiction, you may have rights including:
          </p>
          <ul style={{ paddingLeft: "20px", lineHeight: 2 }}>
            <li>The right to access information held about you</li>
            <li>The right to request deletion of your data</li>
            <li>The right to opt out of data collection</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            Since we do not store personal data, most requests are
            automatically satisfied. For any questions, contact us at the
            address below.
          </p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            CodeBridge is not directed at children under 13. We do not
            knowingly collect personal information from children.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will
            be posted on this page with an updated date. Continued use of the
            site after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:{" "}
            <a
              href="/contact"
              style={{ color: "var(--electric-blue)" }}
            >
              codebridge.contact@gmail.com
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}
