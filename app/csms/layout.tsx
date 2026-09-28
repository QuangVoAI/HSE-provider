import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phần mềm quản lý HSE CSMS",
  description:
    "CSMS số hóa quản lý đào tạo, rủi ro, sức khỏe nghề nghiệp, nhà thầu, thiết bị và tuân thủ HSE tập trung cho doanh nghiệp Việt Nam.",
  alternates: { canonical: "/csms" },
};

export default function CsmsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSMS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": `${siteUrl}/csms`,
    "description": "Hệ thống phần mềm quản lý Sức khỏe, An toàn và Môi trường dành cho doanh nghiệp.",
    "provider": { "@id": `${siteUrl}/#organization` },
    "inLanguage": ["vi-VN", "en"]
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
    {children}
  </>;
}
