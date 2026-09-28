"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const pageTitles: Record<string, { vi: string; en: string }> = {
  "/": { vi: "CSMS", en: "CSMS" },
  "/csms": { vi: "CSMS", en: "CSMS" },
  "/customers": { vi: "Khách hàng", en: "Our Customers" },
  "/contact": { vi: "Liên hệ", en: "Contact" },
  "/training-management": { vi: "Quản lý huấn luyện", en: "Training Management" },
  "/risk-management": { vi: "Quản lý rủi ro", en: "Risk Management" },
  "/safety-observation": { vi: "Báo cáo quan sát an toàn", en: "Behavior-Based Safety" },
  "/health-management": { vi: "Quản lý sức khỏe nghề nghiệp", en: "Health Management" },
  "/equipment-management": { vi: "Quản lý thiết bị rủi ro cao", en: "High Risk Equipment Management" },
  "/environmental-management": { vi: "Quan trắc môi trường lao động", en: "Occupational Hygiene Monitoring" },
  "/contractor-management": { vi: "Quản lý nhà thầu", en: "Contractor Management" },
  "/safety-culture": { vi: "Đánh giá văn hóa an toàn", en: "Safety Culture" },
  "/legal-compliance": { vi: "Đánh giá tuân thủ pháp luật", en: "Legal Compliance" },
  "/chemical-management": { vi: "Quản lý hóa chất & phóng xạ", en: "Chemical & Radiation Management" },
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
