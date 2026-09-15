"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const pageTitles: Record<string, { vi: string; en: string }> = {
  "/": { vi: "CSMS | HSE Provider", en: "CSMS | HSE Provider" },
  "/csms": { vi: "CSMS | HSE Provider", en: "CSMS | HSE Provider" },
  "/customers": { vi: "Khách hàng | HSE Provider", en: "Our Customers | HSE Provider" },
  "/contact": { vi: "Liên hệ | HSE Provider", en: "Contact | HSE Provider" },
  "/training-management": { vi: "Quản lý huấn luyện | HSE Provider", en: "Training Management | HSE Provider" },
  "/risk-management": { vi: "Quản lý rủi ro | HSE Provider", en: "Risk Management | HSE Provider" },
  "/safety-observation": { vi: "Báo cáo quan sát an toàn | HSE Provider", en: "Behavior-Based Safety | HSE Provider" },
  "/health-management": { vi: "Quản lý sức khỏe nghề nghiệp | HSE Provider", en: "Health Management | HSE Provider" },
  "/equipment-management": { vi: "Quản lý thiết bị rủi ro cao | HSE Provider", en: "High Risk Equipment Management | HSE Provider" },
  "/environmental-management": { vi: "Quan trắc môi trường lao động | HSE Provider", en: "Occupational Hygiene Monitoring | HSE Provider" },
  "/contractor-management": { vi: "Quản lý nhà thầu | HSE Provider", en: "Contractor Management | HSE Provider" },
  "/safety-culture": { vi: "Đánh giá văn hóa an toàn | HSE Provider", en: "Safety Culture | HSE Provider" },
  "/legal-compliance": { vi: "Đánh giá tuân thủ pháp luật | HSE Provider", en: "Legal Compliance | HSE Provider" },
  "/chemical-management": { vi: "Quản lý hóa chất & phóng xạ | HSE Provider", en: "Chemical & Radiation Management | HSE Provider" },
};

export default function DocumentLanguage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams.get("lang") === "en" ? "en" : "vi";

  useEffect(() => {
    document.documentElement.lang = locale;
    const title = pageTitles[pathname]?.[locale];
    if (title) document.title = title;
  }, [locale, pathname]);

  return null;
}
