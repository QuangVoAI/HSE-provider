export type SiteLocale = "vi" | "en";

const solutionLinks = [
  { href: "/training-management", vi: "Quản lý huấn luyện", en: "Training Management" },
  { href: "/risk-management", vi: "Quản lý rủi ro", en: "Risk Management" },
  { href: "/safety-observation", vi: "Báo cáo quan sát an toàn", en: "Behavior-Based Safety" },
  { href: "/health-management", vi: "Quản lý sức khỏe nghề nghiệp", en: "Health Management" },
  { href: "/equipment-management", vi: "Quản lý thiết bị rủi ro cao", en: "High Risk Equipment Management" },
  { href: "/environmental-management", vi: "Quan trắc môi trường lao động", en: "Occupational Hygiene Monitoring" },
  { href: "/contractor-management", vi: "Quản lý nhà thầu", en: "Contractor Management" },
  { href: "/safety-culture", vi: "Đánh giá văn hóa an toàn", en: "Safety Culture" },
  { href: "/legal-compliance", vi: "Đánh giá tuân thủ pháp luật", en: "Legal Compliance" },
  { href: "/chemical-management", vi: "Quản lý hóa chất & phóng xạ", en: "Chemical & Radiation Management" },
] as const;

export function getSolutionLinks(locale: SiteLocale) {
  return solutionLinks.map((solution) => ({
    href: `${solution.href}?lang=${locale}`,
    label: solution[locale],
  }));
}
