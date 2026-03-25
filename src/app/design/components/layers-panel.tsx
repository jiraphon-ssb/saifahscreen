'use client';

import { Eye, Layers, Type, Image as ImageIcon, ChevronsDown, ChevronsUp, EyeOff, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { DesignElement } from './design-tool';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LayersPanelProps {
  elements: DesignElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicateElement: (id: string) => void;
}

export default function LayersPanel({
  elements,
  selectedElementId,
  onSelectElement,
  onBringToFront,
  onSendToBack,
  onToggleVisibility,
  onDuplicateElement,
}: LayersPanelProps) {
  
  const reversedElements = [...elements].reverse();

  return (
    <TooltipProvider>
      <div className="p-4 h-full flex flex-col">
        <h3 className="text-sm font-medium text-muted-foreground px-2 mb-4 flex items-center gap-2">
            <Layers className='h-4 w-4' />
            เลเยอร์
        </h3>
        {elements.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground text-sm">
            <p>เลเยอร์ดีไซน์ของคุณจะแสดงที่นี่</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 -mx-4 min-h-0">
            <div className="space-y-2 px-4">
              {reversedElements.map((element) => (
                <Card
                  key={element.id}
                  onClick={() => onSelectElement(element.id)}
                  className={cn(
                    'group cursor-pointer transition-colors hover:bg-accent',
                    selectedElementId === element.id && 'bg-accent border-primary',
                    element.visible === false && 'opacity-50'
                  )}
                >
                  <CardContent className="p-2 flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 flex items-center justify-center">
                        {element.type === 'text' ? <Type className="h-4 w-4 text-muted-foreground" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <p className="flex-1 text-sm truncate">{element.name}</p>
                    
                    <div className="flex items-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onToggleVisibility(element.id); }}>
                                {element.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top"><p>เปิด/ปิด</p></TooltipContent>
                      </Tooltip>
                       <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onDuplicateElement(element.id); }}>
                                <Copy className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>ทำซ้ำ</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onBringToFront(element.id); }}><ChevronsUp className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>ไว้หน้าสุด</p></TooltipContent>
                      </Tooltip>
                       <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onSendToBack(element.id); }}><ChevronsDown className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>ไว้หลังสุด</p></TooltipContent>
                      </Tooltip>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </TooltipProvider>
  );
}
