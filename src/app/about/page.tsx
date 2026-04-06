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
            title: "AI ช่วยออกแบบ",
            description: "ให้ AI ช่วยคุณสร้างสรรค์ดีไซน์ที่ไม่เหมือนใครจากไอเดียของคุณ",
        },
        {
            icon: <Shirt className="h-8 w-8" />,
            title: "วัตถุดิบพรีเมียม",
            description: "เราเลือกใช้เฉพาะผ้าคอตตอนเกรดพรีเมียม เพื่อความสบายและทนทาน",
        },
        {
            icon: <Palette className="h-8 w-8" />,
            title: "สีสด คมชัด ทนทาน",
            description: "เทคโนโลยีการพิมพ์ล่าสุดที่ให้สีสด คมชัด และติดทนนาน",
        },
        {
            icon: <Truck className="h-8 w-8" />,
            title: "จัดส่งรวดเร็ว",
            description: "ระบบการผลิตและจัดส่งที่รวดเร็ว เชื่อถือได้ ส่งตรงถึงหน้าบ้านคุณ",
        },
        {
            icon: <Infinity className="h-8 w-8" />,
            title: "ไม่มีขั้นต่ำ",
            description: "สั่งทำเสื้อได้แม้เพียงตัวเดียว หรือจะสั่งเป็นทีม เราก็พร้อมให้บริการ",
        },
        {
            icon: <Smile className="h-8 w-8" />,
            title: "รับประกันคุณภาพ",
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
        <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            
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
                <div className="relative z-20 container px-4 md:px-6 space-y-8 mt-12">
                    <AnimateOnScroll as="div" delay={100} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-white text-sm font-semibold uppercase tracking-widest mb-4">
                        เกี่ยวกับเรา
                    </AnimateOnScroll>
                    <AnimateOnScroll as="h1" delay={200} className="text-4xl font-bold tracking-tight font-headline sm:text-5xl md:text-7xl drop-shadow-2xl">
                        WE ARE SAIFAH
                    </AnimateOnScroll>
                    <AnimateOnScroll as="p" delay={300} className="max-w-[700px] mx-auto text-lg md:text-2xl text-white/90 font-medium leading-relaxed drop-shadow-lg">
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
            
            <section className="py-20 md:py-32 relative z-10">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                        <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-sm"><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">คำมั่นสัญญา</span>ของเรา</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl font-medium">
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

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-primary via-sky-500 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        {[
                            { number: '5,000+', label: 'ลูกค้าที่ไว้วางใจ' },
                            { number: '50,000+', label: 'เสื้อที่ผลิตแล้ว' },
                            { number: '5+', label: 'ปีที่ดำเนินงาน' },
                            { number: '99%', label: 'ลูกค้าพอใจ' },
                        ].map((stat, index) => (
                            <AnimateOnScroll key={stat.label} delay={100 + index * 100} className="flex flex-col items-center">
                                <span className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">{stat.number}</span>
                                <span className="text-white/80 text-sm md:text-base font-medium">{stat.label}</span>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

             {/* The SAIFAH Difference Section */}
            <section className="py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">สิ่งที่ทำให้เราแตกต่าง</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                            สิ่งที่ทำให้เราแตกต่างและเป็นตัวเลือกที่ดีที่สุดสำหรับคุณ
                        </p>
                    </AnimateOnScroll>
                    <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {differences.map((item, index) => (
                            <AnimateOnScroll key={item.title} delay={200 + index * 100}>
                                <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-[24px]">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner">
                                            {item.icon}
                                        </div>
                                        <CardTitle className='font-headline text-xl font-bold'>{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-base tracking-wide leading-relaxed">{item.description}</p>
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
