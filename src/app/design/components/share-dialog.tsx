"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import LZString from "lz-string";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import LineIcon from "@/components/icons/line-icon";

import {
  Loader2,
  Download,
  FileText,
  Copy,
  Check,
  Shirt,
  ImageIcon,
  Palette,
  Type,
  Package,
  X,
} from "lucide-react";

import type {
  DesignState,
  DesignElement,
} from "./design-tool";
import { allFonts } from "@/lib/fonts";

const LINE_OFFICIAL_ID = "saifahscreen";
const ORIGINAL_CANVAS_SIZE = 600;

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designState: DesignState;
}

// ─── Accurate Preview (matches canvas-preview.tsx exactly) ───────────────────
function ExportPreview({
  elements,
  imageUrl,
  size,
}: {
  elements: DesignElement[];
  imageUrl: string;
  size: number;
}) {
  const scale = size / ORIGINAL_CANVAS_SIZE;

  const parseShadow = (
    shadowString: string | undefined,
    currentScale: number,
  ) => {
    if (!shadowString || shadowString === "none") return "none";
    const parts = shadowString.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g);
    if (!parts || parts.length < 4) return "none";
    return `${parseFloat(parts[0]) * currentScale}px ${parseFloat(parts[1]) * currentScale}px ${parseFloat(parts[2]) * currentScale}px ${parts[3]}`;
  };

  return (
    <div style={{ width: size, height: size }} className="relative bg-white">
      {/* T-Shirt mockup */}
      <img
        src={imageUrl}
        alt="Product preview"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        crossOrigin="anonymous"
      />
      {/* Elements overlay */}
      <div className="absolute inset-0">
        {elements
          .filter((el) => el.visible !== false)
          .map((element, index) => {
            const scaledWidth =
              typeof element.width === "number"
                ? element.width * scale
                : element.width;
            const scaledHeight =
              typeof element.height === "number"
                ? element.height * scale
                : element.height;

            const textStyle: React.CSSProperties = {
              fontFamily: element.fontFamily || "sans-serif",
              fontSize: `${(element.fontSize || 48) * scale}px`,
              fontWeight: element.fontWeight || 700,
              lineHeight: element.lineHeight || 1.2,
              letterSpacing: `${(element.letterSpacing || 0) * scale}px`,
              textAlign: element.textAlign || "center",
              color: element.color || "#000000",
              textShadow: parseShadow(element.textShadow, scale),
              WebkitTextStroke:
                element.strokeWidth && element.strokeWidth > 0
                  ? `${element.strokeWidth * scale}px ${element.strokeColor}`
                  : "unset",
              paintOrder: "stroke fill",
              whiteSpace: "pre-wrap",
              opacity: element.opacity ?? 1,
            };

            const imageStyle: React.CSSProperties = {
              filter: `
                brightness(${element.filters?.brightness ?? 100}%)
                contrast(${element.filters?.contrast ?? 100}%)
                grayscale(${element.filters?.grayscale ?? 0}%)
                sepia(${element.filters?.sepia ?? 0}%)
              `,
              transform: `
                scaleX(${element.flip?.horizontal ? -1 : 1})
                scaleY(${element.flip?.vertical ? -1 : 1})
              `,
              opacity: element.opacity ?? 1,
            };

            return (
              <div
                key={element.id}
                className="absolute"
                style={{
                  left: element.x * scale,
                  top: element.y * scale,
                  width: scaledWidth,
                  height: scaledHeight,
                  zIndex: index + 1,
                  transform: `rotate(${element.rotation || 0}deg)`,
                }}
              >
                {element.type === "image" && element.url && (
                  <img
                    src={element.url}
                    alt={element.name}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    style={imageStyle}
                    crossOrigin="anonymous"
                  />
                )}
                {element.type === "text" && (
                  <div className="w-full h-full pointer-events-none select-none">
                    {element.curve && element.curve !== 0 ? (
                      <svg
                        viewBox={`0 0 ${scaledWidth} ${scaledHeight}`}
                        className="w-full h-full overflow-visible"
                        style={{
                          filter:
                            textStyle.textShadow !== "none"
                              ? `drop-shadow(${textStyle.textShadow})`
                              : "none",
                        }}
                      >
                        <defs>
                          <path
                            id={`export-path-${element.id}`}
                            d={(() => {
                              const w = scaledWidth as number;
                              const h = scaledHeight as number;
                              const c = element.curve || 0;
                              const bend = (h / 2) * (c / 100);
                              return `M 0,${h / 2} Q ${w / 2},${h / 2 + bend * 2} ${w},${h / 2}`;
                            })()}
                          />
                        </defs>
                        <text
                          fill={element.color}
                          style={{
                            fontFamily: textStyle.fontFamily,
                            fontSize: textStyle.fontSize,
                            fontWeight: textStyle.fontWeight,
                            WebkitTextStroke: textStyle.WebkitTextStroke,
                          }}
                        >
                          <textPath
                            xlinkHref={`#export-path-${element.id}`}
                            startOffset="50%"
                            textAnchor="middle"
                          >
                            {element.text}
                          </textPath>
                        </text>
                      </svg>
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={textStyle}
                      >
                        {element.text}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ─── Main Share Dialog ───────────────────────────────────────────────────────
export default function ShareDialog({
  open,
  onOpenChange,
  designState,
}: ShareDialogProps) {
  const { toast } = useToast();
  const exportCanvasRef = useRef<HTMLDivElement>(null);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfExporting, setIsPdfExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jobID, setJobID] = useState("SFS-XXXXXX");

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (open) {
      setJobID(`SFS-${Date.now().toString().slice(-6)}`);
      setCurrentDate(
        new Date().toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      );
    }
  }, [open]);

  const { productConfig, elements, orders } = designState;

  const totalQuantity = orders.reduce(
    (sum, o) =>
      sum +
      Object.values(o.sizes).reduce((a, b) => a + b, 0),
    0,
  );

  const usedFonts = Array.from(
    new Set(
      elements
        .filter((el) => el.type === "text" && el.fontFamily)
        .map((el) => el.fontFamily!),
    ),
  ).map((f) => {
    const fontInfo = allFonts.find((af) => af.value === f);
    return { value: f, name: fontInfo?.name || f };
  });

  const uniqueColors = Array.from(
    new Set(elements.filter((el) => el.color).map((el) => el.color!)),
  );

  // ── Generate shareable URL ──
  const generateShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    const rawData = JSON.stringify({
      productConfiguration: productConfig,
      designConfiguration: elements,
      orders,
    });
    const compressed = LZString.compressToEncodedURIComponent(rawData);
    return `${window.location.origin}/summary?data=${compressed}`;
  }, [productConfig, elements, orders]);

  // ── Download Mockup PNG ──
  const handleDownloadMockup = async () => {
    const canvas = exportCanvasRef.current;
    if (!canvas) return;
    setIsDownloading(true);
    try {
      // Small delay to ensure render is complete
      await new Promise((r) => setTimeout(r, 200));
      const captured = await html2canvas(canvas, {
        useCORS: true,
        allowTaint: true,
        scale: 4,
        backgroundColor: "#ffffff",
        width: ORIGINAL_CANVAS_SIZE,
        height: ORIGINAL_CANVAS_SIZE,
      } as any);
      const link = document.createElement("a");
      link.download = `saifah-mockup-${jobID}.png`;
      link.href = captured.toDataURL("image/png");
      link.click();
      toast({ title: "✅ ดาวน์โหลดรูป Mockup สำเร็จ" });
    } catch (err) {
      console.error("Mockup download error:", err);
      toast({ variant: "destructive", title: "เกิดข้อผิดพลาดในการดาวน์โหลด" });
    } finally {
      setIsDownloading(false);
    }
  };

  // ── Export PDF (beautiful HTML template → html2canvas → jsPDF) ──
  const handleExportPDF = async () => {
    const templateEl = pdfTemplateRef.current;
    if (!templateEl) return;
    setIsPdfExporting(true);
    try {
      await new Promise((r) => setTimeout(r, 300));

      const captured = await html2canvas(templateEl, {
        useCORS: true,
        allowTaint: true,
        scale: 2.5,
        backgroundColor: "#ffffff",
        width: 794, // A4 at 96dpi
        windowWidth: 794,
        onclone: (doc: Document) => {
          const svgs = doc.getElementsByTagName("svg");
          for (let i = 0; i < svgs.length; i++)
            svgs[i].style.overflow = "visible";
        },
      } as any);

      const imgData = captured.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (captured.height * pdfWidth) / captured.width;

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
      console.error("PDF export error:", err);
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาดในการสร้าง PDF",
      });
    } finally {
      setIsPdfExporting(false);
    }
  };

  // ── Copy link ──
  const handleCopyLink = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "📋 คัดลอกลิงก์เรียบร้อย" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ variant: "destructive", title: "ไม่สามารถคัดลอกได้" });
    }
  };

  // ── Share to LINE ──
  const handleShareToLine = () => {
    const shareUrl = generateShareUrl();
    let breakdownTxt = "";
    if (orders.length > 0) {
      breakdownTxt =
        "\n📦 รายการ:\n" +
        orders
          .map((o) => {
            const rowTotal = Object.values(o.sizes).reduce((a, b) => a + b, 0);
            if (rowTotal === 0) return "";
            const matrix = Object.entries(o.sizes)
              .filter(([_, q]) => q > 0)
              .map(([s, q]) => `${s}(${q})`)
              .join(", ");
            return `สี${o.tshirt.name}: ${matrix}`;
          })
          .filter(Boolean)
          .join("\n");
    }
    const message = `🏢 SAIFAH SCREEN\nรหัส: ${jobID}\n👕 สินค้า: ${productConfig.tshirt.name}\n📊 ยอดรวม: ${totalQuantity} ตัว${breakdownTxt}\n\n🔗 ใบสรุปงาน:\n${shareUrl}`;
    window.open(
      `https://line.me/R/oaMessage/@${LINE_OFFICIAL_ID}/?${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden rounded-2xl border-zinc-200">
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-black tracking-tight text-zinc-950">
              แชร์และส่งออก
            </DialogTitle>
            <Badge
              variant="outline"
              className="rounded-lg border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase"
            >
              {jobID}
            </Badge>
          </div>
          <DialogDescription className="text-zinc-500 text-sm">
            ดูตัวอย่าง ดาวน์โหลด หรือแชร์ดีไซน์ของคุณ
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <div className="px-6 pb-6 pt-4">
            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              {/* ── Left: Mockup Preview ── */}
              <div className="space-y-4">
                {/* Visible preview */}
                <div className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-2.5 bg-zinc-100/50 border-b border-zinc-100 flex items-center gap-2">
                    <Shirt className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      Mockup Preview
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <div className="w-full max-w-[400px] aspect-square relative">
                      <ExportPreview
                        elements={elements}
                        imageUrl={productConfig.tshirt.imageUrl}
                        size={400}
                      />
                    </div>
                  </div>
                </div>

                {/* Product quick info */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[9px] font-bold text-zinc-400 uppercase mb-0.5">
                      ประเภท
                    </p>
                    <p className="text-xs font-bold text-zinc-950 capitalize">
                      {productConfig.productType}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[9px] font-bold text-zinc-400 uppercase mb-0.5">
                      สีเสื้อ
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{ backgroundColor: productConfig.tshirt.colorValue }}
                      />
                      <p className="text-xs font-bold text-zinc-950">
                        {productConfig.tshirt.name}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-[9px] font-bold text-primary uppercase mb-0.5">
                      ยอดรวม
                    </p>
                    <p className="text-lg font-black text-primary leading-none">
                      {totalQuantity}{" "}
                      <span className="text-[9px] font-bold">ตัว</span>
                    </p>
                  </div>
                </div>

                {/* Orders matrix */}
                {orders.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-zinc-200">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-zinc-950 text-white">
                            <th className="px-3 py-2 text-[9px] font-bold uppercase">
                              สีเสื้อ
                            </th>
                            <th className="px-3 py-2 text-[9px] font-bold uppercase">
                              ไซส์และจำนวน
                            </th>
                            <th className="px-3 py-2 text-[9px] font-bold uppercase text-right">
                              รวม
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          {orders
                            .filter((o) =>
                              Object.values(o.sizes).some((v) => v > 0),
                            )
                            .map((o, idx) => (
                              <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-3 py-2">
                                  <div className="flex items-center gap-1.5">
                                    <div
                                      className="h-3 w-3 rounded-full border border-black/10"
                                      style={{ backgroundColor: o.tshirt.colorValue }}
                                    />
                                    <span className="text-[10px] font-bold text-zinc-900">
                                      {o.tshirt.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-2">
                                  <div className="flex flex-wrap gap-1">
                                    {Object.entries(o.sizes)
                                      .filter(([_, q]) => q > 0)
                                      .map(([s, q]) => (
                                        <span
                                          key={s}
                                          className="text-[9px] font-bold bg-zinc-100 rounded px-1.5 py-0.5"
                                        >
                                          {s}×{q}
                                        </span>
                                      ))}
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-right font-bold text-xs text-zinc-950">
                                  {Object.values(o.sizes).reduce((a, b) => a + b, 0)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Elements manifest */}
                {elements.length > 0 && (
                  <div className="rounded-xl border border-zinc-100 overflow-hidden">
                    <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Palette className="h-3 w-3 text-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">
                          Elements
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[9px] font-bold bg-zinc-100"
                      >
                        {elements.length} ชิ้น
                      </Badge>
                    </div>
                    <div className="divide-y divide-zinc-50 max-h-[200px] overflow-y-auto">
                      {elements.map((el, idx) => (
                        <div
                          key={el.id || idx}
                          className="px-4 py-2.5 flex items-center gap-3 hover:bg-zinc-50/50 transition-colors"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                            {el.type === "image" && el.url ? (
                              <img
                                src={el.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Type className="h-3.5 w-3.5 text-zinc-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <Badge
                                variant="outline"
                                className="text-[7px] font-bold uppercase rounded px-1 py-0 border-zinc-200"
                              >
                                {el.type === "text" ? "ข้อความ" : "รูปภาพ"}
                              </Badge>
                              <span className="text-[10px] font-bold text-zinc-950 truncate">
                                {el.name}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 text-[9px] text-zinc-400 font-medium mt-0.5">
                              {el.type === "text" && (
                                <>
                                  <span>
                                    ฟอนต์:{" "}
                                    <strong className="text-zinc-600">
                                      {allFonts.find((f) => f.value === el.fontFamily)?.name ||
                                        el.fontFamily}
                                    </strong>
                                  </span>
                                  <span>
                                    {el.fontSize}px
                                  </span>
                                </>
                              )}
                              <span>
                                X:{Math.round(el.x)} Y:{Math.round(el.y)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Font & Color report */}
                <div className="grid grid-cols-2 gap-2">
                  {usedFonts.length > 0 && (
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-2">
                      <h4 className="text-[9px] font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                        <Type className="h-3 w-3" /> ฟอนต์
                      </h4>
                      <div className="space-y-1">
                        {usedFonts.map((f) => (
                          <p
                            key={f.value}
                            className="text-[10px] font-bold text-zinc-700"
                            style={{ fontFamily: f.value }}
                          >
                            {f.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {uniqueColors.length > 0 && (
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-2">
                      <h4 className="text-[9px] font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                        <Palette className="h-3 w-3" /> สี
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {uniqueColors.map((c) => (
                          <div key={c} className="flex items-center gap-1">
                            <div
                              className="h-4 w-4 rounded border border-white shadow-sm"
                              style={{ backgroundColor: c }}
                            />
                            <span className="text-[8px] font-mono font-bold text-zinc-500">
                              {c}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Right: Export Actions ── */}
              <div className="space-y-3 lg:sticky lg:top-0">
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 space-y-3">
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-2 mb-3">
                    <Download className="h-3.5 w-3.5" /> ดาวน์โหลดและส่งออก
                  </h3>

                  <Button
                    className="w-full h-11 rounded-xl gap-2.5 font-bold text-sm bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all"
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
                    className="w-full h-11 rounded-xl gap-2.5 font-bold text-sm border-zinc-200 active:scale-[0.98] transition-all"
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
                    className="w-full h-11 rounded-xl gap-2.5 font-bold text-sm bg-[#06C755] hover:bg-[#05a647] active:scale-[0.98] transition-all"
                    onClick={handleShareToLine}
                  >
                    <LineIcon className="h-5 w-5" />
                    ส่งรายละเอียดเข้า LINE
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-10 rounded-xl gap-2 text-xs font-bold border-zinc-200"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? "คัดลอกแล้ว!" : "คัดลอกลิงก์แชร์"}
                  </Button>
                </div>

                {/* Tips */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                    โดยมีข้อมูลครบถ้วนเหมือนกับที่เห็นในนี้เลยครับ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
      {/* ── Hidden export elements at root level to avoid Radix UI transform/overflow bounds ── */}
      <div
        ref={exportCanvasRef}
        style={{
          position: "fixed",
          left: -9999,
          top: -9999,
          width: ORIGINAL_CANVAS_SIZE,
          height: ORIGINAL_CANVAS_SIZE,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <ExportPreview
          elements={elements}
          imageUrl={productConfig.tshirt.imageUrl}
          size={ORIGINAL_CANVAS_SIZE}
        />
      </div>

      <div
        ref={pdfTemplateRef}
        style={{
          position: "fixed",
          left: -9999,
          top: -9999,
          width: 794, // A4 width at 96 DPI
          fontFamily: "'Inter', 'Noto Sans Thai', sans-serif",
          backgroundColor: "#ffffff",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div style={{ padding: 40 }}>
          {/* ═══ Header ═══ */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 8 }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top" }}>
                  <img src="/images/mainlogo.png" alt="SAIFAH SCREEN" style={{ height: 28, marginBottom: 4, objectFit: "contain" }} />
                  <div style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600, letterSpacing: "0.5px" }}>PRODUCTION BRIEF</div>
                </td>
                <td style={{ verticalAlign: "top", textAlign: "right" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", letterSpacing: "1px" }}>{jobID}</div>
                  <div style={{ fontSize: 10, color: "#d4d4d8", marginTop: 2 }}>{currentDate}</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ height: 3, background: "linear-gradient(to right, #09090b, #3b82f6, #d4d4d8)", borderRadius: 2, marginBottom: 28 }} />

          {/* ═══ Mockup + Product Info ═══ */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28 }}>
            <tbody>
              <tr>
                <td style={{ width: 280, verticalAlign: "top", paddingRight: 24 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>MOCKUP PREVIEW</div>
                  <div style={{ width: 260, height: 260, border: "1px solid #e4e4e7", borderRadius: 12, overflow: "hidden", backgroundColor: "#fafafa" }}>
                    <ExportPreview
                      elements={elements}
                      imageUrl={productConfig.tshirt.imageUrl}
                      size={260}
                    />
                  </div>
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>PRODUCT INFORMATION</div>
                  <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #f4f4f5" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "#71717a", width: "45%", backgroundColor: "#fafafa" }}>ประเภทสินค้า</td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#09090b", textTransform: "capitalize" }}>{productConfig.productType}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #f4f4f5" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "#71717a", backgroundColor: "#fafafa" }}>สีเสื้อหลัก</td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#09090b" }}>
                            <span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", backgroundColor: productConfig.tshirt.colorValue, border: "1px solid rgba(0,0,0,0.1)", verticalAlign: "middle", marginRight: 6 }} />
                            {productConfig.tshirt.name}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #f4f4f5" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "#71717a", backgroundColor: "#fafafa" }}>จำนวน Elements</td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "#09090b" }}>{elements.length} ชิ้น</td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "#71717a", backgroundColor: "#fafafa" }}>ยอดสั่งผลิตรวม</td>
                          <td style={{ padding: "10px 14px", fontWeight: 900, color: "#3b82f6", fontSize: 18 }}>{totalQuantity} <span style={{ fontSize: 11, fontWeight: 600 }}>ตัว</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* ═══ Order Matrix ═══ */}
          {orders.length > 0 && orders.some((o) => Object.values(o.sizes).some((v) => v > 0)) && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>ORDER MATRIX</div>
              <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#09090b" }}>
                      <th style={{ padding: "10px 14px", textAlign: "left", color: "#ffffff", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>สีเสื้อ</th>
                      {["S", "M", "L", "XL", "2XL"].map((size) => (
                        <th key={size} style={{ padding: "10px 8px", textAlign: "center", color: "#ffffff", fontWeight: 700, fontSize: 10, width: 60 }}>{size}</th>
                      ))}
                      <th style={{ padding: "10px 14px", textAlign: "right", color: "#ffffff", fontWeight: 700, fontSize: 10 }}>รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter((o) => Object.values(o.sizes).some((v) => v > 0)).map((o, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f4f4f5", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 700, color: "#09090b" }}>
                          <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", backgroundColor: o.tshirt.colorValue, border: "1px solid rgba(0,0,0,0.1)", verticalAlign: "middle", marginRight: 6 }} />
                          {o.tshirt.name}
                        </td>
                        {["S", "M", "L", "XL", "2XL"].map((size) => (
                          <td key={size} style={{ padding: "10px 8px", textAlign: "center", fontWeight: 600, color: (o.sizes[size] || 0) > 0 ? "#09090b" : "#d4d4d8" }}>
                            {(o.sizes[size] || 0) > 0 ? o.sizes[size] : "-"}
                          </td>
                        ))}
                        <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 800, color: "#09090b", fontSize: 13 }}>
                          {Object.values(o.sizes).reduce((a, b) => a + b, 0)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: "#f4f4f5" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 800, color: "#09090b", fontSize: 11 }}>TOTAL</td>
                      {["S", "M", "L", "XL", "2XL"].map((size) => {
                        const sizeTotal = orders.reduce((sum, o) => sum + (o.sizes[size] || 0), 0);
                        return (
                          <td key={size} style={{ padding: "10px 8px", textAlign: "center", fontWeight: 700, color: sizeTotal > 0 ? "#09090b" : "#d4d4d8" }}>
                            {sizeTotal > 0 ? sizeTotal : "-"}
                          </td>
                        );
                      })}
                      <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 900, color: "#3b82f6", fontSize: 15 }}>{totalQuantity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ Elements Manifest ═══ */}
          {elements.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>DESIGN ELEMENTS ({elements.length})</div>
              <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#fafafa", borderBottom: "2px solid #e4e4e7" }}>
                      <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, color: "#71717a", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.5px", width: 30 }}>#</th>
                      <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, color: "#71717a", fontSize: 9, textTransform: "uppercase", width: 70 }}>TYPE</th>
                      <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, color: "#71717a", fontSize: 9, textTransform: "uppercase", width: 160 }}>NAME</th>
                      <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, color: "#71717a", fontSize: 9, textTransform: "uppercase" }}>DETAILS</th>
                      <th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, color: "#71717a", fontSize: 9, textTransform: "uppercase", width: 100 }}>POSITION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elements.map((el, idx) => (
                      <tr key={el.id || idx} style={{ borderBottom: "1px solid #f4f4f5", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                        <td style={{ padding: "8px 14px", color: "#d4d4d8", fontWeight: 600 }}>{idx + 1}</td>
                        <td style={{ padding: "8px 14px" }}>
                          <span style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontSize: 9,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            backgroundColor: el.type === "text" ? "#eff6ff" : "#f0fdf4",
                            color: el.type === "text" ? "#3b82f6" : "#22c55e",
                          }}>
                            {el.type === "text" ? "TEXT" : "IMAGE"}
                          </span>
                        </td>
                        <td style={{ padding: "8px 14px", fontWeight: 700, color: "#09090b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{el.name}</td>
                        <td style={{ padding: "8px 14px", color: "#71717a", fontSize: 9 }}>
                          {el.type === "text" ? (
                            <span>
                              {allFonts.find((f) => f.value === el.fontFamily)?.name || el.fontFamily} · {el.fontSize}px · {el.fontWeight}
                              {el.color && (
                                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: el.color, border: "1px solid rgba(0,0,0,0.1)", verticalAlign: "middle", marginLeft: 4 }} />
                              )}
                            </span>
                          ) : (
                            <span>{typeof el.width === "number" ? Math.round(el.width) : "?"}×{typeof el.height === "number" ? Math.round(el.height) : "?"}px{el.rotation ? ` · ${el.rotation}°` : ""}</span>
                          )}
                        </td>
                        <td style={{ padding: "8px 14px", color: "#a1a1aa", fontFamily: "monospace", fontSize: 9 }}>X:{Math.round(el.x)} Y:{Math.round(el.y)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ Colors & Fonts Summary ═══ */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
            <tbody>
              <tr>
                {usedFonts.length > 0 && (
                  <td style={{ verticalAlign: "top", paddingRight: uniqueColors.length > 0 ? 8 : 0, width: "50%" }}>
                    <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>FONTS USED</div>
                      {usedFonts.map((f) => (
                        <span key={f.value} style={{ display: "inline-block", padding: "4px 10px", borderRadius: 6, backgroundColor: "#f4f4f5", fontSize: 11, fontWeight: 700, color: "#09090b", fontFamily: f.value, marginRight: 6, marginBottom: 4 }}>
                          {f.name}
                        </span>
                      ))}
                    </div>
                  </td>
                )}
                {uniqueColors.length > 0 && (
                  <td style={{ verticalAlign: "top", paddingLeft: usedFonts.length > 0 ? 8 : 0, width: "50%" }}>
                    <div style={{ border: "1px solid #e4e4e7", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>COLORS USED</div>
                      {uniqueColors.map((c) => (
                        <span key={c} style={{ display: "inline-block", marginRight: 12, marginBottom: 4 }}>
                          <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: 4, backgroundColor: c, border: "1px solid rgba(0,0,0,0.1)", verticalAlign: "middle", marginRight: 4 }} />
                          <span style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 600, color: "#71717a", verticalAlign: "middle" }}>{c}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>

          {/* ═══ Footer ═══ */}
          <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px solid #e4e4e7" }}>
            <tbody>
              <tr>
                <td style={{ paddingTop: 12, fontSize: 9, color: "#d4d4d8" }}>Generated by SAIFAH SCREEN Design Tool</td>
                <td style={{ paddingTop: 12, fontSize: 9, color: "#d4d4d8", textAlign: "right" }}>{currentDate} · {jobID}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
