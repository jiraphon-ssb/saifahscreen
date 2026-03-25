import { BadgeCheck, Box, DollarSign, Gift, Layers3, Pencil, ReceiptText, ShieldCheck, Truck } from 'lucide-react';
import AnimateOnScroll from '@/components/animate-on-scroll';

export default function PrivilegesPage() {
    const privileges = [
        { icon: <ReceiptText className="h-8 w-8" />, title: "ราคารวม VAT แล้ว", description: "ไม่มีบวกเพิ่ม โปร่งใสทุกขั้นตอน", tag: "VAT" },
        { icon: <DollarSign className="h-8 w-8" />, title: "ทุกไซส์ราคาเดียว", description: "ไม่ต้องกังวลเรื่องไซส์ใหญ่ราคาแพง", tag: "INCLUDED" },
        { icon: <Pencil className="h-8 w-8" />, title: "ค่าปรับแบบ", description: "ปรับแก้ดีไซน์ได้ไม่จำกัดจนกว่าจะพอใจ", tag: "FREE" },
        { icon: <Box className="h-8 w-8" />, title: "กราฟิค 3D Mockup", description: "เพื่อใช้เสนอทีมหรือเจ้านายของคุณ", tag: "FREE" },
        { icon: <Truck className="h-8 w-8" />, title: "จัดส่งทั่วประเทศ", description: "ส่งตรงถึงหน้าบ้านคุณ ไม่ว่าอยู่ไหน", tag: "FREE" },
        { icon: <Layers3 className="h-8 w-8" />, title: "ส่งตัวอย่างชิ้นผ้า", description: "สัมผัสคุณภาพเนื้อผ้าจริงก่อนตัดสินใจ", tag: "FREE" },
        { icon: <Gift className="h-8 w-8" />, title: "กระเป๋าผ้า หรือ เสื้อยืด", description: "ของแถมสุดพิเศษจาก SAIFAH 1 ชิ้น", tag: "LIMITED" }
    ];

    const guarantees = [
        { icon: <ShieldCheck className="h-12 w-12 text-primary" />, title: "รับประกัน 7 วัน", description: "เคลมฟรีทันที หากสินค้ามีตำหนิ ชำรุด หรือเสียหายจากการผลิต" },
        { icon: <BadgeCheck className="h-12 w-12 text-primary" />, title: "รับประกันราคาเดิม 30 วัน", description: "สั่งซ้ำ Lot 2 ภายใน 30 วันหลังได้รับสินค้า รับราคาเดิมไปเลย" }
    ];

    return (
        <div className="bg-muted">
            <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
                {/* Privileges Section */}
                <section>
                    <AnimateOnScroll delay={100} className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
                            สิทธิพิเศษ &amp; ของแถม
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            สั่งทำเสื้อกับ SAIFAH วันนี้ รับความคุ้มค่าที่เหนือกว่าใคร
                        </p>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {privileges.map((item, index) => {
                            let tagColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                            if (item.tag === "LIMITED") tagColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                            if (item.tag === "VAT" || item.tag === "INCLUDED") tagColor = "bg-green-500/10 text-green-500 border-green-500/20";
                            if (item.tag === "FREE") tagColor = "bg-primary/10 text-primary border-primary/20";

                            return (
                                <AnimateOnScroll key={index} delay={200 + index * 100} className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                                    <div className={"absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded-full border " + tagColor}>
                                        {item.tag}
                                    </div>
                                    <div className="flex justify-center mb-6">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold font-headline text-foreground">{item.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                                </AnimateOnScroll>
                            )
                        })}
                    </div>
                    <AnimateOnScroll delay={500} className="mt-12 max-w-4xl mx-auto">
                        <div className="relative rounded-xl border border-primary/20 bg-primary/10 p-8 text-center">
                            <h3 className="text-2xl font-bold text-primary font-headline">
                                รวมสิทธิพิเศษและของแถม มูลค่ามากกว่า 2,000 บาท
                            </h3>
                        </div>
                    </AnimateOnScroll>
                </section>

                {/* Guarantee Section */}
                <section>
                    <AnimateOnScroll delay={100} className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
                            การันตีความพึงพอใจ
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            เราใส่ใจในคุณภาพและบริการ เพื่อให้คุณมั่นใจในทุกคำสั่งซื้อ
                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {guarantees.map((item, index) => (
                            <AnimateOnScroll key={index} delay={200 + index * 150} className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        {item.icon}
                                        <div className="absolute inset-0 -z-10 bg-primary/20 blur-xl"></div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold font-headline text-foreground">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground">{item.description}</p>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
