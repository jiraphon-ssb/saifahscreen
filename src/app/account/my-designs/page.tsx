'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, PackageOpen, PlusCircle, FileText, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/animate-on-scroll';
import DesignPreview from '@/app/account/my-designs/design-preview';
import { useToast } from '@/hooks/use-toast';

export default function MyDesignsHistoryPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login?redirect=/account/my-designs');
    }
  }, [user, isUserLoading, router]);

  const designsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, `users/${user.uid}/designs`), orderBy('updatedAt', 'desc'));
  }, [user, firestore]);

  const { data: designs, isLoading: isLoadingDesigns } = useCollection<any>(designsQuery);
  
  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return 'ไม่ระบุวันที่';
    return timestamp.toDate().toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const handleDownload = () => {
      toast({
          title: "ยังไม่รองรับฟังก์ชันนี้",
          description: "ฟังก์ชันดาวน์โหลดไฟล์สรุปทั้งหมด (ZIP) กำลังอยู่ในระหว่างการพัฒนาครับ",
      });
  };


  if (isUserLoading || isLoadingDesigns) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimateOnScroll delay={100} className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-headline font-bold">ประวัติการออกแบบ</h1>
            <p className="text-muted-foreground">รวมโปรเจคและดีไซน์ทั้งหมดที่คุณเคยสร้าง</p>
        </div>
        <Button asChild>
            <Link href="/design">
              <PlusCircle className='mr-2 h-4 w-4' />
              เริ่มดีไซน์ใหม่
            </Link>
        </Button>
      </AnimateOnScroll>

      {!designs || designs.length === 0 ? (
        <AnimateOnScroll delay={200} className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/20">
            <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">ยังไม่มีดีไซน์ที่สร้างไว้</h3>
            <p className="mt-1 text-sm text-muted-foreground">ดีไซน์ที่คุณสร้างและทำสรุปไว้จะแสดงที่นี่</p>
            <Button asChild className="mt-4">
                <Link href="/design">สร้างดีไซน์แรกของคุณ</Link>
            </Button>
        </AnimateOnScroll>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design, index) => (
                <AnimateOnScroll 
                    key={design.id}
                    delay={200 + index * 100}
                >
                    <Card className="flex flex-col h-full group">
                        <CardContent className="p-4 flex-1 flex flex-col">
                           <div className="relative aspect-square w-full rounded-lg bg-slate-100 mb-4 overflow-hidden border">
                                <DesignPreview design={design} size={400} />
                           </div>
                           <div className='flex-1'>
                                <h3 className="font-headline font-bold text-lg truncate">{design.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    แก้ไขล่าสุด: {formatDate(design.updatedAt)}
                                </p>
                           </div>
                        </CardContent>
                        <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                             <Button asChild variant="outline">
                                <Link href={`/design/${design.id}`}>
                                    <Pencil className="mr-2 h-4 w-4"/>
                                    แก้ไข
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={`/summary/${design.id}`}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    ดูสรุป
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </AnimateOnScroll>
            ))}
        </div>
      )}
    </div>
  );
}
