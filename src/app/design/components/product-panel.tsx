"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductConfiguration, OrderItem } from "./design-tool";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ShoppingBag,
  Plus,
  Trash2,
  Info,
  ChevronRight,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductPanelProps {
  config: ProductConfiguration;
  setConfig: (config: ProductConfiguration) => void;
  orders: OrderItem[];
  addOrder: (colorName: string, colorValue: string, imageUrl: string) => void;
  removeOrder: (id: string) => void;
  updateOrderSize: (orderId: string, size: string, quantity: number) => void;
}

const tshirtMockups = [
  {
    name: "White",
    colorValue: "#FFFFFF",
    imageUrl: "/images/t-shirt-mockup-white-saifah.png",
    label: "ขาว",
  },
  {
    name: "Black",
    colorValue: "#212121",
    imageUrl: "/images/t-shirt-mockup-black-saifah.png",
    label: "ดำ",
  },
  {
    name: "Grey",
    colorValue: "#A9A9A9",
    imageUrl: "/images/t-shirt-mockup-grey-saifah.png",
    label: "เทา",
  },
  {
    name: "Navy",
    colorValue: "#1a2a44",
    imageUrl: "/images/t-shirt-mockup-navy-saifah.png",
    label: "กรมท่า",
  },
  {
    name: "Beige",
    colorValue: "#E1D7C6",
    imageUrl: "/images/t-shirt-mockup-beige-saifah.png",
    label: "เบจ",
  },
  {
    name: "Cream",
    colorValue: "#F3EAD3",
    imageUrl: "/images/t-shirt-mockup-cream-saifah.png",
    label: "ครีม",
  },
  {
    name: "Chocolate",
    colorValue: "#5A3E33",
    imageUrl: "/images/t-shirt-mockup-chocolate-saifah.png",
    label: "ช็อกโกแลต",
  },
];

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

export default function ProductPanel({
  config,
  setConfig,
  orders,
  addOrder,
  removeOrder,
  updateOrderSize,
}: ProductPanelProps) {
  const totalQuantity = orders.reduce((sum, order) => {
    return sum + Object.values(order.sizes).reduce((a, b) => a + b, 0);
  }, 0);

  const handleTshirtSelect = (tshirt: (typeof tshirtMockups)[0]) => {
    setConfig({
      ...config,
      tshirt: {
        name: tshirt.name,
        imageUrl: tshirt.imageUrl,
        colorValue: tshirt.colorValue,
      },
    });
  };

  const handleProductTypeChange = (value: string) => {
    setConfig({ ...config, productType: value as "premium" | "oversize" });
  };

  const handleAddCurrentToOrder = () => {
    addOrder(
      config.tshirt.name,
      config.tshirt.colorValue,
      config.tshirt.imageUrl,
    );
  };

  return (
    <div className="flex flex-col h-full bg-white font-prompt">
      <ScrollArea className="flex-1">
        <div className="p-5 space-y-8 pb-20">
          {/* Section 1: Style Selection */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-primary">
                1. เลือกประเภทเสื้อ
              </h2>
              <p className="text-xs text-zinc-400 font-medium tracking-normal">
                Premium หรือ Oversize ทรงที่เป็นคุณ
              </p>
            </div>

            <RadioGroup
              value={config.productType}
              onValueChange={handleProductTypeChange}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="premium"
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-2xl border p-5 cursor-pointer transition-all duration-200",
                  config.productType === "premium"
                    ? "border-primary ring-2 ring-primary/10 bg-white"
                    : "border-zinc-200 bg-white hover:border-zinc-300",
                )}
              >
                <RadioGroupItem
                  value="premium"
                  id="premium"
                  className="sr-only"
                />
                <div className="text-center">
                  <span className="font-bold text-sm uppercase">PREMIUM</span>
                  <p className="text-[10px] text-zinc-400 mt-1 font-medium">
                    คอกลม/พอดีตัว
                  </p>
                </div>
              </Label>
              <Label
                htmlFor="oversize"
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-2xl border p-5 cursor-pointer transition-all duration-200",
                  config.productType === "oversize"
                    ? "border-primary ring-2 ring-primary/10 bg-white"
                    : "border-zinc-200 bg-white hover:border-zinc-300",
                )}
              >
                <RadioGroupItem
                  value="oversize"
                  id="oversize"
                  className="sr-only"
                />
                <div className="text-center">
                  <span className="font-bold text-sm uppercase">OVERSIZE</span>
                  <p className="text-[10px] text-zinc-400 mt-1 font-medium">
                    ทรงหลวมสไตล์สตรีท
                  </p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {/* Section 2: Color Selection */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-950">
                2. เลือกสีเสื้อ
              </h2>
              <Badge
                variant="secondary"
                className="text-[10px] px-3 font-bold bg-primary/10 text-primary uppercase"
              >
                CURRENT: {config.tshirt.name}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {tshirtMockups.map((tshirt) => (
                <button
                  key={tshirt.name}
                  onClick={() => handleTshirtSelect(tshirt)}
                  className={cn(
                    "group relative aspect-[4/3] rounded-2xl overflow-hidden border transition-all duration-300 bg-zinc-100",
                    config.tshirt.colorValue === tshirt.colorValue
                      ? "border-primary ring-4 ring-primary/20 shadow-md"
                      : "border-zinc-200 hover:border-zinc-300",
                  )}
                >
                  <Image
                    src={tshirt.imageUrl}
                    alt={tshirt.label}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500 group-hover:scale-105",
                      config.tshirt.colorValue === tshirt.colorValue &&
                        "opacity-90",
                    )}
                    sizes="(max-width: 768px) 50vw, 150px"
                  />

                  {/* Selected Checkmark Overlay (Blue Circle) */}
                  {config.tshirt.colorValue === tshirt.colorValue && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 animate-in fade-in zoom-in-50 duration-300">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-xl border-2 border-white shadow-primary/30">
                        <Check className="h-6 w-6 text-white stroke-[3px]" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-[2px] p-2 text-center">
                    <span className="text-white text-[11px] font-bold uppercase">
                      {tshirt.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Separator className="bg-zinc-100" />

          {/* Section 3: Ordering Workflow */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">
                3. ระบุไซส์และจำนวน
              </h2>
              <Badge className="font-bold py-1.5 px-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                Total: {totalQuantity}
              </Badge>
            </div>

            {/* Industrial Add Button */}
            <Button
              onClick={handleAddCurrentToOrder}
              className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-between px-6 shadow-xl shadow-primary/10 transition-all active:scale-[0.98] group"
            >
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all border border-white/5">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold uppercase leading-none">
                    เพิ่มรายการผลิตใหม่
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium mt-1">
                    ระบุไซส์สำหรับสีเสื้อที่เลือกอยู่ ({config.tshirt.name})
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
            </Button>

            {/* Production Ledger List */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden bg-white border border-zinc-100 rounded-[24px] shadow-sm ring-1 ring-zinc-50"
                >
                  <div className="px-4 py-3 bg-zinc-50/80 flex items-center justify-between border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white p-1 border border-zinc-200">
                        <img
                          src={order.tshirt.imageUrl}
                          alt={order.tshirt.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-bold uppercase text-zinc-900 tracking-tight">
                        {order.tshirt.name}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-zinc-300 hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all"
                      onClick={() => removeOrder(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-3 gap-4">
                      {AVAILABLE_SIZES.map((size) => (
                        <div key={size} className="space-y-2">
                          <Label className="text-[10px] font-bold text-center block text-zinc-400">
                            {size}
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={order.sizes[size] || 0}
                            onChange={(e) =>
                              updateOrderSize(
                                order.id,
                                size,
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="h-10 text-center text-xs font-bold rounded-xl border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-primary/20 transition-all font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {orders.length === 0 && (
              <div className="p-10 text-center bg-zinc-50/50 rounded-[32px] border-2 border-dashed border-zinc-200 border-spacing-4">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-zinc-300" />
                </div>
                <p className="text-xs font-bold text-zinc-400 uppercase">
                  ยังไม่มีรายการสั่งผลิตในตะกร้า
                </p>
                <p className="text-[10px] text-zinc-300 mt-1 font-medium">
                  กดปุ่มสีดำเพื่อเริ่มระบุจำนวนที่ต้องการ
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Modern Formal Summary */}
      <div className="p-5 pb-8 border-t bg-white shadow-[0_-15px_30px_rgba(0,0,0,0.03)] z-20">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-zinc-950 opacity-40">
                ยอดผลิตรวม
              </p>
              <p className="text-[11px] font-bold text-primary">
                พร้อมสำหรับขั้นตอนการเช็คเอาท์
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold font-prompt text-zinc-950 tracking-tighter">
              {totalQuantity}
            </span>
            <span className="text-xs font-bold text-zinc-300 ml-2 uppercase">
              ตัว (T-Shirt)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
