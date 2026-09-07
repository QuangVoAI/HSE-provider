import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSMS | HSE Provider",
  description:
    "A connected safety management system for training, risk, occupational health, contractors and compliance.",
};

export default function CsmsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
