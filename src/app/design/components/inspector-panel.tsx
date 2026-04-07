"use client";

import {
  Image as ImageIcon,
  Trash2,
  Type,
  AlignCenter,
  AlignLeft,
  AlignRight,
  FlipHorizontal,
  FlipVertical,
  Copy,
  ChevronDown,
  Move,
  Sliders,
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
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import type { DesignElement } from "./design-tool";
import { Separator } from "@/components/ui/separator";
import { allFonts, thaiFonts, englishFonts } from "@/lib/fonts";

interface InspectorPanelProps {
  selectedElement: DesignElement;
  updateElement: (
    id: string,
    props: Partial<DesignElement>,
    pushToHistory?: boolean,
  ) => void;
  deleteElement: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  duplicateElement: (id: string) => void;
}

const LabeledControl = ({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("grid gap-2", className)}>
    <Label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
      {label}
    </Label>
    {children}
  </div>
);

export default function InspectorPanel({
  selectedElement,
  updateElement,
  deleteElement,
  bringToFront,
  sendToBack,
  duplicateElement,
}: InspectorPanelProps) {
  const hasShadow = !!(
    selectedElement?.textShadow && selectedElement.textShadow !== "none"
  );
  const shadowParts = hasShadow
    ? selectedElement!.textShadow!.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g) ||
      []
    : [];
  const shadowX = shadowParts[0] ? parseFloat(shadowParts[0]) : 2;
  const shadowY = shadowParts[1] ? parseFloat(shadowParts[1]) : 2;
  const shadowBlur = shadowParts[2] ? parseFloat(shadowParts[2]) : 4;
  const shadowColor = shadowParts[3] || "#000000";

  const updateTextShadow = (
    x: number,
    y: number,
    blur: number,
    color: string,
  ) => {
    if (!selectedElement) return;
    const newShadow = `${x}px ${y}px ${blur}px ${color}`;
    updateElement(selectedElement.id, { textShadow: newShadow });
  };

  const toggleShadow = (enabled: boolean) => {
    if (!selectedElement) return;
    const newShadow = enabled
      ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`
      : "none";
    updateElement(selectedElement.id, { textShadow: newShadow });
  };

  const isText = selectedElement?.type === "text";
  const isImage = selectedElement?.type === "image";

  const fontWeights = [
    { name: "ปกติ", value: 400 },
    { name: "ปานกลาง", value: 500 },
    { name: "หนา", value: 700 },
    { name: "หนามาก", value: 900 },
  ];

  const widthValue = parseFloat(selectedElement.width as string);
  const heightValue = parseFloat(selectedElement.height as string);

  return (
    <div className="flex flex-col h-full bg-white font-prompt">
      {/* Header */}
      <div className="p-5 border-b border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            {isText && <Type className="h-5 w-5 text-white stroke-[2.5]" />}
            {isImage && (
              <ImageIcon className="h-5 w-5 text-white stroke-[2.5]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Input
              value={selectedElement.name}
              onChange={(e) =>
                updateElement(
                  selectedElement.id,
                  { name: e.target.value },
                  false,
                )
              }
              onBlur={(e) =>
                updateElement(
                  selectedElement.id,
                  { name: e.target.value },
                  true,
                )
              }
              className="font-bold text-base text-zinc-950 bg-transparent border-0 focus-visible:ring-0 p-0 h-auto tracking-tight"
            />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              {isText ? "แก้ไขข้อความ" : "แก้ไขรูปภาพ"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Text Content (outside accordion for quick access) */}
        {isText && (
          <div className="p-5 border-b border-zinc-100">
            <LabeledControl label="เนื้อหาข้อความ">
              <Textarea
                value={selectedElement.text}
                onChange={(e) =>
                  updateElement(selectedElement.id, { text: e.target.value })
                }
                placeholder="พิมพ์ข้อความของคุณ..."
                className="min-h-[72px] text-sm font-bold bg-zinc-50 border-zinc-200 rounded-xl focus:bg-white transition-all focus:ring-zinc-950/5"
              />
            </LabeledControl>
          </div>
        )}

        <Accordion
          type="multiple"
          defaultValue={["transform", "style"]}
          className="w-full"
        >
          {/* Group 1: ตำแหน่ง & ขนาด */}
          <AccordionItem value="transform" className="border-b-0">
            <AccordionTrigger className="px-5 py-4 hover:no-underline group">
              <span className="flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-tight">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-all">
                  <Move className="h-3.5 w-3.5" />
                </div>
                ตำแหน่ง & ขนาด
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 space-y-4 pt-1">
              <div className="grid grid-cols-2 gap-3">
                <LabeledControl label="แกน X">
                  <Input
                    type="number"
                    value={Math.round(selectedElement.x)}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9 font-bold border-zinc-200 rounded-xl bg-zinc-50/50 text-sm"
                  />
                </LabeledControl>
                <LabeledControl label="แกน Y">
                  <Input
                    type="number"
                    value={Math.round(selectedElement.y)}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9 font-bold border-zinc-200 rounded-xl bg-zinc-50/50 text-sm"
                  />
                </LabeledControl>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <LabeledControl label="กว้าง">
                  <Input
                    type="number"
                    value={isNaN(widthValue) ? "" : Math.round(widthValue)}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        width: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9 font-bold border-zinc-200 rounded-xl bg-zinc-50/50 text-sm"
                  />
                </LabeledControl>
                <LabeledControl label="สูง">
                  <Input
                    type="number"
                    value={isNaN(heightValue) ? "" : Math.round(heightValue)}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        height: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9 font-bold border-zinc-200 rounded-xl bg-zinc-50/50 text-sm"
                  />
                </LabeledControl>
              </div>
              <LabeledControl label={`หมุน ${selectedElement.rotation || 0}°`}>
                <Slider
                  value={[selectedElement.rotation || 0]}
                  onValueChange={([v]) =>
                    updateElement(selectedElement.id, { rotation: v }, false)
                  }
                  onValueCommit={([v]) =>
                    updateElement(selectedElement.id, { rotation: v })
                  }
                  min={-180}
                  max={180}
                  step={1}
                />
              </LabeledControl>
            </AccordionContent>
          </AccordionItem>

          {/* Group 2: สไตล์ */}
          <AccordionItem value="style" className="border-b-0">
            <AccordionTrigger className="px-5 py-4 hover:no-underline group">
              <span className="flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-tight">
                <div className="h-7 w-7 rounded-lg bg-zinc-100 flex items-center justify-center group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all">
                  <Move className="h-3.5 w-3.5" />
                </div>
                สไตล์ & เอฟเฟกต์
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 space-y-5 pt-1">
              {/* Opacity — always shown */}
              <LabeledControl
                label={`ความโปร่งใส ${Math.round((selectedElement.opacity ?? 1) * 100)}%`}
              >
                <Slider
                  value={[selectedElement.opacity ?? 1]}
                  onValueChange={([v]) =>
                    updateElement(selectedElement.id, { opacity: v }, false)
                  }
                  onValueCommit={([v]) =>
                    updateElement(selectedElement.id, { opacity: v })
                  }
                  min={0}
                  max={1}
                  step={0.01}
                />
              </LabeledControl>

              {/* Text-specific styles */}
              {isText && (
                <>
                  <Separator className="bg-zinc-100" />
                  <LabeledControl label="ฟอนต์">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between h-10 text-sm font-bold border-zinc-200 bg-zinc-50 rounded-xl px-3"
                        >
                          <span
                            style={{ fontFamily: selectedElement.fontFamily }}
                            className="truncate"
                          >
                            {allFonts.find(
                              (f) => f.value === selectedElement.fontFamily,
                            )?.name || "เลือกฟอนต์"}
                          </span>
                          <ChevronDown className="h-4 w-4 ml-2 text-zinc-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-64 max-h-[400px] overflow-y-auto bg-white border-zinc-200 rounded-2xl shadow-2xl p-2"
                        align="start"
                      >
                        <DropdownMenuLabel className="text-[10px] font-bold text-zinc-400 uppercase p-3">
                          ฟอนต์ไทย
                        </DropdownMenuLabel>
                        {thaiFonts.map((font) => (
                          <DropdownMenuItem
                            key={font.value}
                            onSelect={() =>
                              updateElement(selectedElement.id, {
                                fontFamily: font.value,
                              })
                            }
                            style={{ fontFamily: font.value }}
                            className="text-lg py-3 rounded-xl"
                          >
                            {font.name}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparatorPrimitive className="bg-zinc-100 my-2" />
                        <DropdownMenuLabel className="text-[10px] font-bold text-zinc-400 uppercase p-3">
                          ฟอนต์อังกฤษ
                        </DropdownMenuLabel>
                        {englishFonts.map((font) => (
                          <DropdownMenuItem
                            key={font.value}
                            onSelect={() =>
                              updateElement(selectedElement.id, {
                                fontFamily: font.value,
                              })
                            }
                            style={{ fontFamily: font.value }}
                            className="text-lg py-3 rounded-xl"
                          >
                            {font.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </LabeledControl>

                  <div className="grid grid-cols-2 gap-3">
                    <LabeledControl label="ขนาดตัวอักษร">
                      <Input
                        type="number"
                        value={selectedElement.fontSize}
                        onChange={(e) =>
                          updateElement(selectedElement.id, {
                            fontSize: parseInt(e.target.value) || 0,
                          })
                        }
                        className="h-9 font-bold border-zinc-200 rounded-xl bg-zinc-50/50 text-sm"
                      />
                    </LabeledControl>
                    <LabeledControl label="น้ำหนัก">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between h-9 text-sm font-bold border-zinc-200 bg-zinc-50 rounded-xl"
                          >
                            <span>
                              {fontWeights.find(
                                (f) => f.value === selectedElement.fontWeight,
                              )?.name || "ปกติ"}
                            </span>
                            <ChevronDown className="h-3 w-3 ml-2 text-zinc-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-primary text-primary-foreground border-none rounded-xl">
                          {fontWeights.map((w) => (
                            <DropdownMenuItem
                              key={w.value}
                              onSelect={() =>
                                updateElement(selectedElement.id, {
                                  fontWeight: w.value,
                                })
                              }
                              className="font-bold focus:bg-white/10 focus:text-white"
                            >
                              {w.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </LabeledControl>
                  </div>

                  <LabeledControl label="จัดวางข้อความ">
                    <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100 rounded-xl">
                      {[
                        { value: "left", icon: AlignLeft },
                        { value: "center", icon: AlignCenter },
                        { value: "right", icon: AlignRight },
                      ].map((align) => (
                        <Button
                          key={align.value}
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 rounded-lg transition-all",
                            selectedElement.textAlign === align.value
                              ? "bg-white text-zinc-950 shadow-sm"
                              : "text-zinc-400 hover:text-zinc-600",
                          )}
                          onClick={() =>
                            updateElement(selectedElement.id, {
                              textAlign: align.value as any,
                            })
                          }
                        >
                          <align.icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </LabeledControl>

                  <Separator className="bg-zinc-100" />

                  <div className="grid grid-cols-2 gap-3">
                    <LabeledControl label="สีหลัก">
                      <div className="flex items-center gap-2">
                        <div className="group relative h-9 w-9 shrink-0 rounded-xl border border-zinc-200 overflow-hidden cursor-pointer shadow-sm">
                          <Input
                            type="color"
                            value={selectedElement.color}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                color: e.target.value,
                              })
                            }
                            className="absolute -inset-2 h-14 w-14 cursor-pointer"
                          />
                        </div>
                        <Input
                          value={selectedElement.color?.toUpperCase()}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              color: e.target.value,
                            })
                          }
                          className="h-9 text-xs font-mono font-bold border-zinc-200 rounded-xl bg-zinc-50"
                        />
                      </div>
                    </LabeledControl>
                    <LabeledControl label="ขนาดเส้นขอบ">
                      <Input
                        type="number"
                        value={selectedElement.strokeWidth?.toString() || "0"}
                        onChange={(e) =>
                          updateElement(selectedElement.id, {
                            strokeWidth: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="h-9 font-bold border-zinc-200 rounded-xl bg-zinc-50 text-sm"
                      />
                    </LabeledControl>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="space-y-0.5">
                      <Label className="text-xs font-bold text-zinc-950">
                        เงาตัวอักษร
                      </Label>
                    </div>
                    <Switch
                      checked={hasShadow}
                      onCheckedChange={toggleShadow}
                    />
                  </div>
                </>
              )}

              {/* Image-specific styles */}
              {isImage && (
                <>
                  <Separator className="bg-zinc-100" />
                  <LabeledControl
                    label={`ความสว่าง ${selectedElement.filters?.brightness ?? 100}`}
                  >
                    <Slider
                      value={[selectedElement.filters?.brightness ?? 100]}
                      onValueChange={([v]) =>
                        updateElement(
                          selectedElement.id,
                          {
                            filters: {
                              ...selectedElement.filters!,
                              brightness: v,
                            },
                          },
                          false,
                        )
                      }
                      onValueCommit={([v]) =>
                        updateElement(selectedElement.id, {
                          filters: {
                            ...selectedElement.filters!,
                            brightness: v,
                          },
                        })
                      }
                      min={0}
                      max={200}
                      step={1}
                    />
                  </LabeledControl>
                  <LabeledControl
                    label={`ความเข้ม ${selectedElement.filters?.contrast ?? 100}`}
                  >
                    <Slider
                      value={[selectedElement.filters?.contrast ?? 100]}
                      onValueChange={([v]) =>
                        updateElement(
                          selectedElement.id,
                          {
                            filters: {
                              ...selectedElement.filters!,
                              contrast: v,
                            },
                          },
                          false,
                        )
                      }
                      onValueCommit={([v]) =>
                        updateElement(selectedElement.id, {
                          filters: { ...selectedElement.filters!, contrast: v },
                        })
                      }
                      min={0}
                      max={200}
                      step={1}
                    />
                  </LabeledControl>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="h-10 font-bold rounded-xl bg-white border border-zinc-200 shadow-sm gap-2 text-sm"
          onClick={() => duplicateElement(selectedElement.id)}
        >
          <Copy className="h-4 w-4 text-zinc-600" /> ทำซ้ำ
        </Button>
        <Button
          variant="destructive"
          className="h-10 font-bold rounded-xl bg-red-600 hover:bg-red-700 shadow-sm gap-2 text-sm"
          onClick={() => deleteElement(selectedElement.id)}
        >
          <Trash2 className="h-4 w-4 text-white" /> ลบ
        </Button>
      </div>
    </div>
  );
}
