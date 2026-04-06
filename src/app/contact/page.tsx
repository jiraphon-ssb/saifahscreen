'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Facebook, Clock } from 'lucide-react';
import LineIcon from '@/components/icons/line-icon';
import TiktokIcon from '@/components/icons/tiktok-icon';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from '@/components/ui/card';
import AnimateOnScroll from '@/components/animate-on-scroll';

// Main component
export default function ContactPage() {
  const { toast } = useToast();

  const FormSchema = z.object({
    firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
    lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
    phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง').max(10, 'เบอร์โทรศัพท์ไม่ถูกต้อง'),
    quantity: z.string().min(1, 'กรุณาระบุจำนวนโดยประมาณ'),
    email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      quantity: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "ส่งข้อความสำเร็จ!",
      description: "เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด",
    });
    form.reset();
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/saifahscreen" },
    { name: "LINE", icon: LineIcon, href: "https://lin.ee/gxqYXSY" },
    { name: "TikTok", icon: TiktokIcon, href: "https://www.tiktok.com/@saifahscreen" },
  ];

  return (
    <div className="bg-gradient-to-b from-background via-secondary/10 to-background min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-24 relative z-10">
        
        {/* System 1: Contact Hub */}
        <section>
            <AnimateOnScroll delay={100} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                    ติดต่อเรา
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight drop-shadow-sm mb-4"><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Get in Touch</span></h1>
                <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                    เราพร้อมให้ความช่วยเหลือเสมอ ไม่ว่าจะเป็นคำถามทั่วไปหรือการเริ่มต้นโปรเจกต์ใหม่
                </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
                <Tabs defaultValue="message" className="w-full max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="message">ส่งข้อความ</TabsTrigger>
                        <TabsTrigger value="info">ข้อมูลติดต่อ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="message">
                        <Card className='border-t-0 rounded-t-none bg-card/60 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden'>
                            <CardContent className="p-8 md:p-12 relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>ชื่อ *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>นามสกุล *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>เบอร์โทรศัพท์ *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={form.control} name="quantity" render={({ field }) => (<FormItem><FormLabel>จำนวนโดยประมาณ *</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>อีเมล *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>ข้อความ</FormLabel><FormControl><Textarea placeholder="ข้อความของคุณ" className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <Button type="submit" size="lg" className="w-full">ส่งข้อความ</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="info">
                        <Card className='border-t-0 rounded-t-none bg-card/60 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden'>
                            <CardContent className="p-8 md:p-12 space-y-12 relative">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative z-10">
                                    <div className="flex flex-col items-center md:items-start gap-2">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2"><Phone className="h-6 w-6"/></div>
                                        <h4 className="font-bold text-foreground">โทรศัพท์</h4>
                                        <p className="text-muted-foreground">093-974-2624 (ส้ม)</p>
                                        <p className="text-muted-foreground">093-974-6424 (พิม)</p>
                                    </div>
                                    <div className="flex flex-col items-center md:items-start gap-2">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2"><Mail className="h-6 w-6"/></div>
                                        <h4 className="font-bold text-foreground">อีเมล</h4>
                                        <p className="text-muted-foreground">juntakarn.mkt@gmail.com</p>
                                    </div>
                                    <div className="flex flex-col items-center md:items-start gap-2">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2"><Clock className="h-6 w-6"/></div>
                                        <h4 className="font-bold text-foreground">เวลาทำการ</h4>
                                        <p className="text-muted-foreground">ทุกวันเวลา 8.30 - 21.30 น.</p>
                                    </div>
                                </div>
                                <div className="pt-8 border-t text-center">
                                    <h4 className="font-bold text-foreground mb-4">ติดตามเราบน Social Media</h4>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {socialLinks.map((link) => (
                                            <Button key={link.name} asChild variant="outline" size="icon" className="w-12 h-12 rounded-full transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:scale-110">
                                                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                                                    <link.icon className="h-5 w-5"/>
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </AnimateOnScroll>
        </section>
      </div>
    </div>
  );
}
