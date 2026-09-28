import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Behavior-Based Safety", description: "Giải pháp ghi nhận quan sát an toàn, xử lý hành động khắc phục và phân tích xu hướng rủi ro." };

export default async function SafetyObservationPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.safetyObservation} locale={params.lang === "en" ? "en" : "vi"}/>;
}
