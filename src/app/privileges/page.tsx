import {
  BadgeCheck,
  Box,
  DollarSign,
  Gift,
  Layers3,
  Pencil,
  ReceiptText,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";
import AnimateOnScroll from "@/components/animate-on-scroll";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivilegesPage() {
  const privileges = [
    {
      icon: <ReceiptText className="h-8 w-8" />,
      title: "ราคารวม VAT แล้ว",
      description: "ไม่มีบวกเพิ่ม โปร่งใสทุกขั้นตอน",
      tag: "VAT",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "ทุกไซส์ราคาเดียว",
      description: "ไม่ต้องกังวลเรื่องไซส์ใหญ่ราคาแพง",
      tag: "INCLUDED",
    },
    {
      icon: <Pencil className="h-8 w-8" />,
      title: "ค่าปรับแบบ",
      description: "ปรับแก้ดีไซน์ได้ไม่จำกัดจนกว่าจะพอใจ",
      tag: "FREE",
    },
    {
      icon: <Box className="h-8 w-8" />,
      title: "กราฟิค 3D Mockup",
      description: "เพื่อใช้เสนอทีมหรือเจ้านายของคุณ",
      tag: "FREE",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "จัดส่งทั่วประเทศ",
      description: "ส่งตรงถึงหน้าบ้านคุณ ไม่ว่าอยู่ไหน",
      tag: "FREE",
    },
    {
      icon: <Layers3 className="h-8 w-8" />,
      title: "ส่งตัวอย่างชิ้นผ้า",
      description: "สัมผัสคุณภาพเนื้อผ้าจริงก่อนตัดสินใจ",
      tag: "FREE",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "กระเป๋าผ้า หรือ เสื้อยืด",
      description: "ของแถมสุดพิเศษจาก SAIFAH 1 ชิ้น",
      tag: "LIMITED",
    },
  ];

  const guarantees = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "รับประกัน 7 วัน",
      description: "เคลมฟรีทันที หากสินค้ามีตำหนิ ชำรุด หรือเสียหายจากการผลิต",
    },
    {
      icon: <BadgeCheck className="h-12 w-12 text-primary" />,
      title: "รับประกันราคาเดิม 30 วัน",
      description:
        "สั่งซ้ำ Lot 2 ภายใน 30 วันหลังได้รับสินค้า รับราคาเดิมไปเลย",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-background via-secondary/10 to-background min-h-screen relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-24 relative z-10">
        {/* Privileges Section */}
        <section>
          <AnimateOnScroll delay={100} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              สิทธิประโยชน์
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold font-headline tracking-tight drop-shadow-sm mb-4">
              สิทธิพิเศษ &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                ของแถม
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              สั่งทำเสื้อกับ SAIFAH วันนี้ รับความคุ้มค่าที่เหนือกว่าใคร
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150} className="mb-12 max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-amber-500/10 p-6 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-primary font-headline">
                รวมสิทธิพิเศษและของแถม มูลค่ามากกว่า 2,000 บาท
              </h3>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {privileges.map((item, index) => {
              let tagColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
              if (item.tag === "LIMITED")
                tagColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
              if (item.tag === "VAT" || item.tag === "INCLUDED")
                tagColor = "bg-green-500/10 text-green-500 border-green-500/20";
              if (item.tag === "FREE")
                tagColor = "bg-primary/10 text-primary border-primary/20";

              return (
                <AnimateOnScroll
                  key={index}
                  delay={200 + index * 100}
                  className="group relative rounded-[24px] border border-border/60 bg-card/40 backdrop-blur-md p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:bg-card/80"
                >
                  <div
                    className={
                      "absolute top-4 right-4 px-3 py-1 text-xs font-semibold tracking-wider rounded-full border shadow-sm " +
                      tagColor
                    }
                  >
                    {item.tag}
                  </div>
                  <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold font-headline text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {item.description}
                  </p>
                </AnimateOnScroll>
              );
            })}
          </div>

          <AnimateOnScroll delay={500} className="mt-16 text-center">
            <Link href="/design">
              <Button
                size="lg"
                className="px-10 h-16 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 group border-2 border-primary"
              >
                เริ่มออกแบบเลย
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </AnimateOnScroll>
        </section>

        {/* Guarantee Section */}
        <section>
          <AnimateOnScroll delay={100} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              ความมั่นใจ
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold font-headline tracking-tight drop-shadow-sm mb-4">
              การันตี
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">
                ความพึงพอใจ
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl font-medium text-muted-foreground max-w-2xl mx-auto">
              เราใส่ใจในคุณภาพและบริการ เพื่อให้คุณมั่นใจในทุกคำสั่งซื้อ
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {guarantees.map((item, index) => (
              <AnimateOnScroll
                key={index}
                delay={200 + index * 150}
                className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card/60 backdrop-blur-md p-10 text-center transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {item.icon}
                    <div className="absolute inset-0 -z-10 bg-primary/20 blur-xl"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold font-headline text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
