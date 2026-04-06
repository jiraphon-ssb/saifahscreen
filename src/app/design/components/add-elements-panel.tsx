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
      <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
        <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center text-white">
            <Plus className="h-4 w-4" />
          </div>
          เพิ่มองค์ประกอบ
        </h3>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-12 bg-zinc-100 rounded-none p-1">
          <TabsTrigger
            value="text"
            className="data-[state=active]:bg-white data-[state=active]:text-zinc-950 font-bold text-xs rounded-none transition-all gap-2"
          >
            <Type className="h-4 w-4" />
            ข้อความ
          </TabsTrigger>
          <TabsTrigger
            value="image"
            className="data-[state=active]:bg-white data-[state=active]:text-zinc-950 font-bold text-xs rounded-none transition-all gap-2"
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
                className="w-full h-16 justify-between gap-3 border-2 border-zinc-100 bg-white hover:border-zinc-950 hover:bg-zinc-50 rounded-2xl transition-all group"
                onClick={() => onAddText("ข้อความของคุณ")}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-950 flex items-center justify-center shadow-lg shadow-zinc-950/10">
                    <Type className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-zinc-950 uppercase leading-none">
                      เพิ่มข้อความใหม่
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium mt-1">
                      Add basic text string
                    </p>
                  </div>
                </div>
                <Plus className="h-5 w-5 text-zinc-200 group-hover:text-zinc-950 transition-colors" />
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
              <div className="border-2 border-dashed border-zinc-200 rounded-3xl p-10 text-center hover:border-zinc-950 hover:bg-zinc-50 transition-all cursor-pointer group">
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="h-16 w-16 rounded-3xl bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-950 transition-all shadow-inner">
                    <Upload className="h-8 w-8 text-zinc-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-black text-zinc-950 uppercase tracking-tight">
                      อัปโหลดไฟล์รูปภาพ
                    </p>
                    <p className="text-[11px] text-zinc-400 font-bold uppercase mt-1">
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

            <div className="p-6 rounded-3xl bg-zinc-950 text-white shadow-xl shadow-zinc-950/10 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
                <h4 className="text-xs font-black uppercase tracking-tight">
                  คำแนะนำก่อนอัปโหลด
                </h4>
              </div>
              <ul className="text-[11px] font-bold text-white/60 space-y-2 uppercase leading-relaxed">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white mt-1 shrink-0" />{" "}
                  ใช้รูปความละเอียดสูงเพื่อความคม
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white mt-1 shrink-0" />{" "}
                  ไฟล์ PNG พื้นหลังโปร่งใสดีที่สุด
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white mt-1 shrink-0" />{" "}
                  หลีกเลี่ยงข้อความที่เล็กเกินไป
                </li>
              </ul>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
