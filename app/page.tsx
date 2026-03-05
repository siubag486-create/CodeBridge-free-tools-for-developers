import HomeWrapper from "@/components/home-wrapper";
import TerminalHero from "@/components/hero/terminal-hero";
import ToolsLanding from "@/components/landing/tools-landing";

export default function Home() {
  return (
    <HomeWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "OmniDev",
            "url": "https://www.omnidevtools.com",
            "description": "Free browser-based developer tools. Format JSON, test regex, diff text, encode Base64, decode JWT, generate UUIDs, hash strings, convert YAML, and encode URLs — all instantly, no server required.",
            "image": "https://www.omnidevtools.com/og-image.jpg",
          }),
        }}
      />
      <section
        id="hero-section"
        style={{ height: "100vh", scrollSnapAlign: "start" }}
      >
        <TerminalHero />
      </section>
      <section
        id="tools-section"
        style={{ height: "100vh", scrollSnapAlign: "start" }}
      >
        <ToolsLanding />
      </section>
    </HomeWrapper>
  );
}
