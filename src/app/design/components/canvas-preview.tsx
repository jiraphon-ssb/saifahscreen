"use client";

import Image from "next/image";
import { Rnd } from "react-rnd";
import { cn } from "@/lib/utils";
import type { DesignElement } from "./design-tool";
import { useEffect, useState } from "react";

interface CanvasPreviewProps {
  elements: DesignElement[];
  imageUrl: string;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElement: (
    id: string,
    props: Partial<DesignElement>,
    pushToHistory?: boolean,
  ) => void;
  containerSize: number;
  zoom: number;
  hideMockup?: boolean;
}

const ORIGINAL_CANVAS_SIZE = 600;

export default function CanvasPreview({
  elements,
  imageUrl,
  selectedElementId,
  setSelectedElementId,
  updateElement,
  containerSize,
  zoom,
  hideMockup,
}: CanvasPreviewProps) {
  const scale = containerSize / ORIGINAL_CANVAS_SIZE;

  const handleElementClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
  };

  const parseShadow = (
    shadowString: string | undefined,
    currentScale: number,
  ) => {
    if (!shadowString || shadowString === "none") return "none";
    const parts = shadowString.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g);
    if (!parts || parts.length < 4) return "none";
    return `${parseFloat(parts[0]) * currentScale}px ${parseFloat(parts[1]) * currentScale}px ${parseFloat(parts[2]) * currentScale}px ${parts[3]}`;
  };

  const [guides, setGuides] = useState<{ x: boolean; y: boolean }>({
    x: false,
    y: false,
  });

  return (
    <div
      className="relative w-full h-full"
      onClick={() => setSelectedElementId(null)}
    >
      {!hideMockup && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt="T-shirt mockup"
            fill
            className="object-contain pointer-events-none"
            priority
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}

      {/* Snap Guides */}
      {guides.x && (
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-primary/50 z-20 pointer-events-none" />
      )}
      {guides.y && (
        <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-primary/50 z-20 pointer-events-none" />
      )}

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto overflow-hidden">
          {elements.map((element, index) => {
            const isSelected = selectedElementId === element.id;

            const textStyle: React.CSSProperties = {
              fontFamily: element.fontFamily || "sans-serif",
              fontSize: `${(element.fontSize || 48) * scale}px`,
              fontWeight: element.fontWeight || 700,
              lineHeight: element.lineHeight || 1.2,
              letterSpacing: `${(element.letterSpacing || 0) * scale}px`,
              textAlign: element.textAlign || "center",
              color: element.color || "#000000",
              textShadow: parseShadow(element.textShadow, scale),
              WebkitTextStroke:
                element.strokeWidth && element.strokeWidth > 0
                  ? `${element.strokeWidth * scale}px ${element.strokeColor}`
                  : "unset",
              paintOrder: "stroke fill",
              whiteSpace: "pre-wrap",
              opacity: element.opacity ?? 1,
            };

            const imageStyle: React.CSSProperties = {
              filter: `
                brightness(${element.filters?.brightness ?? 100}%)
                contrast(${element.filters?.contrast ?? 100}%)
                grayscale(${element.filters?.grayscale ?? 0}%)
                sepia(${element.filters?.sepia ?? 0}%)
              `,
              opacity: element.opacity ?? 1,
            };

            const scaledWidth =
              typeof element.width === "number"
                ? element.width * scale
                : element.width;
            const scaledHeight =
              typeof element.height === "number"
                ? element.height * scale
                : element.height;

            return (
              <Rnd
                key={element.id}
                size={{
                  width: scaledWidth,
                  height: scaledHeight,
                }}
                position={{
                  x: element.x * scale,
                  y: element.y * scale,
                }}
                scale={zoom}
                onDrag={(e, d) => {
                  const centerX = d.x + (scaledWidth as number) / 2;
                  const centerY = d.y + (scaledHeight as number) / 2;
                  const canvasCenter = containerSize / 2;
                  const threshold = 5;

                  const isSnapX = Math.abs(centerX - canvasCenter) < threshold;
                  const isSnapY = Math.abs(centerY - canvasCenter) < threshold;

                  setGuides({ x: isSnapX, y: isSnapY });
                }}
                onDragStop={(e, d) => {
                  const centerX = d.x + (scaledWidth as number) / 2;
                  const centerY = d.y + (scaledHeight as number) / 2;
                  const canvasCenter = containerSize / 2;
                  const threshold = 10;

                  let finalX = d.x / scale;
                  let finalY = d.y / scale;

                  // Magnetic Snap
                  if (Math.abs(centerX - canvasCenter) < threshold) {
                    finalX =
                      (canvasCenter - (scaledWidth as number) / 2) / scale;
                  }
                  if (Math.abs(centerY - canvasCenter) < threshold) {
                    finalY =
                      (canvasCenter - (scaledHeight as number) / 2) / scale;
                  }

                  updateElement(element.id, { x: finalX, y: finalY });
                  setGuides({ x: false, y: false });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateElement(element.id, {
                    width: parseFloat(ref.style.width) / scale,
                    height: parseFloat(ref.style.height) / scale,
                    x: position.x / scale,
                    y: position.y / scale,
                  });
                }}
                onClick={(e: React.MouseEvent) =>
                  handleElementClick(e, element.id)
                }
                className={cn(
                  "group/element outline-none",
                  isSelected &&
                    "border-2 border-dashed border-primary z-20 shadow-2xl",
                )}
                style={{
                  zIndex: index + 1,
                  visibility: element.visible === false ? "hidden" : "visible",
                  transform: `rotate(${element.rotation || 0}deg) scaleX(${element.flip?.horizontal ? -1 : 1}) scaleY(${element.flip?.vertical ? -1 : 1})`,
                }}
                bounds="parent"
                enableResizing={isSelected}
                disableDragging={!isSelected}
              >
                <div className="w-full h-full relative">
                  {element.type === "image" && element.url && (
                    <div className="w-full h-full relative" style={imageStyle}>
                      <Image
                        src={element.url}
                        alt={element.name}
                        fill
                        className="object-contain pointer-events-none select-none"
                        unoptimized={
                          element.url.startsWith("http") ||
                          element.url.startsWith("blob")
                        }
                        sizes={`${scaledWidth}px`}
                      />
                    </div>
                  )}
                  {element.type === "text" && (
                    <div className="w-full h-full pointer-events-none select-none">
                      {element.curve && element.curve !== 0 ? (
                        <svg
                          viewBox={`0 0 ${scaledWidth} ${scaledHeight}`}
                          className="w-full h-full overflow-visible"
                          style={{
                            filter:
                              textStyle.textShadow !== "none"
                                ? `drop-shadow(${textStyle.textShadow})`
                                : "none",
                          }}
                        >
                          <defs>
                            <path
                              id={`path-${element.id}`}
                              d={(() => {
                                const w = scaledWidth as number;
                                const h = scaledHeight as number;
                                const c = element.curve || 0;
                                const bend = (h / 2) * (c / 100);
                                return `M 0,${h / 2} Q ${w / 2},${h / 2 + bend * 2} ${w},${h / 2}`;
                              })()}
                            />
                          </defs>
                          <text
                            fill={element.color}
                            style={{
                              fontFamily: textStyle.fontFamily,
                              fontSize: textStyle.fontSize,
                              fontWeight: textStyle.fontWeight,
                              WebkitTextStroke: textStyle.WebkitTextStroke,
                            }}
                          >
                            <textPath
                              xlinkHref={`#path-${element.id}`}
                              startOffset="50%"
                              textAnchor="middle"
                            >
                              {element.text}
                            </textPath>
                          </text>
                        </svg>
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={textStyle}
                        >
                          {element.text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Rnd>
            );
          })}
        </div>
      </div>
    </div>
  );
}
