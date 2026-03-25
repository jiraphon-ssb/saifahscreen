"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { doc, collection, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { DesignElement, ProductConfiguration } from './design-tool';
import { Loader2, Minus, Plus, FileText, Tag, Printer } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import DesignPreview from '../../account/designs/design-preview';
import { getPricePerItem, PRICE_PER_EXTRA_SPOT } from '@/data/pricing';

interface GenerateSummaryDialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elements: DesignElement[];
  productConfig: ProductConfiguration;
  designName: string;
  designId: string | null;
  initialQuantities: { [key: string]: number };
}

const availableSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

export default function GenerateSummaryDialog({
  children,
  open,
  onOpenChange,
  designName,
  designId,
  elements,
  productConfig,
  initialQuantities,
}: GenerateSummaryDialogProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuantities(initialQuantities || {});
    }
  }, [open, initialQuantities]);

  const handleQuantityChange = (size: string, amount: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[size] || 0;
      const newQuantity = Math.max(0, currentQuantity + amount);
      if (newQuantity === 0) {
        const { [size]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [size]: newQuantity };
    });
  };
  
  const handleManualQuantityChange = (size: string, value: string) => {
    const newQuantity = parseInt(value, 10);
    setQuantities(prev => {
        const newQuantities = { ...prev };
        if (isNaN(newQuantity) || newQuantity <= 0) {
            delete newQuantities[size];
        } else {
            newQuantities[size] = newQuantity;
        }
        return newQuantities;
    });
  };

  const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleConfirm = () => {
    if (!designName) {
      toast({ variant: 'destructive', title: 'กรุณาตั้งชื่อดีไซน์ของคุณ' });
      return;
    }
    if (totalQuantity === 0) {
      toast({ variant: 'destructive', title: 'กรุณาเพิ่มสินค้าอย่างน้อย 1 ชิ้น' });
      return;
    }
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'คุณต้องเข้าสู่ระบบเพื่อสร้างสรุปออเดอร์' });
      return;
    }

    setIsGenerating(true);
    
    const firstImage = elements.find((el) => el.type === 'image' && el.url);
    const previewImageUrl = firstImage?.url || productConfig.tshirt.imageUrl;
    
    const docRef = designId 
        ? doc(firestore, 'users', user.uid, 'designs', designId)
        : doc(collection(firestore, 'users', user.uid, 'designs'));
    
    const newDesignId = docRef.id;

    const designData: any = {
        userId: user.uid,
        productId: `${productConfig.productType}-tshirt`,
        name: designName,
        previewImageUrl: previewImageUrl,
        designConfiguration: JSON.stringify(elements),
        productConfiguration: productConfig,
        quantities: quantities,
        updatedAt: serverTimestamp(),
    };
    
    if (!designId) {
        designData.createdAt = serverTimestamp();
    }

    setDocumentNonBlocking(docRef, designData, { merge: true });

    toast({
        title: 'บันทึกดีไซน์สำเร็จ!',
        description: `กำลังสร้างสรุปสำหรับดีไซน์ '${designName}'...`,
    });
    
    onOpenChange(false);
    setIsGenerating(false);
    router.push(`/summary/${newDesignId}`);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  }
  
  const basePricePerItem = getPricePerItem(productConfig.productType, totalQuantity);
  const extraSpots = Math.max(0, elements.length - 1);
  const extraSpotPrice = extraSpots * PRICE_PER_EXTRA_SPOT;
  const unitPrice = basePricePerItem + extraSpotPrice;
  const total = unitPrice * totalQuantity;

  const designForPreview = {
    designConfiguration: JSON.stringify(elements),
    productConfiguration: productConfig,
    name: designName,
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">สร้างสรุปสำหรับส่งให้เซลล์</DialogTitle>
          <DialogDescription>
            ระบุจำนวนที่ต้องการเพื่อคำนวณราคาและสร้างใบสรุปดีไซน์สำหรับคุยกับทีมขาย
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 py-4">
            {/* Left: Preview and Summary */}
            <div className="flex flex-col gap-6">
                <div className='flex flex-col items-center gap-4'>
                    <div className="relative w-[200px] h-[200px] rounded-lg bg-muted shadow-md overflow-hidden">
                        <DesignPreview design={designForPreview} size={200} />
                    </div>
                     <div className="text-center">
                        <h3 className="font-semibold text-lg">{designName || "ดีไซน์ไม่มีชื่อ"}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{productConfig.productType} - {productConfig.tshirt.name}</p>
                    </div>
                </div>
                <Separator />
                 <div className="space-y-3 text-sm">
                    <h4 className="font-semibold mb-2">สรุปราคา</h4>
                    <div className="flex justify-between items-center">
                        <span className='text-muted-foreground flex items-center gap-2'><Tag className='w-4 h-4'/>ราคา/ตัว (สำหรับ {totalQuantity} ตัว)</span>
                        <span>{basePricePerItem.toLocaleString()} บาท</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className='text-muted-foreground flex items-center gap-2'><Printer className='w-4 h-4'/>ค่าสกรีนเพิ่ม ({extraSpots} จุด)</span>
                        <span>+ {extraSpotPrice.toLocaleString()} บาท</span>
                    </div>
                     <div className="flex justify-between items-center font-bold">
                        <span className='text-muted-foreground'>ราคารวม/ตัว</span>
                        <span>{unitPrice.toLocaleString()} บาท</span>
                    </div>
                     <div className="flex justify-between items-center text-xl font-bold text-primary pt-2 border-t mt-2">
                        <span>ราคารวมทั้งหมด</span>
                        <span>{total.toLocaleString()} บาท</span>
                    </div>
                </div>
            </div>

            {/* Right: Quantities */}
            <div>
              <h4 className="font-semibold mb-4">จำนวนที่ต้องการ</h4>
              <ScrollArea className="h-80 pr-4 -mr-4">
                  <div className="space-y-4">
                  {availableSizes.map((size) => (
                      <div key={size} className="grid grid-cols-[40px_1fr] items-center gap-4">
                          <Label htmlFor={`quantity-${size}`} className='text-right font-bold'>{size}</Label>
                          <div className="flex items-center">
                              <Button
                              variant="outline" size="icon"
                              onClick={() => handleQuantityChange(size, -1)}
                              className="rounded-r-none h-10 w-10"
                              >
                              <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                id={`quantity-${size}`}
                                type="number"
                                value={quantities[size] || ''}
                                onChange={(e) => handleManualQuantityChange(size, e.target.value)}
                                className="text-center rounded-none z-10 -mx-px w-16 h-10"
                                placeholder="0"
                              />
                              <Button
                              variant="outline" size="icon"
                              onClick={() => handleQuantityChange(size, 1)}
                              className="rounded-l-none h-10 w-10"
                              >
                              <Plus className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>
                  ))}
                  </div>
              </ScrollArea>
            </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleConfirm} disabled={isGenerating || totalQuantity === 0}>
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileText className="mr-2 h-4 w-4" />
            )}
            สร้างใบสรุปดีไซน์
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
