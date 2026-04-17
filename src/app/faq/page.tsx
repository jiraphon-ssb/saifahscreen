"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimateOnScroll from "@/components/animate-on-scroll";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  MessageCircle, 
  Search, 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  ShieldCheck,
  HelpCircle,
  Scissors
} from "lucide-react";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  const faqCategories = [
    {
      id: "ทั้งหมด",
      name: "ทั้งหมด",
      icon: HelpCircle,
    },
    {
      id: "บริการและการผลิต",
      name: "บริการและการผลิต",
      icon: Scissors,
      faqs: [
        {
          q: "SAIFAH รับทำเสื้อแบบไหน และมีบริการอะไรบ้าง?",
          a: "SAIFAH เป็นโรงงานผลิตเสื้อผ้าครบวงจร รับผลิตเสื้อโปโล, เสื้อยืด, เสื้อยูนิฟอร์ม, และอื่นๆ พร้อมบริการออกแบบ, ตัดเย็บ, ปัก, และสกรีนโลโก้ตามความต้องการของคุณ",
        },
        {
          q: "ขั้นตอนการสั่งผลิตเสื้อกับ SAIFAH เป็นอย่างไร?",
          a: "ขั้นตอนง่ายๆ: 1. แจ้งความต้องการ (แบบเสื้อ, จำนวน, ดีไซน์) 2. รับใบเสนอราคา 3. ยืนยันการสั่งซื้อและชำระมัดจำ 4. ดูตัวอย่างงาน (ถ้ามี) 5. เริ่มการผลิต 6. ชำระส่วนที่เหลือและรอรับสินค้า",
        },
        {
          q: "สามารถสั่งผลิตเสื้อในจำนวนขั้นต่ำเท่าใด?",
          a: "เราไม่มีขั้นต่ำในการสั่งผลิต คุณสามารถสั่งทำเสื้อได้แม้เพียงตัวเดียว หรือจะสั่งเป็นทีม เราก็พร้อมให้บริการ",
        },
        {
          q: "SAIFAH มีบริการออกแบบเสื้อให้หรือไม่?",
          a: "ใช่ เรามีเครื่องมือออกแบบที่ทันสมัย และทีมงานคอยให้คำปรึกษา ช่วยดราฟแบบ และแนะนำโลโก้ให้เหมาะสมกับเสื้อ",
        },
        {
          q: "SAIFAH ใช้ผ้าชนิดใดในการผลิตเสื้อ?",
          a: "เรามีผ้าให้เลือกหลากหลายชนิด ตั้งแต่ Cotton, CVC, TC, ไปจนถึงผ้า Dry Tech และไมโครเนื้อเรียบ เพื่อให้เหมาะสมกับการใช้งานและงบประมาณ",
        },
        {
          q: "สามารถเลือกสีผ้าและลายพิมพ์ได้หรือไม่?",
          a: "ได้ คุณสามารถเลือกสีผ้าจากแคตตาล็อกของเรา และสามารถส่งไฟล์ลายพิมพ์ (.ai, .psd, .png) ที่มีความละเอียดสูงมาให้เราได้เลย",
        },
        {
          q: "SAIFAH สามารถผลิตเสื้อสำหรับงานอีเวนต์หรือกิจกรรมพิเศษได้หรือไม่?",
          a: "ได้แน่นอน เรามีความเชี่ยวชาญในการผลิตเสื้อสำหรับงานอีเวนต์, กิจกรรมบริษัท, หรือเสื้อรุ่นต่างๆ พร้อมให้คำปรึกษาเพื่อให้เหมาะสมกับงานของคุณ",
        },
        {
          q: "สามารถเยี่ยมชมโรงงานหรือชมสินค้าจริงได้ที่ไหน?",
          a: "คุณสามารถทักแชทเพื่อนัดหมายเพื่อเข้ามาชมตัวอย่างผ้าและสินค้าจริงได้ที่โชว์รูมของเรา กรุณาติดต่อเพื่อนัดหมายล่วงหน้า",
        },
      ]
    },
    {
      id: "เงื่อนไขและการรับประกัน",
      name: "เงื่อนไขการรับประกัน",
      icon: ShieldCheck,
      faqs: [
        {
          q: "SAIFAH มีนโยบายการคืนสินค้าอย่างไร?",
          a: "เรารับประกันคุณภาพสินค้า หากสินค้ามีปัญหา แตก ขาด หด หรือสีตกจากการผลิต เรายินดีแก้ไขหรือผลิตให้ใหม่ตามเงื่อนไขที่ตกลงกัน กรุณาตรวจสอบและแจ้งปัญหาภายใน 7 วันหลังได้รับสินค้า",
        },
        {
          q: "มีการรับประกันคุณภาพสินค้าอย่างไรบ้าง?",
          a: "เรามีการควบคุมคุณภาพในทุกขั้นตอนการผลิต ตั้งแต่การเลือกผ้า, การตัดเย็บ, ไปจนถึงงานพิมพ์และปัก เพื่อให้คุณมั่นใจว่าจะได้รับสินค้าที่มีคุณภาพมาตรฐาน",
        },
        {
          q: "สามารถขอเปลี่ยนหรือยกเลิกคำสั่งซื้อได้หรือไม่?",
          a: "หากยังไม่มีการขึ้นตัวอย่างหรือเริ่มการผลิต คุณสามารถเปลี่ยนแปลงรายละเอียดได้ แต่หากคอนเฟิร์มและเข้าสู่กระบวนการผลิตแล้วจะไม่สามารถยกเลิกหรือเปลี่ยนแปลงได้",
        },
      ]
    },
    {
      id: "การจัดส่งและเวลา",
      name: "การจัดส่งและระยะเวลา",
      icon: Truck,
      faqs: [
        {
          q: "ระยะเวลาการผลิตและการจัดส่งเป็นอย่างไร?",
          a: "ระยะเวลาการผลิตโดยทั่วไปอยู่ที่ 7-21 วันทำการ (ขึ้นอยู่กับความยากง่ายและคิวงาน) วันจัดส่งขึ้นอยู่กับพื้นที่และวิธีการจัดส่งที่คุณเลือก",
        },
        {
          q: "การจัดส่งสินค้าใช้เวลานานเท่าใด?",
          a: "ในกรุงเทพฯ และปริมณฑลใช้เวลา 1-2 วันทำการ สำหรับต่างจังหวัดใช้เวลา 2-3 วันทำการ",
        },
        {
          q: "สามารถติดตามสถานะการผลิตและการจัดส่งได้อย่างไร?",
          a: "คุณสามารถติดต่อฝ่ายขายใน LINE Official หรือผู้ที่ดูแลโปรเจกต์ของคุณเพื่อสอบถามและติดตามสถานะได้ตลอดเวลา",
        },
      ]
    },
    {
      id: "การชำระเงินและเอกสาร",
      name: "การชำระเงินและภาษี",
      icon: CreditCard,
      faqs: [
        {
          q: "การชำระเงินสำหรับการสั่งผลิตเสื้อทำอย่างไร?",
          a: "เรารับชำระเงินผ่านการโอนเงิน โดยแบ่งเป็นค่ามัดจำ 50% ก่อนเริ่มผลิต และชำระส่วนที่เหลือ 50% ก่อนทำการจัดส่งสินค้า",
        },
        {
          q: "มีบริการเก็บเงินปลายทางหรือไม่?",
          a: "ขออภัยครับ เนื่องจากสินค้าเป็นงานสั่งทำเฉพาะ (Made to Order) ปัจจุบันเราจึงยังไม่มีบริการเก็บเงินปลายทาง",
        },
        {
          q: "สามารถออกใบกำกับภาษีได้หรือไม่?",
          a: "ได้ บริษัทของเราจดทะเบียนบริษัทถูกต้องตามกฎหมาย และสามารถออกใบกำกับภาษีเต็มรูปแบบ (+7%) ได้ครับ",
        },
        {
          q: "วิธีการขอใบกำกับภาษีจาก SAIFAH ต้องทำอย่างไร?",
          a: "คุณสามารถแจ้งขอใบกำกับภาษีได้ในขั้นตอนการสั่งซื้อ โดยส่งข้อมูลชื่อ-ที่อยู่และหนังสือรับรองบริษัท หรือหน้า ภ.พ. 20 ให้กับฝ่ายขาย",
        },
        {
          q: "สามารถออกใบกำกับภาษีในนามบุคคลธรรมดาได้หรือไม่?",
          a: "ได้ สามารถออกในนามบุคคลธรรมดาได้ โดยใช้เลขบัตรประจำตัวประชาชน 13 หลัก",
        },
        {
          q: "หากมีข้อผิดพลาดในใบกำกับภาษี จะสามารถแก้ไขได้อย่างไร?",
          a: "กรุณาแจ้งฝ่ายขายหรือฝ่ายบัญชีทันทีที่พบข้อผิดพลาดเพื่อดำเนินการแก้ไขให้ถูกต้องและออกเอกสารใหม่ทดแทน",
        },
      ]
    }
  ];

  // Flatten FAQs for "ทั้งหมด" and Search
  const allFaqs = faqCategories
    .filter((cat) => cat.faqs)
    .flatMap((cat) => cat.faqs || []);

  const getFilteredFaqs = () => {
    let sourceFaqs = activeCategory === "ทั้งหมด" 
      ? allFaqs 
      : faqCategories.find(c => c.id === activeCategory)?.faqs || [];

    if (searchQuery.trim() !== "") {
      const qLower = searchQuery.toLowerCase();
      sourceFaqs = sourceFaqs.filter(
        faq => faq.q.toLowerCase().includes(qLower) || faq.a.toLowerCase().includes(qLower)
      );
    }
    return sourceFaqs;
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className="bg-gradient-to-b from-background via-secondary/20 to-background w-full min-h-screen relative overflow-hidden pb-24">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-6xl">
        {/* Header Section */}
        <AnimateOnScroll delay={100} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6">
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-headline tracking-tight drop-shadow-sm mb-6">
            ศูนย์ช่วยเหลือ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">& FAQ</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed">
            เรารวบรวมคำตอบสำหรับคำถามที่พบบ่อยไว้ที่นี่<br className="hidden md:block" />
            เพื่อช่วยให้คุณได้รับข้อมูลที่รวดเร็วและครบถ้วนที่สุด
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-10 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="h-6 w-6" />
            </div>
            <Input
              type="text"
              placeholder="ลองค้นหา เช่น 'ใบกำกับภาษี', 'ระยะเวลา', 'ส่งไฟล์'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-4 py-8 w-full rounded-full border-2 border-border/60 bg-background/80 backdrop-blur-md shadow-lg text-lg focus-visible:ring-primary focus-visible:border-primary transition-all placeholder:text-muted-foreground/60"
            />
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-4 shadow-sm flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar">
               {faqCategories.map((category) => {
                 const isActive = activeCategory === category.id;
                 return (
                   <button
                     key={category.id}
                     onClick={() => {
                        setActiveCategory(category.id);
                        setSearchQuery(""); // Clear search when changing category
                     }}
                     className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 whitespace-nowrap text-left font-bold ${
                       isActive
                         ? "bg-primary text-primary-foreground shadow-md"
                         : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                     }`}
                   >
                     <category.icon className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-70"}`} />
                     {category.name}
                   </button>
                 );
               })}
            </div>
          </div>

          {/* FAQ Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 min-h-[500px]">
             
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AnimateOnScroll key={index} delay={index * 50}>
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-2 py-2 overflow-hidden transition-all hover:border-primary/40 hover:shadow-md data-[state=open]:border-primary/50 data-[state=open]:shadow-md"
                    >
                      <AccordionTrigger className="text-left font-bold text-foreground px-6 py-4 hover:no-underline transition-colors text-lg md:text-xl md:leading-snug gap-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground px-6 pb-6 text-base md:text-lg leading-relaxed pt-2">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </AnimateOnScroll>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-20 bg-secondary/30 rounded-3xl border border-dashed border-border/80">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">ไม่พบคำตอบที่คุณค้นหา</h3>
                <p className="text-muted-foreground">ลองใช้คำค้นหาอื่น หรือเลือกดูคู่มือจากหมวดหมู่ด้านซ้าย</p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-xl font-bold"
                  onClick={() => setSearchQuery("")}
                >
                  ล้างการค้นหา
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <section className="text-center mt-32 mb-10 p-10 md:p-16 rounded-[40px] bg-gradient-to-br from-primary/10 to-sky-400/10 border border-primary/20 relative overflow-hidden isolate">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          
          <AnimateOnScroll delay={100} className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-sm text-primary mb-6">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-headline mb-4">
              ยังไม่พบคำตอบที่ต้องการใช่ไหม?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium mb-10">
              ทีมงานของเราพร้อมให้คำปรึกษาและช่วยเหลือคุณเสมอ <br/>
              ทักเข้ามาพูดคุยรายละเอียดโปรเจกต์ของคุณได้เลยครับ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 w-full text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                >
                  ติดต่อเจ้าหน้าที่
                </Button>
              </Link>
              <Link href="/design" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 w-full text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-background/50 backdrop-blur-md group"
                >
                  เริ่มออกแบบเลย
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimateOnScroll>
        </section>
      </div>
    </div>
  );
}
