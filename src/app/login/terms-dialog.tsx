'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export default function TermsDialog({ open, onOpenChange, onAccept }: TermsDialogProps) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setCheckboxChecked(false);
    }
  }, [open]);

  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">ข้อตกลงและเงื่อนไขการใช้บริการ</DialogTitle>
          <DialogDescription>
            โปรดอ่านและทำความเข้าใจข้อตกลงในการใช้งานและนโยบายความเป็นส่วนตัวของเราก่อนดำเนินการต่อ
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full pr-6">
            <div className="prose prose-sm dark:prose-invert text-muted-foreground space-y-4">
              <h3 className="font-semibold text-foreground">1. การยอมรับข้อตกลง</h3>
              <p>
                การเข้าถึงหรือใช้งานแอปพลิเคชัน SAIFAH Design Studio ("บริการ") นี้ แสดงว่าคุณตกลงที่จะผูกพันตามข้อตกลงในการให้บริการ ("ข้อตกลง") และนโยบายความเป็นส่วนตัวของเรา หากคุณไม่ยอมรับส่วนใดส่วนหนึ่งของข้อตกลงนี้ คุณจะไม่ได้รับอนุญาตให้เข้าถึงบริการ
              </p>
              
              <h3 className="font-semibold text-foreground">2. บัญชีผู้ใช้</h3>
              <p>
                เมื่อคุณสร้างบัญชีกับเรา คุณต้องให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบันเสมอ การไม่ปฏิบัติตามนี้ถือเป็นการละเมิดข้อตกลง ซึ่งอาจส่งผลให้บัญชีของคุณถูกยกเลิกทันที คุณมีหน้าที่รับผิดชอบในการรักษารหัสผ่านที่คุณใช้ในการเข้าถึงบริการ และสำหรับกิจกรรมหรือการกระทำใดๆ ภายใต้รหัสผ่านของคุณ
              </p>

              <h3 className="font-semibold text-foreground">3. เนื้อหาและการออกแบบ</h3>
              <p>
                บริการของเราอนุญาตให้คุณโพสต์, ลิงก์, จัดเก็บ, แบ่งปัน และทำให้ข้อมูล, ข้อความ, กราฟิก, วิดีโอ หรือเนื้อหาอื่นๆ ("เนื้อหา") พร้อมใช้งานได้ คุณต้องรับผิดชอบต่อเนื้อหาที่คุณสร้างขึ้น รวมถึงความถูกต้องตามกฎหมาย, ความน่าเชื่อถือ, และความเหมาะสม คุณรับรองและรับประกันว่าคุณเป็นเจ้าของเนื้อหาหรือมีสิทธิ์ในการใช้งาน และการโพสต์เนื้อหาของคุณบนหรือผ่านบริการไม่ได้ละเมิดสิทธิ์ความเป็นส่วนตัว, สิทธิ์ในการเผยแพร่, ลิขสิทธิ์, หรือสิทธิ์อื่นๆ ของบุคคลใดๆ
              </p>
              
              <h3 className="font-semibold text-foreground">4. ทรัพย์สินทางปัญญา</h3>
              <p>
                บริการและเนื้อหาต้นฉบับ (ไม่รวมเนื้อหาที่ผู้ใช้ให้มา), คุณลักษณะ, และฟังก์ชันการทำงานเป็นและจะยังคงเป็นทรัพย์สินแต่เพียงผู้เดียวของ SAIFAH Screen และผู้ให้อนุญาต บริการนี้ได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์, เครื่องหมายการค้า, และกฎหมายอื่นๆ ทั้งในประเทศไทยและต่างประเทศ
              </p>

              <h3 className="font-semibold text-foreground">5. นโยบายความเป็นส่วนตัว</h3>
              <p>
                เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณ เช่น ชื่อ, อีเมล, และข้อมูลการใช้งาน เพื่อให้บริการและปรับปรุงบริการให้ดียิ่งขึ้น เรามุ่งมั่นที่จะปกป้องข้อมูลของคุณและจะไม่แบ่งปันข้อมูลของคุณกับบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ ยกเว้นตามที่กฎหมายกำหนด การใช้งานบริการนี้ถือว่าคุณยอมรับการเก็บรวบรวมและใช้งานข้อมูลตามนโยบายความเป็นส่วนตัวของเรา
              </p>
                
              <h3 className="font-semibold text-foreground">6. การยกเลิกบริการ</h3>
               <p>
                เราอาจยกเลิกหรือระงับบัญชีของคุณได้ทันที โดยไม่ต้องแจ้งให้ทราบล่วงหน้าหรือรับผิด สำหรับเหตุผลใดๆ ก็ตาม รวมถึงแต่ไม่จำกัดเพียงหากคุณละเมิดข้อตกลง
              </p>
              
              <h3 className="font-semibold text-foreground">7. การเปลี่ยนแปลงข้อตกลง</h3>
              <p>
                เราขอสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงข้อตกลงเหล่านี้ได้ตลอดเวลาตามดุลยพินิจของเราแต่เพียงผู้เดียว หากการแก้ไขนั้นเป็นสาระสำคัญ เราจะพยายามแจ้งให้ทราบล่วงหน้าอย่างน้อย 30 วันก่อนที่ข้อตกลงใหม่จะมีผลบังคับใช้ การใช้งานบริการต่อไปหลังจากการแก้ไขมีผลบังคับใช้ ถือว่าคุณยอมรับที่จะผูกพันตามข้อตกลงที่แก้ไขแล้ว
              </p>
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
                id="terms-checkbox-dialog"
                checked={checkboxChecked}
                onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
            />
            <Label htmlFor="terms-checkbox-dialog" className="text-sm">ข้าพเจ้าได้อ่านและยอมรับข้อตกลงและเงื่อนไขทั้งหมดแล้ว</Label>
          </div>
          <Button type="button" onClick={handleAccept} disabled={!checkboxChecked}>
            ยอมรับและดำเนินการต่อ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
