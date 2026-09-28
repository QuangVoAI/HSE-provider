import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import "./globals.css";
import DocumentLanguage from "./shared/document-language";
import Analytics from "./shared/analytics";
import ScrollToTopButton from "./shared/scroll-to-top-button";
import FloatingContact from "./shared/floating-contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const googleSiteVerification =
  process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION?.trim() ||
  "-7b6qYgG7qZbKEAr4qnT81GNxmrKlqFl-Lx1M7nD040";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Phần mềm quản lý HSE, EHS cho doanh nghiệp | HSE Provider",
    template: "%s | HSE Provider",
  },
  description: "HSE Provider cung cấp phần mềm quản lý HSE, EHS giúp doanh nghiệp số hóa an toàn lao động, sức khỏe nghề nghiệp, môi trường và tuân thủ.",
  keywords: [
    "HSE",
    "Quản lý an toàn lao động",
    "Sức khỏe nghề nghiệp",
    "Phần mềm HSE",
    "CSMS",
    "An toàn môi trường",
    "HSE Provider",
    "HSE TP HCM",
    "Quản lý HSE Việt Nam",
    "Đào tạo an toàn lao động",
  ],
  formatDetection: { telephone: false },
  metadataBase: new URL(siteUrl),
  other: {
    "geo.region": "VN-SG",
    "geo.placename": "Ho Chi Minh City",
    "geo.position": "10.7964;106.7451",
    "ICBM": "10.7964, 106.7451",
  },
  openGraph: {
    title: "Phần mềm quản lý HSE, EHS cho doanh nghiệp | HSE Provider",
    description: "Số hóa công tác HSE với các giải pháp quản lý an toàn, sức khỏe nghề nghiệp, đào tạo, nhà thầu và quan trắc môi trường.",
    siteName: "HSE Provider",
    locale: "vi_VN",
    type: "website",
    url: siteUrl,
    images: [{ url: "/assets/csms/figma-vn/hero.png", alt: "HSE Provider - Phần mềm quản lý HSE và EHS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phần mềm quản lý HSE, EHS | HSE Provider",
    description: "Số hóa quản lý an toàn lao động, sức khỏe nghề nghiệp, môi trường và tuân thủ cho doanh nghiệp Việt Nam.",
    images: ["/assets/csms/figma-vn/hero.png"],
  },
  verification: {
    google: googleSiteVerification,
  },
  icons: { icon: "/assets/csms/hse-provider-logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#organization`,
      "name": "HSE Provider",
      "url": siteUrl,
      "logo": `${siteUrl}/assets/csms/hse-provider-logo.png`,
      "image": `${siteUrl}/assets/csms/hse-provider-logo.png`,
      "telephone": "+84 917 267 397",
      "email": "cskh@atld.vn",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Số 20 Đường ĐX 94, Khu phố 6, phường An Phú",
        "addressLocality": "Thành phố Hồ Chí Minh",
        "addressRegion": "Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.7964,
        "longitude": 106.7451
      },
      "sameAs": ["https://www.atld.vn"],
      "areaServed": { "@type": "Country", "name": "Việt Nam" },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84 917 267 397",
        "contactType": "customer service",
        "email": "cskh@atld.vn",
        "availableLanguage": ["Vietnamese", "English"]
      },
      "priceRange": "$$$"
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "HSE Provider",
      "inLanguage": ["vi-VN", "en"],
      "publisher": { "@id": `${siteUrl}/#organization` }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Suspense fallback={null}><DocumentLanguage /></Suspense>
        <Analytics />
        <VercelAnalytics />
        {children}
        <ScrollToTopButton />
        <Suspense fallback={null}><FloatingContact /></Suspense>
      </body>
    </html>
  );
}
