import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý sức khỏe nghề nghiệp",
  description: "Phần mềm quản lý sức khỏe nghề nghiệp, kế hoạch khám, hồ sơ y tế, kết quả khám và phân loại sức khỏe người lao động tập trung.",
  alternates: { canonical: "/health-management" },
};

export default function HealthManagementLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
