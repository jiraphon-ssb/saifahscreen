"use client";

import {
  Eye,
  Layers,
  Type,
  Image as ImageIcon,
  EyeOff,
  Copy,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { DesignElement } from "./design-tool";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LayersPanelProps {
  elements: DesignElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicateElement: (id: string) => void;
  onDeleteElement?: (id: string) => void;
}

export default function LayersPanel({
  elements,
  selectedElementId,
  onSelectElement,
  onBringToFront,
  onSendToBack,
  onToggleVisibility,
  onDuplicateElement,
  onDeleteElement,
}: LayersPanelProps) {
  const reversedElements = [...elements].reverse();

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-white font-prompt">
        <div className="p-5 space-y-1">
          <h2 className="text-xl font-bold text-primary">
            เลเยอร์ ({elements.length})
          </h2>
          <p className="text-xs text-zinc-400 font-medium tracking-normal">
            ลำดับและการทับซ้อนของสิ่งต่างๆ บนเสื้อ
          </p>
        </div>

        {elements.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-zinc-50 flex items-center justify-center border-2 border-dashed border-zinc-200">
              <Layers className="h-8 w-8 text-zinc-200" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                ยังไม่มีเลเยอร์
              </p>
              <p className="text-[10px] text-zinc-300 mt-1 font-medium">
                เพิ่มข้อความหรือรูปภาพเพื่อเริ่ม
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4 space-y-2">
              {reversedElements.map((element) => (
                <Card
                  key={element.id}
                  onClick={() => onSelectElement(element.id)}
                  className={cn(
                    "group cursor-pointer transition-all duration-200 border shadow-sm rounded-xl overflow-hidden",
                    selectedElementId === element.id
                      ? "border-primary bg-primary text-white shadow-lg ring-2 ring-primary/20"
                      : "border-zinc-100 bg-white hover:border-zinc-300 hover:shadow-md",
                    element.visible === false && "opacity-50 grayscale",
                  )}
                >
                  <CardContent className="p-2.5 flex items-center gap-3">
                    {/* Thumbnail / Icon */}
                    <div
                      className={cn(
                        "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-colors overflow-hidden",
                        selectedElementId === element.id
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-zinc-50 border-zinc-100 text-zinc-400",
                      )}
                    >
                      {element.type === "image" && element.url ? (
                        <img
                          src={element.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : element.type === "text" ? (
                        <Type className="h-4 w-4" />
                      ) : (
                        <ImageIcon className="h-4 w-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold truncate tracking-tight">
                        {element.name}
                      </p>
                      <p
                        className={cn(
                          "text-[9px] font-medium uppercase opacity-60",
                          selectedElementId === element.id
                            ? "text-white/70"
                            : "text-zinc-400",
                        )}
                      >
                        {element.type === "text" ? "ข้อความ" : "รูปภาพ"}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div
                      className={cn(
                        "flex items-center gap-0.5 transition-all",
                        selectedElementId === element.id
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100",
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-7 w-7 rounded-lg",
                              selectedElementId === element.id
                                ? "hover:bg-white/10 text-white"
                                : "hover:bg-zinc-100 text-zinc-400",
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleVisibility(element.id);
                            }}
                          >
                            {element.visible === false ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-zinc-950 text-white border-none font-bold text-[10px]"
                        >
                          ซ่อน/แสดง
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-7 w-7 rounded-lg",
                              selectedElementId === element.id
                                ? "hover:bg-white/10 text-white"
                                : "hover:bg-zinc-100 text-zinc-400",
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicateElement(element.id);
                            }}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-zinc-950 text-white border-none font-bold text-[10px]"
                        >
                          ทำซ้ำ
                        </TooltipContent>
                      </Tooltip>

                      {/* Delete Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-7 w-7 rounded-lg",
                              selectedElementId === element.id
                                ? "hover:bg-red-500/20 text-red-300"
                                : "hover:bg-red-50 text-zinc-400 hover:text-red-500",
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteElement?.(element.id);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-red-600 text-white border-none font-bold text-[10px]"
                        >
                          ลบ
                        </TooltipContent>
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
