'use client';

import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect } from 'react';
import { Loader2, Palette, ShoppingBag, User as UserIcon, PlusCircle, Sparkles, LayoutGrid } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import AnimateOnScroll from '@/components/animate-on-scroll';

export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login?redirect=/account');
    }
  }, [user, isUserLoading, router]);

  // Data fetching
  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [user, firestore]);
  const designsQuery = useMemoFirebase(() => user ? query(collection(firestore, 'users', user.uid, 'designs'), orderBy('updatedAt', 'desc')) : null, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<any>(userDocRef);
  const { data: designs, isLoading: isDesignsLoading } = useCollection(designsQuery);

  const isLoading = isUserLoading || isProfileLoading || isDesignsLoading;

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const latestDesign = designs?.[0];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
        
        <AnimateOnScroll delay={100} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-12">
            <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile?.photoURL} alt={userProfile?.firstName || user.email || 'User'} />
                <AvatarFallback>
                    <UserIcon className="h-10 w-10" />
                </AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-headline font-bold text-center md:text-left">
                    สวัสดี, {userProfile?.firstName || user.email}
                </h1>
                <p className="text-muted-foreground text-center md:text-left">
                    ยินดีต้อนรับสู่บัญชีของคุณ นี่คือศูนย์กลางสำหรับจัดการดีไซน์และโปรเจคของคุณ
                </p>
            </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <AnimateOnScroll as={Link} href="/design" delay={200} className="flex">
                <Card className="w-full flex flex-col items-center justify-center text-center group transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-gradient-to-br from-primary/5 via-background to-background">
                    <CardContent className="p-8">
                        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-foreground">เริ่มออกแบบ/แก้ไขดีไซน์</h3>
                        <p className="text-muted-foreground mt-1">
                           สร้างผลงานใหม่ หรือแก้ไขดีไซน์ล่าสุดของคุณ
                        </p>
                    </CardContent>
                </Card>
            </AnimateOnScroll>
            
            <AnimateOnScroll as={Link} href="/account/my-designs" delay={300} className="flex">
                <Card className="w-full flex flex-col group transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <LayoutGrid />
                            <span>ประวัติการออกแบบ</span>
                        </CardTitle>
                        <CardDescription>
                            ดูโปรเจคและดีไซน์ทั้งหมดที่คุณเคยสร้าง
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                         <div className="text-4xl font-bold">{designs?.length || 0}</div>
                         <p className="text-sm text-muted-foreground">ดีไซน์ทั้งหมด</p>
                    </CardContent>
                    <CardFooter className='text-xs text-muted-foreground'>
                        {latestDesign ? (
                            <p>ล่าสุด: <span className='font-medium text-foreground'>{latestDesign.name}</span></p>
                        ) : (
                            <p>ยังไม่มีดีไซน์ที่สร้างไว้</p>
                        )}
                    </CardFooter>
                </Card>
            </AnimateOnScroll>
        </div>
    </div>
  );
}
