"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AnimateOnScroll from "@/components/animate-on-scroll";

const portfolioItems: ImagePlaceholder[] = PlaceHolderImages.filter((p) =>
  p.id.startsWith("portfolio-"),
);

const filterTabs = [
  { id: "all", name: "ทั้งหมด" },
  { id: "company", name: "เสื้อบริษัท/องค์กร" },
  { id: "organization", name: "เสื้อหน่วยงาน" },
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

  const filteredItems = useMemo(() => {
    if (activeTab === "all") {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/30 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <AnimateOnScroll
          delay={100}
          className="text-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-widest mb-6">
            ผลงานของเรา
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-sm">
            ผลงาน
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">
              ออกแบบเสื้อสกรีน
            </span>
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl font-medium">
            ชมตัวอย่างผลงานสกรีนเสื้อด่วนและสกรีนเสื้อ DTF คุณภาพจาก SAIFAH
            เพื่อเป็นแรงบันดาลใจในการออกแบบของคุณ
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200} className="relative z-10">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center mb-12">
              <TabsList className="flex-wrap h-auto">
                {filterTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 min-h-[500px]">
                {filteredItems.map((item, index) => (
                  <AnimateOnScroll key={item.id} delay={index * 50}>
                    <Card className="group overflow-hidden rounded-[24px] border-border/50 bg-card hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 relative h-full">
                      <div className="aspect-[4/5] relative bg-secondary/20 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                        <Image
                          src={item.imageUrl}
                          alt={`ตัวอย่างงานสกรีนเสื้อ - ${item.description || "สกรีนเสื้อด่วน"}`}
                          fill
                          className="object-cover filter drop-shadow-md transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      </div>
                    </Card>
                  </AnimateOnScroll>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
