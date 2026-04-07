"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AnimateOnScroll from "@/components/animate-on-scroll";
import { AnimatePresence, motion } from "framer-motion";
import portfolioData from "@/data/portfolio-db.json";
import { Plus, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioItems = portfolioData.portfolioItems;

const filterTabs = [
  { id: "all", name: "ทั้งหมด" },
  { id: "company", name: "เสื้อบริษัท/องค์กร" },
  { id: "university", name: "เสื้อโรงเรียน/มหาวิทยาลัย" },
  { id: "event", name: "เสื้อกิจกรรม" },
  { id: "sme", name: "เสื้อธุรกิจSME" },
  { id: "other", name: "เสื้อดีไซน์อื่นๆ" },
];

export default function PortfolioClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("category") || "all";

  const [visibleCount, setVisibleCount] = useState(16);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const items = activeTab === "all" 
      ? portfolioItems 
      : portfolioItems.filter((item) => item.category === activeTab);
    return items;
  }, [activeTab]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`);
    setVisibleCount(16); // Reset count on tab change
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 16);
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/30 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <AnimateOnScroll
          delay={100}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6 border border-primary/20">
            ผลงานที่ลูกค้าไว้วางใจ
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 drop-shadow-sm">
            คลังผลงาน
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">
              ออกแบบเสื้อสกรีน
            </span>
          </h1>
          <p className="max-w-[800px] mx-auto text-muted-foreground text-lg md:text-2xl font-medium leading-relaxed">
            รวมสุดยอดผลงานสกรีนเสื้อคุณภาพระดับพรีเมียม ทั้งงานสกรีนบล็อก งานด่วน DTF 
            และงานปัก จากประสบการณ์ที่เราดูแลลูกค้าทั่วประเทศมาอย่างยาวนาน
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { label: "ลูกค้าที่ไว้วางใจ", value: "5,000+" },
              { label: "ชิ้นงานที่ผลิต", value: "500,000+" },
              { label: "ปีแห่งประสบการณ์", value: "10+" }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-[32px] bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</span>
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200} className="relative z-10">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center mb-12">
              <TabsList className="flex-wrap h-auto bg-transparent gap-2">
                {filterTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="rounded-full px-6 py-2.5 text-sm font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 hover:text-primary"
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {visibleItems.map((item, index) => (
                  <AnimateOnScroll key={item.id} delay={(index % 16) * 50}>
                    <Card 
                      onClick={() => setSelectedImage(item.imageUrl)}
                      className="group overflow-hidden rounded-[32px] border-none bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 relative shadow-xl shadow-zinc-200/50"
                    >
                      <div className="aspect-square relative bg-zinc-50 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                            <ZoomIn className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <Image
                          src={item.imageUrl}
                          alt={item.description}
                          fill
                          className="object-cover filter drop-shadow-md transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      </div>
                    </Card>
                  </AnimateOnScroll>
                ))}
              </div>

              {visibleCount < filteredItems.length && (
                <div className="mt-20 text-center">
                  <Button
                    onClick={loadMore}
                    className="h-16 px-12 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all group"
                  >
                    <span>ดูผลงานเพิ่มเติม</span>
                    <Plus className="ml-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                  <p className="mt-6 text-zinc-400 font-medium uppercase tracking-widest text-xs">
                    แสดงอยู่ {visibleCount} จากทั้งหมด {filteredItems.length} ผลงาน
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300} className="mt-32 relative z-10">
          <div className="p-12 md:p-20 rounded-[48px] bg-primary text-white text-center shadow-3xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/20 rounded-full blur-2xl -ml-24 -mb-24" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                พร้อมที่จะสร้างสรรค์<br/>ผลงานของคุณเองหรือยัง?
              </h2>
              <p className="text-lg md:text-xl font-medium text-white/80">
                เริ่มออกแบบเสื้อในสไตล์ที่คุณต้องการได้ทันที ด้วยเครื่องมือออกแบบที่ใช้งานง่ายที่สุด
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  asChild
                  className="h-16 px-10 rounded-full bg-white text-primary hover:bg-zinc-100 text-lg font-bold shadow-xl transition-all hover:scale-105"
                >
                  <Link href="/design">เข้าสู่โหมดออกแบบ</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="h-16 px-10 rounded-full border-2 border-white/30 bg-transparent hover:bg-white/10 text-white text-lg font-bold backdrop-blur-sm transition-all"
                >
                  <Link href="/contact">ปรึกษาผู้เชี่ยวชาญ</Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-3xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-square overflow-hidden rounded-[40px] shadow-3xl bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full screen portfolio view"
                fill
                className="object-contain p-4 md:p-8"
                priority
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-95"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
