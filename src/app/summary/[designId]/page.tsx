'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Loader2, Package, Download, Palette, Ruler, Tag, Printer, Image as ImageIcon, Type } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DesignPreview from '@/components/design-preview';
import { Separator } from '@/components/ui/separator';
import AnimateOnScroll from '@/components/animate-on-scroll';
import type { DesignElement } from '@/app/design/components/design-tool';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/icons/logo';
import { getPricePerItem, PRICE_PER_EXTRA_SPOT } from '@/lib/pricing';
import OrderForm from '../components/order-form';

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
            useCORS: true,
            background: '#ffffff',
        } as any).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = `SAIFAH_Summary_${designId.substring(0, 8)}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            setIsDownloading(false);
            toast({
                title: "ดาวน์โหลดสำเร็จ!",
                description: "ไฟล์สรุปดีไซน์ถูกบันทึกแล้ว",
            });
        }).catch((err: any) => {
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

    const designState = {
        productConfig: config,
        elements: elements,
    };

    return (
        <div className="bg-muted min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <AnimateOnScroll delay={100}>
                    <div className='text-center mb-8'>
                        <h1 className="text-3xl font-headline font-bold">สรุปดีไซน์และสั่งซื้อ</h1>
                        <p className="text-muted-foreground mt-2">กรอกข้อมูลและส่งให้แอนมินในไลน์ได้เลย</p>
                    </div>
                </AnimateOnScroll>

                <div className="grid lg:grid-cols-2 gap-8">
                    <AnimateOnScroll as="div" delay={200} className="order-2 lg:order-1">
                        <div ref={summaryRef} className="bg-background rounded-lg shadow-lg p-6">
                            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold font-headline text-primary">รายละเอียดดีไซน์</h2>
                                    <p className="text-sm text-muted-foreground mt-1">รหัส: {designId.substring(0, 8).toUpperCase()}</p>
                                </div>
                                <Logo className="h-10 w-auto opacity-80" />
                            </header>

                            <div className="space-y-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative aspect-square w-full max-w-xs rounded-lg bg-slate-100 shadow-md overflow-hidden border">
                                        <DesignPreview design={design} size={350} />
                                    </div>
                                    <h3 className="font-headline text-lg font-bold mt-4">{design.name}</h3>
                                    <p className="text-muted-foreground capitalize">{config.productType} T-Shirt - {config.tshirt.name}</p>
                                </div>

                                <Separator />

                                <div className='space-y-3'>
                                    <h4 className="font-semibold flex items-center gap-2"><Ruler className="w-4 h-4" /> ขนาดและจำนวน</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Object.entries(quantities).map(([size, qty]) => (
                                            <div key={size} className="text-center p-2 bg-muted rounded-md">
                                                <div className="text-sm font-medium">{size}</div>
                                                <div className="text-lg font-bold">{qty as number}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center text-sm text-muted-foreground">
                                        รวม: <span className="font-bold text-foreground">{totalQuantity} ตัว</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className='space-y-2'>
                                    <h4 className="font-semibold flex items-center gap-2"><Palette className="w-4 h-4" /> องค์ประกอบดีไซน์</h4>
                                    {textElements.length > 0 && (
                                        <div className="text-sm text-muted-foreground">
                                            📝 ข้อความ: {textElements.length} รายการ
                                        </div>
                                    )}
                                    {imageElements.length > 0 && (
                                        <div className="text-sm text-muted-foreground">
                                            🖼️ รูปภาพ: {imageElements.length} รายการ
                                        </div>
                                    )}
                                    {elements.length === 0 && (
                                        <p className="text-sm text-muted-foreground">ไม่มีองค์ประกอบดีไซน์</p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload} disabled={isDownloading}>
                                        {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                                        ดาวน์โหลด
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2" asChild>
                                        <Link href={`/design/${designId}`}>
                                            <Palette className="h-4 w-4" /> แก้ไข
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    <div className="order-1 lg:order-2">
                        <OrderForm
                            productConfig={config}
                            quantities={quantities as any}
                            elementsCount={elements.length}
                            designId={designId}
                            designState={designState}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
