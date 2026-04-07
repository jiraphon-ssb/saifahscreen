"use client";

import { Shirt, PlusSquare, Layers, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "./design-tool";

interface MainToolbarProps {
  activeTool: ActiveTool;
  setActiveTool: (tool: ActiveTool) => void;
  selectedElementId: string | null;
}

interface ToolItem {
  id: ActiveTool;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortLabel: string;
  needsSelection?: boolean;
}

const tools: ToolItem[] = [
  { id: "Product", icon: Shirt, label: "เลือกสินค้า", shortLabel: "สินค้า" },
  {
    id: "Elements",
    icon: PlusSquare,
    label: "เพิ่มองค์ประกอบ",
    shortLabel: "เพิ่ม",
  },
  {
    id: "Inspector",
    icon: SlidersHorizontal,
    label: "แก้ไขคุณสมบัติ",
    shortLabel: "แก้ไข",
    needsSelection: true,
  },
  { id: "Layers", icon: Layers, label: "จัดการเลเยอร์", shortLabel: "เลเยอร์" },
];

export default function MainToolbar({
  activeTool,
  setActiveTool,
  selectedElementId,
}: MainToolbarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-full w-[72px] shrink-0 flex-col items-center gap-2 border-r border-zinc-200 bg-white py-5 z-40">
        <TooltipProvider delayDuration={300}>
          {tools.map((tool) => {
            const isActive = activeTool === tool.id;
            const isDisabled = tool.needsSelection && !selectedElementId;

            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all duration-300 outline-none",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                        : "text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100",
                      isDisabled && "opacity-40 cursor-not-allowed",
                    )}
                    onClick={() => !isDisabled && setActiveTool(tool.id)}
                    disabled={isDisabled}
                  >
                    <tool.icon
                      className={cn(
                        "h-5 w-5 transition-transform",
                        isActive && "scale-110",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[9px] font-bold leading-none",
                        isActive ? "text-primary-foreground" : "text-zinc-400",
                      )}
                    >
                      {tool.shortLabel}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-primary text-primary-foreground border-none shadow-2xl"
                >
                  <p className="font-bold text-xs">{tool.label}</p>
                  {tool.needsSelection && (
                    <p className="text-[10px] opacity-70">(เลือกวัตถุก่อน)</p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <aside className="lg:hidden flex h-[60px] w-full shrink-0 items-center border-t border-zinc-200 bg-white px-1 gap-0.5 justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          const isDisabled = tool.needsSelection && !selectedElementId;

          return (
            <button
              key={tool.id}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 h-[52px] rounded-xl transition-all outline-none",
                isActive ? "bg-primary/10 text-primary" : "text-zinc-400",
                isDisabled && "opacity-40",
              )}
              onClick={() => !isDisabled && setActiveTool(tool.id)}
              disabled={isDisabled}
            >
              <tool.icon className="h-5 w-5" />
              <span
                className={cn(
                  "text-[9px] font-bold leading-none",
                  isActive ? "text-primary" : "text-zinc-400",
                )}
              >
                {tool.shortLabel}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
