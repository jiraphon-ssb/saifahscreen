import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วิธีการใช้งานระบบออกแบบ",
  description: "เรียนรู้วิธีการใช้เครื่องมือออกแบบเสื้อของ SAIFAH từngขั้นตอน",
};

export default function HowToDesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
