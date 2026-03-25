'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Undo2, Redo2 } from "lucide-react";

interface CanvasToolbarProps {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export default function CanvasToolbar({ undo, redo, canUndo, canRedo }: CanvasToolbarProps) {
    return (
        <div className="absolute top-4 left-4 z-30 flex items-center gap-1 rounded-lg border border-border/50 bg-card/80 p-1 shadow-lg backdrop-blur-sm">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={undo} disabled={!canUndo} aria-label="ย้อนกลับ">
                            <Undo2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom"><p>ย้อนกลับ (Ctrl+Z)</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={redo} disabled={!canRedo} aria-label="ทำซ้ำ">
                            <Redo2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                     <TooltipContent side="bottom"><p>ทำซ้ำ (Ctrl+Y)</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
