"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ruler, CheckCircle2, ChevronRight } from "lucide-react";

export default function SizeChart() {
  const premiumSizes = [
    { size: "S", chest: "38", length: "26" },
    { size: "M", chest: "40", length: "27" },
    { size: "L", chest: "42", length: "28" },
    { size: "XL", chest: "44", length: "29" },
    { size: "2XL", chest: "46", length: "30" },
    { size: "3XL", chest: "48", length: "31" },
  ];

  const oversizeSizes = [
    { size: "S", chest: "42", length: "28" },
    { size: "L", chest: "46", length: "30.5" },
    { size: "2XL", chest: "52", length: "32" },
  ];

  const renderTable = (sizes: typeof premiumSizes) => (
    <div className="rounded-[24px] overflow-hidden border-2 border-border/40  bg-background/40 backdrop-blur-md shadow-inner relative">
      {/* Subtle shine effect on table */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      <Table className="relative z-10 w-full">
        <TableHeader className="bg-secondary/80 hover:bg-secondary/80">
          <TableRow className="border-b-0 hover:bg-transparent">
            <TableHead className="w-[100px] text-foreground font-bold tracking-wider py-5 pl-6">Size</TableHead>
            <TableHead className="text-foreground font-bold text-center py-5">รอบอก (นิ้ว)</TableHead>
            <TableHead className="text-foreground font-bold text-right py-5 pr-6">ความยาว (นิ้ว)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizes.map((s, index) => (
            <TableRow 
              key={s.size} 
              className={`border-b-0 transition-colors hover:bg-primary/5 ${index % 2 === 0 ? "bg-card/30" : "bg-transparent"}`}
            >
              <TableCell className="font-black text-lg py-4 pl-6 text-primary flex items-center gap-2">
                <ChevronRight className="w-4 h-4 opacity-50" />
                {s.size}
              </TableCell>
              <TableCell className="text-center font-medium text-muted-foreground py-4 text-base">{s.chest}</TableCell>
              <TableCell className="text-right font-medium text-muted-foreground py-4 pr-6 text-base">{s.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="relative group p-8 lg:p-10 rounded-[40px] bg-card/60 backdrop-blur-3xl border border-white/40 shadow-2xl overflow-hidden hover:shadow-[0_20px_80px_rgba(168,85,247,0.15)] transition-shadow duration-500 flex flex-col h-full">
      {/* Decorative Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-700" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-pink-400/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-bold uppercase tracking-widest mb-3 border border-purple-500/20">
            <Ruler className="h-3.5 w-3.5" /> Measurement
          </div>
          <h3 className="font-headline text-4xl font-black text-foreground drop-shadow-sm">
            ตารางไซส์
          </h3>
          <p className="mt-3 text-muted-foreground font-medium flex items-start gap-2 text-sm leading-relaxed">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            <span>ตรวจสอบขนาดเสื้อแต่ละประเภทให้ถูกต้องก่อนสั่งซื้อ เพื่อความพอดีและสวยงามที่สุด</span>
          </p>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="premium" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1.5 bg-background/50 backdrop-blur-md rounded-[20px] h-16 shadow-sm border border-border/50 mb-8">
              <TabsTrigger 
                value="premium" 
                className="rounded-2xl text-base font-bold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md transition-all"
              >
                Premium Cotton
              </TabsTrigger>
              <TabsTrigger 
                value="oversize" 
                className="rounded-2xl text-base font-bold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md transition-all"
              >
                Oversize Cotton
              </TabsTrigger>
            </TabsList>

            <TabsContent value="premium" className="animate-in fade-in-50 zoom-in-95 duration-300">
              {renderTable(premiumSizes)}
            </TabsContent>
            
            <TabsContent value="oversize" className="animate-in fade-in-50 zoom-in-95 duration-300">
              {renderTable(oversizeSizes)}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-auto pt-8">
          <div className="bg-primary/5 rounded-[24px] p-6 border-2 border-primary/20 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
             <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
               <span className="text-xl font-black text-primary">!</span>
             </div>
             <div>
               <p className="font-bold text-foreground text-lg mb-1">ราคาเดียวกันทุก Size</p>
               <p className="text-muted-foreground text-sm font-medium">ไม่มีบวกเพิ่มสำหรับไซส์ใหญ่พิเศษ (2XL, 3XL) สบายใจได้เลย!</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
