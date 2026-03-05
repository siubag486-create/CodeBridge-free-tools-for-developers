import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omnidevtools.com"),
  title: "OmniDev — The Best Free Tools for Developers",
  description:
    "Free tools for Developers. OmniDev provides interactive developer tools to help you build, format, and debug faster.",
  openGraph: {
    title: "OmniDev — The Best Free Tools for Developers",
    description:
      "Free tools for Developers. OmniDev provides interactive developer tools to help you build, format, and debug faster.",
    type: "website",
    url: "https://www.omnidevtools.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OmniDev — Free Developer Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniDev — The Best Free Tools for Developers",
    description: "Free tools for Developers. OmniDev provides interactive developer tools to help you build, format, and debug faster.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}
        style={{ backgroundColor: "var(--terminal-bg)" }}
      >
        <Navbar />
        {children}
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5THTY18LWH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5THTY18LWH');
          `}
        </Script>
      </body>
    </html>
  );
}
