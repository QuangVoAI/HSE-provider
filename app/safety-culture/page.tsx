import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Safety Culture | HSE Provider", description: "Giải pháp khảo sát và trực quan hóa mức độ trưởng thành văn hóa an toàn theo Đường cong Bradley." };

export default async function SafetyCulturePage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.safetyCulture} locale={params.lang === "en" ? "en" : "vi"}/>;
}
