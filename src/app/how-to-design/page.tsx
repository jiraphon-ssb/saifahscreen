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
  MessageSquare,
  Check,
  X,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimateOnScroll from "@/components/animate-on-scroll";

export default function HowToDesignPage() {
  const steps = [
    {
      icon: <Shirt className="h-6 w-6" />,
      title: "เลือกสินค้าและสีเสื้อ",
      description:
        "เริ่มต้นด้วยการคลิกที่แถบ 'เสื้อผ้า' เพื่อเลือกทรงเสื้อ (Premium/Oversize) และสีตั้งต้นสำหรับเป็นผ้าใบของคุณ",
    },
    {
      icon: <MousePointerClick className="h-6 w-6" />,
      title: "เพิ่มกราฟิกหรือข้อความ",
      description:
        "กด 'เพิ่มข้อความ' เพื่อพิมพ์สโลแกนเท่ๆ หรือ 'อัปโหลดรูปภาพ' เพื่อใช้โลโก้/อาร์ตเวิร์คของคุณเอง",
    },
    {
      icon: <SlidersHorizontal className="h-6 w-6" />,
      title: "ปรับแต่งและจัดวาง",
      description:
        "คลิกที่ชิ้นงานบนเสื้อเพื่อย่อ-ขยาย, หมุน, หรือเปลี่ยนฟอนต์/สี ให้ได้ตำแหน่งและหน้าตาตามใจชอบ",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "จัดการเลเยอร์",
      description:
        "หากมีหลายชิ้นงานทับซ้อนกัน ใช้ไอคอน 'เลเยอร์' เพื่อเลื่อนให้อยู่ด้านหน้าหรือด้านหลังได้อย่างอิสระ",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "ส่งแบบสั่งผลิต",
      description:
        "เมื่อพอใจ ให้กดที่ปุ่มตะกร้าเพื่อระบุจำนวนและไซส์ จากนั้นระบบจะพร้อมให้คุณส่งข้อมูลเข้า LINE ทันที",
    },
  ];

  const dosAndDonts = [
    {
      type: "do",
      title: "ใช้ไฟล์ PNG พื้นหลังโปร่งใส",
      description: "ไฟล์ PNG แบบพื้นใสจะทำให้ลายสกรีนเนียนไปกับเสื้อ ไม่ทิ้งขอบสีเหลี่ยมเอาไว้",
    },
    {
      type: "dont",
      title: "หลีกเลี่ยงภาพเบลอหรือแตก",
      description: "ควรใช้รูปที่มีความละเอียดสูง (300 DPI) หรือไฟล์ชัดๆ เพื่อให้งานสกรีนออกมาคมกริบ",
    },
    {
      type: "do",
      title: "เช็คสีให้ชัดเจน ตัดกับเสื้อ",
      description: "เสื้อสีเข้ม ควรใช้ข้อความสว่าง เสื้อสว่าง ควรใช้กราฟิกสีเข้ม เพื่อให้อ่านง่าย",
    },
    {
      type: "dont",
      title: "อย่าใส่รายละเอียดเล็กยิบเกินไป",
      description: "เส้นที่บางเกินไป หรือจุดเล็กๆ อาจจะมองเห็นได้ไม่ชัดเมื่อพ่นหมึกลงบนเนื้อผ้าจริงๆ",
    },
  ];

  const faqs = [
    {
      q: "อัปโหลดไฟล์ประเภทใดได้บ้าง?",
      a: "ระบบรองรับไฟล์รูปภาพ เช่น .PNG และ .JPG ธรรมดา แนะนำให้ใช้ .PNG ที่ลบพื้นหลังแล้วเพื่อให้งานออกมาเนียนสวยที่สุดครับ"
    },
    {
      q: "สั่งสกรีนด่วนได้เร็วที่สุดกี่วัน?",
      a: "ขึ้นอยู่กับจำนวน สำหรับการสั่งสกรีนด่วนในจำนวนไม่เยอะ สามารถจัดทำเสร็จได้เร็วสุดภายใน 24-48 ชั่วโมง (โปรดสอบถามคิวงานผ่าน LINE อีกครั้ง)"
    },
    {
      q: "ถ้าออกแบบไม่เก่ง มีคนช่วยไหม?",
      a: "สามารถสั่งผลิตและให้ทีมกราฟิกของเราช่วยปรับแต่งเพิ่มเติม เช่น ไดคัทพื้นหลังรูปออก หรือจัดวางตำแหน่งให้ลงตัวยิ่งขึ้นได้ฟรีครับ"
    }
  ];

  const inspiration = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "เสื้อทีม/เสื้อบริษัท",
      description: "โลโก้องค์กรอกซ้ายเล็กๆ + สโลแกนหรือชื่อแผนกไว้ด้านหลัง",
      badge: "Professional",
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: "เสื้อแบรนด์/ร้านค้า",
      description: "อาร์ตเวิร์คเอกลักษณ์กลางเสื้อ พร้อมฟอนต์ชื่อร้านเก๋ๆ",
      badge: "Creative",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "เสื้อครอบครัว/แก๊งเพื่อน",
      description: "ข้อความกวนๆ กลางข้ออก เข้าคู่กันสำหรับถ่ายรูป",
      badge: "Memorable",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03),transparent_80%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[60vh] h-[60vh] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center text-center px-4 pt-32 pb-20 overflow-hidden z-10 border-b border-border/50">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimateOnScroll
            delay={100}
            className="inline-flex justify-center mb-2"
          >
            <Badge
              variant="outline"
              className="text-primary border-primary/20 bg-primary/5 text-xs py-1.5 px-4 rounded-full uppercase tracking-[0.2em] font-semibold backdrop-blur-md"
            >
              DESIGN GUIDE
            </Badge>
          </AnimateOnScroll>
          <AnimateOnScroll
            as="h1"
            delay={200}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter font-headline text-foreground leading-[1.1]"
          >
            คู่มือเปลี่ยนไอเดียให้เป็น<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">เสื้อแห่งจินตนาการ</span>
          </AnimateOnScroll>
          <AnimateOnScroll
            as="p"
            delay={300}
            className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto"
          >
            เรียนรู้วิธีใช้งานระบบออกแบบออนไลน์ที่ง่ายที่สุดจาก SAIFAH 
            แล้วคุณจะสร้างสรรค์ลวดลายเสื้อได้ภายใน 5 นาที
          </AnimateOnScroll>
        </div>
      </section>

      {/* Steps Section : Vertical Timeline */}
      <section className="py-20 md:py-32 relative z-10 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll
            delay={100}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2 shadow-sm">
              Step by Step
            </div>
            <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              เริ่มต้นง่ายๆ ใน 5 ขั้นตอน
            </h2>
          </AnimateOnScroll>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border md:-translate-x-1/2 hidden sm:block" />
            
            <div className="space-y-12 md:space-y-24">
              {steps.map((step, index) => (
                <AnimateOnScroll key={index} delay={150} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Node */}
                  <div className="hidden sm:flex absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary/20 text-primary items-center justify-center z-10 shadow-lg group-hover:border-primary transition-all">
                    <span className="font-bold text-sm">{index + 1}</span>
                  </div>

                  {/* Card Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                    <Card className="bg-white/90 backdrop-blur border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 rounded-3xl overflow-hidden">
                      <CardContent className="p-6 md:p-8 flex flex-col gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-headline mb-2 text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dos & Don'ts Section */}
      <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_70%)]" />
        <div className="container px-4 md:px-6 relative z-10">
          <AnimateOnScroll
            delay={100}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-5xl text-white">
              ข้อควรระวังในการออกแบบ
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg">
              เพื่อให้ได้ภาพพิมพ์สกรีนที่สวย คมกริบ และสมบูรณ์แบบที่สุดเหมือนจอภาพ
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {dosAndDonts.map((item, i) => (
              <AnimateOnScroll key={i} delay={200 + i * 100}>
                <div className={`p-6 rounded-3xl border flex gap-4 h-full transition-transform hover:-translate-y-1 ${
                  item.type === "do" 
                    ? "bg-green-950/20 border-green-900/30 text-green-50" 
                    : "bg-red-950/20 border-red-900/30 text-red-50"
                }`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    item.type === "do" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {item.type === "do" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className={`text-sm leading-relaxed ${item.type === "do" ? "text-green-200/70" : "text-red-200/70"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll
            delay={100}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              ไอเดียเริ่มต้นสกรีน
            </h2>
          </AnimateOnScroll>
          <div className="mx-auto grid gap-6 md:grid-cols-3 max-w-5xl">
            {inspiration.map((item, index) => (
              <AnimateOnScroll
                key={item.title}
                delay={200 + index * 100}
                className="relative group flex flex-col items-center text-center p-8 rounded-[2rem] border border-border/50 bg-secondary/10 transition-all hover:bg-secondary/30 hover:shadow-xl hover:-translate-y-2"
              >
                <Badge variant="outline" className="mb-4 text-[10px] font-bold text-primary border-primary/20 bg-background uppercase">
                  {item.badge}
                </Badge>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-primary mb-4 transition-all group-hover:scale-110 group-hover:rotate-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-headline text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-secondary/30 border-t border-border/50">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll delay={100} className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-foreground">
              คำถามเกี่ยวกับการออกแบบ
            </h2>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} delay={150 + i * 50}>
                <Card className="rounded-2xl border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex gap-3 items-start font-bold">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {faq.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pl-[3.25rem] text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-t from-primary/10 to-transparent relative border-t border-border/30">
        <AnimateOnScroll delay={100} className="container text-center relative z-10 max-w-2xl">
          <h2 className="text-4xl font-headline font-bold tracking-tight mb-4 text-foreground">
            ถึงตาคุณโชว์ฝีมือ!
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            เครื่องมือพร้อม เสื้อพร้อม ขาดแค่จิตวิญญาณศิลปินของคุณ
          </p>
          <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all group">
            <Link href="/design" className="flex items-center gap-2">
              เริ่มออกแบบเลย
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
