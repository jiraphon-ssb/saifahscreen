'use client';


import { useParams, useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Loader2, Package, Download, Palette, Ruler, Tag, Printer, Image as ImageIcon, Type } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DesignPreview from '@/app/account/my-designs/design-preview';
import { Separator } from '@/components/ui/separator';
import AnimateOnScroll from '@/components/animate-on-scroll';
import type { DesignElement } from '@/app/design/components/design-tool';
import LineIcon from '@/components/icons/line-icon';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Logo from '@/components/icons/logo';
import { getPricePerItem, PRICE_PER_EXTRA_SPOT } from '@/lib/pricing';

export default function SummaryPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const designId = params.designId as string;

  const [isDownloading, setIsDownloading] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [design, setDesign] = useState<any>(null);
  const [isLoadingDesign, setIsLoadingDesign] = useState(true);

  useEffect(() => {
    if (!designId) return;
    fetch(`/api/designs/${designId}`)
      .then(res => res.json())
      .then(data => {
         setDesign(data.design || data);
         setIsLoadingDesign(false);
      })
      .catch(err => {
         console.error(err);
         setIsLoadingDesign(false);
      });
  }, [designId]);

  const elements: DesignElement[] = useMemo(() => {
    try {
      if (!design?.designConfiguration) return [];
      return JSON.parse(design.designConfiguration);
    } catch {
      return [];
    }
  }, [design?.designConfiguration]);

  const handleDownload = () => {
    const summaryElement = summaryRef.current;
    if (!summaryElement) {
        toast({ variant: "destructive", title: "เกิดข้อผิดพลาด", description: "ไม่พบส่วนที่ต้องการดาวน์โหลด" });
        return;
    }

    setIsDownloading(true);
    toast({
        title: "กำลังสร้างไฟล์สรุป...",
        description: "โปรดรอสักครู่ ระบบกำลังเตรียมไฟล์สำหรับดาวน์โหลด",
    });

    html2canvas(summaryElement, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `SAIFAH_Summary_${designId.substring(0, 8)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setIsDownloading(false);
        toast({
            title: "ดาวน์โหลดสำเร็จ!",
            description: "ไฟล์สรุปดีไซน์ถูกบันทึกแล้ว",
        });
    }).catch(err => {
        console.error("Error generating summary image:", err);
        toast({
            variant: "destructive",
            title: "เกิดข้อผิดพลาด",
            description: "ไม่สามารถสร้างไฟล์สรุปได้ โปรดลองอีกครั้ง",
        });
        setIsDownloading(false);
    });
  };

  const handleShareToLine = () => {
      const message = `สวัสดีครับ/ค่ะ สนใจสั่งทำเสื้อตามดีไซน์นี้ครับ/ค่ะ\nรหัสดีไซน์: ${designId}\n\nสามารถดูสรุปดีไซน์ได้ที่ลิงก์นี้:\n${window.location.href}`;
      const lineUrl = `https://line.me/R/oaMessage/@saifahscreen/?${encodeURIComponent(message)}`;
      window.open(lineUrl, '_blank');
  }

  if (isLoadingDesign) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!design) {
    return (
      <AnimateOnScroll delay={100} className="container mx-auto px-4 py-8 text-center">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-headline font-bold">ไม่พบดีไซน์</h1>
        <p className="text-muted-foreground">เราไม่พบข้อมูลดีไซน์ที่คุณกำลังค้นหา</p>
        <Button asChild className="mt-6">
          <Link href="/design">กลับไปที่หน้าออกแบบ</Link>
        </Button>
      </AnimateOnScroll>
    )
  }

  const { productConfiguration: config, quantities } = design;
  const totalQuantity = Object.values(quantities as Record<string, number>).reduce((sum, qty) => sum + qty, 0);
  
  const basePricePerItem = getPricePerItem(config.productType, totalQuantity);
  const extraSpots = Math.max(0, elements.length - 1);
  const extraSpotPrice = extraSpots * PRICE_PER_EXTRA_SPOT;
  const unitPrice = basePricePerItem + extraSpotPrice;
  const total = unitPrice * totalQuantity;

  const textElements = elements.filter(el => el.type === 'text');
  const imageElements = elements.filter(el => el.type === 'image');

  return (
    <div className="bg-muted">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <AnimateOnScroll delay={100}>
            <div className='text-center'>
                <h1 className="text-4xl font-headline font-bold">สรุปรายละเอียดดีไซน์</h1>
                <p className="text-muted-foreground mt-2">โปรดตรวจสอบความถูกต้อง และส่งให้เซลล์เพื่อขอใบเสนอราคา</p>
            </div>
            <Card className="mt-8">
                <CardContent className="p-4 flex flex-col md:flex-row items-center justify-center gap-2">
                    <Button size="lg" className="w-full md:w-auto flex-1 bg-green-600 hover:bg-green-700" onClick={handleShareToLine}>
                        <LineIcon className="mr-2 h-5 w-5"/>ส่งให้เซลล์ทาง LINE
                    </Button>
                    <Button size="lg" variant="outline" className="w-full md:w-auto flex-1" onClick={handleDownload} disabled={isDownloading}>
                        {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        {isDownloading ? 'กำลังสร้างไฟล์...' : 'ดาวน์โหลดไฟล์สรุป'}
                    </Button>
                     <Button size="lg" variant="outline" className="w-full md:w-auto flex-1" asChild>
                        <Link href={`/design/${designId}`}>
                            <Palette className="mr-2 h-4 w-4"/> กลับไปแก้ไข
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </AnimateOnScroll>

        <AnimateOnScroll as="div" delay={200} className="mt-8 p-0 md:p-8 bg-background rounded-lg shadow-lg">
            <div ref={summaryRef} className="p-6 md:p-8 bg-background">
                {/* --- Summary Header --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold font-headline text-primary">ใบสรุปรายละเอียดดีไซน์</h2>
                        <p className="text-sm text-muted-foreground mt-1">รหัสดีไซน์: {designId.substring(0, 8).toUpperCase()}</p>
                    </div>
                     <Logo className="h-12 w-auto opacity-80"/>
                </header>

                {/* --- Main Content Grid --- */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* --- Left Column (Preview) --- */}
                    <div className="lg:col-span-2 flex flex-col items-center text-center">
                        <div className="relative aspect-square w-full max-w-sm rounded-lg bg-slate-100 shadow-md overflow-hidden border">
                            <DesignPreview design={design} size={400} />
                        </div>
                        <h3 className="font-headline text-xl font-bold mt-4">{design.name}</h3>
                        <p className="text-muted-foreground capitalize">{config.productType} T-Shirt - {config.tshirt.name}</p>
                        <p className="text-xs text-muted-foreground pt-2">
                           สร้างเมื่อ: {design.createdAt ? new Date(design.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric'}) : ''}
                        </p>
                    </div>

                     {/* --- Right Column (Details) --- */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Sizes */}
                        <div className='space-y-3'>
                            <h4 className="font-semibold flex items-center gap-2"><Ruler/> ขนาดและจำนวน</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ไซส์</TableHead>
                                        <TableHead className="text-right">จำนวน (ตัว)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(quantities).map(([size, qty]) => (
                                        <TableRow key={size}>
                                            <TableCell className="font-medium">{size}</TableCell>
                                            <TableCell className="text-right">{qty as number}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className='bg-muted hover:bg-muted font-bold'>
                                        <TableCell>รวมทั้งหมด</TableCell>
                                        <TableCell className="text-right">{totalQuantity} ตัว</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        
                        <Separator />

                        {/* Pricing */}
                        <div className='space-y-3'>
                            <h4 className="font-semibold flex items-center gap-2">รายละเอียดราคา (ประเมิน)</h4>
                            <div className="flex justify-between items-center text-sm">
                                <span className='text-muted-foreground flex items-center gap-2'><Tag className='w-4 h-4'/>ราคาเสื้อ/ตัว (สำหรับ {totalQuantity} ตัว)</span>
                                <span className='font-medium'>{basePricePerItem.toLocaleString()} บาท</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className='text-muted-foreground flex items-center gap-2'><Printer className='w-4 h-4'/>ค่าสกรีนเพิ่ม ({extraSpots} จุด)</span>
                                <span className='font-medium'>+ {extraSpotPrice.toLocaleString()} บาท</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold border-t pt-3 mt-3">
                                <span className='text-muted-foreground'>ราคารวม/ตัว</span>
                                <span>{unitPrice.toLocaleString()} บาท</span>
                            </div>
                            <div className="flex justify-between items-center text-2xl font-bold text-primary pt-3 mt-3 border-t-2 border-primary/20">
                                <span>ยอดรวมโดยประมาณ</span>
                                <span>~ {total.toLocaleString()} บาท</span>
                            </div>
                             <p className="text-xs text-muted-foreground text-center pt-2">*ราคารวม VAT และค่าจัดส่งแล้ว / ราคานี้เป็นการประเมินเบื้องต้น อาจมีการเปลี่ยนแปลง</p>
                        </div>

                        <Separator />

                        {/* Elements */}
                        <div className='space-y-3'>
                            <h4 className="font-semibold flex items-center gap-2"><Palette/> องค์ประกอบดีไซน์</h4>
                            {textElements.length > 0 && (
                                <div>
                                    <h5 className="font-medium mb-2 flex items-center gap-2 text-sm text-muted-foreground"><Type className="w-4 h-4"/> ข้อความ ({textElements.length})</h5>
                                    <div className="divide-y rounded-md border">
                                        {textElements.map(el => (
                                            <div key={el.id} className="p-3 text-sm">
                                                <p className="font-medium truncate">"{el.text}"</p>
                                                <div className="grid grid-cols-2 gap-x-4 text-xs text-muted-foreground mt-1">
                                                    <span>ฟอนต์: {el.fontFamily?.split(',')[0].replace(/'/g, '')}</span>
                                                    <div className="flex items-center gap-1.5">สี: <div className="w-3 h-3 rounded-full border" style={{backgroundColor: el.color}}></div> {el.color}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {imageElements.length > 0 && (
                                <div>
                                    <h5 className="font-medium mb-2 flex items-center gap-2 text-sm text-muted-foreground"><ImageIcon className="w-4 h-4"/> รูปภาพ ({imageElements.length})</h5>
                                    <div className="divide-y rounded-md border">
                                        {imageElements.map(el => (
                                            <div key={el.id} className="p-3 flex items-center gap-3">
                                                <img src={el.url} alt={el.name} className="w-10 h-10 object-contain rounded-sm bg-slate-100" />
                                                <p className="text-sm font-medium truncate">{el.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {elements.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">ไม่มีองค์ประกอบดีไซน์</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
