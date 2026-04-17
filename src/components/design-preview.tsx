"use client";

import Image from "next/image";
import type { DesignElement } from "@/app/design/components/design-tool";

interface DesignPreviewProps {
  design: {
    designConfiguration: string | DesignElement[];
    productConfiguration?: {
      tshirt: {
        imageUrl: string;
        name: string;
      };
      productType: string;
    };
    name?: string;
    previewImageUrl?: string;
  };
  size?: number;
}

const ORIGINAL_CANVAS_SIZE = 600;

export default function DesignPreview({
  design,
  size = 400,
}: DesignPreviewProps) {
  const scale = size / ORIGINAL_CANVAS_SIZE;

  let elements: DesignElement[] = [];
  try {
    if (typeof design.designConfiguration === "string") {
      elements = JSON.parse(design.designConfiguration);
    } else if (Array.isArray(design.designConfiguration)) {
      elements = design.designConfiguration;
    }
  } catch (e) {
    console.error("Failed to parse design configuration:", e);
  }

  const imageUrl =
    design.previewImageUrl ||
    design.productConfiguration?.tshirt.imageUrl ||
    "/images/t-shirt-mockup-white-saifah.webp";

  const parseShadow = (
    shadowString: string | undefined,
    currentScale: number,
  ) => {
    if (!shadowString || shadowString === "none") return "none";
    const parts = shadowString.match(/(-?\d*\.?\d+px)|(#[0-9a-fA-F]+)/g);
    if (!parts || parts.length < 4) return "none";
    return `${parseFloat(parts[0]) * currentScale}px ${parseFloat(parts[1]) * currentScale}px ${parseFloat(parts[2]) * currentScale}px ${parts[3]}`;
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageUrl}
        alt="Product preview"
        fill
        sizes={`${size}px`}
        className="absolute inset-0 object-contain pointer-events-none"
      />
      <div className="absolute inset-0">
        {elements.map((element, index) => {
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
            transform: `
                scaleX(${element.flip?.horizontal ? -1 : 1})
                scaleY(${element.flip?.vertical ? -1 : 1})
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
            <div
              key={element.id}
              className="absolute"
              style={{
                left: element.x * scale,
                top: element.y * scale,
                width: scaledWidth,
                height: scaledHeight,
                zIndex: index + 1,
                transform: `rotate(${element.rotation || 0}deg)`,
                visibility: element.visible === false ? "hidden" : "visible",
              }}
            >
              {element.type === "image" && element.url && (
                <img
                  src={element.url}
                  alt={element.name}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  style={imageStyle}
                />
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
                          id={`preview-path-${element.id}`}
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
                          xlinkHref={`#preview-path-${element.id}`}
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
          );
        })}
      </div>
    </div>
  );
}
