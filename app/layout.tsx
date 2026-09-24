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

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "HSE Provider | Giải pháp Quản lý An toàn, Sức khỏe và Môi trường",
    template: "%s | HSE Provider",
  },
  description: "Phần mềm và giải pháp chuyển đổi số toàn diện cho quản lý An toàn lao động (HSE), Sức khỏe (OH), Môi trường và Đào tạo an toàn doanh nghiệp.",
  keywords: [
    "HSE",
    "Quản lý an toàn lao động",
    "Sức khỏe nghề nghiệp",
    "Phần mềm HSE",
    "CSMS",
    "An toàn môi trường",
    "HSE Provider",
  ],
  formatDetection: { telephone: false },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "HSE Provider | Giải pháp Quản lý An toàn, Sức khỏe và Môi trường",
    description: "Chuyển đổi số công tác HSE doanh nghiệp với các giải pháp quản lý CSMS, Hóa chất, Đào tạo & Quan trắc môi trường.",
    url: siteUrl,
    siteName: "HSE Provider",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSE Provider | Giải pháp Quản lý HSE",
    description: "Giải pháp chuyển đổi số toàn diện cho quản lý An toàn lao động, Sức khỏe và Môi trường.",
  },
  verification: {
    google: "-7b6qYgG7qZbKEAr4qnT81GNxmrKlqFl-Lx1M7nD040",
  },
  icons: { icon: "/assets/csms/hse-provider-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={inter.variable}>
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
