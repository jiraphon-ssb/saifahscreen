import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เครื่องมือออกแบบ",
  description: "สร้างสรรค์ผลงานชิ้นใหม่ หรือแก้ไขดีไซน์ที่คุณบันทึกไว้",
};

export default function DesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is for the design tool. It inherits the root layout.
  return <>{children}</>;
}
