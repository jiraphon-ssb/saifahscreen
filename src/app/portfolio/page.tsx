'use client';

import { useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import AnimateOnScroll from '@/components/animate-on-scroll';

// Filter items that are for the portfolio
const portfolioItems: ImagePlaceholder[] = PlaceHolderImages.filter(p => p.id.startsWith('portfolio-'));

const filterTabs = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'company', name: 'เสื้อบริษัท/องค์กร' },
    { id: 'organization', name: 'เสื้อหน่วยงาน' },
    { id: 'university', name: 'เสื้อโรงเรียน/มหาวิทยาลัย' },
    { id: 'event', name: 'เสื้อกิจกรรม' },
    { id: 'sme', name: 'เสื้อธุรกิจSME' },
    { id: 'other', name: 'เสื้อดีไซน์อื่นๆ' }
];

export default function PortfolioPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('category') || 'all';

    const filteredItems = useMemo(() => {
        if (activeTab === 'all') {
            return portfolioItems;
        }
        return portfolioItems.filter(item => item.category === activeTab);
    }, [activeTab]);

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value === 'all') {
            params.delete('category');
        } else {
            params.set('category', value);
        }
        // Use router.push to update the URL without a full page reload
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="bg-muted/50">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <AnimateOnScroll delay={100} className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">ผลงานออกแบบเสื้อ</h1>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg mt-2">
                        ชมตัวอย่างผลงานคุณภาพจาก SAIFAH เพื่อเป็นแรงบันดาลใจในการออกแบบของคุณ
                    </p>
                </AnimateOnScroll>

                <AnimateOnScroll delay={200}>
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                        <div className="flex justify-center mb-8">
                            <TabsList className="flex-wrap h-auto">
                                {filterTabs.map(tab => (
                                    <TabsTrigger 
                                        key={tab.id} 
                                        value={tab.id} 
                                    >
                                        {tab.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        
                        <TabsContent value={activeTab} className="mt-0">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                {filteredItems.map((item, index) => (
                                    <AnimateOnScroll key={item.id} delay={index * 50}>
                                        <Card className="overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                            <div className="aspect-square relative">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.description}
                                                    className="w-full h-full object-cover"
                                                    data-ai-hint={item.imageHint}
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
