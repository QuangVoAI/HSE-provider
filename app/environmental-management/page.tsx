import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Occupational Hygiene Monitoring", description: "Giải pháp số hóa kế hoạch, dữ liệu và báo cáo quan trắc môi trường lao động." };

export default async function EnvironmentalManagementPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.environmentalManagement} locale={params.lang === "en" ? "en" : "vi"}/>;
}
