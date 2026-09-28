import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Đánh giá tuân thủ pháp luật", description: "Giải pháp chuẩn hóa đánh giá tuân thủ, quản lý bằng chứng và phân tích khoảng trống.", alternates: { canonical: "/legal-compliance" } };

export default async function LegalCompliancePage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.legalCompliance} locale={params.lang === "en" ? "en" : "vi"}/>;
}
