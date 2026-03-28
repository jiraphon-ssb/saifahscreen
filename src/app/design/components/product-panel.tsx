'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { ProductConfiguration } from './design-tool';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ProductPanelProps {
    config: ProductConfiguration;
    setConfig: (config: ProductConfiguration) => void;
}

const tshirtMockups = [
  { name: "White", colorValue: "#FFFFFF", imageUrl: "/images/t-shirt-mockup-white-saifah.png", label: "ขาว" },
  { name: "Black", colorValue: "#212121", imageUrl: "/images/t-shirt-mockup-black-saifah.png", label: "ดำ" },
  { name: "Grey", colorValue: "#A9A9A9", imageUrl: "/images/t-shirt-mockup-grey-saifah.png", label: "เทา" },
  { name: "Navy", colorValue: "#1a2a44", imageUrl: "/images/t-shirt-mockup-navy-saifah.png", label: "กรมท่า" },
  { name: "Beige", colorValue: "#E1D7C6", imageUrl: "/images/t-shirt-mockup-beige-saifah.png", label: "เบจ" },
  { name: "Cream", colorValue: "#F3EAD3", imageUrl: "/images/t-shirt-mockup-cream-saifah.png", label: "ครีม" },
  { name: "Chocolate", colorValue: "#5A3E33", imageUrl: "/images/t-shirt-mockup-chocolate-saifah.png", label: "ช็อกโกแลต" },
];

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

  const handleProductTypeChange = (value: string) => {
    setConfig({ ...config, productType: value as 'premium' | 'oversize' });
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-bold mb-1">เลือกสินค้า</h2>
        <p className="text-sm text-muted-foreground">เลือกประเภทและสีเสื้อ</p>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ประเภทเสื้อ</Label>
        <RadioGroup
            value={config.productType}
            onValueChange={handleProductTypeChange}
            className="grid grid-cols-2 gap-2"
        >
            <Label 
              htmlFor="premium" 
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border-2 p-4 cursor-pointer transition-all overflow-hidden",
                config.productType === 'premium' 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/40 hover:bg-secondary/50'
              )}
            >
                <RadioGroupItem value="premium" id="premium" className="sr-only" />
                <div className="text-center">
                    <span className="font-semibold">พรีเมียม</span>
                    <p className="text-xs text-muted-foreground mt-1">290 ฿+</p>
                </div>
                {config.productType === 'premium' && (
                    <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                    </div>
                )}
            </Label>
            <Label 
              htmlFor="oversize" 
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border-2 p-4 cursor-pointer transition-all overflow-hidden",
                config.productType === 'oversize' 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/40 hover:bg-secondary/50'
              )}
            >
                <RadioGroupItem value="oversize" id="oversize" className="sr-only" />
                <div className="text-center">
                    <span className="font-semibold">โอเวอร์ไซส์</span>
                    <p className="text-xs text-muted-foreground mt-1">320 ฿+</p>
                </div>
                {config.productType === 'oversize' && (
                    <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                    </div>
                )}
            </Label>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">สีเสื้อ</Label>
            <Badge variant="secondary" className="text-xs font-medium">{config.tshirt.name}</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            {tshirtMockups.map((tshirt) => (
                <button
                    key={tshirt.name}
                    onClick={() => handleTshirtSelect(tshirt)}
                    className={cn(
                        "group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.02]",
                        config.tshirt.colorValue === tshirt.colorValue 
                          ? "border-primary shadow-lg shadow-primary/20" 
                          : "border-transparent hover:border-border hover:shadow-md"
                    )}
                >
                    <img
                        src={tshirt.imageUrl}
                        alt={tshirt.label}
                        className="w-full h-full object-cover"
                    />
                    <div className={cn(
                        "absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center",
                        config.tshirt.colorValue === tshirt.colorValue && "bg-black/5"
                    )}>
                        {config.tshirt.colorValue === tshirt.colorValue && (
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                                <Check className="h-5 w-5 text-white" />
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <span className="text-white text-xs font-medium">{tshirt.label}</span>
                    </div>
                </button>
            ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary text-lg">💡</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
                {config.productType === 'premium' 
                  ? 'เสื้อทรงพรีเมียม ผ้านุ่ม ใส่สบาย เหมาะกับทุกโอกาส' 
                  : 'เสื้อทรงโอเวอร์ไซส์ เอกลักษณ์สไตล์สตรีท ใส่ได้ทั้งชายและหญิง'}
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
