'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Droplets, Sun, Blend, AlertTriangle, XCircle, Palette, Shirt, ShoppingCart, Wand2, Infinity, Smile, Truck, MessageSquare } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { howItWorksSteps, whySaifahFeatures, testimonials } from '@/lib/landing-page-data';
import PriceCalculator from '@/components/price-calculator';
import SizeChart from '@/components/size-chart';
import AnimateOnScroll from '@/components/animate-on-scroll';
import { cn } from '@/lib/utils';

// Icon Map
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Palette,
  Shirt,
  ShoppingCart,
  Wand2,
  Infinity,
  Smile,
  Truck,
  Star,
  Droplets,
  Sun,
  Blend,
  AlertTriangle,
  XCircle,
  MessageSquare
};

export default function Home() {
  const careGuideImage = PlaceHolderImages.find(p => p.id === 'care-guide-tshirt');

  const [desktopApi, setDesktopApi] = React.useState<CarouselApi>()
  const [desktopCurrent, setDesktopCurrent] = React.useState(0)
  const [desktopCount, setDesktopCount] = React.useState(0)
  
  const [mobileApi, setMobileApi] = React.useState<CarouselApi>()
  const [mobileCurrent, setMobileCurrent] = React.useState(0)
  const [mobileCount, setMobileCount] = React.useState(0)

  const desktopCarouselImages = PlaceHolderImages.filter(p => p.id.startsWith('carousel-desktop-'));
  const mobileCarouselImages = PlaceHolderImages.filter(p => p.id.startsWith('carousel-mobile-'));

  React.useEffect(() => {
    if (!desktopApi) return
    setDesktopCount(desktopApi.scrollSnapList().length)
    setDesktopCurrent(desktopApi.selectedScrollSnap())
    desktopApi.on("select", () => {
      setDesktopCurrent(desktopApi.selectedScrollSnap())
    })
  }, [desktopApi])
  
  React.useEffect(() => {
    if (!mobileApi) return
    setMobileCount(mobileApi.scrollSnapList().length)
    setMobileCurrent(mobileApi.selectedScrollSnap())
    mobileApi.on("select", () => {
      setMobileCurrent(mobileApi.selectedScrollSnap())
    })
  }, [mobileApi])

  const renderIcon = (name: string, props: { className?: string }) => {
    const Icon = iconMap[name];
    return Icon ? <Icon {...props} /> : null;
  };

  const products = [
    {
        name: 'Premium Cotton T-shirt',
        description: 'เสื้อยืดคอตตอน 100% (C32 Comb) คุณภาพพรีเมียม ทรงสวย ใส่สบาย เหมาะกับทุกโอกาส',
        features: ['Cotton from USA', 'ผ้านุ่มพิเศษ ไม่ร้อน', 'อยู่ทรงสวย ไม่หด ไม่ย้วย', 'งานสกรีนคุณภาพสูง'],
        image: 'https://img2.pic.in.th/Artboard-1431b87429f93275c8.md.png',
        colors: ['#FFFFFF', '#E1D7C6', '#A9A9A9', '#5A3E33', '#212121', '#1a2a44']
    },
    {
        name: 'Oversize Cotton T-shirt',
        description: 'เสื้อยืดทรงโอเวอร์ไซส์ (C20 Comb) สไตล์สตรีท ผลิตจากผ้าคอตตอนคุณภาพดีเยี่ยม',
        features: ['Cotton from USA', 'ผ้าหนา อยู่ทรงสวย', 'ใส่ได้ทั้งชายและหญิง', 'สกรีนพรีเมียม ติดทนทาน'],
        image: 'https://img5.pic.in.th/file/secure-sv1/Artboard-13a166493001a1f5f1.md.png',
        colors: ['#FFFFFF', '#212121']
    }
  ];

  return (
    <>
      <div className="flex flex-col bg-background text-foreground font-body">
        
        <section className="relative w-full">
            {/* Desktop Carousel */}
            <div className="hidden md:block relative group">
                <Carousel
                    setApi={setDesktopApi}
                    opts={{
                        loop: true,
                    }}
                    plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                    className="w-full"
                >
                    <CarouselContent>
                        {desktopCarouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-[21/9] overflow-hidden">
                                    <img
                                        src={image.imageUrl}
                                        alt={image.description}
                                        data-ai-hint={image.imageHint}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-primary/80 text-primary-foreground hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-primary/80 text-primary-foreground hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Carousel>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {Array.from({ length: desktopCount }).map((_, index) => (
                        <button key={index} onClick={() => desktopApi?.scrollTo(index)} className={cn("w-2 h-2 rounded-full transition-all", desktopCurrent === index ? "p-1.5 bg-primary" : "bg-primary/50")} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                </div>
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative group">
                <Carousel
                    setApi={setMobileApi}
                    opts={{
                        loop: true,
                    }}
                    plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                    className="w-full"
                >
                    <CarouselContent>
                        {mobileCarouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={image.imageUrl}
                                        alt={image.description}
                                        data-ai-hint={image.imageHint}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-primary/80 text-primary-foreground hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-primary/80 text-primary-foreground hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Carousel>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                    {Array.from({ length: mobileCount }).map((_, index) => (
                        <button key={index} onClick={() => mobileApi?.scrollTo(index)} className={cn("w-2 h-2 rounded-full transition-all", mobileCurrent === index ? "p-1.5 bg-primary" : "bg-primary/50")} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                </div>
            </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">ง่ายๆ ใน 3 ขั้นตอน</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                       เริ่มต้นสร้างสรรค์เสื้อตัวโปรดของคุณกับเราได้แล้ววันนี้
                    </p>
                </AnimateOnScroll>
                <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">
                    {howItWorksSteps.map((step, index) => (
                        <AnimateOnScroll key={step.title} delay={200 + index * 150} className="flex flex-col items-center text-center p-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                                {renderIcon(step.iconName, { className: "h-10 w-10 text-primary" })}
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>

        <section id="why-saifah" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">ทำไมต้อง <span className="text-primary">SAIFAH</span></h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        เรามุ่งมั่นที่จะมอบประสบการณ์ที่ดีที่สุดในการทำเสื้อที่คุณออกแบบเอง
                    </p>
                </AnimateOnScroll>
                <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
                    {whySaifahFeatures.map((feature, index) => (
                        <AnimateOnScroll key={feature.title} delay={200 + index * 100}>
                            <Card className="bg-card h-full p-6 flex flex-col items-center text-center hover:border-primary/50 hover:shadow-lg hover:-translate-y-1.5 transition-all">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                    {renderIcon(feature.iconName, { className: "h-8 w-8 text-primary" })}
                                </div>
                                <h3 className='font-headline text-xl font-bold'>{feature.title}</h3>
                                <p className="text-muted-foreground text-sm mt-2 flex-1">{feature.description}</p>
                            </Card>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>

        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">เสื้อเปล่าคุณภาพสำหรับงานสกรีน</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                       เลือกประเภทเสื้อที่ใช่สำหรับดีไซน์ของคุณ เราคัดสรรแต่สิ่งที่ดีที่สุดมาให้แล้ว
                    </p>
                </AnimateOnScroll>
                <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
                    {products.map((product, index) => (
                        <AnimateOnScroll key={product.name} delay={200 + index * 150}>
                            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group bg-background">
                                <div className="relative aspect-square overflow-hidden">
                                    <img 
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <CardTitle className="font-headline text-2xl">{product.name}</CardTitle>
                                    <div className='pt-4'>
                                        <h4 className='text-sm font-semibold mb-2'>สีที่มีให้เลือก:</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {product.colors.map(color => (
                                                <div key={color} className='w-6 h-6 rounded-full border' style={{ backgroundColor: color }} title={color}></div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>

        <section id="care-guide" className="w-full py-12 md:py-20 lg:py-28 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">วิธีดูแลเสื้อตัวโปรด</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        เคล็ดลับง่ายๆ เพื่อให้เสื้อที่คุณออกแบบสวยงามและดูดีไปอีกนาน
                    </p>
                </AnimateOnScroll>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Image Column */}
                    <AnimateOnScroll delay={200} className="relative aspect-square w-full max-w-md mx-auto group">
                         {careGuideImage && <img
                            src={careGuideImage.imageUrl}
                            alt={careGuideImage.description}
                            data-ai-hint={careGuideImage.imageHint}
                            className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:drop-shadow-lg"
                         />}
                    </AnimateOnScroll>

                    {/* Instructions Column */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        
                        <AnimateOnScroll delay={300} className="p-6 rounded-lg bg-card border border-transparent hover:border-primary/50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                   <Droplets className="w-6 h-6"/>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-lg">การซัก</h3>
                                    <p className="text-muted-foreground text-sm mt-1">กลับด้านก่อนซัก ไม่ว่าจะซักมือหรือลงเครื่อง (แนะนำให้ใส่ถุงถนอมผ้า)</p>
                                </div>
                            </div>
                        </AnimateOnScroll>

                        <AnimateOnScroll delay={400} className="p-6 rounded-lg bg-card border border-transparent hover:border-primary/50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                   <Sun className="w-6 h-6"/>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-lg">การตาก</h3>
                                    <p className="text-muted-foreground text-sm mt-1">กลับผ้าก่อนตากในที่แดดอ่อนๆ หรือลมโกรก เพื่อถนอมสีและลายสกรีน</p>
                                </div>
                            </div>
                        </AnimateOnScroll>

                        <AnimateOnScroll delay={500} className="p-6 rounded-lg bg-card border border-transparent hover:border-primary/50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                   <Blend className="w-6 h-6"/>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-lg">การรีด</h3>
                                    <p className="text-muted-foreground text-sm mt-1">ใช้ไฟอ่อน-ปานกลาง และควรกลับด้านในรีด หรือใช้ผ้าบางๆ รองก่อนรีดทับลาย</p>
                                </div>
                            </div>
                        </AnimateOnScroll>

                        <AnimateOnScroll delay={600} className="p-6 rounded-lg bg-card border border-destructive/20 hover:border-destructive/50 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                                   <AlertTriangle className="w-6 h-6"/>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-lg text-destructive">ข้อควรระวัง</h3>
                                    <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                                        <li className="flex items-center gap-2"><XCircle className="w-4 h-4 shrink-0"/><span>ห้ามใช้น้ำยาฟอกขาว</span></li>
                                        <li className="flex items-center gap-2"><XCircle className="w-4 h-4 shrink-0"/><span>ห้ามใช้แปรงขัดลาย</span></li>
                                    </ul>
                                </div>
                            </div>
                        </AnimateOnScroll>
                        
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">Testimonials</div>
                    <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">เสียงตอบรับจากลูกค้าของเรา</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                       ความไว้วางใจและความพึงพอใจของลูกค้าคือสิ่งที่สำคัญที่สุดสำหรับเรา
                    </p>
                </AnimateOnScroll>
            </div>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_2rem,white_calc(100%-2rem),transparent)]">
                <div className="flex w-max animate-scroll-left space-x-8 py-4">
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <Card key={`${testimonial.name}-${index}`} className="w-[380px] shrink-0">
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <blockquote className="text-muted-foreground flex-1">"{testimonial.quote}"</blockquote>
                                <p className="font-semibold mt-4 pt-4 border-t">- {testimonial.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        <section id="decision-helper" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                <AnimateOnScroll delay={100} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">โปรแกรมช่วยตัดสินใจ</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        ประเมินราคาและขนาดเสื้อได้ง่ายๆ ด้วยเครื่องมือของเรา
                    </p>
                </AnimateOnScroll>
                <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-2 lg:items-start">
                    <AnimateOnScroll delay={200}><PriceCalculator /></AnimateOnScroll>
                    <AnimateOnScroll delay={300}><SizeChart /></AnimateOnScroll>
                </div>
            </div>
        </section>
        
      </div>
    </>
  );
}
