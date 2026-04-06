"use client";

import { useState, useRef } from "react";
import {
  User,
  Phone,
  MessageCircle,
  Package,
  Palette,
  Ruler,
  FileText,
  Upload,
  X,
  File,
  Archive,
  Loader2,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import LineIcon from "@/components/icons/line-icon";
import type { ProductConfiguration } from "@/app/design/components/design-tool";
import { getPricePerItem, PRICE_PER_EXTRA_SPOT } from "@/lib/pricing";
import LZString from "lz-string";

export interface SizeQuantity {
  S: number;
  M: number;
  L: number;
  XL: number;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url?: string;
}

interface OrderFormProps {
  productConfig: ProductConfiguration;
  quantities: SizeQuantity;
  elementsCount: number;
  designId: string;
  designState?: any;
}

const LINE_OFFICIAL_ID = "saifahscreen";

export default function OrderForm({
  productConfig,
  quantities,
  elementsCount,
  designId,
  designState,
}: OrderFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    lineId: "",
  });

  const [note, setNote] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuantity = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0,
  );
  const basePricePerItem = getPricePerItem(
    productConfig.productType,
    totalQuantity,
  );
  const extraSpots = Math.max(0, elementsCount - 1);
  const extraSpotPrice = extraSpots * PRICE_PER_EXTRA_SPOT;
  const unitPrice = basePricePerItem + extraSpotPrice;
  const estimatedTotal = unitPrice * totalQuantity;

  const generateShareUrl = () => {
    if (typeof window === "undefined") return "";
    const baseUrl = window.location.origin + "/design";
    const encoded = LZString.compressToEncodedURIComponent(
      JSON.stringify(designState),
    );
    return `${baseUrl}?data=${encoded}`;
  };

  const shareUrl = generateShareUrl();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newFiles: UploadedFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > 10 * 1024 * 1024) {
          toast({
            variant: "destructive",
            title: "ไฟล์ใหญ่เกินไป",
            description: `${file.name} มีขนาดเกิน 10MB`,
          });
          continue;
        }

        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        });
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitToLine = async () => {
    if (!customerData.name || !customerData.phone) {
      toast({
        variant: "destructive",
        title: "กรุณากรอกข้อมูลให้ครบ",
        description: "ชื่อและเบอร์โทรศัพท์จำเป็นสำหรับติดต่อกลับ",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const sizesText = Object.entries(quantities)
        .filter(([_, qty]) => qty > 0)
        .map(([size, qty]) => `${size}×${qty}`)
        .join(", ");

      const filesText =
        uploadedFiles.length > 0
          ? `\n📎 ไฟล์แนบ: ${uploadedFiles.length} ไฟล์\n(โลโก้, ฟอนต์, รูปภาพ)`
          : "";

      const message = `📋 คำสั่งซื้อดีไซน์ใหม่

👤 ข้อมูลลูกค้า:
- ชื่อ: ${customerData.name}
- เบอร์: ${customerData.phone}
- LINE ID: ${customerData.lineId || "-"}

👕 ข้อมูลสินค้า:
- ประเภท: ${productConfig.productType === "premium" ? "Premium" : "Oversize"}
- สี: ${productConfig.tshirt.name}
- ไซซ์และจำนวน: ${sizesText}
- รวม: ${totalQuantity} ตัว

💰 ราคาประมาณ: ~${estimatedTotal.toLocaleString()} บาท${filesText}

${note ? `📝 หมายเหตุ: ${note}` : ""}

🔗 ดูดีไซน์: ${shareUrl}

---
ส่งจากระบบออกแบบออนไลน์ SAIFAH Screen`;

      const lineUrl = `https://line.me/R/oaMessage/@${LINE_OFFICIAL_ID}/?${encodeURIComponent(message)}`;
      window.open(lineUrl, "_blank");

      toast({
        title: "กำลังเปิด LINE...",
        description: "ส่งข้อมูลให้แอนมินในไลน์แล้ว",
      });
    } catch (error) {
      console.error("Error submitting to LINE:", error);
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งข้อมูลได้ กรุณาลองอีกครั้ง",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            ข้อมูลลูกค้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
              <Input
                id="name"
                placeholder="สมชาย ใจดี"
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
              <Input
                id="phone"
                placeholder="089-xxx-xxxx"
                value={customerData.phone}
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lineId">LINE ID (optional)</Label>
            <Input
              id="lineId"
              placeholder="saifahscreen"
              value={customerData.lineId}
              onChange={(e) =>
                setCustomerData((prev) => ({ ...prev, lineId: e.target.value }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5" />
            ข้อมูลสินค้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                ประเภท
              </Label>
              <div className="p-3 bg-muted rounded-md capitalize">
                {productConfig.productType === "premium"
                  ? "Premium"
                  : "Oversize"}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                สีเสื้อ
              </Label>
              <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: productConfig.tshirt.colorValue }}
                />
                {productConfig.tshirt.name}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              ไซซ์และจำนวน
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(quantities).map(([size, qty]) => (
                <div key={size} className="text-center p-2 bg-muted rounded-md">
                  <div className="text-sm font-medium">{size}</div>
                  <div className="text-lg font-semibold">{qty}</div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground pt-2">
              รวมทั้งหมด:{" "}
              <span className="font-semibold text-foreground">
                {totalQuantity} ตัว
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            ราคาโดยประมาณ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ราคาเสื้อ/ตัว (สำหรับ {totalQuantity} ตัว)
            </span>
            <span>{basePricePerItem.toLocaleString()} บาท</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ค่าสกรีนเพิ่ม ({extraSpots} จุด)
            </span>
            <span>+{extraSpotPrice.toLocaleString()} บาท</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm font-medium">
            <span>ราคาต่อตัว</span>
            <span>{unitPrice.toLocaleString()} บาท</span>
          </div>
          <div className="flex justify-between text-xl font-semibold text-primary">
            <span>รวมโดยประมาณ</span>
            <span>~{estimatedTotal.toLocaleString()} บาท</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            *แอนมินจะยืนยันราคาจริงในไลน์
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            หมายเหตุ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="เช่น ต้องการตัวเดียวสีดำ 10 ตัว, ต้องการสกรีนสีทอง..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Archive className="h-5 w-5" />
            ไฟล์ซิป (อุปกรณ์)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            อัปโหลดไฟล์ซิปที่มีโลโก้, ฟอนต์, รูปภาพ
            เพื่อให้แอนมินทำงานได้ง่ายขึ้น
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".zip,.rar,.7z"
            className="hidden"
            multiple
          />

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {isUploading ? "กำลังอัปโหลด..." : "อัปโหลดไฟล์ซิป"}
          </Button>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>ไฟล์ที่อัปโหลดแล้ว ({uploadedFiles.length})</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <File className="h-4 w-4 shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {formatFileSize(file.size)}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg gap-2"
        onClick={handleSubmitToLine}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <LineIcon className="h-5 w-5" />
        )}
        ส่งให้แอนมินในไลน์
      </Button>
    </div>
  );
}
