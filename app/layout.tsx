import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSMS | HSE Provider",
  description: "Connected safety management for modern HSE operations.",
  icons: { icon: "/assets/csms/hse-provider-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
