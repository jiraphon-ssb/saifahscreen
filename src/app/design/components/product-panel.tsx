'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ProductConfiguration } from './design-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProductPanelProps {
    config: ProductConfiguration;
    setConfig: (config: ProductConfiguration) => void;
}

const tshirtMockups = [
  { name: "White", colorValue: "#FFFFFF", id: "t-shirt-mockup-white-saifah" },
  { name: "Black", colorValue: "#212121", id: "t-shirt-mockup-black-saifah" },
  { name: "Grey", colorValue: "#A9A9A9", id: "t-shirt-mockup-grey-saifah" },
  { name: "Navy", colorValue: "#1a2a44", id: "t-shirt-mockup-navy-saifah" },
  { name: "Beige", colorValue: "#E1D7C6", id: "t-shirt-mockup-beige-saifah" },
  { name: "Cream", colorValue: "#F3EAD3", id: "t-shirt-mockup-cream-saifah" },
  { name: "Chocolate", colorValue: "#5A3E33", id: "t-shirt-mockup-chocolate-saifah" },
].map(mockup => {
    const placeholder = PlaceHolderImages.find(p => p.id === mockup.id);
    return {
        ...mockup,
        imageUrl: placeholder?.imageUrl || `/images/${mockup.id}.webp`,
    }
});

export default function ProductPanel({ config, setConfig }: ProductPanelProps) {

  const handleTshirtSelect = (tshirt: typeof tshirtMockups[0]) => {
    setConfig({
        ...config,
        tshirt: {
            name: tshirt.name,
            imageUrl: tshirt.imageUrl,
            colorValue: tshirt.colorValue
        }
    });
  }

  return (
    <div className="p-4 space-y-4">
      <Card className="overflow-hidden">
         <CardHeader>
            <CardTitle>สินค้า</CardTitle>
            <CardDescription>เลือกสินค้าเริ่มต้นสำหรับดีไซน์ของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
             <div className="space-y-3">
                <Label className="font-medium text-sm">ประเภท</Label>
                <RadioGroup
                    value={config.productType}
                    onValueChange={(value) => setConfig({ ...config, productType: value as 'premium' | 'oversize' })}
                    className="grid grid-cols-2 gap-2"
                >
                    <Label htmlFor="premium" className={cn("flex flex-col items-center justify-center rounded-md border p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors", config.productType === 'premium' ? 'border-primary bg-accent' : 'border-input')}>
                        <RadioGroupItem value="premium" id="premium" className="peer sr-only" />
                        พรีเมียม
                        <span className="text-xs font-normal text-muted-foreground mt-1">เริ่มต้น 290 บาท</span>
                    </Label>
                    <Label htmlFor="oversize" className={cn("flex flex-col items-center justify-center rounded-md border p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors", config.productType === 'oversize' ? 'border-primary bg-accent' : 'border-input')}>
                        <RadioGroupItem value="oversize" id="oversize" className="peer sr-only" />
                        โอเวอร์ไซส์
                         <span className="text-xs font-normal text-muted-foreground mt-1">เริ่มต้น 320 บาท</span>
                    </Label>
                </RadioGroup>
            </div>
            <Separator />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="font-medium text-sm">สี</Label>
                    <span className="text-sm capitalize text-muted-foreground">{config.tshirt.name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {tshirtMockups.map((tshirt) => (
                        <button
                            key={tshirt.name}
                            onClick={() => handleTshirtSelect(tshirt)}
                            className={cn("w-8 h-8 rounded-full border-2 transition-transform hover:scale-110", config.tshirt.colorValue === tshirt.colorValue ? "border-primary scale-110 ring-2 ring-offset-2 ring-offset-background ring-primary" : "border-input")}
                            style={{ backgroundColor: tshirt.colorValue }}
                            aria-label={`Select color ${tshirt.name}`}
                            title={tshirt.name}
                        />
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
