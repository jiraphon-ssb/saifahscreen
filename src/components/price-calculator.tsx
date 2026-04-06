'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Minus, Plus, Tag, ChevronDown, Printer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';
import { getPricePerItem } from '@/lib/pricing';

const shirtTypes = [
  { value: 'premium', label: 'Premium Cotton' },
  { value: 'oversize', label: 'Oversize Cotton' },
];

const extraSpotPrices = [
  { size: 'A7', dimensions: '7x10 ซม.', price: 25 },
  { size: 'A6', dimensions: '10x15 ซม.', price: 30 },
  { size: 'A5', dimensions: '15x20 ซม.', price: 35 },
  { size: 'A4', dimensions: '20x30 ซม.', price: 45 },
  { size: 'A3', dimensions: '30x40 ซม.', price: 55 },
];

export default function PriceCalculator() {
  const [shirtType, setShirtType] = useState<'premium' | 'oversize'>('premium');
  const [quantity, setQuantity] = useState(1);
  const [extraSpots, setExtraSpots] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [pricePerItem, setPricePerItem] = useState<number | null>(null);
  const [isSpotsOpen, setIsSpotsOpen] = useState(false);

  const totalExtraSpotsCount = Object.values(extraSpots).reduce((total, qty) => total + qty, 0);
  const totalExtraSpotsPricePerShirt = Object.entries(extraSpots).reduce((total, [size, qty]) => {
    const spotInfo = extraSpotPrices.find(s => s.size === size);
    return total + (spotInfo ? spotInfo.price * qty : 0);
  }, 0);

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
      setQuantity(prev => Math.max(1, prev + amount));
  }
  
  const handleSpotQuantityChange = (size: string, amount: number) => {
    setExtraSpots(prev => {
        const currentQty = prev[size] || 0;
        const newQty = Math.max(0, currentQty + amount);
        
        if (newQty === 0) {
            const { [size]: _, ...rest } = prev;
            return rest;
        }

        return { ...prev, [size]: newQty };
    });
  }

  const selectedSpots = extraSpotPrices.filter(spot => (extraSpots[spot.size] || 0) > 0);
  const unselectedSpots = extraSpotPrices.filter(spot => !(extraSpots[spot.size] && extraSpots[spot.size] > 0));

  const renderSpotItem = (spot: typeof extraSpotPrices[0]) => (
    <div key={spot.size} className="flex items-center justify-between rounded-md border p-3">
        <div>
            <p className="font-semibold">{spot.size} <span className="text-xs text-muted-foreground">({spot.dimensions})</span></p>
            <p className="text-sm font-semibold text-primary">{spot.price} <span className='text-xs font-normal text-muted-foreground'>บาท/จุด</span></p>
        </div>
        <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={() => handleSpotQuantityChange(spot.size, -1)} className="rounded-r-none h-9 w-9" disabled={(extraSpots[spot.size] || 0) === 0}>
                <Minus className="h-4 w-4" />
            </Button>
            <Input type="number" value={extraSpots[spot.size] || '0'} className="text-center rounded-none z-10 -mx-px w-12 h-9 bg-background" readOnly />
            <Button variant="outline" size="icon" onClick={() => handleSpotQuantityChange(spot.size, 1)} className="rounded-l-none h-9 w-9">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    </div>
  );

  return (
    <div className="p-8 rounded-lg border bg-card shadow-sm">
        <CardHeader className="p-0 mb-6">
            <CardTitle className="font-headline text-3xl font-bold">โปรแกรมคำนวณราคา</CardTitle>
            <CardDescription className="mt-2">
              ราคานี้รวม: ออกแบบฟรี, สกรีนฟรี 1 จุด (ขนาดใดก็ได้), และจัดส่งทั่วประเทศ
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>ชนิดเสื้อ</Label>
                    <Select onValueChange={(v: 'premium' | 'oversize') => setShirtType(v)} value={shirtType}>
                        <SelectTrigger>
                            <SelectValue placeholder="กรุณาเลือก" />
                        </SelectTrigger>
                        <SelectContent>
                            {shirtTypes.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="quantity">จํานวน (ตัว)</Label>
                    <div className="flex items-center">
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} className="rounded-r-none h-10 w-10">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="text-center rounded-none z-10 -mx-px flex-1 h-10" />
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} className="rounded-l-none h-10 w-10">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <Label className="text-base font-bold">ตำแหน่งสกรีนเพิ่มเติม (ฟรี 1 จุดแรก)</Label>
                <div className="space-y-3">
                    {selectedSpots.map(renderSpotItem)}

                    <Collapsible open={isSpotsOpen} onOpenChange={setIsSpotsOpen}>
                         <CollapsibleContent className="space-y-3 animate-in fade-in-0 zoom-in-95">
                            {unselectedSpots.map(renderSpotItem)}
                        </CollapsibleContent>
                        <CollapsibleTrigger asChild className="mt-3">
                            <Button variant="ghost" className="w-full text-primary hover:text-primary">
                                {isSpotsOpen ? 'ซ่อนตัวเลือก' : 'เพิ่มตำแหน่งสกรีน...'}
                                <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", isSpotsOpen && 'rotate-180')} />
                            </Button>
                        </CollapsibleTrigger>
                    </Collapsible>
                </div>
            </div>


            <div className="pt-4 space-y-4">
                {totalExtraSpotsCount > 0 && (
                    <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                        <div className="flex items-center gap-3">
                            <Printer className="h-5 w-5 text-muted-foreground"/>
                            <p className="text-sm font-medium">ค่าสกรีนเพิ่ม ({totalExtraSpotsCount} จุด)</p>
                        </div>
                        <p className="text-lg font-bold text-primary">+{totalExtraSpotsPricePerShirt.toLocaleString()}<span className='text-xs font-normal ml-1'>บาท/ตัว</span></p>
                    </div>
                )}
                 {pricePerItem !== null && (
                    <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                        <div className="flex items-center gap-3">
                            <Tag className="h-5 w-5 text-muted-foreground"/>
                            <p className="text-sm font-medium">{totalExtraSpotsCount > 0 ? 'ราคาต่อตัว (รวมสกรีนเพิ่ม)' : 'ราคาต่อตัว'}</p>
                        </div>
                        <p className="text-xl font-bold">{pricePerItem.toLocaleString()}<span className='text-sm font-normal ml-1'>บาท</span></p>
                    </div>
                )}
                 <div className="flex items-center justify-between rounded-lg border-2 border-primary bg-primary/5 p-4">
                    <div>
                        <p className="text-sm text-primary/80">ราคารวมทั้งหมด</p>
                        <p className="text-3xl font-bold text-primary">
                            {(totalPrice ?? 0).toLocaleString()}
                            <span className="text-lg ml-2 font-body font-medium">บาท</span>
                        </p>
                    </div>
                    <Calculator className="h-8 w-8 text-primary"/>
                </div>
                <p className='text-xs text-center text-muted-foreground pt-2'>**ราคารวมภาษีมูลค่าเพิ่ม (VAT) 7% แล้ว**</p>
            </div>
        </CardContent>
    </div>
  );
}
