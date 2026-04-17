"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  Minus,
  Plus,
  Tag,
  ChevronDown,
  Printer,
  Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getPricePerItem } from "@/lib/pricing";

const shirtTypes = [
  { value: "premium", label: "Premium Cotton (ผ้านุ่มพิเศษ)" },
  { value: "oversize", label: "Oversize Cotton (ทรงสตรีท)" },
];

const extraSpotPrices = [
  { size: "A7", dimensions: "7x10 ซม.", price: 25 },
  { size: "A6", dimensions: "10x15 ซม.", price: 30 },
  { size: "A5", dimensions: "15x20 ซม.", price: 35 },
  { size: "A4", dimensions: "20x30 ซม.", price: 45 },
  { size: "A3", dimensions: "30x40 ซม.", price: 55 },
];

export default function PriceCalculator() {
  const [shirtType, setShirtType] = useState<"premium" | "oversize">("premium");
  const [quantity, setQuantity] = useState(1);
  const [extraSpots, setExtraSpots] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [pricePerItem, setPricePerItem] = useState<number | null>(null);
  const [isSpotsOpen, setIsSpotsOpen] = useState(false);

  const totalExtraSpotsCount = Object.values(extraSpots).reduce(
    (total, qty) => total + qty,
    0,
  );
  const totalExtraSpotsPricePerShirt = Object.entries(extraSpots).reduce(
    (total, [size, qty]) => {
      const spotInfo = extraSpotPrices.find((s) => s.size === size);
      return total + (spotInfo ? spotInfo.price * qty : 0);
    },
    0,
  );

  useEffect(() => {
    if (shirtType && quantity > 0) {
      const basePricePerItem = getPricePerItem(shirtType, quantity);
      const finalPricePerItem = basePricePerItem + totalExtraSpotsPricePerShirt;

      setPricePerItem(finalPricePerItem);
      setTotalPrice(finalPricePerItem * quantity);
    } else {
      setTotalPrice(null);
      setPricePerItem(null);
    }
  }, [shirtType, quantity, extraSpots, totalExtraSpotsPricePerShirt]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleSpotQuantityChange = (size: string, amount: number) => {
    setExtraSpots((prev) => {
      const currentQty = prev[size] || 0;
      const newQty = Math.max(0, currentQty + amount);

      if (newQty === 0) {
        const { [size]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [size]: newQty };
    });
  };

  const selectedSpots = extraSpotPrices.filter(
    (spot) => (extraSpots[spot.size] || 0) > 0,
  );
  const unselectedSpots = extraSpotPrices.filter(
    (spot) => !(extraSpots[spot.size] && extraSpots[spot.size] > 0),
  );

  const renderSpotItem = (spot: (typeof extraSpotPrices)[0]) => (
    <div
      key={spot.size}
      className={cn(
        "flex items-center justify-between rounded-2xl border-2 p-3 transition-colors",
        (extraSpots[spot.size] || 0) > 0 ? "border-primary/50 bg-primary/5" : "border-border/50 bg-background/50 hover:border-primary/30"
      )}
    >
      <div>
        <p className="font-bold text-foreground flex items-center gap-2">
          {spot.size}
          <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
            {spot.dimensions}
          </span>
        </p>
        <p className="text-sm font-bold text-primary mt-1">
          +{spot.price} <span className="text-xs font-medium text-muted-foreground">บาท/จุด</span>
        </p>
      </div>
      <div className="flex items-center bg-secondary rounded-xl p-0.5 border border-border/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSpotQuantityChange(spot.size, -1)}
          className="h-8 w-8 rounded-lg hover:bg-background hover:text-red-500 hover:shadow-sm transition-all"
          disabled={(extraSpots[spot.size] || 0) === 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-10 text-center font-bold text-foreground">
          {extraSpots[spot.size] || "0"}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSpotQuantityChange(spot.size, 1)}
          className="h-8 w-8 rounded-lg hover:bg-background hover:text-primary hover:shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative group p-8 lg:p-10 rounded-[40px] bg-card/60 backdrop-blur-3xl border border-white/40 shadow-2xl overflow-hidden flex flex-col h-full hover:shadow-[0_20px_80px_rgba(56,189,248,0.15)] transition-shadow duration-500">
      {/* Decorative Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-sky-400/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3 border border-primary/20">
            <Calculator className="h-3.5 w-3.5" /> Calculator
          </div>
          <h3 className="font-headline text-4xl font-black text-foreground drop-shadow-sm">
            โปรแกรมคำนวณราคา
          </h3>
          <p className="mt-3 text-muted-foreground font-medium flex items-start gap-2 text-sm leading-relaxed">
            <Sparkles className="h-5 w-5 text-amber-500 shrink-0" />
            <span>ราคานี้รวม: เสื้อเปล่า, ออกแบบฟรี, <strong className="text-foreground">สกรีนฟรี 1 จุด (ขนาดใดก็ได้)</strong>, และจัดส่งฟรีทั่วประเทศแล้ว</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">ชนิดเสื้อ</Label>
              <Select
                onValueChange={(v: "premium" | "oversize") => setShirtType(v)}
                value={shirtType}
              >
                <SelectTrigger className="h-14 rounded-2xl border-2 border-border/60 bg-background/50 backdrop-blur-md focus:ring-primary shadow-sm text-base font-bold">
                  <SelectValue placeholder="กรุณาเลือก" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50 shadow-xl font-medium">
                  {shirtTypes.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="focus:bg-primary/10 focus:text-primary rounded-xl m-1 cursor-pointer">
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="quantity" className="text-sm font-bold text-muted-foreground uppercase tracking-wider">จํานวน (ตัว)</Label>
              <div className="flex items-center bg-background/50 backdrop-blur-md rounded-2xl border-2 border-border/60 p-1 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  className="h-11 w-11 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="text-center border-0 bg-transparent text-xl font-bold h-11 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-11 w-11 rounded-xl text-primary hover:bg-primary/10"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-border/60" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-black">
                ตำแหน่งสกรีนเพิ่มเติม <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full ml-1">สกรีนฟรี 1 จุดแรก</span>
              </Label>
            </div>
            
            <div className="space-y-3">
              {selectedSpots.map(renderSpotItem)}

              <Collapsible open={isSpotsOpen} onOpenChange={setIsSpotsOpen}>
                <CollapsibleContent className="space-y-3 mb-3 animate-in fade-in-0 zoom-in-95">
                  {unselectedSpots.map(renderSpotItem)}
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-2xl border-dashed border-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all font-bold"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    {isSpotsOpen ? "ซ่อนตัวเลือก (พับเก็บ)" : "เพิ่มตำแหน่งสกรีน (ถ้ามี 2 จุดขึ้นไป)"}
                    <ChevronDown
                      className={cn(
                        "ml-auto h-5 w-5 transition-transform",
                        isSpotsOpen && "rotate-180",
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Receipt Area */}
      <div className="mt-auto pt-8">
        <div className="bg-[#111] rounded-[32px] p-6 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] relative overflow-hidden group/receipt">
          {/* Animated scanline */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 blur-[2px] animate-scanline opacity-0 group-hover/receipt:opacity-100" />
          
          <div className="space-y-4 relative z-10">
            {totalExtraSpotsCount > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <Printer className="h-4 w-4" /> ค่าสกรีนเพิ่ม ({totalExtraSpotsCount} จุด)
                </p>
                <p className="font-bold text-white">
                  +{totalExtraSpotsPricePerShirt.toLocaleString()} <span className="text-xs font-normal text-white/40">บาท/ตัว</span>
                </p>
              </div>
            )}
            
            {pricePerItem !== null && (
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <p className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-white/50" />
                  {totalExtraSpotsCount > 0 ? "ราคาเฉลี่ยต่อตัว" : "ราคาต่อตัว (รวมสกรีน)"}
                </p>
                <p className="text-lg font-bold text-white">
                  {pricePerItem.toLocaleString()} <span className="text-xs font-normal text-white/40">บาท</span>
                </p>
              </div>
            )}

            <div className="flex items-end justify-between pt-2">
              <div>
                <p className="text-sm font-bold text-primary/80 uppercase tracking-widest mb-1">Total Limit</p>
                <p className="text-xs text-white/40">ราคาสุทธิ (รวม VAT 7%)</p>
              </div>
              <div className="text-right">
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  {(totalPrice ?? 0).toLocaleString()}
                </p>
                <p className="text-lg font-bold text-white/30 uppercase tracking-wider mt-[-5px]">THB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
