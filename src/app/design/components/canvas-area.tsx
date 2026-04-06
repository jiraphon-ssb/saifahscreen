'use client';

import { useState, useRef, useEffect } from 'react';
import { Trash2, Copy, ChevronsUp, ChevronsDown, FlipHorizontal, Maximize } from 'lucide-react';
import CanvasPreview from './canvas-preview';
import type { DesignElement } from './design-tool';
import ZoomControls from './zoom-controls';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface CanvasAreaProps {
  elements: DesignElement[];
  imageUrl: string;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElement: (id: string, props: Partial<DesignElement>, pushToHistory?: boolean) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hideMockup: boolean;
}

export default function CanvasArea({
  elements,
  imageUrl,
  selectedElementId,
  setSelectedElementId,
  updateElement,
  deleteElement,
  duplicateElement,
  bringToFront,
  sendToBack,
  undo,
  redo,
  canUndo,
  canRedo,
  hideMockup,
}: CanvasAreaProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasContainerSize, setCanvasContainerSize] = useState(500);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateSize = () => {
      const rect = container.getBoundingClientRect();
      const padding = 80;
      const availableWidth = Math.max(0, rect.width - padding);
      const availableHeight = Math.max(0, rect.height - padding);
      
      const baseSize = Math.min(availableWidth > 0 ? availableWidth : 500, availableHeight > 0 ? availableHeight : 500);
      const finalSize = Math.min(baseSize, 550);
      setCanvasContainerSize(finalSize);
    };

    const observer = new ResizeObserver(calculateSize);
    observer.observe(container);
    calculateSize();

    return () => observer.disconnect();
  }, []);

  const handleFitToCanvas = () => {
    setZoom(1);
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);
  const isImage = selectedElement?.type === 'image';

  return (
    <TooltipProvider delayDuration={200}>
    <main ref={containerRef} className="relative flex-1 h-full min-h-0 overflow-hidden bg-zinc-50/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Quick Action Floating Bar */}
      {selectedElementId && selectedElement && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-200/50 px-2 py-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500 hover:text-red-600 hover:bg-red-50" onClick={() => deleteElement(selectedElementId)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-bold">ลบ</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100" onClick={() => duplicateElement(selectedElementId)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-bold">ทำซ้ำ</TooltipContent>
            </Tooltip>
            <div className="w-px h-6 bg-zinc-200 mx-0.5" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100" onClick={() => bringToFront(selectedElementId)}>
                  <ChevronsUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-bold">ไว้หน้าสุด</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100" onClick={() => sendToBack(selectedElementId)}>
                  <ChevronsDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-bold">ไว้หลังสุด</TooltipContent>
            </Tooltip>
            {isImage && (
              <>
                <div className="w-px h-6 bg-zinc-200 mx-0.5" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100" onClick={() => {
                      const flip = selectedElement.flip || { horizontal: false, vertical: false };
                      updateElement(selectedElementId, { flip: { ...flip, horizontal: !flip.horizontal } });
                    }}>
                      <FlipHorizontal className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs font-bold">พลิกซ้าย-ขวา</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <div style={{ transform: `scale(${zoom})` }} className="transition-transform duration-200 ease-out">
          <div 
            id="design-canvas"
            style={{ width: canvasContainerSize, height: canvasContainerSize }} 
            className="relative shadow-2xl shadow-black/10 rounded-lg overflow-hidden bg-white ring-1 ring-black/5"
          >
            <CanvasPreview
              elements={elements}
              imageUrl={imageUrl}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
              updateElement={updateElement}
              containerSize={canvasContainerSize}
              zoom={zoom}
              hideMockup={hideMockup}
            />
          </div>
        </div>
      </div>

      {/* Zoom Controls + Fit */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-white/90 backdrop-blur-sm border-zinc-200 shadow-md hover:bg-white" onClick={handleFitToCanvas}>
              <Maximize className="h-4 w-4 text-zinc-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs font-bold">พอดีจอ</TooltipContent>
        </Tooltip>
        <ZoomControls scale={zoom} setScale={setZoom} />
      </div>
    </main>
    </TooltipProvider>
  );
}

