import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Quan trắc môi trường lao động", description: "Phần mềm số hóa khu vực, tiêu chí, kế hoạch, kết quả và báo cáo quan trắc môi trường lao động tập trung cho doanh nghiệp.", alternates: { canonical: "/environmental-management" } };

export default async function EnvironmentalManagementPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.environmentalManagement} locale={params.lang === "en" ? "en" : "vi"}/>;
}
