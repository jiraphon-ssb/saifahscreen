
'use client';

import {
  Image as ImageIcon, Trash2, Type, ChevronsUp, ChevronsDown, AlignCenter, AlignLeft, AlignRight, FlipHorizontal, FlipVertical, Copy, ChevronDown, Move, RotateCw, Layers
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
    <div className={cn("grid gap-1.5", className)}>
        <Label className="text-xs text-muted-foreground font-medium">{label}</Label>
        {children}
    </div>
);

export default function InspectorPanel({
    selectedElement, updateElement, deleteElement, bringToFront, sendToBack, duplicateElement
}: InspectorPanelProps) {
    const hasShadow = !!(selectedElement?.textShadow && selectedElement.textShadow !== 'none');
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
    <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-secondary/30">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    {isText && <Type className="h-4 w-4 text-primary" />}
                    {isImage && <ImageIcon className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                    <Input 
                        value={selectedElement.name}
                        onChange={(e) => updateElement(selectedElement.id, {name: e.target.value}, false)}
                        className="font-semibold text-sm bg-transparent border-0 focus-visible:ring-0 p-0 h-auto"
                    />
                    <p className="text-xs text-muted-foreground truncate">
                        {isText ? 'ข้อความ' : 'รูปภาพ'}
                    </p>
                </div>
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
            {isText && (
                <div className="p-4 border-b">
                    <Textarea 
                        value={selectedElement.text} 
                        onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                        placeholder="พิมพ์ข้อความ..."
                        className="min-h-[60px] text-sm"
                    />
                </div>
            )}
            
            <Accordion type="multiple" defaultValue={['transform', 'style', 'appearance', 'arrange']} className="w-full">
                
                <AccordionItem value="transform" className="px-4">
                    <AccordionTrigger className="text-sm py-3">
                        <span className="flex items-center gap-2">
                            <Move className="h-4 w-4" />
                            ตำแหน่ง & ขนาด
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        <div className="grid grid-cols-2 gap-2">
                            <LabeledControl label="X">
                                <Input 
                                    type="number" 
                                    value={Math.round(selectedElement.x)} 
                                    onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) || 0 })} 
                                    className="h-8"
                                />
                            </LabeledControl>
                            <LabeledControl label="Y">
                                <Input 
                                    type="number" 
                                    value={Math.round(selectedElement.y)} 
                                    onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) || 0 })} 
                                    className="h-8"
                                />
                            </LabeledControl>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <LabeledControl label="กว้าง">
                                <Input 
                                    type="number" 
                                    value={isNaN(widthValue) ? '' : Math.round(widthValue)} 
                                    onChange={(e) => updateElement(selectedElement.id, { width: parseInt(e.target.value) || 0 })} 
                                    placeholder={isNaN(widthValue) ? String(selectedElement.width) : ''}
                                    className="h-8"
                                />
                            </LabeledControl>
                            <LabeledControl label="สูง">
                                <Input 
                                    type="number" 
                                    value={isNaN(heightValue) ? '' : Math.round(heightValue)} 
                                    onChange={(e) => updateElement(selectedElement.id, { height: parseInt(e.target.value) || 0 })} 
                                    placeholder={isNaN(heightValue) ? String(selectedElement.height) : ''}
                                    className="h-8"
                                />
                            </LabeledControl>
                        </div>
                        <LabeledControl label={`หมุน ${selectedElement.rotation || 0}°`}>
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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            <RotateCw className="h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {[0, 45, 90, -45, -90, 180, -180].map(deg => (
                                            <DropdownMenuItem key={deg} onSelect={() => updateElement(selectedElement.id, { rotation: deg })}>
                                                {deg}°
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </LabeledControl>
                    </AccordionContent>
                </AccordionItem>
                
                {isText && (
                <AccordionItem value="style" className="px-4">
                    <AccordionTrigger className="text-sm py-3">
                        <span className="flex items-center gap-2">
                            <Type className="h-4 w-4" />
                            สไตล์ข้อความ
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        <LabeledControl label="ฟอนต์">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between h-8 text-sm">
                                        <span style={{ fontFamily: selectedElement.fontFamily }} className="truncate">
                                            {allFonts.find(f => f.value === selectedElement.fontFamily)?.name || 'เลือกฟอนต์'}
                                        </span>
                                        <ChevronDown className="h-3 w-3 ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>ฟอนต์ภาษาไทย</DropdownMenuLabel>
                                    {thaiFonts.map(font => (
                                        <DropdownMenuItem key={font.value} onSelect={() => updateElement(selectedElement.id, { fontFamily: font.value })} style={{fontFamily: font.value}}>
                                            {font.name}
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparatorPrimitive />
                                    <DropdownMenuLabel>ฟอนต์ภาษาอังกฤษ</DropdownMenuLabel>
                                    {englishFonts.map(font => (
                                        <DropdownMenuItem key={font.value} onSelect={() => updateElement(selectedElement.id, { fontFamily: font.value })} style={{fontFamily: font.value}}>
                                            {font.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </LabeledControl>
                        <div className="grid grid-cols-2 gap-2">
                            <LabeledControl label="ขนาด">
                                <Input 
                                    type="number" 
                                    value={selectedElement.fontSize} 
                                    onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) || 0 })} 
                                    className="h-8"
                                />
                            </LabeledControl>
                            <LabeledControl label="น้ำหนัก">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between h-8 text-sm">
                                            <span>{fontWeights.find(f => f.value === selectedElement.fontWeight)?.name || 'ปกติ'}</span>
                                            <ChevronDown className="h-3 w-3 ml-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {fontWeights.map(w => (
                                            <DropdownMenuItem key={w.value} onSelect={() => updateElement(selectedElement.id, { fontWeight: w.value })}>
                                                {w.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </LabeledControl>
                        </div>
                        <LabeledControl label="การจัดแนว">
                            <RadioGroup value={selectedElement.textAlign} onValueChange={(value: 'left' | 'center' | 'right') => updateElement(selectedElement.id, { textAlign: value })} className="grid grid-cols-3 gap-1">
                                <Label htmlFor="align-left" className={cn("flex items-center justify-center rounded-md border p-2 cursor-pointer", selectedElement.textAlign === 'left' ? 'border-primary bg-primary/10' : 'border-input hover:bg-secondary')}>
                                    <RadioGroupItem value="left" id="align-left" className="sr-only" />
                                    <AlignLeft className="h-4 w-4" />
                                </Label>
                                <Label htmlFor="align-center" className={cn("flex items-center justify-center rounded-md border p-2 cursor-pointer", selectedElement.textAlign === 'center' ? 'border-primary bg-primary/10' : 'border-input hover:bg-secondary')}>
                                    <RadioGroupItem value="center" id="align-center" className="sr-only" />
                                    <AlignCenter className="h-4 w-4" />
                                </Label>
                                <Label htmlFor="align-right" className={cn("flex items-center justify-center rounded-md border p-2 cursor-pointer", selectedElement.textAlign === 'right' ? 'border-primary bg-primary/10' : 'border-input hover:bg-secondary')}>
                                    <RadioGroupItem value="right" id="align-right" className="sr-only" />
                                    <AlignRight className="h-4 w-4" />
                                </Label>
                            </RadioGroup>
                        </LabeledControl>
                    </AccordionContent>
                </AccordionItem>
                )}

                <AccordionItem value="appearance" className="px-4">
                    <AccordionTrigger className="text-sm py-3">
                        <span className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            ลักษณะ
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        <LabeledControl label={`ความทึบ ${Math.round((selectedElement.opacity ?? 1) * 100)}%`}>
                            <Slider 
                                value={[selectedElement.opacity ?? 1]} 
                                onValueChange={([v]) => updateElement(selectedElement.id, { opacity: v }, false)} 
                                onValueCommit={([v]) => updateElement(selectedElement.id, { opacity: v })} 
                                min={0} max={1} step={0.01} 
                            />
                        </LabeledControl>
                        
                        {isText && (
                            <div className="space-y-3 pt-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <LabeledControl label="สีตัวอักษร">
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                type="color" 
                                                value={selectedElement.color} 
                                                onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })} 
                                                className="p-0 h-8 w-8 shrink-0 rounded"
                                            />
                                            <Input 
                                                value={selectedElement.color} 
                                                onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })} 
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                    </LabeledControl>
                                    <LabeledControl label="สีขอบ">
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                type="color" 
                                                value={selectedElement.strokeColor} 
                                                onChange={(e) => updateElement(selectedElement.id, { strokeColor: e.target.value })} 
                                                className="p-0 h-8 w-8 shrink-0 rounded"
                                            />
                                            <Input 
                                                value={selectedElement.strokeWidth?.toString() || '0'} 
                                                onChange={(e) => updateElement(selectedElement.id, { strokeWidth: parseFloat(e.target.value) || 0 })} 
                                                placeholder="0"
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                    </LabeledControl>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs">เงาตัวอักษร</Label>
                                    <Switch checked={hasShadow} onCheckedChange={toggleShadow} />
                                </div>
                                {hasShadow && (
                                    <div className="space-y-2 pt-2 border-t">
                                        <LabeledControl label="สีเงา">
                                            <div className="flex items-center gap-2">
                                                <Input 
                                                    type="color" 
                                                    value={shadowColor} 
                                                    onChange={(e) => updateTextShadow(shadowX, shadowY, shadowBlur, e.target.value)} 
                                                    className="p-0 h-7 w-7 shrink-0 rounded"
                                                />
                                                <Input 
                                                    type="number" 
                                                    value={shadowBlur} 
                                                    onChange={(e) => updateTextShadow(shadowX, shadowY, parseFloat(e.target.value) || 0, shadowColor)} 
                                                    placeholder="ความเบลอ"
                                                    className="h-7 text-sm"
                                                />
                                            </div>
                                        </LabeledControl>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {isImage && (
                            <div className="space-y-3 pt-2">
                                <LabeledControl label={`สว่าง ${selectedElement.filters?.brightness ?? 100}`}>
                                    <Slider 
                                        value={[selectedElement.filters?.brightness ?? 100]} 
                                        onValueChange={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, brightness: v} }, false)} 
                                        onValueCommit={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, brightness: v} })} 
                                        min={0} max={200} step={1} 
                                    />
                                </LabeledControl>
                                <LabeledControl label={`คอนทราสต์ ${selectedElement.filters?.contrast ?? 100}`}>
                                    <Slider 
                                        value={[selectedElement.filters?.contrast ?? 100]} 
                                        onValueChange={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, contrast: v} }, false)} 
                                        onValueCommit={([v]) => updateElement(selectedElement.id, { filters: {...selectedElement.filters!, contrast: v} })} 
                                        min={0} max={200} step={1} 
                                    />
                                </LabeledControl>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="arrange" className="px-4">
                    <AccordionTrigger className="text-sm py-3">
                        <span className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            การจัดเรียง
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pt-2">
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" onClick={() => bringToFront(selectedElement.id)}>
                                <ChevronsUp className="mr-1 h-3 w-3" /> หน้าสุด
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => sendToBack(selectedElement.id)}>
                                <ChevronsDown className="mr-1 h-3 w-3" /> หลังสุด
                            </Button>
                        </div>
                        {isImage && (
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Button variant="outline" size="sm" onClick={() => updateFlip('horizontal')}>
                                    <FlipHorizontal className="mr-1 h-3 w-3" /> พลิกซ้าย
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => updateFlip('vertical')}>
                                    <FlipVertical className="mr-1 h-3 w-3" /> พลิกขวา
                                </Button>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>

        <div className="p-3 border-t bg-secondary/30 space-y-2">
            <Button variant="secondary" size="sm" className="w-full" onClick={() => duplicateElement(selectedElement.id)}>
                <Copy className="mr-2 h-3 w-3" /> ทำซ้ำ
            </Button>
            <Button variant="destructive" size="sm" className="w-full" onClick={() => deleteElement(selectedElement.id)}>
                <Trash2 className="mr-2 h-3 w-3" /> ลบ
            </Button>
        </div>
    </div>
  );
}
