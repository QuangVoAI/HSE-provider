import type { Metadata } from "next";
import ModuleLanding from "../module-solutions/module-landing";
import { modulePages } from "../module-solutions/module-data";

export const metadata: Metadata = { title: "High Risk Equipment Management", description: "Giải pháp quản lý thiết bị có yêu cầu nghiêm ngặt về an toàn, lịch kiểm định và bảo trì." };

export default async function EquipmentManagementPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <ModuleLanding config={modulePages.equipmentManagement} locale={params.lang === "en" ? "en" : "vi"}/>;
}
