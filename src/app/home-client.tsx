'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Droplets, Sun, Blend, AlertTriangle, XCircle, ArrowRight, Sparkles, Palette, Truck, Award, Clock, Shield, Calculator } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { howItWorksSteps, whySaifahFeatures, testimonials } from '@/lib/landing-page-data';
import PriceCalculator from '@/components/price-calculator';
import MiniPriceCalculator from '@/components/mini-price-calculator';
import SizeChart from '@/components/size-chart';
import AnimateOnScroll from '@/components/animate-on-scroll';
import { cn } from '@/lib/utils';

const sectionVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomeClient() {
  const careGuideImage = PlaceHolderImages.find(p => p.id === 'care-guide-tshirt');

  const [desktopApi, setDesktopApi] = React.useState<CarouselApi>()
  const [desktopCurrent, setDesktopCurrent] = React.useState(0)
  const [desktopCount, setDesktopCount] = React.useState(0)
  
  const desktopCarouselImages = PlaceHolderImages.filter(p => p.id.startsWith('carousel-desktop-'));

  React.useEffect(() => {
    if (!desktopApi) return
    setDesktopCount(desktopApi.scrollSnapList().length)
    setDesktopCurrent(desktopApi.selectedScrollSnap())
    desktopApi.on("select", () => {
      setDesktopCurrent(desktopApi.selectedScrollSnap())
    })
  }, [desktopApi])

  const products = [
    {
        name: 'Premium Cotton',
        description: 'เสื้อยืดคอตตอน 100% เนื้อนุ่ม ใส่สบาย',
        price: '290',
        image: '/images/product-premium-cotton.png',
        colors: [{name: 'ขาว', value: '#FFFFFF'}, {name: 'ดำ', value: '#212121'}, {name: 'เทา', value: '#A9A9A9'}, {name: 'กรมท่า', value: '#1a2a44'}, {name: 'ครีม', value: '#E1D7C6'}, {name: 'น้ำตาล', value: '#5A3E33'}]
    },
    {
        name: 'Oversize',
        description: 'เสื้อยืดทรงโอเวอร์ไซส์ สไตล์สตรีท',
        price: '320',
        image: '/images/product-oversize-cotton.png',
        colors: [{name: 'ขาว', value: '#FFFFFF'}, {name: 'ดำ', value: '#212121'}]
    }
  ];

  return (
    <div className="flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
        
        {/* SEO H1 - Visually Hidden */}
        <h1 className="sr-only">SAIFAH Design Studio - บริการสกรีนเสื้อด่วน สกรีนเสื้อ DTF คุณภาพพรีเมียม ไม่มีขั้นต่ำ</h1>
        
        {/* HERO CAROUSEL */}
        <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden bg-muted">
            <div className="w-full h-full relative group">
                <Carousel
                    setApi={setDesktopApi}
                    opts={{ loop: true, duration: 60 }}
                    plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
                    className="w-full h-full"
                >
                    <CarouselContent className="h-full">
                        {desktopCarouselImages.map((image, index) => (
                            <CarouselItem key={index} className="w-full h-[65vh] md:h-[80vh]">
                                <Link href="/design" className="block w-full h-full cursor-pointer relative">
                                    <Image
                                        src={image.imageUrl}
                                        alt={`Saifah Screen - ${image.description || 'สกรีนเสื้อด่วน'}`}
                                        fill
                                        priority={index === 0}
                                        className="object-cover"
                                        sizes="100vw"
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 right-0 h-10 w-10 md:h-14 md:w-14 bg-background/50 hover:bg-background border border-white/20 text-foreground shadow-lg backdrop-blur-md" />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <CarouselNext className="relative translate-x-0 translate-y-0 left-0 right-0 h-10 w-10 md:h-14 md:w-14 bg-background/50 hover:bg-background border border-white/20 text-foreground shadow-lg backdrop-blur-md" />
                    </div>
                </Carousel>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:hidden">
                {Array.from({ length: desktopCount }).map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => desktopApi?.scrollTo(index)} 
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500 shadow-sm", 
                            desktopCurrent === index ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60"
                        )} 
                    />
                ))}
            </div>
        </section>

        {/* Mini Price Calculator - Tight Below Banner */}
        <div className="relative -mt-8 md:-mt-10 z-30 flex justify-center px-4 mb-8">
            <MiniPriceCalculator />
        </div>

        {/* HOW IT WORKS */}
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20 relative z-20"
        >
            <div className="container mx-auto px-4">
                 <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase mb-4">
                        <Sparkles className="h-4 w-4" />
                        เริ่มต้นง่ายๆ
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground drop-shadow-sm">3 ขั้นตอนง่ายๆ ในการสกรีนเสื้อด่วน</h2>
                    <p className="text-muted-foreground text-xl max-w-xl mx-auto font-medium">สร้างเสื้อดีไซน์ของคุณได้ในไม่กี่นาที ด้วยระบบสกรีนเสื้อออนไลน์</p>
                </div>
                
                <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3 relative">
                    {[
                        { icon: Palette, title: '1. เลือกเสื้อ', desc: 'เลือกสีและไซส์ที่ต้องการสำหรับการสกรีน', color: 'from-primary to-sky-400' },
                        { icon: Sparkles, title: '2. ออกแบบ', desc: 'ใส่ข้อความหรือรูปภาพเพื่อสกรีนเสื้อ DTF', color: 'from-purple-500 to-pink-500' },
                        { icon: Truck, title: '3. รอรับเสื้อ', desc: 'สกรีนเสื้อด่วนและจัดส่งตรงถึงมือคุณ', color: 'from-green-500 to-emerald-500' }
                    ].map((step, index) => (
                        <motion.div 
                            key={step.title}
                            whileHover={{ y: -10 }}
                            className="relative group cursor-default"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative p-10 rounded-[40px] bg-card border-2 border-border/50 hover:border-primary/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 shadow-xl transform group-hover:scale-110 transition-transform`}>
                                    <step.icon className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-lg font-medium">{step.desc}</p>
                                {index < 2 && (
                                    <ArrowRight className="absolute top-1/2 -right-6 w-8 h-8 text-muted-foreground/30 -translate-y-1/2 hidden md:block group-hover:translate-x-3 transition-transform duration-300" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* PRODUCTS SECTION */}
        <motion.section 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={sectionVariants}
             id="products" 
             className="py-20 md:py-32 bg-secondary/30"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-widest uppercase mb-4">
                        <Sparkles className="h-4 w-4" />
                        สินค้าสำหรับการสกรีน
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-sm">เสื้อยืดคุณภาพสำหรับสกรีนเสื้อด่วน</h2>
                    <p className="text-muted-foreground text-xl max-w-xl mx-auto font-medium border-b-2 border-transparent hover:border-primary transition-colors inline-block pb-1">ผ้าคอตตอน 100% เนื้อดี เหมาะสำหรับสกรีนเสื้อ DTF</p>
                </div>
                
                <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2">
                    {products.map((product, index) => (
                        <Card 
                            key={product.name} 
                            className="overflow-hidden bg-card hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group border-0 rounded-[40px] cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/80 to-secondary/40 overflow-hidden flex items-center justify-center p-12">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative w-full h-full z-10 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                                    <Image 
                                        src={product.image}
                                        alt={`สกรีนเสื้อด่วน รุ่น ${product.name}`}
                                        fill
                                        className="object-contain filter drop-shadow-2xl"
                                    />
                                </div>
                                <div className="absolute top-6 right-6 z-20">
                                    <Badge className="bg-white/95 text-foreground shadow-xl px-4 py-1.5 text-sm font-semibold backdrop-blur">
                                        เริ่มต้น {product.price}฿
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <h3 className="font-bold text-2xl mb-2">{product.name}</h3>
                                <p className="text-muted-foreground text-base font-medium mb-6">{product.description}</p>
                                <div className='flex gap-2'>
                                    {product.colors.map(color => (
                                        <div key={color.value} className='relative group/color'>
                                            <div className='w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-125 transition-transform cursor-pointer' style={{ backgroundColor: color.value }} />
                                            <span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg'>
                                                {color.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="text-center mt-16">
                    <Link href="/design">
                        <Button size="lg" className="px-10 h-16 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 group border-2 border-primary">
                            เลือกเสื้อ & เริ่มออกแบบสกรีนเสื้อด่วน
                            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.section>

        {/* WHY SAIFAH */}
        <motion.section 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={sectionVariants}
             className="py-20 md:py-32"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-sm">ทำไมต้องสกรีนเสื้อที่ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">SAIFAH</span></h2>
                    <p className="text-muted-foreground text-xl max-w-xl mx-auto font-medium">มั่นใจในคุณภาพสกรีนเสื้อ DTF ด้วยบริการที่ดีที่สุด</p>
                </div>
                
                <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: Award, title: 'สกรีนเสื้อคุณภาพเยี่ยม', desc: 'ผ้าเกรดพรีเมียม สกรีนทนทานด้วยเครื่อง DTF ทันสมัย', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                        { icon: Clock, title: 'สกรีนเสื้อด่วน', desc: 'ผลิตและจัดส่งภายใน 3-7 วัน รองรับงานเร่งด่วน', color: 'text-green-500', bg: 'bg-green-500/10' },
                        { icon: Shield, title: 'รับประกันคุณภาพ', desc: 'สกรีนไม่หลุดลอก หากผิดพลาด ยินดีแก้ไข', color: 'text-primary', bg: 'bg-primary/10' },
                        { icon: Truck, title: 'ส่งด่วนทั่วไทย', desc: 'จัดส่งรวดเร็ว ถึงมือคุณแน่นอน', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    ].map((item) => (
                        <div key={item.title} className="group flex flex-col items-center text-center gap-4 p-8 rounded-[40px] bg-secondary/30 hover:bg-secondary/60 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-border/50">
                            <div className={`p-5 rounded-3xl ${item.bg} group-hover:scale-110 transition-transform`}>
                                <item.icon className={`h-10 w-10 ${item.color}`} />
                            </div>
                            <div>
                                <h3 className='font-bold text-xl mb-2'>{item.title}</h3>
                                <p className="text-sm font-medium text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* CARE GUIDE */}
        <section id="care-guide" className="py-20 md:py-32 bg-card border-y border-border/50 relative overflow-hidden">
            {/* Minimalist Background Tints (Very Subtle) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 text-foreground text-sm font-semibold uppercase tracking-widest mb-4">
                        <Sparkles className="h-4 w-4 text-primary" />
                        ดูแลรักษาเสื้อสกรีน
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">วิธีดูแลเสื้อสกรีน DTF</h2>
                    <p className="text-muted-foreground text-xl max-w-xl mx-auto font-medium">ให้ลายสกรีนสวยนาน ไม่หลุดลอก ด้วยวิธีง่ายๆ</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 max-w-7xl mx-auto items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 hidden lg:block"
                    >
                        {careGuideImage && (
                            <div className="relative w-full aspect-square animate-[float_6s_ease-in-out_infinite]">
                                <Image
                                    src={careGuideImage.imageUrl}
                                    alt="วิธีดูแลรักษาเสื้อสกรีน"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        )}
                    </motion.div>
                    
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 md:gap-8">
                        {/* Card 1: Wash */}
                        <Card className="relative p-8 rounded-[32px] transition-all duration-500 bg-card border border-border/50 hover:border-primary/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] group shadow-sm overflow-hidden">
                            {/* Stylistic Numbering */}
                            <span className="absolute -top-4 -right-2 text-[120px] font-black text-secondary/80 select-none pointer-events-none group-hover:text-primary/10 transition-colors">01</span>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform shadow-inner">
                                        <Droplets className="h-8 w-8 text-primary"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-foreground">การซักเสื้อสกรีน</h3>
                                        <p className="text-sm font-semibold text-primary/70 tracking-widest uppercase">Wash</p>
                                    </div>
                                </div>
                                <ul className="text-base font-medium text-muted-foreground space-y-4">
                                    <li className="flex items-start gap-3"><span className="text-primary/60 font-bold">•</span> กลับด้านก่อนซักทุกครั้ง</li>
                                    <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">•</span> ใส่ถุงถนอมผ้าช่วยยืดอายุลายสกรีน</li>
                                    <li className="flex items-start gap-3"><span className="text-blue-400 font-bold">•</span> ซักด้วยน้ำเย็นปกติ</li>
                                </ul>
                            </div>
                        </Card>

                        {/* Card 2: Dry */}
                        <Card className="relative p-8 rounded-[32px] transition-all duration-500 bg-card border border-border/50 hover:border-amber-200 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] group shadow-sm overflow-hidden">
                            <span className="absolute -top-4 -right-2 text-[120px] font-black text-secondary/80 select-none pointer-events-none group-hover:text-amber-100/30 transition-colors">02</span>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-200/50 group-hover:scale-110 transition-transform shadow-inner">
                                        <Sun className="h-8 w-8 text-amber-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-foreground">การตากเสื้อสกรีน</h3>
                                        <p className="text-sm font-semibold text-amber-500/70 tracking-widest uppercase">Dry</p>
                                    </div>
                                </div>
                                <ul className="text-base font-medium text-muted-foreground space-y-4">
                                    <li className="flex items-start gap-3"><span className="text-amber-400 font-bold">•</span> กลับด้านก่อนตาก</li>
                                    <li className="flex items-start gap-3"><span className="text-amber-400 font-bold">•</span> ตากในที่แดดอ่อนหรือมีลมโกรก</li>
                                    <li className="flex items-start gap-3"><span className="text-amber-400 font-bold">•</span> หลีกเลี่ยงแดดจัดทุกกรณี</li>
                                </ul>
                            </div>
                        </Card>

                        {/* Card 3: Iron */}
                        <Card className="relative p-8 rounded-[32px] transition-all duration-500 bg-card border border-border/50 hover:border-green-200 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] group shadow-sm overflow-hidden">
                            <span className="absolute -top-4 -right-2 text-[120px] font-black text-secondary/80 select-none pointer-events-none group-hover:text-green-100/30 transition-colors">03</span>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-200/50 group-hover:scale-110 transition-transform shadow-inner">
                                        <Blend className="h-8 w-8 text-green-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-foreground">การรีดเสื้อสกรีน</h3>
                                        <p className="text-sm font-semibold text-green-500/70 tracking-widest uppercase">Iron</p>
                                    </div>
                                </div>
                                <ul className="text-base font-medium text-muted-foreground space-y-4">
                                    <li className="flex items-start gap-3"><span className="text-green-400 font-bold">•</span> ใช้ไฟอ่อนในการรีด</li>
                                    <li className="flex items-start gap-3"><span className="text-green-400 font-bold">•</span> ห้ามรีดทับลายโดยตรงเด็ดขาด</li>
                                    <li className="flex items-start gap-3"><span className="text-green-400 font-bold">•</span> วางผ้าบางทับลายก่อนรีดถ้าจำเป็น</li>
                                </ul>
                            </div>
                        </Card>

                        {/* Card 4: Don't */}
                        <Card className="relative p-8 rounded-[32px] transition-all duration-500 bg-card border border-border/50 hover:border-red-200 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] group shadow-sm overflow-hidden">
                            <span className="absolute -top-4 -right-2 text-[120px] font-black text-secondary/80 select-none pointer-events-none group-hover:text-red-100/30 transition-colors">04</span>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-200/50 group-hover:scale-110 transition-transform shadow-inner">
                                        <AlertTriangle className="h-8 w-8 text-red-600"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-red-500">ข้อห้ามสำคัญ</h3>
                                        <p className="text-sm font-semibold text-red-600/70 tracking-widest uppercase">Don't</p>
                                    </div>
                                </div>
                                <ul className="text-base font-medium text-muted-foreground space-y-4">
                                    <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 shrink-0"/> <span>ห้ามใช้น้ำยาฟอกขาวรุนแรง</span></li>
                                    <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 shrink-0"/> <span>ห้ามใช้แปรงขัดถูที่ลายสกรีน</span></li>
                                    <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-red-500 shrink-0"/> <span>ห้ามอบแห้งด้วยความร้อนสูง</span></li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-sm">รีวิวสกรีนเสื้อจากลูกค้า</h2>
                    <p className="text-muted-foreground text-xl font-medium">ความไว้วางใจจากลูกค้าคือหัวใจของ SAIFAH</p>
                </div>
            </div>
            <div className="w-full overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)] pb-4">
                <div className="flex w-max gap-6 px-4 animate-[scroll_30s_linear_infinite]">
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <Card key={`${testimonial.name}-${index}`} className="w-[350px] shrink-0 bg-card hover:shadow-2xl transition-all duration-300 border-border/50 rounded-[32px] cursor-pointer hover:-translate-y-2">
                            <CardContent className="p-8">
                                <div className="flex mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                                    ))}
                                </div>
                                <blockquote className="text-base font-medium text-muted-foreground mb-6 line-clamp-4 leading-relaxed">"{testimonial.quote}"</blockquote>
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                     {testimonial.name.replace('คุณ', '').charAt(0)}
                                   </div>
                                   <p className="text-base font-semibold">{testimonial.name}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* DECISION HELPER (PRICE CALC & SIZE CHART) */}
        <section id="decision-helper" className="py-20 md:py-32 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-sm">ประเมินราคาและไซส์เสื้อ</h2>
                    <p className="text-muted-foreground text-xl font-medium">วางแผนงบประมาณสกรีนเสื้อด่วนและเลือกไซส์ที่ใช่</p>
                </div>
                <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
                    <PriceCalculator />
                    <SizeChart />
                </div>
            </div>
        </section>


        {/* FINAL CTA */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-primary via-sky-500 to-indigo-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_60%)]" />
            {/* Floating decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-float animation-delay-300" />
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="container mx-auto px-4 text-center relative z-10"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg tracking-tight">พร้อมออกแบบสกรีนเสื้อด่วนของคุณแล้วหรือยัง?</h2>
                <p className="text-white/90 text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto">เริ่มต้นออกแบบได้เลยตอนนี้ ง่ายๆ ไม่กี่คลิก พร้อมระบบสกรีนเสื้อ DTF คุณภาพพรีเมียม</p>
                <Link href="/design">
                    <Button size="lg" variant="secondary" className="text-lg px-12 h-16 rounded-full font-semibold shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-110 text-primary group border-4 border-transparent hover:border-white/20 hover:bg-white">
                        เปิด Canvas เริ่มสกรีนเสื้อด่วน
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </Link>
            </motion.div>
        </section>
        
    </div>
  );
}
