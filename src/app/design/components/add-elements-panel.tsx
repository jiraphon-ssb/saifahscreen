"use client";

import {
  ImageUp,
  MessageSquareQuote,
  Shuffle,
  Type,
  Sparkles,
  Upload,
  Plus,
  History,
  MousePointer2,
  ChevronRight,
  Image as ImageIcon,
  Layers2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AddElementsPanelProps {
  onAddText: (text: string) => void;
  onAddImage: (imageUrl: string) => void;
}

const textTemplates = [
  { name: "หัวข้อใหญ่ (HEADING)", text: "ชื่อแบรนด์", size: 64, weight: 800 },
  { name: "หัวข้อย่อย (SUB)", text: "Tagline ของคุณ", size: 36, weight: 600 },
  { name: "ข้อความ (BODY)", text: "ข้อความของคุณ", size: 24, weight: 400 },
  { name: "ตัวเลข (NUMBER)", text: "2024", size: 72, weight: 700 },
];

const popularEmojis = [
  "🔥",
  "❤️",
  "⭐",
  "💪",
  "✨",
  "🚀",
  "💯",
  "🙌",
  "😎",
  "👑",
  "⚡",
  "🌈",
];

export default function AddElementsPanel({
  onAddText,
  onAddImage,
}: AddElementsPanelProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUri = event.target?.result as string;
        if (dataUri) {
          onAddImage(dataUri);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-prompt">
      <div className="p-5 space-y-1">
        <h2 className="text-xl font-bold text-primary">
          เพิ่มองค์ประกอบ
        </h2>
        <p className="text-xs text-zinc-400 font-medium tracking-normal">
          ใส่ข้อความและรูปภาพเพื่อตกแต่งเสื้อของคุณ
        </p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-12 bg-zinc-100 rounded-none p-1">
          <TabsTrigger
            value="text"
            className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs rounded-none transition-all gap-2"
          >
            <Type className="h-4 w-4" />
            ข้อความ
          </TabsTrigger>
          <TabsTrigger
            value="image"
            className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs rounded-none transition-all gap-2"
          >
            <ImageUp className="h-4 w-4" />
            รูปภาพ
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="text" className="space-y-6 mt-0">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                เพิ่มข้อความพื้นฐาน
              </h4>
              <Button
                variant="outline"
                className="w-full h-16 justify-between gap-3 border-none bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl transition-all shadow-xl shadow-primary/10 active:scale-[0.98] group px-6"
                onClick={() => onAddText("ข้อความของคุณ")}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                    <Type className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white uppercase leading-none">
                      เพิ่มข้อความใหม่
                    </p>
                    <p className="text-[11px] text-white/50 font-medium mt-1">
                      Add basic text string
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
              </Button>
            </div>

            <Separator className="bg-zinc-100" />

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                แม่แบบสำเร็จรูป
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {textTemplates.map((template) => (
                  <button
                    key={template.name}
                    className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-300 hover:shadow-md transition-all text-left group"
                    onClick={() => onAddText(template.text)}
                  >
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">
                        {template.name}
                      </p>
                      <p
                        className="font-black text-zinc-950 leading-tight"
                        style={{
                          fontSize: Math.min(template.size / 2.5, 20),
                          fontWeight: template.weight,
                        }}
                      >
                        {template.text}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-zinc-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="h-4 w-4 text-zinc-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator className="bg-zinc-100" />

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                อิโมจิยอดนิยม
              </h4>
              <div className="grid grid-cols-6 gap-2">
                {popularEmojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="outline"
                    className="h-10 w-full p-0 text-lg border-zinc-100 hover:border-zinc-950 rounded-xl bg-white"
                    onClick={() => onAddText(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="image" className="space-y-6 mt-0">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                อัปโหลดรูปภาพ
              </h4>
              <div className="border-none bg-primary/5 rounded-[32px] p-10 text-center hover:bg-primary/10 transition-all cursor-pointer group relative overflow-hidden border border-primary/10 shadow-inner">
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center group-hover:scale-110 transition-all shadow-xl shadow-primary/20">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-base uppercase tracking-tight">
                      อัปโหลดไฟล์รูปภาพ
                    </p>
                    <p className="text-[11px] text-primary/40 font-bold uppercase mt-1">
                      PNG, JPG, SVG (Max 10MB)
                    </p>
                  </div>
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </div>
            </div>

            <Separator className="bg-zinc-100" />

            <div className="p-6 rounded-[32px] bg-primary text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
              {/* Decorative Mesh Background */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-300/30 rounded-full blur-2xl -ml-16 -mb-16" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-tight">
                    คำแนะนำก่อนอัปโหลด
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: <ImageIcon className="h-4 w-4" />, text: "ใช้รูปความละเอียดสูงเพื่อความคม" },
                    { icon: <Layers2 className="h-4 w-4" />, text: "ไฟล์ PNG พื้นหลังโปร่งใสดีที่สุด" },
                    { icon: <MessageSquare className="h-4 w-4" />, text: "หลีกเลี่ยงข้อความที่เล็กเกินไป" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/5 backdrop-blur-sm hover:bg-white/20 transition-all cursor-default">
                      <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wide leading-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
