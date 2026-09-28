import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Đánh giá văn hóa an toàn", description: "Phần mềm thiết lập chiến dịch, khảo sát và phân tích mức độ trưởng thành văn hóa an toàn của doanh nghiệp theo Đường cong Bradley.", alternates: { canonical: "/safety-culture" } };

export default async function SafetyCulturePage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.safetyCulture} locale={params.lang === "en" ? "en" : "vi"}/>;
}
