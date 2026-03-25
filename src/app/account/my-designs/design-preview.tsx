'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import type { DesignElement, ProductConfiguration } from '@/app/design/components/design-tool';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface DesignPreviewProps {
  design: {
    designConfiguration: string;
    productConfiguration?: ProductConfiguration | string; // Can be object or stringified JSON
    name?: string;
  };
  size: number;
}

const ORIGINAL_CANVAS_SIZE = 600; // The size of the canvas in the design tool

export default function DesignPreview({ design, size }: DesignPreviewProps) {
  // Memoized parsing of design elements with robust error handling
  const elements: DesignElement[] = useMemo(() => {
    try {
      if (!design.designConfiguration) return [];
      const parsed = JSON.parse(design.designConfiguration);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }, [design.designConfiguration]);

  // Memoized parsing of product configuration with robustness
  const productConfig: ProductConfiguration | null = useMemo(() => {
    try {
      if (!design.productConfiguration) return null;
      if (typeof design.productConfiguration === 'object') {
        return design.productConfiguration as ProductConfiguration;
      }
      if (typeof design.productConfiguration === 'string') {
        return JSON.parse(design.productConfiguration);
      }
      return null;
    } catch (e) {
      return null;
    }
  }, [design.productConfiguration]);
  
  // Determine T-shirt image URL with a fallback to a default white shirt
  const defaultTshirt = PlaceHolderImages.find(p => p.id === 't-shirt-mockup-white-saifah');
  const tshirtImageUrl = productConfig?.tshirt?.imageUrl || defaultTshirt?.imageUrl || '/images/t-shirt-mockup-white-saifah.webp';
  const altText = productConfig?.tshirt?.name || design.name || 'Design Preview';

  // Calculate the scaling factor for rendering elements on the smaller preview
  const scale = size / ORIGINAL_CANVAS_SIZE;

  // Helper to parse CSS box-shadow strings (e.g., "2px 2px 4px #000000")
  const parseShadow = (shadowString: string | undefined) => {
    if (!shadowString || shadowString === 'none') return null;
    // Regex to find pixel values and hex colors
    const parts = shadowString.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g);
    if (!parts || parts.length < 4) return null;
    return {
      x: parseFloat(parts[0]) * scale,
      y: parseFloat(parts[1]) * scale,
      blur: parseFloat(parts[2]) * scale,
      color: parts[3],
    };
  };

  return (
    <div className="relative w-full h-full">
      {/* Base T-shirt Image */}
      <img
        src={tshirtImageUrl}
        alt={altText}
        className="absolute inset-0 w-full h-full object-contain"
      />
      {/* Overlay for Design Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {elements.map((element, index) => {
          // --- Robust property parsing with defaults ---
          const elX = (Number(element.x) || 0) * scale;
          const elY = (Number(element.y) || 0) * scale;
          const elRotation = Number(element.rotation) || 0;
          
          // Handle both numeric and string widths/heights (like 'auto')
          const elWidth = typeof element.width === 'string' && (element.width === 'auto' || element.width.includes('%'))
            ? element.width
            : (Number(element.width) || 100) * scale;

          const elHeight = typeof element.height === 'string' && (element.height === 'auto' || element.height.includes('%'))
            ? element.height
            : (Number(element.height) || 100) * scale;

          const shadow = parseShadow(element.textShadow);
          const scaledShadow = shadow ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}` : 'none';
          
          const elFontSize = (Number(element.fontSize) || 48) * scale;
          const elLetterSpacing = (Number(element.letterSpacing) || 0) * scale;
          const elStrokeWidth = (Number(element.strokeWidth) || 0) * scale;
          
          const elColor = element.color || '#000000';
          const elStrokeColor = element.strokeColor || '#FFFFFF';
          const elFontFamily = element.fontFamily || 'Inter, sans-serif';
          const elFontWeight = Number(element.fontWeight) || 700;
          const elTextAlign = element.textAlign || 'center';
          const elLineHeight = element.lineHeight || 1.2;

          return (
            <div
              key={element.id || `el-${index}`}
              style={{
                position: 'absolute',
                top: `${elY}px`,
                left: `${elX}px`,
                width: typeof elWidth === 'number' ? `${elWidth}px` : elWidth,
                height: typeof elHeight === 'number' ? `${elHeight}px` : elHeight,
                transform: `rotate(${elRotation}deg)`,
                zIndex: index, // Use array index for stacking order
              }}
            >
              {element.type === 'image' && element.url && (
                <img src={element.url} alt="" className="w-full h-full object-contain pointer-events-none" />
              )}
              {element.type === 'text' && (
                <div
                    className="w-full h-full flex items-center justify-center pointer-events-none select-none"
                    style={{
                        fontFamily: elFontFamily,
                        fontSize: `${elFontSize}px`,
                        fontWeight: elFontWeight,
                        color: elColor,
                        letterSpacing: `${elLetterSpacing}px`,
                        textShadow: scaledShadow,
                        WebkitTextStroke: elStrokeWidth > 0 ? `${elStrokeWidth}px ${elStrokeColor}` : 'unset',
                        paintOrder: 'stroke fill',
                        whiteSpace: 'pre-wrap', // Preserve whitespace and newlines
                        textAlign: elTextAlign,
                        lineHeight: elLineHeight,
                    }}
                >
                  {element.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
