import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Đánh giá tuân thủ pháp luật", description: "Phần mềm chuẩn hóa kỳ đánh giá, yêu cầu pháp luật, bằng chứng tuân thủ, hành động khắc phục và phân tích khoảng trống cho doanh nghiệp.", alternates: { canonical: "/legal-compliance" } };

export default async function LegalCompliancePage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.legalCompliance} locale={params.lang === "en" ? "en" : "vi"}/>;
}
