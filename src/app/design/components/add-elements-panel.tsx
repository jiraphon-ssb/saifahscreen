'use client';

import { ImageUp, MessageSquareQuote, Shuffle, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AddElementsPanelProps {
  onAddText: (text: string) => void;
  onAddImage: (imageUrl: string) => void;
}

const quotes = [
    "ทำวันนี้ให้ดีที่สุด",
    "ฝันให้ไกล ไปให้ถึง",
    "ความสำเร็จ เริ่มต้นที่ลงมือทำ",
    "ชีวิตคือการเดินทาง",
    "จงเป็นตัวเองในเวอร์ชั่นที่ดีที่สุด",
    "SMILE",
    "NEVER GIVE UP",
    "DREAM BIG",
    "BE KIND",
    "STAY POSITIVE",
];

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

  return (
    <div className="p-4 space-y-4">
       <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground px-2">เพิ่มองค์ประกอบ</h3>
        <Card className="overflow-hidden">
          <CardContent className="p-4 space-y-3">
              <Button variant="outline" className='w-full justify-start text-base py-6' onClick={() => onAddText('ข้อความใหม่')}>
                <Type className="mr-3 h-5 w-5" /> เพิ่มข้อความ
              </Button>
              <Button variant="outline" className='w-full justify-start text-base py-6' asChild>
                <Label htmlFor="image-upload-input" className="cursor-pointer">
                  <ImageUp className="mr-3 h-5 w-5" /> อัปโหลดรูปภาพ
                </Label>
              </Button>
               <Input id="image-upload-input" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
          </CardContent>
        </Card>
      </div>

       <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground px-2">เครื่องมือช่วยคิด</h3>
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquareQuote className="h-5 w-5" />
                    ตัวสร้างคำคม
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    หาแรงบันดาลใจ? สุ่มคำคมเท่ๆ หรือข้อความสั้นๆ ไปใช้ในดีไซน์ของคุณได้เลย
                </p>
                <Button variant="outline" className='w-full' onClick={addRandomQuote}>
                    <Shuffle className="mr-2 h-4 w-4" />
                    สุ่มคำคม/ข้อความ
                </Button>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
