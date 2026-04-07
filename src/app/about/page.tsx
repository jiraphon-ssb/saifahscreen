import {
  Award,
  Infinity,
  Palette,
  Shirt,
  Smile,
  Laptop,
  Truck,
  Zap,
  CheckCircle2,
  Settings,
  Scissors
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimateOnScroll from "@/components/animate-on-scroll";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const differences = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "บริการสกรีนด่วนทันใจ",
      description:
        "ตอบโจทย์ทุกความเร่งด่วน ด้วยกระบวนการผลิตที่มีประสิทธิภาพ พร้อมส่งมอบงานคุณภาพในเวลาที่กำหนด",
    },
    {
      icon: <Shirt className="h-8 w-8" />,
      title: "วัตถุดิบพรีเมียม",
      description:
        "เราเลือกใช้เฉพาะผ้าคอตตอนและเกรดพรีเมียม ทรงสวย ใส่สบาย เพื่อให้ผลงานของคุณดูดีที่สุด",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "สีสด คมชัด ทนทาน",
      description: "เทคโนโลยีการพิมพ์ DTF และสกรีนบล็อกที่ให้สีสด คมชัด และทนทานต่อการซัก",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "จัดส่งรวดเร็วทั่วไทย",
      description:
        "ระบบการผลิตและจัดส่งที่รวดเร็ว เชื่อถือได้ ส่งตรงถึงหน้าบ้านคุณทุกจังหวัด",
    },
    {
      icon: <Infinity className="h-8 w-8" />,
      title: "ตอบโจทย์ทุกขนาด",
      description:
        "สั่งทำเสื้อได้แม้ตัวเดียว หรือสั่งผลิตจำนวนมากสำหรับองค์กร เราก็พร้อมให้เรทราคาพิเศษ",
    },
    {
      icon: <Smile className="h-8 w-8" />,
      title: "ผู้เชี่ยวชาญดูแล",
      description: "ทีมงานคอยให้คำแนะนำตั้งแต่การเลือกผ้า ไซส์ ไปจนถึงเทคนิคงานสกรีนที่เหมาะสม",
    },
  ];

  const commitments = [
    {
      icon: <Award className="h-10 w-10" />,
      title: "คุณภาพเหนือระดับ",
      description:
        "ตั้งแต่เส้นใยผ้าไปจนถึงหมึกพิมพ์ที่เราคัดสรร ทุกองค์ประกอบผ่านการตรวจสอบ (QC) มาตฐานสูงสุด",
    },
    {
      icon: <Laptop className="h-10 w-10" />,
      title: "ระบบออกแบบออนไลน์",
      description:
        "เรามีเครื่องมือออกแบบพร้อมพรีวิว 3D เพื่อให้คุณเห็นภาพจริงก่อนตัดสินใจสั่งผลิต ง่ายและสะดวก",
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "ส่งมอบตรงเวลา",
      description:
        "บริการสายฟ้าแลบ สมชื่อ SAIFAH ประสบการณ์ราบรื่นตั้งแต่การออกแบบไปจนถึงการได้รับสินค้า",
    },
  ];

  const processes = [
    {
      step: "01",
      icon: <Scissors className="h-6 w-6" />,
      title: "คัดเลือกและเตรียมผ้า",
      description: "เลือกทรงเสื้อและเนื้อผ้าที่เหมาะสมที่สุด (Premium หรือ Oversize) ตรวจสอบความเรียบร้อยก่อนเข้าสู่กระบวนการพิมพ์",
    },
    {
      step: "02",
      icon: <Settings className="h-6 w-6" />,
      title: "เตรียมไฟล์และสั่งพิมพ์",
      description: "ทีมกราฟิกตรวจสอบไฟล์งาน ปรับแต่งสีและความคมชัด ก่อนส่งพิมพ์ด้วยเครื่องจักรมาตรฐานสากล",
    },
    {
      step: "03",
      icon: <Palette className="h-6 w-6" />,
      title: "กระบวนการสกรีน/รีดร้อน",
      description: "ลงสี เทคนิคซิลค์สกรีน ปาดสี หรือเครื่องอบความร้อนสูงสำหรับ DTF เพื่อให้งานพิมพ์ติดแน่น ทนนาน",
    },
    {
      step: "04",
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "ตรวจสอบคุณภาพ (QC)",
      description: "ตรวจสอบความเรียบร้อยของสี จุดสกรีน และตะเข็บของเสื้อทุกตัว ก่อนดำเนินการพับบรรจุลงแพ็กเกจ",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 mask-image-b" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }} />

      {/* Hero Section (No Image, Typography Focused) */}
      <section className="relative w-full min-h-[65vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-primary/30 via-sky-400/20 to-transparent blur-[100px] opacity-60 rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-20">
          <AnimateOnScroll
            as="div"
            delay={100}
            className="inline-flex flex-col items-center gap-4"
          >
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-widest backdrop-blur-md">
              SAIFAH SCREEN
            </Badge>
          </AnimateOnScroll>
          
          <AnimateOnScroll
            as="h1"
            delay={200}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-headline text-foreground drop-shadow-sm leading-[1.1]"
          >
            โรงสกรีนเสื้อ<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400 inline-block px-2">ด่วนระดับพรีเมียม</span>
          </AnimateOnScroll>
          
          <AnimateOnScroll
            as="p"
            delay={300}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed"
          >
            ยกระดับงานบริการสกรีนเสื้อที่รวดเร็วดั่งสายฟ้า ใส่ใจทุกรายละเอียด ตอบโจทย์ยอดผลิตตั้งแต่ 1 ตัวไปจนถึงมหาชน
          </AnimateOnScroll>
          
          <AnimateOnScroll delay={400} className="pt-6 flex items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all h-14">
              <Link href="/design">เริ่มสร้างสรรค์ผลงาน</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base hover:-translate-y-1 transition-all h-14">
              <Link href="/portfolio">ดูผลงานของเรา</Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-20 md:py-32 relative z-10 bg-secondary/30 mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)] border-t border-border/50">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll
            delay={100}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-sm">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">
                มาตรฐาน
              </span>
              สายฟ้า
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl font-medium">
              SAIFAH ไม่ใช่แค่ชื่อ แต่คือมาตรฐานที่เรายึดมั่นเพื่อมอบจุดที่ดีที่สุดให้แก่คุณ
            </p>
          </AnimateOnScroll>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {commitments.map((item, index) => (
              <AnimateOnScroll
                key={item.title}
                delay={200 + index * 150}
                className="grid gap-4 text-center group"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl shadow-primary/5 text-primary border border-border/50 group-hover:border-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-headline text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center divide-x divide-white/10">
            {[
              { number: "5,000+", label: "ลูกค้าที่ไว้วางใจ" },
              { number: "50,000+", label: "เสื้อที่จัดส่งแล้ว" },
              { number: "5+", label: "ปีแห่งประสบการณ์" },
              { number: "99%", label: "พึงพอใจในคุณภาพ" },
            ].map((stat, index) => (
              <AnimateOnScroll
                key={stat.label}
                delay={100 + index * 100}
                className="flex flex-col items-center justify-center p-4 border-l-0 first:border-l-0"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-2">
                  {stat.number}
                </span>
                <span className="text-zinc-400 text-sm md:text-base font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process (NEW) */}
      <section className="py-20 md:py-32 bg-background relative z-10 border-b border-border/50">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <AnimateOnScroll delay={100} className="space-y-6">
              <Badge variant="outline" className="px-3 py-1 rounded-full text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs font-bold">
                Behind the scenes
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-headline font-bold tracking-tight text-foreground">
                กระบวนการผลิต<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">ระดับพรีเมียม</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                เบื้องหลังงานสกรีนด่วนที่เน้นคุณภาพ เรามีขั้นตอนที่เป็นระบบ ชัดเจน 
                และตรวจสอบคุณภาพในทุกจุด เพื่อให้มั่นใจว่าเสื้อผ้าทุกชิ้นที่คุณได้รับ 
                คือผลงานชิ้นเอกที่สมบูรณ์แบบ
              </p>
              <Button asChild size="lg" className="rounded-full px-8 mt-4 shadow-md bg-secondary text-secondary-foreground hover:bg-secondary/80">
                <Link href="/contact">ติดต่อสอบถามข้อมูล</Link>
              </Button>
            </AnimateOnScroll>

            <div className="space-y-6">
              {processes.map((process, index) => (
                <AnimateOnScroll key={process.step} delay={200 + index * 100} className="relative group">
                  {index !== processes.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-[-1.5rem] w-px bg-border group-hover:bg-primary/50 transition-colors" />
                  )}
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {process.step}
                    </div>
                    <Card className="flex-1 bg-white border-border/50 shadow-sm hover:shadow-md transition-all group-hover:border-primary/30">
                      <CardContent className="p-5 flex gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-xl h-fit">
                          {process.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-foreground mb-1">{process.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {process.description}
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

      {/* The SAIFAH Difference Section */}
      <section className="py-20 md:py-32 bg-secondary/10">
        <div className="container px-4 md:px-6">
          <AnimateOnScroll
            delay={100}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              สิ่งที่ทำให้เราแตกต่าง
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
              ทำไมต้องเลือกให้เราเป็นผู้ช่วยสร้างสรรค์ผลงานชิ้นเอกจากไอเดียของคุณ
            </p>
          </AnimateOnScroll>
          <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
            {differences.map((item, index) => (
              <AnimateOnScroll key={item.title} delay={200 + index * 100}>
                <Card className="bg-white/80 backdrop-blur-xl border-border/50 hover:border-primary/50 hover:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-3xl h-full">
                  <CardHeader className="flex flex-col gap-4 pb-4 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 text-primary shadow-sm">
                      {item.icon}
                    </div>
                    <CardTitle className="font-headline text-xl font-bold leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-[15px] tracking-wide leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
