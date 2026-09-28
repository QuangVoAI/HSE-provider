import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSMS",
  description:
    "Nền tảng quản lý đào tạo, rủi ro, sức khỏe nghề nghiệp, nhà thầu và tuân thủ HSE.",
  alternates: { canonical: "/csms" },
};

export default function CsmsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
