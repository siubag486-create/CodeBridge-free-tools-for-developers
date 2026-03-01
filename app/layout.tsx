import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
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
  title: "OmniDev — Free tools for Developers",
  description:
    "Free tools for Developers. OmniDev provides interactive developer tools to help you build, format, and debug faster.",
  openGraph: {
    title: "OmniDev — Free tools for Developers",
    description:
      "Free tools for Developers. OmniDev provides interactive developer tools to help you build, format, and debug faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}
        style={{ backgroundColor: "var(--terminal-bg)" }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
