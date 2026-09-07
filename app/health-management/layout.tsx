import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Management | HSE Provider",
  description: "Giải pháp quản lý sức khỏe nghề nghiệp và hồ sơ khám sức khỏe người lao động.",
};

export default function HealthManagementLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
