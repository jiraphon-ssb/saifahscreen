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

const tools = [
  { id: 'Product', icon: Shirt, label: 'สินค้า', requiresSelection: false },
  { id: 'Elements', icon: PlusSquare, label: 'เพิ่ม', requiresSelection: false },
  { id: 'Layers', icon: Layers, label: 'เลเยอร์', requiresSelection: false },
  { id: 'Inspector', icon: SlidersHorizontal, label: 'แก้ไข', requiresSelection: true },
] as const;

export default function MainToolbar({ activeTool, setActiveTool, selectedElementId }: MainToolbarProps) {

  const renderToolButton = (tool: typeof tools[number], isMobile = false) => {
    const isDisabled = tool.requiresSelection && !selectedElementId;
    
    const button = (
        <Button
          variant={activeTool === tool.id && !isMobile ? 'secondary' : 'ghost'}
          size="icon"
          className={isMobile 
            ? "h-full w-full flex-col gap-1 text-xs rounded-lg whitespace-normal leading-tight py-2"
            : "h-16 w-16 flex-col gap-1 text-xs"
          }
          onClick={() => setActiveTool(tool.id)}
          disabled={isDisabled}
          data-state={activeTool === tool.id ? 'active' : 'inactive'}
        >
          <tool.icon className="h-5 w-5" />
          <span>{tool.label}</span>
        </Button>
    );

    if (isMobile) {
        return button;
    }

    return (
        <Tooltip key={tool.id}>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right"><p>{tool.label}</p></TooltipContent>
        </Tooltip>
    )
  }
  
  return (
    <>
        {/* Desktop Toolbar */}
        <aside className="hidden md:flex h-full w-[80px] shrink-0 flex-col items-center gap-2 border-r border-border/50 bg-card p-2">
            <TooltipProvider delayDuration={0}>
                {tools.map(tool => renderToolButton(tool))}
            </TooltipProvider>
        </aside>

        {/* Mobile Toolbar */}
        <aside className="md:hidden flex h-20 w-full shrink-0 items-stretch border-t bg-card p-1 gap-1">
            {tools.map(tool => (
              <div key={tool.id} className="flex-1">
                {renderToolButton(tool, true)}
              </div>
            ))}
        </aside>
    </>
  );
}
