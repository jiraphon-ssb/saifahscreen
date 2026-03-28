'use client';

import { Shirt, PlusSquare, Layers, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ActiveTool } from './design-tool';

interface MainToolbarProps {
  activeTool: ActiveTool;
  setActiveTool: (tool: ActiveTool) => void;
  selectedElementId: string | null;
}

interface ToolItem {
  id: ActiveTool;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  needsSelection?: boolean;
}

const tools: ToolItem[] = [
  { id: 'Product', icon: Shirt, label: 'เลือกสินค้า' },
  { id: 'Elements', icon: PlusSquare, label: 'เพิ่มองค์ประกอบ' },
  { id: 'Layers', icon: Layers, label: 'จัดการเลเยอร์' },
  { id: 'Inspector', icon: SlidersHorizontal, label: 'แก้ไขคุณสมบัติ', needsSelection: true },
];

export default function MainToolbar({ activeTool, setActiveTool, selectedElementId }: MainToolbarProps) {
  return (
    <>
        <aside className="hidden md:flex h-full w-16 shrink-0 flex-col items-center gap-1 border-r border-border/50 bg-background py-3">
            <TooltipProvider delayDuration={300}>
                {tools.map((tool) => {
                    const isActive = activeTool === tool.id;
                    const isDisabled = tool.needsSelection && !selectedElementId;
                    
                    return (
                        <Tooltip key={tool.id}>
                            <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className={`h-14 w-14 flex-col gap-1 text-xs rounded-xl transition-all ${
                                    isActive 
                                      ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                  }`}
                                  onClick={() => !isDisabled && setActiveTool(tool.id)}
                                  disabled={isDisabled}
                                >
                                  <tool.icon className="h-5 w-5" />
                                  <span className="text-[10px] leading-tight">{tool.label.split(' ')[0]}</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{tool.label}</p>
                                {tool.needsSelection && <p className="text-xs text-muted-foreground">(เลือกองค์ประกอบก่อน)</p>}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </aside>

        <aside className="md:hidden flex h-16 w-full shrink-0 items-stretch border-t border-border bg-background px-2 py-2 gap-1">
            {tools.map((tool) => {
                const isActive = activeTool === tool.id;
                const isDisabled = tool.needsSelection && !selectedElementId;
                
                return (
                    <Button
                      key={tool.id}
                      variant="ghost"
                      className={`flex-1 flex-col gap-0.5 text-[10px] rounded-lg ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground'
                      }`}
                      onClick={() => !isDisabled && setActiveTool(tool.id)}
                      disabled={isDisabled}
                    >
                        <tool.icon className="h-5 w-5" />
                        <span className="leading-tight">{tool.label.split(' ')[0]}</span>
                    </Button>
                );
            })}
        </aside>
    </>
  );
}
