"use client";

import { Mail, Phone, Clock, MapPin, ArrowRight, Smartphone, Facebook } from "lucide-react";
import LineIcon from "@/components/icons/line-icon";
import TiktokIcon from "@/components/icons/tiktok-icon";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import AnimateOnScroll from "@/components/animate-on-scroll";

export default function ContactPage() {
  const socialLinks = [
    {
      name: "LINE Official",
      description: "สั่งทำเสื้อ / สอบถามราคา",
      icon: LineIcon,
      href: "https://lin.ee/gxqYXSY",
      color: "text-[#00B900]",
      bg: "bg-[#00B900]/10",
      border: "border-[#00B900]/20",
      hover: "hover:bg-[#00B900] hover:text-white border-[#00B900]",
      buttonText: "เพิ่มเพื่อน LINE",
    },
    {
      name: "Facebook",
      description: "ติดตามผลงาน / รีวิวลูกค้า",
      icon: Facebook,
      href: "https://www.facebook.com/saifahscreen",
      color: "text-[#0866FF]",
      bg: "bg-[#0866FF]/10",
      border: "border-[#0866FF]/20",
      hover: "hover:bg-[#0866FF] hover:text-white border-[#0866FF]",
      buttonText: "ไปที่เพจ Facebook",
    },
    {
      name: "TikTok",
      description: "ดูหน้างานจริงและเบื้องหลัง",
      icon: TiktokIcon,
      href: "https://www.tiktok.com/@saifahscreen",
      color: "text-zinc-900 dark:text-zinc-100",
      bg: "bg-zinc-100 dark:bg-zinc-800",
      border: "border-zinc-200 dark:border-zinc-700",
      hover: "hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black border-zinc-900 dark:border-white",
      buttonText: "รับชม TikTok",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-background via-secondary/20 to-background min-h-screen relative overflow-hidden pb-32">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-6xl">
        {/* Header Section */}
        <AnimateOnScroll delay={100} className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6">
            Contact Us
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tight drop-shadow-sm mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">
              ติดต่อสอบถาม
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
            ทีมงาน SAIFAH SCREEN พร้อมให้คำปรึกษาและบริการ<br className="hidden md:block"/>
            สนใจผลิตเสื้อ สกรีน ปัก ติดต่อได้เลยตามช่องทางด้านล่างครับ
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Direct Contacts (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <AnimateOnScroll delay={200}>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Smartphone className="h-6 w-6" />
                </div>
                ช่องทางติดต่อโดยตรง
              </h2>
            </AnimateOnScroll>

            {/* Phone */}
            <AnimateOnScroll delay={300}>
              <Card className="p-6 md:p-8 border-border/50 bg-card/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all group overflow-hidden relative rounded-3xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/20" />
                <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                    <Phone className="h-8 w-8" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-foreground mb-1">โทรศัพท์สายด่วน</h3>
                    <p className="text-muted-foreground font-medium mb-6">ติดต่อฝ่ายขาย ประเมินราคา และปรึกษางานผลิต</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <a href="tel:0939742624" className="flex flex-col gap-1 p-4 rounded-2xl bg-secondary/30 hover:bg-primary/10 transition-colors border border-border/50 hover:border-primary/30 group/btn">
                        <div className="text-sm font-semibold text-muted-foreground group-hover/btn:text-primary transition-colors">ติดต่อ คุณส้ม</div>
                        <div className="font-mono text-2xl font-black text-foreground">093-974-2624</div>
                      </a>
                      <a href="tel:0939746424" className="flex flex-col gap-1 p-4 rounded-2xl bg-secondary/30 hover:bg-primary/10 transition-colors border border-border/50 hover:border-primary/30 group/btn">
                        <div className="text-sm font-semibold text-muted-foreground group-hover/btn:text-primary transition-colors">ติดต่อ คุณพิม</div>
                        <div className="font-mono text-2xl font-black text-foreground">093-974-6424</div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>

             {/* Email */}
             <AnimateOnScroll delay={400}>
              <Card className="p-6 md:p-8 border-border/50 bg-card/80 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all group overflow-hidden relative rounded-3xl">
                <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                    <Mail className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">อีเมล</h3>
                    <p className="text-muted-foreground font-medium mb-4">สำหรับการส่งไฟล์งาน ใบเสนอราคา และเอกสาร</p>
                    <a href="mailto:juntakarn.mkt@gmail.com" className="inline-flex items-center justify-center gap-2 font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-6 py-3 rounded-xl transition-colors w-full sm:w-auto text-lg">
                      juntakarn.mkt@gmail.com
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
            
            {/* Business Hours */}
            <AnimateOnScroll delay={500}>
              <Card className="p-6 md:p-8 border-border/50 bg-card/80 backdrop-blur-xl shadow-lg relative rounded-3xl">
                 <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">เวลาทำการ</h3>
                    <p className="text-muted-foreground font-medium text-lg">เปิดให้บริการทุกวัน <span className="font-bold text-foreground mx-1">08.30 - 21.30 น.</span></p>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>

          </div>

          {/* Right Column: Social & Online (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <AnimateOnScroll delay={300}>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                ติดตาม / ออนไลน์
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 gap-4">
              {socialLinks.map((social, idx) => (
                <AnimateOnScroll key={social.name} delay={400 + (idx * 100)}>
                  <Link href={social.href} target="_blank" rel="noopener noreferrer" className="block outline-none">
                    <Card className={`p-5 md:p-6 border-2 ${social.border} bg-card/60 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center sm:items-start sm:flex-row justify-between gap-5 group cursor-pointer rounded-3xl`}>
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full">
                        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${social.bg} ${social.color} group-hover:scale-110 transition-transform duration-500`}>
                          <social.icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-1 ${social.color}`}>{social.name}</h3>
                          <p className="text-sm font-medium text-muted-foreground mb-4 sm:mb-0">{social.description}</p>
                        </div>
                        <div className={`shrink-0 w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${social.bg} ${social.color} border-2 ${social.hover} flex items-center justify-center gap-1.5`}>
                          {social.buttonText}
                          <ArrowRight className="h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
            
            {/* Notice / Pro Tip */}
            <AnimateOnScroll delay={700}>
              <div className="mt-8 p-6 md:p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200/50 dark:border-amber-900/50 flex flex-col sm:flex-row gap-5 items-start shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-2xl shadow-sm">
                  💡
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-2">แนะนำช่องทางที่ดีที่สุด</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-400/80 font-medium leading-relaxed">
                    สำหรับการพูดคุยรายละเอียดงาน ส่งพิกัด หรือส่งไฟล์รูปภาพ แนะนำให้ติดต่อผ่านช่องทาง <strong>LINE Official</strong> จะสะดวกและได้รับการตอบกลับที่รวดเร็วที่สุดครับ
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </div>
  );
}
