'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, Droplets, Sun, Blend, AlertTriangle, XCircle, ArrowRight, Sparkles, Palette, Truck, Award, Clock, Shield } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { howItWorksSteps, whySaifahFeatures, testimonials } from '@/lib/landing-page-data';
import PriceCalculator from '@/components/price-calculator';
import SizeChart from '@/components/size-chart';
import { cn } from '@/lib/utils';

export default function Home() {
  const careGuideImage = PlaceHolderImages.find(p => p.id === 'care-guide-tshirt');

  const [desktopApi, setDesktopApi] = React.useState<CarouselApi>()
  const [desktopCurrent, setDesktopCurrent] = React.useState(0)
  const [desktopCount, setDesktopCount] = React.useState(0)
  
  const [activeSlide, setActiveSlide] = React.useState(0);

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
        colors: ['#FFFFFF', '#212121', '#A9A9A9', '#1a2a44', '#E1D7C6', '#5A3E33']
    },
    {
        name: 'Oversize',
        description: 'เสื้อยืดทรงโอเวอร์ไซส์ สไตล์สตรีท',
        price: '320',
        image: '/images/product-oversize-cotton.png',
        colors: ['#FFFFFF', '#212121']
    }
  ];

  return (
    <div className="flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
        
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
            <div className="absolute inset-0">
                <Carousel
                    setApi={setDesktopApi}
                    opts={{ loop: true, duration: 60 }}
                    plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
                    className="w-full h-full"
                    onMouseEnter={(e) => {}}
                >
                    <CarouselContent className="h-full">
                        {desktopCarouselImages.map((image, index) => (
                            <CarouselItem key={index} className="h-full">
                                <div className="relative h-[600px] md:h-[700px] w-full">
                                    <img
                                        src={image.imageUrl}
                                        alt={image.description}
                                        data-ai-hint={image.imageHint}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl animate-[fadeIn_0.8s_ease-out]">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                            <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                            <span className="text-white/90 text-sm font-medium">ออกแบบง่าย ส่งเร็ว คุณภาพเยี่ยม</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
                            สร้างเสื้อ<br/>
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                                ดีไซน์ของคุณเอง
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
                            สกรีนเสื้อคุณภาพสูง รับงานรวดเร็ว ส่งทั่วประเทศ 
                            <span className="block mt-2 text-white/60 text-sm">
                                เริ่มต้นออกแบบได้ทันที ไม่ต้องมีประสบการณ์
                            </span>
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild className="text-base px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 group">
                                <Link href="/design">
                                    <span className="flex items-center gap-2">
                                        เริ่มออกแบบเลย
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-base px-8 h-14 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50 transition-all duration-300" asChild>
                                <Link href="/portfolio">
                                    ดูผลงาน
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 mt-12 pt-6 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                                            {String.fromCharCode(64+i)}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-white/70 text-sm ml-2">5000+ ลูกค้าพอใจ</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-white/70 text-sm ml-1">4.9/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {Array.from({ length: desktopCount }).map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => desktopApi?.scrollTo(index)} 
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500", 
                            desktopCurrent === index ? "bg-white w-12" : "bg-white/40 w-3 hover:bg-white/60"
                        )} 
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        เริ่มต้นง่ายๆ
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">3 ขั้นตอนง่ายๆ</h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">สร้างเสื้อดีไซน์ของคุณได้ในไม่กี่นาที</p>
                </div>
                
                <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
                    {[
                        { icon: Palette, title: '1. เลือกเสื้อ', desc: 'เลือกสีและไซส์ที่ต้องการ', color: 'from-blue-500 to-cyan-500' },
                        { icon: Sparkles, title: '2. ออกแบบ', desc: 'ใส่ข้อความหรือรูปภาพของคุณ', color: 'from-purple-500 to-pink-500' },
                        { icon: Truck, title: '3. รอรับเสื้อ', desc: 'ส่งตรงถึงมือคุณ', color: 'from-green-500 to-emerald-500' }
                    ].map((step, index) => (
                        <div 
                            key={step.title}
                            className="relative group"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <step.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.desc}</p>
                                {index < 2 && (
                                    <ArrowRight className="absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground/30 -translate-y-1/2 hidden md:block group-hover:translate-x-2 transition-transform duration-300" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="products" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        สินค้าของเรา
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">เสื้อเปล่าคุณภาพ</h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">ผ้าคอตตอน 100% เนื้อดี ใส่สบาย</p>
                </div>
                
                <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
                    {products.map((product, index) => (
                        <Card 
                            key={product.name} 
                            className="overflow-hidden bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group border-0"
                        >
                            <div className="relative aspect-square bg-gradient-to-br from-secondary/50 to-secondary/30 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <img 
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-white/90 text-foreground shadow-lg">
                                        เริ่มต้น {product.price}฿
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                                <div className='flex gap-1.5'>
                                    {product.colors.map(color => (
                                        <div key={color} className='w-6 h-6 rounded-full border-2 shadow-sm' style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="text-center mt-10">
                    <Button size="lg" asChild className="px-8">
                        <Link href="/design">
                            เลือกเสื้อ & เริ่มออกแบบ
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">ทำไมต้อง <span className="text-primary">SAIFAH</span></h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">มั่นใจในคุณภาพ ด้วยบริการที่ดีที่สุด</p>
                </div>
                
                <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: Award, title: 'คุณภาพเยี่ยม', desc: 'ผ้าเกรดพรีเมียม สกรีนทนทาน', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                        { icon: Clock, title: 'ส่งเร็ว', desc: 'ผลิตและจัดส่งภายใน 3-7 วัน', color: 'text-green-500', bg: 'bg-green-500/10' },
                        { icon: Shield, title: 'รับประกัน', desc: 'หากผิดพลาด ยินดีแก้ไข', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        { icon: Truck, title: 'ส่งทั่วไทย', desc: 'จัดส่งฟรี ทั่วประเทศ', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    ].map((item) => (
                        <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                            <div className={`p-3 rounded-xl ${item.bg}`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} />
                            </div>
                            <div>
                                <h3 className='font-semibold'>{item.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="care-guide" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-secondary/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        ดูแลรักษา
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">วิธีดูแลเสื้อ</h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">ให้เสื้อสวยนาน ด้วยวิธีง่ายๆ เหล่านี้</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto items-center">
                    <div className="lg:col-span-1 hidden lg:block">
                        {careGuideImage && (
                            <img
                                src={careGuideImage.imageUrl}
                                alt="Care Guide"
                                className="w-full h-auto object-contain animate-[float_4s_ease-in-out_infinite]"
                            />
                        )}
                    </div>
                    
                    <div className="lg:col-span-4 grid sm:grid-cols-2 gap-4">
                        <Card className="p-5 hover:shadow-lg transition-shadow bg-blue-50/50 border-blue-100/50">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Droplets className="h-6 w-6 text-blue-600"/>
                                </div>
                                <div>
                                    <h3 className="font-bold">การซัก</h3>
                                    <p className="text-xs text-blue-600/70">Wash</p>
                                </div>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    กลับด้านก่อนซัก
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    ใส่ถุงถนอมผ้า
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    ซักด้วยน้ำเย็น
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-5 hover:shadow-lg transition-shadow bg-amber-50/50 border-amber-100/50">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <Sun className="h-6 w-6 text-amber-600"/>
                                </div>
                                <div>
                                    <h3 className="font-bold">การตาก</h3>
                                    <p className="text-xs text-amber-600/70">Dry</p>
                                </div>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    กลับด้านก่อนตาก
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    ตากในที่แดดอ่อน
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    หลีกเลี่ยงแดดจัด
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-5 hover:shadow-lg transition-shadow bg-green-50/50 border-green-100/50">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Blend className="h-6 w-6 text-green-600"/>
                                </div>
                                <div>
                                    <h3 className="font-bold">การรีด</h3>
                                    <p className="text-xs text-green-600/70">Iron</p>
                                </div>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    ใช้ไฟอ่อน
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    กลับด้านในรีด
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    รองด้วยผ้าบาง
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-5 hover:shadow-lg transition-shadow bg-red-50/50 border-red-100/50">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
                                    <AlertTriangle className="h-6 w-6 text-red-600"/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-600">ข้อห้าม</h3>
                                    <p className="text-xs text-red-600/70">Don't</p>
                                </div>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-red-500 mt-0.5"/>
                                    <span>ห้ามใช้น้ำยาฟอกขาว</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-red-500 mt-0.5"/>
                                    <span>ห้ามใช้แปรงขัด</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-red-500 mt-0.5"/>
                                    <span>ห้ามซักน้ำร้อน</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">รีวิวจากลูกค้า</h2>
                    <p className="text-muted-foreground text-lg">ความพึงพอใจของลูกค้าคือสิ่งสำคัญที่สุด</p>
                </div>
            </div>
            <div className="w-full overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)] pb-4">
                <div className="flex w-max gap-4 px-4 animate-[scroll_20s_linear_infinite]">
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <Card key={`${testimonial.name}-${index}`} className="w-[300px] shrink-0 bg-card hover:shadow-lg transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <blockquote className="text-sm text-muted-foreground mb-4 line-clamp-3">"{testimonial.quote}"</blockquote>
                                <p className="text-sm font-semibold">{testimonial.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="decision-helper" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">ประเมินราคาและขนาด</h2>
                    <p className="text-muted-foreground text-lg">วางแผนงบประมาณและเลือกไซส์ที่ใช่</p>
                </div>
                <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-2">
                    <PriceCalculator />
                    <SizeChart />
                </div>
            </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">พร้อมออกแบบเสื้อของคุณแล้วหรือยัง?</h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">เริ่มต้นออกแบบได้เลยตอนนี้ ง่ายๆ ไม่กี่คลิก</p>
                <Button size="lg" variant="secondary" asChild className="text-base px-10 h-14 font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                    <Link href="/design">
                        เริ่มออกแบบเลย
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>
        
    </div>
  );
}
