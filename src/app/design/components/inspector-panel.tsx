
'use client';

import {
  Image as ImageIcon, Trash2, Type, ChevronsUp, ChevronsDown, AlignCenter, AlignLeft, AlignRight, FlipHorizontal, FlipVertical, Copy, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator as DropdownMenuSeparatorPrimitive,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from "@/lib/utils";
import type { DesignElement } from "./design-tool";
import { Separator } from "@/components/ui/separator";
import { allFonts, thaiFonts, englishFonts } from '@/lib/fonts';

interface InspectorPanelProps {
  selectedElement: DesignElement;
  updateElement: (id: string, props: Partial<DesignElement>, pushToHistory?: boolean) => void;
  deleteElement: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  duplicateElement: (id: string) => void;
}

const LabeledControl = ({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) => (
    <div className={cn("grid gap-2", className)}>
        <Label className="text-xs text-muted-foreground">{label}</Label>
        {children}
    </div>
);

export default function InspectorPanel({
    selectedElement, updateElement, deleteElement, bringToFront, sendToBack, duplicateElement
}: InspectorPanelProps) {
    const hasShadow = selectedElement?.textShadow && selectedElement.textShadow !== 'none';
    const shadowParts = hasShadow ? selectedElement!.textShadow!.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g) || [] : [];
    const shadowX = shadowParts[0] ? parseFloat(shadowParts[0]) : 2;
    const shadowY = shadowParts[1] ? parseFloat(shadowParts[1]) : 2;
    const shadowBlur = shadowParts[2] ? parseFloat(shadowParts[2]) : 4;
    const shadowColor = shadowParts[3] || '#000000';

    const updateTextShadow = (x: number, y: number, blur: number, color: string) => {
        if (!selectedElement) return;
        const newShadow = `${x}px ${y}px ${blur}px ${color}`;
        updateElement(selectedElement.id, { textShadow: newShadow });
    }
    
    const toggleShadow = (enabled: boolean) => {
        if (!selectedElement) return;
        const newShadow = enabled ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` : 'none';
        updateElement(selectedElement.id, { textShadow: newShadow });
    }

    const updateFlip = (axis: 'horizontal' | 'vertical') => {
        if (!selectedElement) return;
        const currentFlip = selectedElement.flip || { horizontal: false, vertical: false };
        updateElement(selectedElement.id, { flip: { ...currentFlip, [axis]: !currentFlip[axis] }})
    }

    const isText = selectedElement?.type === 'text';
    const isImage = selectedElement?.type === 'image';
    
    const fontWeights = [
        { name: "ปกติ", value: 400 },
        { name: "ปานกลาง", value: 500 },
        { name: "หนา", value: 700 },
        { name: "หนามาก", value: 900 },
    ];

    const widthValue = parseFloat(selectedElement.width as string);
    const heightValue = parseFloat(selectedElement.height as string);

  return (
    <div className="p-4 space-y-4">
        <div className="px-2 pb-2 border-b">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                {isText && <Type className="h-5 w-5"/>}
                {isImage && <ImageIcon className="h-5 w-5" />}
                เครื่องมือแก้ไข
            </h3>
            <Input 
                value={selectedElement.name}
                onChange={(e) => updateElement(selectedElement.id, {name: e.target.value}, false)}
                className="font-semibold text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto mt-1"
            />
        </div>
        
        {isText && (
            <div className="px-2">
                <Textarea 
                value={selectedElement.text} 
                onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                placeholder="ข้อความของคุณ"
                className="min-h-[80px]"
                />
            </div>
        )}
        
        <TooltipProvider>
            <Accordion type="multiple" defaultValue={['transform', 'style', 'appearance', 'arrange']} className="w-full">
                
                <AccordionItem value="transform">
                    <AccordionTrigger>การจัดวาง</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <LabeledControl label="ตำแหน่ง">
                            <div className="flex gap-2">
                                <Input type="number" value={Math.round(selectedElement.x)} onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) || 0 })} addon="X" />
                                <Input type="number" value={Math.round(selectedElement.y)} onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) || 0 })} addon="Y" />
                            </div>
                        </LabeledControl>
                         <LabeledControl label="ขนาด">
                            <div className="flex gap-2">
                                <Input 
                                    type="number" 
                                    value={isNaN(widthValue) ? '' : Math.round(widthValue)} 
                                    onChange={(e) => updateElement(selectedElement.id, { width: parseInt(e.target.value) || 0 })} 
                                    placeholder={isNaN(widthValue) ? String(selectedElement.width) : ''}
                                    addon="W" 
                                />
                                <Input 
                                    type="number" 
                                    value={isNaN(heightValue) ? '' : Math.round(heightValue)} 
                                    onChange={(e) => updateElement(selectedElement.id, { height: parseInt(e.target.value) || 0 })} 
                                    placeholder={isNaN(heightValue) ? String(selectedElement.height) : ''}
                                    addon="H" 
                                />
                            </div>
                        </LabeledControl>
                        <LabeledControl label="การหมุน">
                            <div className="flex items-center gap-2">
                                <Slider
                                    value={[selectedElement.rotation || 0]}
                                    onValueChange={([v]) => updateElement(selectedElement.id, { rotation: v }, false)}
                                    onValueCommit={([v]) => updateElement(selectedElement.id, { rotation: v })}
                                    min={-180}
                                    max={180}
                                    step={1}
                                    className="flex-1"
                                />
                                <div className="flex h-10 items-center rounded-md border border-input bg-background">
                                    <Input
                                        type="number"
                                        value={Math.round(selectedElement.rotation || 0)}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            if (!isNaN(value)) {
                                                updateElement(selectedElement.id, { rotation: value });
                                            }
                                        }}
                                        className="w-16 border-0 bg-transparent text-right ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
                                        min={-180}
                                        max={180}
                                    />
                                    <span className="pr-2 text-sm text-muted-foreground pointer-events-none">°</span>
                                    <Separator orientation="vertical" className="h-full" />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-full w-9 rounded-l-none">
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: -180 })}>-180°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: -135 })}>-135°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: -90 })}>-90°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: -45 })}>-45°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: 0 })}>0°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: 45 })}>45°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: 90 })}>90°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: 135 })}>135°</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => updateElement(selectedElement.id, { rotation: 180 })}>180°</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </LabeledControl>
                    </AccordionContent>
                </AccordionItem>
                
                {isText && (
                <AccordionItem value="style">
                    <AccordionTrigger>สไตล์ข้อความ</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <LabeledControl label="ฟอนต์">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <span style={{ fontFamily: selectedElement.fontFamily }} className="truncate">
                                            {allFonts.find(f => f.value === selectedElement.fontFamily)?.name || 'เลือกฟอนต์'}
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                                     <ScrollArea className="h-80">
                                        <DropdownMenuLabel>ฟอนต์ภาษาไทย</DropdownMenuLabel>
                                        {thaiFonts.map(font => <DropdownMenuItem key={font.value} onSelect={() => updateElement(selectedElement.id, { fontFamily: font.value })} style={{fontFamily: font.value}}>{font.name}</DropdownMenuItem>)}
                                        <DropdownMenuSeparatorPrimitive />
                                        <DropdownMenuLabel>ฟอนต์ภาษาอังกฤษ</DropdownMenuLabel>
                                        {englishFonts.map(font => <DropdownMenuItem key={font.value} onSelect={() => updateElement(selectedElement.id, { fontFamily: font.value })} style={{fontFamily: font.value}}>{font.name}</DropdownMenuItem>)}
                                     </ScrollArea>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </LabeledControl>
                         <LabeledControl label="ความหนา">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <span>
                                            {fontWeights.find(f => f.value === selectedElement.fontWeight)?.name || 'ปกติ'}
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                                    {fontWeights.map(w => <DropdownMenuItem key={w.value} onSelect={() => updateElement(selectedElement.id, { fontWeight: w.value })}>{w.name}</DropdownMenuItem>)}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </LabeledControl>
                        <div className="flex gap-2">
                            <LabeledControl label="ขนาด"><Input type="number" value={selectedElement.fontSize} onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) || 0 })} /></LabeledControl>
                            <LabeledControl label="ระยะห่าง"><Input type="number" value={selectedElement.letterSpacing} onChange={(e) => updateElement(selectedElement.id, { letterSpacing: parseFloat(e.target.value) || 0 })} /></LabeledControl>
                            <LabeledControl label="สูง"><Input type="number" value={selectedElement.lineHeight} onChange={(e) => updateElement(selectedElement.id, { lineHeight: parseFloat(e.target.value) || 0 })} min={0.5} step={0.1} /></LabeledControl>
                        </div>
                        <LabeledControl label="การจัดแนว">
                            <RadioGroup value={selectedElement.textAlign} onValueChange={(value: 'left' | 'center' | 'right') => updateElement(selectedElement.id, { textAlign: value })} className="grid grid-cols-3 gap-2">
                                <Label htmlFor="align-left" className={cn("flex items-center justify-center rounded-md border p-2 text-sm font-medium hover:bg-accent cursor-pointer", selectedElement.textAlign === 'left' ? 'border-primary bg-accent' : 'border-input')}><RadioGroupItem value="left" id="align-left" className="peer sr-only" /><AlignLeft className="h-5 w-5" /></Label>
                                <Label htmlFor="align-center" className={cn("flex items-center justify-center rounded-md border p-2 text-sm font-medium hover:bg-accent cursor-pointer", selectedElement.textAlign === 'center' ? 'border-primary bg-accent' : 'border-input')}><RadioGroupItem value="center" id="align-center" className="peer sr-only" /><AlignCenter className="h-5 w-5" /></Label>
                                <Label htmlFor="align-right" className={cn("flex items-center justify-center rounded-md border p-2 text-sm font-medium hover:bg-accent cursor-pointer", selectedElement.textAlign === 'right' ? 'border-primary bg-accent' : 'border-input')}><RadioGroupItem value="right" id="align-right" className="peer sr-only" /><AlignRight className="h-5 w-5" /></Label>
                            </RadioGroup>
                        </LabeledControl>
                    </AccordionContent>
                </AccordionItem>
                )}

                 <AccordionItem value="appearance">
                    <AccordionTrigger>ลักษณะ</AccordionTrigger>
                     <AccordionContent className="space-y-4">
                        <LabeledControl label="ความทึบ"><Slider value={[selectedElement.opacity ?? 1]} onValueChange={([v]) => updateElement(selectedElement.id, { opacity: v }, false)} onValueCommit={([v]) => updateElement(selectedElement.id, { opacity: v })} min={0} max={1} step={0.01} /></LabeledControl>
                       {isText && (
                        <div className='space-y-4'>
                            <div className="flex gap-4">
                                <LabeledControl label="สีพื้น" className="flex-1"><Input type="color" value={selectedElement.color} onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })} className="p-0 h-8 w-full"/></LabeledControl>
                                <LabeledControl label="สีเส้นขอบ" className="flex-1"><Input type="color" value={selectedElement.strokeColor} onChange={(e) => updateElement(selectedElement.id, { strokeColor: e.target.value })} className="p-0 h-8 w-full"/></LabeledControl>
                            </div>
                            <LabeledControl label="หนาเส้นขอบ"><Slider value={[selectedElement.strokeWidth || 0]} onValueChange={([v]) => updateElement(selectedElement.id, { strokeWidth: v }, false)} onValueCommit={([v]) => updateElement(selectedElement.id, { strokeWidth: v })} min={0} max={10} step={0.1} /></LabeledControl>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <Label>เงา</Label>
                                <Switch checked={hasShadow} onCheckedChange={toggleShadow} />
                            </div>
                            {hasShadow && (
                                <div className="space-y-4 pt-4 mt-4 border-t">
                                    <LabeledControl label="สี"><Input type="color" value={shadowColor} onChange={(e) => updateTextShadow(shadowX, shadowY, shadowBlur, e.target.value)} className="p-0 h-8 w-full"/></LabeledControl>
                                    <LabeledControl label="ความเบลอ"><Slider value={[shadowBlur]} onValueChange={([v]) => updateTextShadow(shadowX, shadowY, v, shadowColor)} min={0} max={20} step={1} /></LabeledControl>
                                    <LabeledControl label="ตำแหน่ง">
                                        <div className="grid grid-cols-2 gap-2">
                                        <Input type="number" value={shadowX} onChange={(e) => updateTextShadow(parseFloat(e.target.value), shadowY, shadowBlur, shadowColor)} step={1} addon="X" />
                                        <Input type="number" value={shadowY} onChange={(e) => updateTextShadow(shadowX, parseFloat(e.target.value), shadowBlur, shadowColor)} step={1} addon="Y" />
                                        </div>
                                    </LabeledControl>
                                </div>
                            )}
                        </div>
                       )}
                       {isImage && (
                        <>
                        <LabeledControl label="ความสว่าง"><Slider value={[selectedElement.filters?.brightness ?? 100]} onValueChange={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, brightness: v} }, false)} onValueCommit={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, brightness: v} })} min={0} max={200} step={1} /></LabeledControl>
                        <LabeledControl label="คอนทราสต์"><Slider value={[selectedElement.filters?.contrast ?? 100]} onValueChange={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, contrast: v} }, false)} onValueCommit={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, contrast: v} })} min={0} max={200} step={1} /></LabeledControl>
                        <LabeledControl label="สีเทา"><Slider value={[selectedElement.filters?.grayscale ?? 0]} onValueChange={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, grayscale: v} }, false)} onValueCommit={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, grayscale: v} })} min={0} max={100} step={1} /></LabeledControl>
                        <LabeledControl label="สีซีเปีย"><Slider value={[selectedElement.filters?.sepia ?? 0]} onValueChange={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, sepia: v} }, false)} onValueCommit={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, sepia: v} })} min={0} max={100} step={1} /></LabeledControl>
                        </>
                       )}
                    </AccordionContent>
                 </AccordionItem>

                 <AccordionItem value="arrange">
                    <AccordionTrigger>การจัดการ</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <LabeledControl label="ลำดับชั้น">
                           <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" onClick={() => bringToFront(selectedElement.id)}><ChevronsUp className="mr-2 h-4 w-4" /> ไว้หน้าสุด</Button>
                                <Button variant="outline" onClick={() => sendToBack(selectedElement.id)}><ChevronsDown className="mr-2 h-4 w-4" /> ไว้หลังสุด</Button>
                            </div>
                        </LabeledControl>
                        {isImage && (
                        <LabeledControl label="พลิก">
                           <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" onClick={() => updateFlip('horizontal')}><FlipHorizontal className="mr-2 h-4 w-4" /> แนวนอน</Button>
                                <Button variant="outline" onClick={() => updateFlip('vertical')}><FlipVertical className="mr-2 h-4 w-4" /> แนวตั้ง</Button>
                            </div>
                        </LabeledControl>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </TooltipProvider>

        <div className="p-2 mt-auto border-t border-border/50 space-y-2 shrink-0">
            <Button variant="outline" className="w-full" onClick={() => duplicateElement(selectedElement.id)}>
                <Copy className="mr-2 h-4 w-4" /> ทำซ้ำองค์ประกอบ
            </Button>
            <Button variant="destructive" className="w-full" onClick={() => deleteElement(selectedElement.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> ลบองค์ประกอบ
            </Button>
        </div>
    </div>
  );
}
