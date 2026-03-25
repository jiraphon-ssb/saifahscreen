'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SizeChart() {
    const premiumSizes = [
      { size: 'S', chest: '38', length: '26' },
      { size: 'M', chest: '40', length: '27' },
      { size: 'L', chest: '42', length: '28' },
      { size: 'XL', chest: '44', length: '29' },
      { size: '2XL', chest: '46', length: '30' },
      { size: '3XL', chest: '48', length: '31' },
    ];
  
    const oversizeSizes = [
      { size: 'S', chest: '42', length: '28' },
      { size: 'L', chest: '46', length: '30.5' },
      { size: '2XL', chest: '52', length: '32' },
    ];

    const renderTable = (sizes: typeof premiumSizes) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[80px]'>Size</TableHead>
                    <TableHead>รอบอก (นิ้ว)</TableHead>
                    <TableHead>ความยาว (นิ้ว)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sizes.map(s => (
                    <TableRow key={s.size}>
                        <TableCell className="font-bold">{s.size}</TableCell>
                        <TableCell>{s.chest}</TableCell>
                        <TableCell>{s.length}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
  
    return (
        <div className="p-8 rounded-lg border bg-card shadow-sm">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="font-headline text-3xl">ตารางไซส์</CardTitle>
                <CardDescription className="mt-2">ตรวจสอบขนาดเสื้อแต่ละประเภทให้ถูกต้องก่อนสั่งซื้อ</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue="premium">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="premium">Premium Cotton</TabsTrigger>
                        <TabsTrigger value="oversize">Oversize Cotton</TabsTrigger>
                    </TabsList>
                    <TabsContent value="premium" className='mt-6'>
                       {renderTable(premiumSizes)}
                    </TabsContent>
                    <TabsContent value="oversize" className='mt-6'>
                       {renderTable(oversizeSizes)}
                    </TabsContent>
                </Tabs>
                <p className="text-xs text-muted-foreground text-center mt-4">*ราคาเดียวกันทุก Size ไม่บวกเพิ่ม</p>
            </CardContent>
        </div>
    );
}
