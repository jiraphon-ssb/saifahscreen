import {
  Shirt,
  Type,
  ImageUp,
  SlidersHorizontal,
  Layers,
  Calculator,
  ShoppingCart,
  Lightbulb,
  CheckCircle,
  MousePointerClick,
  Palette,
  FileImage,
  Scaling,
  Paintbrush,
  Rocket,
  Layers2,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimateOnScroll from '@/components/animate-on-scroll';

export default function HowToDesignPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'how-to-design-hero');

    const steps = [
        {
            icon: <Shirt className="h-8 w-8" />,
            title: "1. เลือกสินค้าและสี",
            description: "เริ่มต้นด้วยการเลือกประเภทเสื้อ (Premium หรือ Oversize) และสีเสื้อที่ต้องการ เพื่อเป็นผ้าใบสำหรับผลงานของคุณ",
        },
        {
            icon: <MousePointerClick className="h-8 w-8" />,
            title: "2. เพิ่มองค์ประกอบ",
            description: "กด 'เพิ่มข้อความ' เพื่อใส่สโลแกนเท่ๆ หรือ 'อัปโหลดรูปภาพ' เพื่อนำโลโก้และอาร์ตเวิร์คของคุณเองเข้ามาวางบนเสื้อ",
        },
        {
            icon: <SlidersHorizontal className="h-8 w-8" />,
            title: "3. ปรับแต่งรายละเอียด",
            description: "คลิกที่องค์ประกอบเพื่อเปิด 'เครื่องมือแก้ไข' คุณสามารถปรับขนาด, ตำแหน่ง, การหมุน, เปลี่ยนฟอนต์, สี, และอื่นๆ ได้ดั่งใจ",
        },
        {
            icon: <Layers className="h-8 w-8" />,
            title: "4. จัดการเลเยอร์",
            description: "ใช้แผง 'เลเยอร์' เพื่อควบคุมการซ้อนทับของวัตถุต่างๆ ลากสลับลำดับ, นำไปไว้หน้า-หลัง, หรือซ่อน/แสดงองค์ประกอบได้ง่ายๆ",
        },
        {
            icon: <MessageSquare className="h-8 w-8" />,
            title: "5. ติดต่อเพื่อสั่งผลิต",
            description: "เมื่อพอใจกับดีไซน์แล้ว แคปภาพหน้าจอและส่งให้ทีมขายของเราทาง LINE เพื่อขอใบเสนอราคาและดำเนินการสั่งผลิตต่อ",
        },
    ];

    const tips = [
        {
            icon: <FileImage className="h-6 w-6 text-green-500" />,
            title: "ภาพคมชัด = งานสกรีนเทพ",
            description: "เพื่อคุณภาพงานสกรีนระดับ HD ให้อัปโหลดไฟล์ PNG พื้นหลังโปร่งใส ที่มีความละเอียด 300 DPI ขึ้นไปจะดีที่สุด",
        },
        {
            icon: <Palette className="h-6 w-6 text-primary" />,
            title: "คอนทราสต์คือราชา",
            description: "เลือกสีข้อความและกราฟิกให้ตัดกับสีเสื้ออย่างชัดเจน (เช่น ตัวอักษรขาวบนเสื้อดำ) เพื่อให้ดีไซน์ของคุณโดดเด่นและอ่านง่าย",
        },
         {
            icon: <Type className="h-6 w-6 text-purple-500" />,
            title: "จับคู่ฟอนต์อย่างมีศิลปะ",
            description: "ลองใช้ฟอนต์หัวข้อที่โดดเด่นคู่กับฟอนต์เนื้อหาที่เรียบง่าย การใช้ฟอนต์ไม่เกิน 2-3 แบบจะทำให้งานดูมีมิติและน่าสนใจขึ้น",
        },
        {
            icon: <Scaling className="h-6 w-6 text-red-500" />,
            title: "สมดุลคือหัวใจ",
            description: "จัดวางองค์ประกอบให้มีสมดุล ไม่หนักไปทางใดทางหนึ่ง ลองเว้นที่ว่าง (Negative Space) เพื่อให้ดีไซน์ดูไม่แน่นจนอึดอัด",
        },
        {
            icon: <Layers2 className="h-6 w-6 text-orange-500" />,
            title: "เลเยอร์สร้างมิติ",
            description: "อย่ากลัวที่จะซ้อนภาพกับข้อความ! ลองวางข้อความทับบนรูปภาพ หรือใช้กราฟิกจางๆ เป็นพื้นหลังเพื่อสร้างความลึกให้กับดีไซน์",
        },
        {
            icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
            title: "น้อยแต่มาก (Less is More)",
            description: "บางครั้งโลโก้เล็กๆ หรือข้อความสั้นๆ ที่จัดวางอย่างดี ก็ดูทรงพลังและน่าจดจำกว่าดีไซน์ที่อัดแน่นไปด้วยรายละเอียด",
        },
    ];
    
    const inspiration = [
        {
            icon: <Rocket className="h-8 w-8"/>,
            title: "เสื้อทีม/บริษัท",
            description: "ใส่โลโก้บริษัทที่อกซ้าย และเพิ่มสโลแกนเท่ๆ ไว้ที่ด้านหลัง",
            badge: "Professional"
        },
        {
            icon: <Paintbrush className="h-8 w-8"/>,
            title: "เสื้อแบรนด์ตัวเอง",
            description: "ใช้อาร์ตเวิร์คที่เป็นเอกลักษณ์ของคุณ แล้วใส่ชื่อแบรนด์ด้วยฟอนต์เก๋ๆ",
            badge: "Creative"
        },
        {
            icon: <Lightbulb className="h-8 w-8"/>,
            title: "เสื้อรุ่น/กิจกรรม",
            description: "ใส่ชื่อรุ่น/ชื่องานตัวใหญ่ๆ พร้อมรายชื่อเพื่อนๆ หรือสมาชิกด้วยฟอนต์เล็กๆ",
            badge: "Memorable"
        }
    ];

    return (
        <div className="bg-gradient-to-b from-background via-secondary/10 to-background text-foreground min-h-screen relative overflow-hidden">
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white overflow-hidden bg-black">
                <div className="absolute inset-0 w-full h-full bg-black/60 z-10" />
                {heroImage && (
                     <Image
                        src={heroImage.imageUrl}
                        alt="วิธีการใช้งานระบบออกแบบ"
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                )}
                <div className="relative z-20 container px-4 md:px-6 space-y-6 mt-12">
                    <AnimateOnScroll delay={100} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-white text-sm font-semibold uppercase tracking-widest mb-4">
                        <Badge variant="outline" className="text-white border-white/30 text-base py-1 px-4 hover:bg-white/10 uppercase tracking-widest">THE ULTIMATE GUIDE</Badge>
                    </AnimateOnScroll>
                    <AnimateOnScroll as="h1" delay={200} className="text-4xl font-semibold tracking-tight font-headline sm:text-5xl md:text-7xl drop-shadow-2xl">
                        คู่มือสร้างผลงานชิ้นเอก
                    </AnimateOnScroll>
                    <AnimateOnScroll as="p" delay={300} className="max-w-[700px] mx-auto text-lg md:text-2xl text-white/90 font-medium leading-relaxed drop-shadow-lg">
                        เรียนรู้ทุกซอกทุกมุมของเครื่องมือออกแบบ เพื่อปลดปล่อยศักยภาพความคิดสร้างสรรค์ของคุณ
                    </AnimateOnScroll>
                </div>
            </section>
            
            {/* Steps Section */}
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-16 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                            Step by Step
                        </div>
                        <h2 className="text-4xl font-headline font-semibold tracking-tight sm:text-5xl md:text-6xl drop-shadow-sm">เริ่มต้นง่ายๆ ใน <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">5 ขั้นตอน</span></h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl font-medium">
                           ทำตามไกด์นี้ แล้วคุณจะสร้างเสื้อตัวโปรดได้ในไม่กี่นาที
                        </p>
                    </AnimateOnScroll>

                    <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {steps.map((step, index) => (
                            <AnimateOnScroll key={step.title} delay={200 + index * 100} className="flex flex-col items-center text-center gap-4 rounded-[24px] bg-card/40 backdrop-blur-sm p-8 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:bg-card/80 hover:shadow-2xl transform hover:-translate-y-2 group">
                                <div className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner group-hover:scale-110 transition-transform">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-headline font-semibold tracking-tight">{step.title}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Tips & Tricks Section */}
            <section className="py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-headline font-semibold tracking-tighter sm:text-4xl md:text-5xl">เคล็ดลับงานดีไซน์ระดับโปร</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                            อัปเกรดงานดีไซน์ของคุณไปอีกขั้นด้วยเคล็ดลับจากมือโปร
                        </p>
                    </AnimateOnScroll>
                    <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
                        {tips.map((tip, index) => (
                            <AnimateOnScroll key={tip.title} delay={200 + index * 100}>
                                 <Card className="bg-card hover:border-primary/50 hover:shadow-lg hover:-translate-y-1.5 transition-all">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            {tip.icon}
                                        </div>
                                        <CardTitle className='font-headline text-lg'>{tip.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{tip.description}</p>
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

             {/* Inspiration Section */}
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-headline font-semibold tracking-tighter sm:text-4xl md:text-5xl">ไอเดียดีไซน์</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                            ยังไม่มีไอเดีย? ลองเริ่มต้นจากแนวทางเหล่านี้
                        </p>
                    </AnimateOnScroll>
                    <div className="mx-auto grid gap-8 md:grid-cols-3 max-w-5xl">
                       {inspiration.map((item, index) => (
                           <AnimateOnScroll key={item.title} delay={200 + index * 150} className="relative group flex flex-col items-center text-center p-8 rounded-xl border border-border/50 bg-card/50 transition-all hover:bg-card hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                               <Badge variant="secondary" className="absolute -top-3">{item.badge}</Badge>
                               <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-5 border-2 border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                    {item.icon}
                               </div>
                               <h3 className="text-xl font-semibold font-headline">{item.title}</h3>
                               <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
                           </AnimateOnScroll>
                       ))}
                    </div>
                </div>
            </section>

             {/* CTA Section */}
            <section className="py-20 bg-gradient-to-t from-muted to-background">
                <AnimateOnScroll delay={200} className="container text-center">
                    <h2 className="text-3xl font-headline font-semibold tracking-tighter">ถึงตาคุณแล้ว!</h2>
                    <p className="text-muted-foreground mt-2 mb-6">เครื่องมือพร้อมแล้ว จินตนาการของคุณล่ะ พร้อมหรือยัง?</p>
                    <Button asChild size="lg">
                        <Link href="/design">
                           เริ่มออกแบบเลย!
                        </Link>
                    </Button>
                </AnimateOnScroll>
            </section>
        </div>
    )
}
