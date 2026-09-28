import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Báo cáo quan sát an toàn", description: "Phần mềm ghi nhận hành vi và điều kiện không an toàn, phân công xử lý, theo dõi hành động khắc phục và phân tích xu hướng rủi ro.", alternates: { canonical: "/safety-observation" } };

export default async function SafetyObservationPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.safetyObservation} locale={params.lang === "en" ? "en" : "vi"}/>;
}
