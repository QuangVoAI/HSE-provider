import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "Quản lý thiết bị rủi ro cao", description: "Phần mềm quản lý thiết bị có yêu cầu nghiêm ngặt về an toàn, hồ sơ, lịch kiểm định, bảo trì và trạng thái tuân thủ tập trung.", alternates: { canonical: "/equipment-management" } };

export default async function EquipmentManagementPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.equipmentManagement} locale={params.lang === "en" ? "en" : "vi"}/>;
}
