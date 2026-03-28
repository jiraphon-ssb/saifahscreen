'use client';

import { ImageUp, MessageSquareQuote, Shuffle, Type, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface AddElementsPanelProps {
  onAddText: (text: string) => void;
  onAddImage: (imageUrl: string) => void;
}

const textTemplates = [
    { name: 'หัวข้อใหญ่', text: 'ชื่อแบรนด์', size: 64, weight: 800 },
    { name: 'หัวข้อย่อย', text: 'Tagline ของคุณ', size: 36, weight: 600 },
    { name: 'ข้อความ', text: 'ข้อความของคุณ', size: 24, weight: 400 },
    { name: 'ตัวเลข', text: '2024', size: 72, weight: 700 },
];

const quotes = [
    "ทำวันนี้ให้ดีที่สุด",
    "ฝันให้ไกล ไปให้ถึง",
    "ความสำเร็จ เริ่มต้นที่ลงมือทำ",
    "ชีวิตคือการเดินทาง",
    "จงเป็นตัวเอง",
    "SMILE",
    "NEVER GIVE UP",
    "DREAM BIG",
    "BE KIND",
    "STAY POSITIVE",
];

const popularEmojis = ['🔥', '❤️', '⭐', '💪', '✨', '🚀', '💯', '🙌'];

export default function AddElementsPanel({ onAddText, onAddImage }: AddElementsPanelProps) {
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
      e.target.value = '';
    }
  };

  const addRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    onAddText(quotes[randomIndex]);
  };

  const handleTemplateClick = (template: typeof textTemplates[0]) => {
    onAddText(template.text);
  };

  const handleEmojiClick = (emoji: string) => {
    onAddText(emoji);
  };

  return (
    <div className="p-4">
        <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="text" className="gap-2">
                    <Type className="h-4 w-4" />
                    ข้อความ
                </TabsTrigger>
                <TabsTrigger value="image" className="gap-2">
                    <ImageUp className="h-4 w-4" />
                    รูปภาพ
                </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 mt-0">
                <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">เพิ่มข้อความ</h3>
                    <Button 
                        variant="outline" 
                        className='w-full justify-start gap-3 h-12' 
                        onClick={() => onAddText('ข้อความของคุณ')}
                    >
                        <Type className="h-5 w-5 text-primary" /> 
                        <span>ข้อความใหม่</span>
                    </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">แม่แบบ</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {textTemplates.map((template) => (
                            <Button
                                key={template.name}
                                variant="secondary"
                                className="h-auto flex-col items-start py-3 px-3 gap-1"
                                onClick={() => handleTemplateClick(template)}
                            >
                                <span className="text-xs text-muted-foreground">{template.name}</span>
                                <span 
                                    className="font-semibold line-clamp-1" 
                                    style={{ fontSize: Math.min(template.size / 3, 14), fontWeight: template.weight }}
                                >
                                    {template.text}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">อิโมจิยอดนิยม</h3>
                    <div className="flex flex-wrap gap-1">
                        {popularEmojis.map((emoji) => (
                            <Button
                                key={emoji}
                                variant="secondary"
                                size="sm"
                                className="h-8 w-8 p-0 text-base"
                                onClick={() => handleEmojiClick(emoji)}
                            >
                                {emoji}
                            </Button>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">สุ่มคำคม</h3>
                    <Button variant="secondary" className='w-full gap-2' onClick={addRandomQuote}>
                        <Shuffle className="h-4 w-4" />
                        สุ่มคำคม
                    </Button>
                </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4 mt-0">
                <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">อัปโหลดจากเครื่อง</h3>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                        <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">คลิกเพื่ออัปโหลด</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max 10MB)</p>
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

                <Separator />

                <Card className="bg-secondary/50 border-0">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            เคล็ดลับ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• ใช้รูปภาพขนาดใหญ่เพื่อความคมชัด</li>
                            <li>• ลองใช้ PNG พื้นหลังโปร่งใส</li>
                            <li>• หลีกเลี่ยงข้อความเล็กๆ ในรูป</li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
