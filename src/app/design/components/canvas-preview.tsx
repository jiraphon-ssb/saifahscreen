'use client';

import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { cn } from '@/lib/utils';
import type { DesignElement } from './design-tool';
import { useEffect, useState } from 'react';

interface CanvasPreviewProps {
  elements: DesignElement[];
  imageUrl: string;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElement: (id: string, props: Partial<DesignElement>, pushToHistory?: boolean) => void;
  containerSize: number;
}

const ORIGINAL_CANVAS_SIZE = 600;

export default function CanvasPreview({
  elements,
  imageUrl,
  selectedElementId,
  setSelectedElementId,
  updateElement,
  containerSize,
}: CanvasPreviewProps) {
  const scale = containerSize / ORIGINAL_CANVAS_SIZE;

  const handleElementClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
  };
  
  const parseShadow = (shadowString: string | undefined, currentScale: number) => {
    if (!shadowString || shadowString === 'none') return 'none';
    const parts = shadowString.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g);
    if (!parts || parts.length < 4) return 'none';
    return `${parseFloat(parts[0]) * currentScale}px ${parseFloat(parts[1]) * currentScale}px ${parseFloat(parts[2]) * currentScale}px ${parts[3]}`;
  };

  return (
    <div
      className="relative drop-shadow-2xl bg-white w-full h-full"
      onClick={() => setSelectedElementId(null)}
    >
      <Image
        src={imageUrl}
        alt="T-shirt preview"
        fill
        sizes={`${containerSize}px`}
        className="absolute inset-0 object-contain pointer-events-none"
      />
      <div className="absolute inset-0">
        {elements.map((element, index) => {
          const isSelected = selectedElementId === element.id;

          const textStyle: React.CSSProperties = {
            fontFamily: element.fontFamily || 'sans-serif',
            fontSize: `${(element.fontSize || 48) * scale}px`,
            fontWeight: element.fontWeight || 700,
            lineHeight: element.lineHeight || 1.2,
            letterSpacing: `${(element.letterSpacing || 0) * scale}px`,
            textAlign: element.textAlign || 'center',
            color: element.color || '#000000',
            textShadow: parseShadow(element.textShadow, scale),
            WebkitTextStroke: element.strokeWidth && element.strokeWidth > 0 ? `${element.strokeWidth * scale}px ${element.strokeColor}` : 'unset',
            paintOrder: 'stroke fill',
            whiteSpace: 'pre-wrap',
            opacity: element.opacity ?? 1,
          };
          
          const imageStyle: React.CSSProperties = {
            filter: `
              brightness(${element.filters?.brightness ?? 100}%)
              contrast(${element.filters?.contrast ?? 100}%)
              grayscale(${element.filters?.grayscale ?? 0}%)
              sepia(${element.filters?.sepia ?? 0}%)
            `,
            transform: `
                scaleX(${element.flip?.horizontal ? -1 : 1})
                scaleY(${element.flip?.vertical ? -1 : 1})
            `,
            opacity: element.opacity ?? 1,
          };

          const scaledWidth = typeof element.width === 'number' ? element.width * scale : element.width;
          const scaledHeight = typeof element.height === 'number' ? element.height * scale : element.height;

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
              onDragStop={(e, d) => {
                updateElement(element.id, { x: d.x / scale, y: d.y / scale });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateElement(element.id, {
                  width: parseFloat(ref.style.width) / scale,
                  height: parseFloat(ref.style.height) / scale,
                  x: position.x / scale,
                  y: position.y / scale,
                });
              }}
              onClick={(e) => handleElementClick(e, element.id)}
              className={cn(
                "group/element outline-none",
                isSelected && 'border-2 border-dashed border-primary z-20'
              )}
              style={{
                zIndex: index + 1,
                visibility: element.visible === false ? 'hidden' : 'visible',
              }}
              bounds="parent"
              enableResizing={isSelected}
              disableDragging={!isSelected}
            >
              <div
                className="w-full h-full"
                style={{
                  transform: `rotate(${element.rotation || 0}deg)`,
                }}
              >
                {element.type === 'image' && element.url && (
                  <img
                    src={element.url}
                    alt={element.name}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    style={imageStyle}
                  />
                )}
                {element.type === 'text' && (
                  <div
                    className="w-full h-full flex items-center justify-center pointer-events-none select-none"
                    style={textStyle}
                  >
                    {element.text}
                  </div>
                )}
              </div>
            </Rnd>
          );
        })}
      </div>
    </div>
  );
}
