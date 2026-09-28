import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý sức khỏe nghề nghiệp",
  description: "Giải pháp quản lý sức khỏe nghề nghiệp và hồ sơ khám sức khỏe người lao động.",
  alternates: { canonical: "/health-management" },
};

export default function HealthManagementLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
