import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import DocumentLanguage from "./shared/document-language";
import Analytics from "./shared/analytics";
import ScrollToTopButton from "./shared/scroll-to-top-button";
import FloatingContact from "./shared/floating-contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "CSMS | HSE Provider",
  description: "Connected safety management for modern HSE operations.",
  formatDetection: { telephone: false },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  verification: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION
    ? { google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION }
    : undefined,
  icons: { icon: "/assets/csms/hse-provider-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={inter.variable}>
      <body>
        <Suspense fallback={null}><DocumentLanguage /></Suspense>
        <Analytics />
        {children}
        <ScrollToTopButton />
        <Suspense fallback={null}><FloatingContact /></Suspense>
      </body>
    </html>
  );
}
