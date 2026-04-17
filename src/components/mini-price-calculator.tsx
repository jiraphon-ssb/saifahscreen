"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calculator, ArrowRight } from "lucide-react";
import { getPricePerItem } from "@/lib/pricing";

export default function MiniPriceCalculator() {
  const [shirtType, setShirtType] = useState<"premium" | "oversize">("premium");
  const [quantity, setQuantity] = useState(1);

  const totalPrice = shirtType && quantity > 0 ? getPricePerItem(shirtType, quantity) * quantity : null;

  return (
    <Card className="flex flex-col lg:flex-row items-center gap-3 p-3 bg-background/80 backdrop-blur-2xl border-white/20 dark:border-white/10 w-[95%] lg:w-auto mx-auto rounded-[32px] lg:rounded-full ring-1 ring-border/50 shadow-none">
      {/* 1. Header / Icon */}
      <div className="flex items-center gap-3 pl-2 lg:pl-4 mb-2 lg:mb-0 w-full lg:w-auto shrink-0 justify-center lg:justify-start">
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden lg:block">
            QUICK QUOTE
          </span>
          <span className="font-bold text-base text-foreground leading-none">
            คิดราคาเสื้อแบบเร่งด่วน
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px h-10 bg-border/50 mx-2" />

      {/* 2. Inputs Row */}
      <div className="flex w-full lg:w-auto items-center gap-2">
        <div className="flex-1 min-w-[160px]">
          <Select
            value={shirtType}
            onValueChange={(v: "premium" | "oversize") => setShirtType(v)}
          >
            <SelectTrigger className="bg-background/90 h-14 rounded-2xl lg:rounded-full border-border/50 font-semibold px-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl font-semibold">
              <SelectItem value="premium">Premium Cotton (นุ่มสุด)</SelectItem>
              <SelectItem value="oversize">Oversize Street (ทรงสวย)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[100px] shrink-0 relative">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
            min={1}
            className="bg-background/90 h-14 rounded-2xl lg:rounded-full border-border/50 text-center font-semibold text-lg pr-8"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
            ตัว
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px h-10 bg-border/50 mx-2" />

      {/* 3. Price Display */}
      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center w-full lg:w-auto px-4 lg:px-2 my-2 lg:my-0 lg:min-w-[140px]">
        <span className="text-xs lg:text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          ราคารวม (บาท)
        </span>
        <span className="font-bold text-2xl lg:text-3xl text-primary leading-none tracking-tight">
          {totalPrice ? totalPrice.toLocaleString() : "0"}
        </span>
      </div>

      {/* 4. Action Button */}
      <Link href="/design" className="w-full lg:w-auto shrink-0">
        <Button className="w-full lg:w-auto h-14 px-8 rounded-2xl lg:rounded-full font-semibold text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] group border-none transition-all duration-300 transform hover:-translate-y-1">
          ออกแบบทันที{" "}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </Card>
  );
}
