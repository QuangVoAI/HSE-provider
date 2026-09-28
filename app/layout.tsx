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
    default: "HSE Provider | Giải pháp Quản lý An toàn, Sức khỏe và Môi trường Việt Nam",
    template: "%s | HSE Provider",
  },
  description: "Phần mềm và giải pháp chuyển đổi số toàn diện cho quản lý An toàn lao động (HSE), Sức khỏe (OH), Môi trường và Đào tạo an toàn doanh nghiệp tại TP. Hồ Chí Minh & Việt Nam.",
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
    title: "HSE Provider | Giải pháp Quản lý An toàn, Sức khỏe và Môi trường",
    description: "Chuyển đổi số công tác HSE doanh nghiệp với các giải pháp quản lý CSMS, Hóa chất, Đào tạo & Quan trắc môi trường tại Việt Nam.",
    siteName: "HSE Provider",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSE Provider | Giải pháp Quản lý HSE Việt Nam",
    description: "Giải pháp chuyển đổi số toàn diện cho quản lý An toàn lao động, Sức khỏe và Môi trường.",
  },
  verification: {
    google: googleSiteVerification,
  },
  icons: { icon: "/assets/csms/hse-provider-logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "HSE Provider",
  "image": `${siteUrl}/assets/csms/hse-provider-logo.png`,
  "@id": siteUrl,
  "url": siteUrl,
  "telephone": "0917-267-397",
  "email": "cskh@atld.vn",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 20 Đường ĐX 94, Khu phố 6, phường An Phú",
    "addressLocality": "TP. Hồ Chí Minh",
    "addressRegion": "SG",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.7964,
    "longitude": 106.7451
  },
  "areaServed": {
    "@type": "Country",
    "name": "Vietnam"
  },
  "sameAs": [
    "https://landing.1hse.vn"
  ],
  "priceRange": "$$$"
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
