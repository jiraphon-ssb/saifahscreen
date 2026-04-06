'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AnimateOnScroll from '@/components/animate-on-scroll';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function FaqPage() {
    const generalFaqs = [
        { q: "SAIFAH รับทำเสื้อแบบไหน และมีบริการอะไรบ้าง?", a: "SAIFAH เป็นโรงงานผลิตเสื้อผ้าครบวงจร รับผลิตเสื้อโปโล, เสื้อยืด, เสื้อยูนิฟอร์ม, และอื่นๆ พร้อมบริการออกแบบ, ตัดเย็บ, ปัก, และสกรีนโลโก้ตามความต้องการของคุณ" },
        { q: "ขั้นตอนการสั่งผลิตเสื้อกับ SAIFAH เป็นอย่างไร?", a: "ขั้นตอนง่ายๆ: 1. แจ้งความต้องการ (แบบเสื้อ, จำนวน, ดีไซน์) 2. รับใบเสนอราคา 3. ยืนยันการสั่งซื้อและชำระมัดจำ 4. ดูตัวอย่างงาน (ถ้ามี) 5. เริ่มการผลิต 6. ชำระส่วนที่เหลือและรอรับสินค้า" },
        { q: "ระยะเวลาการผลิตและการจัดส่งเป็นอย่างไร?", a: "ระยะเวลาการผลิตโดยทั่วไปอยู่ที่ 14-21 วันทำการหลังจากการยืนยันแบบและตัวอย่าง ส่วนการจัดส่งขึ้นอยู่กับพื้นที่และวิธีการจัดส่งที่คุณเลือก" },
        { q: "สามารถสั่งผลิตเสื้อในจำนวนขั้นต่ำเท่าใด?", a: "เราไม่มีขั้นต่ำในการสั่งผลิต คุณสามารถสั่งทำเสื้อได้แม้เพียงตัวเดียว หรือจะสั่งเป็นทีม เราก็พร้อมให้บริการ" },
        { q: "SAIFAH มีบริการออกแบบเสื้อให้หรือไม่?", a: "ใช่ เรามีเครื่องมือออกแบบที่ทันสมัย และ AI ช่วยออกแบบที่ช่วยให้คุณสร้างสรรค์ผลงานได้อย่างง่ายดาย นอกจากนี้ยังมีทีมงานคอยให้คำปรึกษา" },
    ];

    const fullFaqsLeft = [
        { q: "SAIFAH ใช้ผ้าชนิดใดในการผลิตเสื้อ?", a: "เรามีผ้าให้เลือกหลากหลายชนิด ตั้งแต่ Cotton, CVC, TC, ไปจนถึงผ้า Dry Tech ที่มีคุณสมบัติพิเศษต่างๆ เพื่อให้เหมาะสมกับการใช้งานและงบประมาณของคุณ" },
        { q: "SAIFAH มีนโยบายการคืนสินค้าอย่างไร?", a: "เรารับประกันคุณภาพสินค้า หากสินค้ามีปัญหาจากการผลิต เรายินดีแก้ไขหรือผลิตให้ใหม่ตามเงื่อนไขที่ตกลงกัน กรุณาตรวจสอบสินค้าและแจ้งปัญหาภายใน 7 วันหลังได้รับสินค้า" },
        { q: "การชำระเงินสำหรับการสั่งผลิตเสื้อทำอย่างไร?", a: "เรารับชำระเงินผ่านการโอนเงินผ่านธนาคาร โดยแบ่งเป็นค่ามัดจำ 50% ก่อนเริ่มผลิต และชำระส่วนที่เหลือ 50% ก่อนการจัดส่ง" },
        { q: "สามารถเลือกสีผ้าและลายพิมพ์ได้หรือไม่?", a: "ได้ คุณสามารถเลือกสีผ้าจากแคตตาล็อกของเรา และสามารถส่งไฟล์ลายพิมพ์ (.ai, .psd, .png) ที่มีความละเอียดสูงมาให้เราได้เลย" },
        { q: "มีการรับประกันคุณภาพสินค้าอย่างไรบ้าง?", a: "เรามีการควบคุมคุณภาพในทุกขั้นตอนการผลิต ตั้งแต่การเลือกผ้า, การตัดเย็บ, ไปจนถึงงานพิมพ์ เพื่อให้คุณมั่นใจว่าจะได้รับสินค้าที่มีคุณภาพมาตรฐาน" },
        { q: "สามารถขอเปลี่ยนหรือยกเลิกคำสั่งซื้อได้หรือไม่?", a: "หากยังไม่มีการขึ้นตัวอย่างหรือเริ่มการผลิต คุณสามารถเปลี่ยนแปลงรายละเอียดได้ แต่หากเริ่มกระบวนการผลิตแล้วจะไม่สามารถยกเลิกหรือเปลี่ยนแปลงได้" },
        { q: "สามารถติดตามสถานะการผลิตและการจัดส่งได้อย่างไร?", a: "คุณสามารถติดต่อฝ่ายขายที่ดูแลโปรเจกต์ของคุณเพื่อสอบถามและติดตามสถานะการผลิตได้ตลอดเวลา" },
        { q: "SAIFAH สามารถผลิตเสื้อสำหรับงานอีเวนต์หรือกิจกรรมพิเศษได้หรือไม่?", a: "ได้แน่นอน เรามีความเชี่ยวชาญในการผลิตเสื้อสำหรับงานอีเวนต์, กิจกรรมบริษัท, หรือเสื้อรุ่นต่างๆ พร้อมให้คำปรึกษาเพื่อให้เหมาะสมกับงานของคุณ" },
        { q: "การจัดส่งสินค้าใช้เวลานานเท่าใด?", a: "ในกรุงเทพฯ และปริมณฑลใช้เวลา 1-2 วันทำการ สำหรับต่างจังหวัดใช้เวลา 2-3 วันทำการ" },
        { q: "SAIFAH มีบริการจัดส่งระหว่างประเทศหรือไม่?", a: "ในปัจจุบันเรายังไม่มีบริการจัดส่งระหว่างประเทศโดยตรง แต่สามารถจัดส่งไปยังบริษัทขนส่ง (Freight Forwarder) ที่คุณเลือกในประเทศไทยได้" },
    ];

    const fullFaqsRight = [
        { q: "มีบริการเก็บเงินปลายทางหรือไม่?", a: "ขออภัยครับ ปัจจุบันเรายังไม่มีบริการเก็บเงินปลายทาง" },
        { q: "มีการให้คำปรึกษาด้านการออกแบบและการเลือกผ้าหรือไม่?", a: "ใช่ เรามีทีมงานที่พร้อมให้คำปรึกษาทั้งด้านการออกแบบ, การเลือกใช้ผ้า, และเทคนิคการพิมพ์ เพื่อให้งานของคุณออกมาดีที่สุด" },
        { q: "สามารถเยี่ยมชมโรงงานหรือชมสินค้าจริงได้ที่ไหน?", a: "คุณสามารถนัดหมายเพื่อเข้ามาชมตัวอย่างผ้าและสินค้าจริงได้ที่โชว์รูมของเรา กรุณาติดต่อเพื่อนัดหมายล่วงหน้า" },
        { q: "สามารถออกใบเสร็จและใบกำกับภาษีได้หรือไม่?", a: "ได้ บริษัทของเราจดทะเบียนถูกต้อง สามารถออกใบกำกับภาษีเต็มรูปแบบได้" },
        { q: "วิธีการขอใบกำกับภาษีจาก SAIFAH ต้องทำอย่างไร?", a: "คุณสามารถแจ้งขอใบกำกับภาษีได้ในขั้นตอนการสั่งซื้อ โดยส่งข้อมูลชื่อ-ที่อยู่และเลขประจำตัวผู้เสียภาษีให้กับฝ่ายขาย" },
        { q: "SAIFAH ออกใบกำกับภาษีแบบเต็มรูปแบบหรือไม่?", a: "ใช่ เราออกใบกำกับภาษีเต็มรูปแบบตามมาตรฐานของกรมสรรพากร" },
        { q: "หากลูกค้าต้องการใบเสร็จรับเงินหรือใบกำกับภาษีซ้ำ ควรทำอย่างไร?", a: "กรุณาติดต่อฝ่ายขายหรือฝ่ายบัญชีของเราเพื่อขอสำเนาเอกสารได้" },
        { q: "สามารถออกใบกำกับภาษีในนามบุคคลธรรมดาได้หรือไม่?", a: "ได้ สามารถออกในนามบุคคลธรรมดาได้ โดยใช้เลขบัตรประจำตัวประชาชน 13 หลัก" },
        { q: "หากมีข้อผิดพลาดในใบกำกับภาษี จะสามารถแก้ไขได้อย่างไร?", a: "กรุณาแจ้งฝ่ายขายหรือฝ่ายบัญชีทันทีที่พบข้อผิดพลาดเพื่อดำเนินการแก้ไขให้ถูกต้อง" },
    ];

    const renderFaqAccordion = (faqs: { q: string, a: string }[], type: "single" | "multiple" = "single", delayStart: number = 0) => (
        <Accordion type={type} collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
                <AnimateOnScroll key={index} delay={delayStart + index * 100}>
                    <AccordionItem value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-[20px] px-2 py-1 transition-all hover:border-primary/50 hover:shadow-lg">
                        <AccordionTrigger className="text-left font-bold text-foreground px-6 py-4 hover:no-underline hover:text-primary transition-colors text-lg">
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground px-6 pb-4 text-base leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                </AnimateOnScroll>
            ))}
        </Accordion>
    );

    return (
        <div className="bg-gradient-to-b from-background via-secondary/10 to-background w-full min-h-screen relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-4 py-16 md:py-24 space-y-24 relative z-10">
                {/* Section 1: General FAQ */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <AnimateOnScroll delay={100} className="lg:col-span-1 lg:sticky top-24">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                            FAQ
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-headline tracking-tight">คำถามที่พบบ่อย</h2>
                        <p className="text-muted-foreground text-lg">คำถามทั่วไปที่ลูกค้ามักสอบถามเข้ามาเกี่ยวกับบริการของเรา</p>
                    </AnimateOnScroll>
                    <div className="lg:col-span-2">
                        {renderFaqAccordion(generalFaqs, "single", 200)}
                    </div>
                </section>

                {/* Section 3: Full FAQ */}
                <section>
                    <AnimateOnScroll delay={100} className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground font-headline">คำถามทั้งหมด</h2>
                        <p className="text-muted-foreground mt-2">ค้นหาคำตอบสำหรับทุกคำถามของคุณที่นี่</p>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 max-w-6xl mx-auto">
                        <div>
                            {renderFaqAccordion(fullFaqsLeft, "single", 200)}
                        </div>
                        <div>
                            {renderFaqAccordion(fullFaqsRight, "single", 200)}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center py-12">
                    <AnimateOnScroll delay={100}>
                        <h2 className="text-3xl font-bold font-headline mb-4">ยังมีคำถามเพิ่มเติม?</h2>
                        <p className="text-muted-foreground text-lg mb-8">ทีมงานพร้อมให้คำปรึกษาและช่วยเหลือคุณเสมอ</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    ติดต่อเรา
                                </Button>
                            </Link>
                            <Link href="/design">
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                                    เริ่มออกแบบเลย
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </section>
            </div>
        </div>
    );
}
