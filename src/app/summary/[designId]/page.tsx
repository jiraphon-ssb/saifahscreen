"use client";

import { useParams } from "next/navigation";
import { Package, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimateOnScroll from "@/components/animate-on-scroll";

export default function SummaryPageLegacy() {
  const params = useParams();
  const designId = params.designId as string;

  return (
    <div className="bg-zinc-50 min-h-screen flex items-center justify-center p-4">
      <AnimateOnScroll
        delay={100}
        className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-2xl shadow-zinc-200/50 border border-zinc-100 text-center space-y-6"
      >
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <Package className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-headline font-bold text-zinc-950">
            ไม่พบข้อมูลดีไซน์ในระบบ
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            รหัสดีไซน์{" "}
            <span className="font-mono font-bold text-primary">
              #{designId.substring(0, 8).toUpperCase()}
            </span>{" "}
            ไม่พบในฐานข้อมูล (ระบบปัจจุบันใช้การส่งข้อมูลผ่านลิงก์โดยตรง)
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3 text-left">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium leading-tight">
            หากคุณมาจากลิงก์แชร์ของผู้อื่น กรุณาขอลิงก์ใหม่
            หรือเริ่มต้นออกแบบเองได้ทันทีที่ปุ่มด้านล่าง
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            asChild
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/design">เริ่มต้นออกแบบใหม่</Link>
          </Button>
          <Link
            href="/"
            className="text-sm font-bold text-primary hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าหลัก
          </Link>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
