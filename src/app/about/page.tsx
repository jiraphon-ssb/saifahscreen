import { Award, Infinity, Palette, Shirt, Smile, Laptop, Truck, Wand2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimateOnScroll from '@/components/animate-on-scroll';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'carousel-desktop-3');

    const differences = [
        {
            icon: <Wand2 className="h-8 w-8" />,
            title: "AI Design Assistant",
            description: "ให้ AI ช่วยคุณสร้างสรรค์ดีไซน์ที่ไม่เหมือนใครจากไอเดียของคุณ",
        },
        {
            icon: <Shirt className="h-8 w-8" />,
            title: "Premium Materials",
            description: "เราเลือกใช้เฉพาะผ้าคอตตอนเกรดพรีเมียม เพื่อความสบายและทนทาน",
        },
        {
            icon: <Palette className="h-8 w-8" />,
            title: "Vibrant & Durable Prints",
            description: "เทคโนโลยีการพิมพ์ล่าสุดที่ให้สีสด คมชัด และติดทนนาน",
        },
        {
            icon: <Truck className="h-8 w-8" />,
            title: "Fast & Reliable Delivery",
            description: "ระบบการผลิตและจัดส่งที่รวดเร็ว เชื่อถือได้ ส่งตรงถึงหน้าบ้านคุณ",
        },
        {
            icon: <Infinity className="h-8 w-8" />,
            title: "No Minimum Order",
            description: "สั่งทำเสื้อได้แม้เพียงตัวเดียว หรือจะสั่งเป็นทีม เราก็พร้อมให้บริการ",
        },
        {
            icon: <Smile className="h-8 w-8" />,
            title: "Satisfaction Guaranteed",
            description: "เราใส่ใจในทุกรายละเอียด พร้อมรับประกันความพึงพอใจในผลงาน",
        },
    ];

    const commitments = [
        {
            icon: <Award className="h-10 w-10" />,
            title: "คุณภาพเหนือระดับ",
            description: "ตั้งแต่เส้นใยผ้า Cotton จาก USA ไปจนถึงหมึกพิมพ์ที่เราคัดสรร ทุกองค์ประกอบต้องดีที่สุด",
        },
        {
            icon: <Laptop className="h-10 w-10" />,
            title: "เครื่องมือที่ทันสมัย",
            description: "เรามีเครื่องมือออกแบบออนไลน์ที่ใช้งานง่าย ช่วยให้คุณสร้างสรรค์ผลงานได้อย่างแม่นยำและสะดวกสบาย",
        },
        {
            icon: <Truck className="h-10 w-10" />,
            title: "บริการที่เชื่อถือได้",
            description: "ประสบการณ์ที่ราบรื่นตั้งแต่การออกแบบ, การสั่งซื้อ, จนถึงการจัดส่งที่รวดเร็วและตรงเวลา",
        },
    ]

    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-black/50 z-10" />
                {aboutImage && (
                     <Image
                        src={aboutImage.imageUrl}
                        alt="About SAIFAH"
                        data-ai-hint={aboutImage.imageHint}
                        fill
                        className="object-cover"
                    />
                )}
                <div className="relative z-20 container px-4 md:px-6 space-y-6">
                    <AnimateOnScroll as="h1" delay={200} className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl md:text-6xl" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                        WE ARE SAIFAH
                    </AnimateOnScroll>
                    <AnimateOnScroll as="p" delay={300} className="max-w-[700px] mx-auto text-lg md:text-xl" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
                        สตูดิโอที่ผสานเทคโนโลยีการพิมพ์และพลังของ AI เข้าด้วยกัน เพื่อสร้างสรรค์เสื้อผ้าที่ไม่ใช่แค่เครื่องแต่งกาย แต่คือการแสดงตัวตน
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={400}>
                        <Button asChild size="lg">
                            <Link href="/design">
                                ปลดปล่อยความคิดสร้างสรรค์
                            </Link>
                        </Button>
                    </AnimateOnScroll>
                </div>
            </section>
            
            {/* Our Commitment Section */}
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">คำมั่นสัญญาของเรา</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                            SAIFAH ไม่ใช่แค่ชื่อ แต่คือมาตรฐานที่เรายึดมั่นเพื่อมอบสิ่งที่ดีที่สุดให้แก่คุณ
                        </p>
                    </AnimateOnScroll>
                    <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                       {commitments.map((item, index) => (
                         <AnimateOnScroll key={item.title} delay={200 + index * 150} className="grid gap-2 text-center group">
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-transparent group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                            <p className="text-muted-foreground">
                                {item.description}
                            </p>
                        </AnimateOnScroll>
                       ))}
                    </div>
                </div>
            </section>

             {/* The SAIFAH Difference Section */}
            <section className="py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">The SAIFAH Difference</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                            สิ่งที่ทำให้เราแตกต่างและเป็นตัวเลือกที่ดีที่สุดสำหรับคุณ
                        </p>
                    </AnimateOnScroll>
                    <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {differences.map((item, index) => (
                            <AnimateOnScroll key={item.title} delay={200 + index * 100}>
                                <Card className="bg-background/50 border-border/50 hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            {item.icon}
                                        </div>
                                        <CardTitle className='font-headline text-lg'>{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
