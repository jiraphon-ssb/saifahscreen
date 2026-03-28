'use client';

import { useState, useRef } from 'react';
import { Share2, Link2, Download, MessageCircle, Copy, Check, Loader2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { DesignState, DesignElement } from './design-tool';
import LineIcon from '@/components/icons/line-icon';
import html2canvas from 'html2canvas';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designState: DesignState;
  designId?: string;
}

const LINE_OFFICIAL_ID = 'saifahscreen';

export default function ShareDialog({ open, onOpenChange, designState, designId }: ShareDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [customerNote, setCustomerNote] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const generateShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin + '/design';
    const encoded = btoa(JSON.stringify(designState));
    return `${baseUrl}?data=${encoded}`;
  };

  const shareUrl = generateShareUrl();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'คัดลอกลิงก์แล้ว!',
        description: 'สามารถส่งลิงก์ให้เพื่อนหรือแอนมินดูดีไซน์ได้เลย',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        variant: 'destructive',
        title: 'ไม่สามารถคัดลอกลิงก์ได้',
        description: 'กรุณาคัดลอกด้วยตนเอง',
      });
    }
  };

  const handleShareToLine = () => {
    const message = `สวัสดีครับ/ค่ะ สนใจสั่งทำเสื้อตามดีไซน์นี้ครับ/ค่ะ\n\n${customerNote ? `📝 หมายเหตุ: ${customerNote}\n` : ''}สามารถดูดีไซน์ได้ที่ลิงก์นี้:\n${shareUrl}`;
    const lineUrl = `https://line.me/R/oaMessage/@${LINE_OFFICIAL_ID}/?${encodeURIComponent(message)}`;
    window.open(lineUrl, '_blank');
  };

  const handleDownloadZip = async () => {
    if (!previewRef.current) {
      toast({
        variant: 'destructive',
        title: 'ไม่พบตัวอย่างดีไซน์',
      });
      return;
    }

    setIsDownloadingZip(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        background: '#ffffff',
        logging: false,
      } as any);

      const previewDataUrl = canvas.toDataURL('image/png');

      const designData = {
        design: designState,
        exportedAt: new Date().toISOString(),
        version: '1.0',
      };

      const designJson = JSON.stringify(designData, null, 2);

      const zipContent = [
        `--- SAIFAH Screen Design Package ---\n`,
        `Exported: ${new Date().toLocaleDateString('th-TH')}\n`,
        `Design ID: ${designId || 'N/A'}\n`,
        `--- Design Information ---\n`,
        `Product Type: ${designState.productConfig.productType}\n`,
        `T-Shirt Color: ${designState.productConfig.tshirt.name}\n`,
        `Elements: ${designState.elements.length}\n\n`,
        `--- Design JSON (for re-import) ---\n`,
        designJson,
      ].join('\n');

      const blob = new Blob([previewDataUrl.split(',')[1] + '\n\n---JSON---\n' + zipContent], { type: 'text/plain' });
      
      const link = document.createElement('a');
      link.download = `saifah-design-${designId || Date.now()}.txt`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);

      toast({
        title: 'ดาวน์โหลดไฟล์สำเร็จ!',
        description: 'ไฟล์รวมดีไซน์และข้อมูลถูกบันทึกแล้ว',
      });
    } catch (error) {
      console.error('Error creating download file:', error);
      toast({
        variant: 'destructive',
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถสร้างไฟล์ดาวน์โหลดได้',
      });
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            แชร์ดีไซน์
          </DialogTitle>
          <DialogDescription>
            บันทึกดีไซน์หรือส่งให้แอนมินในไลน์ได้เลย
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div ref={previewRef} className="p-4 bg-muted rounded-lg flex items-center justify-center min-h-[150px]">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {designState.elements.length} องค์ประกอบ
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {designState.productConfig.tshirt.name} {designState.productConfig.productType}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">หมายเหตุ (optional)</Label>
            <Textarea
              id="note"
              placeholder="เช่น ต้องการสกรีนสีทอง, ต้องการตัวเดียวสีดำ 10 ตัว..."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              rows={2}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>ลิงก์ดีไซน์</Label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="text-xs font-mono"
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 gap-2"
            onClick={handleShareToLine}
          >
            <LineIcon className="h-4 w-4" />
            ส่งให้แอนมินในไลน์
          </Button>
          
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
            >
              {isDownloadingZip ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Archive className="h-4 w-4" />
              )}
              บันทึกไฟล์
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              คัดลอกลิงก์
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
