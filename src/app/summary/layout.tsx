import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สรุปรายละเอียดดีไซน์",
  description: "ตรวจสอบรายละเอียดดีไซน์ของคุณทั้งหมดที่นี่",
};

export default function SummaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
