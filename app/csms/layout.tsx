import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSMS | HSE Provider",
  description:
    "A connected safety management system for training, risk, occupational health, contractors and compliance.",
};

export default function CsmsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
