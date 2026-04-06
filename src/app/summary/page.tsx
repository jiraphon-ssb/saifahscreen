"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState, Suspense, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Loader2,
  Download,
  Palette,
  Ruler,
  Tag,
  Printer,
  Image as ImageIcon,
  Type,
  AlertCircle,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Shirt,
  Hash,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DesignPreview from "@/components/design-preview";
import { Separator } from "@/components/ui/separator";
import AnimateOnScroll from "@/components/animate-on-scroll";
import type { DesignElement } from "@/app/design/components/design-tool";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/icons/logo";
import LineIcon from "@/components/icons/line-icon";
import LZString from "lz-string";
import { allFonts } from "@/lib/fonts";
import { getIDB } from "@/lib/idb";

const LINE_OFFICIAL_ID = "saifahscreen";

function SummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const dataParam = searchParams.get("data");
  const briefRef = useRef<HTMLDivElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfExporting, setIsPdfExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [design, setDesign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDesign = async () => {
      let rawData = null;
      if (dataParam) {
        try {
          const decompressed =
            LZString.decompressFromEncodedURIComponent(dataParam);
          if (decompressed) rawData = decompressed;
        } catch (err) {
          console.error("Failed to parse URL data:", err);
        }
      }

      if (!rawData) {
        try {
          rawData = await getIDB("saifah_pending_summary");
        } catch (err) {
          console.error("Failed to fetch from IDB:", err);
        }
      }

      if (rawData) {
        try {
          setDesign(
            typeof rawData === "string" ? JSON.parse(rawData) : rawData,
          );
        } catch (err) {
          console.error("Failed to parse design data:", err);
        }
      }
      setIsLoading(false);
    };

    loadDesign();
  }, [dataParam]);

  const elements: DesignElement[] = useMemo(() => {
    if (!design?.designConfiguration) return [];
    return Array.isArray(design.designConfiguration)
      ? design.designConfiguration
      : JSON.parse(design.designConfiguration);
  }, [design]);

  const orders = useMemo(() => design?.orders || [], [design]);

  const totalQuantity = useMemo(
    () =>
      orders.reduce(
        (sum: number, o: any) =>
          sum +
          Object.values(o.sizes as Record<string, number>).reduce(
            (a: number, b: number) => a + b,
            0,
          ),
        0,
      ),
    [orders],
  );

  const usedFonts = useMemo(() => {
    const fontSet = new Set<string>();
    elements
      .filter((el) => el.type === "text" && el.fontFamily)
      .forEach((el) => fontSet.add(el.fontFamily!));
    return Array.from(fontSet).map((f) => {
      const fontInfo = allFonts.find((af) => af.value === f);
      return { value: f, name: fontInfo?.name || f };
    });
  }, [elements]);

  const uniqueColors = useMemo(
    () =>
      Array.from(
        new Set(elements.filter((el) => el.color).map((el) => el.color!)),
      ),
    [elements],
  );

  const [jobID, setJobID] = useState<string>("SFS-XXXXXX");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setJobID(`SFS-${Date.now().toString().slice(-6)}`);
    setCurrentDate(
      new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  // Export functions
  const handleDownloadMockup = async () => {
    const canvas = document.getElementById("summary-preview-canvas");
    if (!canvas) return;
    setIsDownloading(true);
    try {
      const captured = await html2canvas(canvas, {
        useCORS: true,
        scale: 3,
        backgroundColor: "#ffffff",
      } as any);
      const link = document.createElement("a");
      link.download = `saifah-mockup-${jobID}.png`;
      link.href = captured.toDataURL("image/png");
      link.click();
      toast({ title: "✅ ดาวน์โหลดรูป Mockup สำเร็จ" });
    } catch {
      toast({ variant: "destructive", title: "เกิดข้อผิดพลาด" });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleExportPDF = async () => {
    const el = briefRef.current;
    if (!el) return;
    setIsPdfExporting(true);
    try {
      // Give layout a brief moment to stabilize
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
        onclone: (doc: Document) => {
          const svgs = doc.getElementsByTagName("svg");
          for (let i = 0; i < svgs.length; i++)
            svgs[i].style.overflow = "visible";
        },
      } as any);

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let currentHeight = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      while (currentHeight < pdfHeight) {
        if (currentHeight > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -currentHeight, pdfWidth, pdfHeight);
        currentHeight += pageHeight;
      }

      pdf.save(`saifah-production-brief-${jobID}.pdf`);
      toast({ title: "✅ ส่งออก PDF สำเร็จ" });
    } catch (err) {
      console.error("PDF Export Error:", err);
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาดในการสร้าง PDF",
        description: "กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsPdfExporting(false);
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "📋 คัดลอกลิงก์เรียบร้อย" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ variant: "destructive", title: "ไม่สามารถคัดลอกได้" });
    }
  };

  const handleShareToLine = () => {
    let breakdownTxt = "";
    if (orders.length > 0) {
      breakdownTxt =
        "\n📦 รายการ:\n" +
        orders
          .map((o: any) => {
            const rowTotal = Object.values(
              o.sizes as Record<string, number>,
            ).reduce((a: number, b: number) => a + b, 0);
            if (rowTotal === 0) return "";
            const matrix = Object.entries(o.sizes)
              .filter(([_, q]) => (q as number) > 0)
              .map(([s, q]) => `${s}(${q})`)
              .join(", ");
            return `สี${o.tshirt.name}: ${matrix}`;
          })
          .filter(Boolean)
          .join("\n");
    }
    const message = `🏢 SAIFAH SCREEN\nรหัส: ${jobID}\n👕 สินค้า: ${design?.productConfiguration?.tshirt?.name}\n📊 ยอดรวม: ${totalQuantity} ตัว${breakdownTxt}\n\n🔗 ใบสรุปงาน:\n${window.location.href}`;
    window.open(
      `https://line.me/R/oaMessage/@${LINE_OFFICIAL_ID}/?${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  // No data state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!design) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <AnimateOnScroll delay={100} className="max-w-md mx-auto space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-headline font-semibold">
            ไม่พบข้อมูลดีไซน์
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            ลิงก์สรุปอาจไม่ถูกต้อง กรุณาลองสร้างใหม่อีกครั้งจากหน้าออกแบบ
          </p>
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg">
            <Link href="/design">กลับไปที่หน้าออกแบบ</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    );
  }

  const config = design.productConfiguration;
  const designForPreview = {
    ...design,
    designConfiguration: JSON.stringify(elements),
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 max-w-5xl">
      {/* Header */}
      <AnimateOnScroll delay={100}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Logo className="h-8 w-auto" />
              <Badge
                variant="outline"
                className="rounded-lg border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase"
              >
                {jobID}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-headline font-black text-zinc-950 tracking-tight">
              ใบสรุปงานสั่งผลิต
            </h1>
            <p className="text-sm text-zinc-400 font-medium mt-1">
              วันที่ {currentDate}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl gap-2 text-xs font-bold"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "คัดลอกแล้ว" : "คัดลอกลิงก์"}
            </Button>
            <Button
              size="sm"
              className="rounded-xl gap-2 text-xs font-bold bg-[#06C755] hover:bg-[#05a647]"
              onClick={handleShareToLine}
            >
              <LineIcon className="h-4 w-4" />
              ส่ง LINE
            </Button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Main Brief Content */}
      <div ref={briefRef}>
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Left: Details */}
          <AnimateOnScroll as="div" delay={200} className="space-y-6">
            {/* Section 1: Product Info + Order Matrix */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-950">
                  ข้อมูลสินค้าและยอดสั่งผลิต
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-xl">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">
                      ประเภท
                    </p>
                    <p className="text-sm font-bold text-zinc-950 capitalize">
                      {config?.productType}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-xl">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">
                      สีเสื้อหลัก
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: config?.tshirt?.colorValue }}
                      />
                      <p className="text-sm font-bold text-zinc-950">
                        {config?.tshirt?.name}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-[10px] font-bold text-primary uppercase mb-1">
                      ยอดรวม
                    </p>
                    <p className="text-2xl font-black text-primary leading-none">
                      {totalQuantity}{" "}
                      <span className="text-xs font-bold">ตัว</span>
                    </p>
                  </div>
                </div>

                {/* Order Matrix Table */}
                {orders.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-zinc-200">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[380px]">
                        <thead>
                          <tr className="bg-zinc-950 text-white">
                            <th className="px-4 py-3 text-[10px] font-bold uppercase">
                              สีเสื้อ
                            </th>
                            <th className="px-4 py-3 text-[10px] font-bold uppercase">
                              ไซส์และจำนวน
                            </th>
                            <th className="px-4 py-3 text-[10px] font-bold uppercase text-right">
                              รวม
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          {orders
                            .filter((o: any) =>
                              Object.values(
                                o.sizes as Record<string, number>,
                              ).some((v: number) => v > 0),
                            )
                            .map((o: any, idx: number) => (
                              <tr
                                key={idx}
                                className="hover:bg-zinc-50 transition-colors"
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-4 w-4 rounded-full border border-black/10 shadow-sm"
                                      style={{
                                        backgroundColor: o.tshirt.colorValue,
                                      }}
                                    />
                                    <span className="text-xs font-bold text-zinc-900">
                                      {o.tshirt.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap gap-1.5">
                                    {Object.entries(o.sizes)
                                      .filter(([_, q]) => (q as number) > 0)
                                      .map(([s, q]) => (
                                        <div
                                          key={s}
                                          className="flex overflow-hidden rounded-md bg-zinc-100 border border-zinc-200 h-6"
                                        >
                                          <span className="px-2 bg-white flex items-center text-[10px] font-bold border-r border-zinc-200">
                                            {s}
                                          </span>
                                          <span className="px-2 flex items-center text-[10px] font-bold text-zinc-600">
                                            {q as number}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-sm text-zinc-950">
                                  {Object.values(
                                    o.sizes as Record<string, number>,
                                  ).reduce((a: number, b: number) => a + b, 0)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Elements Manifest */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center">
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-950">
                    รายละเอียด Elements ที่ใช้
                  </h2>
                </div>
                <Badge
                  variant="secondary"
                  className="text-[10px] font-bold bg-zinc-100"
                >
                  {elements.length} ชิ้น
                </Badge>
              </div>
              <div className="divide-y divide-zinc-100">
                {elements.map((el, idx) => (
                  <div
                    key={el.id || idx}
                    className="p-4 flex items-start gap-4 hover:bg-zinc-50/50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                      {el.type === "image" && el.url ? (
                        <img
                          src={el.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Type className="h-5 w-5 text-zinc-400" />
                      )}
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[8px] font-bold uppercase rounded-md px-1.5 py-0 border-zinc-200"
                        >
                          {el.type === "text" ? "ข้อความ" : "รูปภาพ"}
                        </Badge>
                        <span className="text-xs font-bold text-zinc-950 truncate">
                          {el.name}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-400 font-medium">
                        {el.type === "text" && (
                          <>
                            <span className="flex items-center gap-1">
                              <Type className="h-2.5 w-2.5" />
                              ฟอนต์:{" "}
                              <strong className="text-zinc-600">
                                {allFonts.find((f) => f.value === el.fontFamily)
                                  ?.name || el.fontFamily}
                              </strong>
                            </span>
                            <span>
                              ขนาด:{" "}
                              <strong className="text-zinc-600">
                                {el.fontSize}px
                              </strong>
                            </span>
                            <span>
                              น้ำหนัก:{" "}
                              <strong className="text-zinc-600">
                                {el.fontWeight}
                              </strong>
                            </span>
                            {el.color && (
                              <span className="flex items-center gap-1">
                                สี:{" "}
                                <span
                                  className="h-2.5 w-2.5 rounded-full border border-black/10 inline-block"
                                  style={{ backgroundColor: el.color }}
                                />{" "}
                                <strong className="text-zinc-600">
                                  {el.color}
                                </strong>
                              </span>
                            )}
                          </>
                        )}
                        {el.type === "image" && (
                          <>
                            <span>
                              ขนาด:{" "}
                              <strong className="text-zinc-600">
                                {typeof el.width === "number" ? el.width : "?"}×
                                {typeof el.height === "number"
                                  ? el.height
                                  : "?"}
                                px
                              </strong>
                            </span>
                          </>
                        )}
                        <span>
                          ตำแหน่ง:{" "}
                          <strong className="text-zinc-600">
                            X:{Math.round(el.x)} Y:{Math.round(el.y)}
                          </strong>
                        </span>
                        {el.rotation ? (
                          <span>
                            หมุน:{" "}
                            <strong className="text-zinc-600">
                              {el.rotation}°
                            </strong>
                          </span>
                        ) : null}
                      </div>
                      {el.type === "text" && el.text && (
                        <p className="text-xs text-zinc-600 font-medium truncate bg-zinc-50 px-2 py-1 rounded-lg border border-zinc-100 mt-1">
                          &ldquo;{el.text}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {elements.length === 0 && (
                  <div className="p-8 text-center text-zinc-400 text-sm">
                    ไม่มี Element ในดีไซน์นี้
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Font & Color Report */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usedFonts.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-3">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                    <Type className="h-3.5 w-3.5" /> ฟอนต์ที่ใช้
                  </h3>
                  <div className="space-y-2">
                    {usedFonts.map((f) => (
                      <div
                        key={f.value}
                        className="flex items-center gap-3 p-2 bg-zinc-50 rounded-xl"
                      >
                        <span
                          className="text-base font-bold text-zinc-950"
                          style={{ fontFamily: f.value }}
                        >
                          {f.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {uniqueColors.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-3">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                    <Palette className="h-3.5 w-3.5" /> สีที่ใช้ในดีไซน์
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {uniqueColors.map((c) => (
                      <div
                        key={c}
                        className="flex items-center gap-2 p-2 bg-zinc-50 rounded-xl border border-zinc-100"
                      >
                        <div
                          className="h-6 w-6 rounded-lg border-2 border-white shadow-md"
                          style={{ backgroundColor: c }}
                        />
                        <span className="text-[10px] font-mono font-bold text-zinc-600">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimateOnScroll>

          {/* Right: Preview + Export Actions */}
          <AnimateOnScroll
            as="div"
            delay={300}
            className="lg:sticky lg:top-6 space-y-4"
          >
            {/* Mockup Preview */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100">
                <h3 className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                  <Shirt className="h-3.5 w-3.5" /> พรีวิว Mockup
                </h3>
              </div>
              <div
                id="summary-preview-canvas"
                className="p-6 flex items-center justify-center bg-white"
              >
                <div className="aspect-square w-full max-w-[300px] rounded-2xl bg-zinc-50 border border-zinc-100 overflow-hidden">
                  <DesignPreview design={designForPreview} size={400} />
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2 mb-4">
                <Download className="h-3.5 w-3.5" /> ดาวน์โหลดและส่งออก
              </h3>

              <Button
                className="w-full h-12 rounded-xl gap-3 font-bold text-sm bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all"
                onClick={handleExportPDF}
                disabled={isPdfExporting}
              >
                {isPdfExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                บันทึก PDF ใบสรุปงาน
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 rounded-xl gap-3 font-bold text-sm border-zinc-200 active:scale-[0.98] transition-all"
                onClick={handleDownloadMockup}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}
                ดาวน์โหลดรูป Mockup (PNG)
              </Button>

              <Separator className="bg-zinc-100" />

              <Button
                className="w-full h-12 rounded-xl gap-3 font-bold text-sm bg-[#06C755] hover:bg-[#05a647] active:scale-[0.98] transition-all"
                onClick={handleShareToLine}
              >
                <LineIcon className="h-5 w-5" />
                ส่งรายละเอียดเข้า LINE
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 text-xs font-bold h-10"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "คัดลอกแล้ว" : "คัดลอกลิงก์"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 text-xs font-bold h-10"
                  asChild
                >
                  <Link href={`/design?data=${dataParam}`}>
                    <Palette className="h-3.5 w-3.5" />
                    แก้ไขดีไซน์
                  </Link>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        }
      >
        <SummaryContent />
      </Suspense>
    </div>
  );
}
