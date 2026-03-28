'use client';

import { useState, useRef, useEffect } from 'react';
import CanvasPreview from './canvas-preview';
import type { DesignElement } from './design-tool';
import ZoomControls from './zoom-controls';

interface CanvasAreaProps {
  elements: DesignElement[];
  imageUrl: string;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElement: (id: string, props: Partial<DesignElement>, pushToHistory?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function CanvasArea({
  elements,
  imageUrl,
  selectedElementId,
  setSelectedElementId,
  updateElement,
  undo,
  redo,
  canUndo,
  canRedo,
}: CanvasAreaProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasContainerSize, setCanvasContainerSize] = useState(500);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      const newSize = Math.min(width * 0.85, height * 0.9, 550);
      setCanvasContainerSize(newSize);
    });

    observer.observe(container);
    
    const { width, height } = container.getBoundingClientRect();
    const newSize = Math.min(width * 0.85, height * 0.9, 550);
    setCanvasContainerSize(newSize);

    return () => observer.disconnect();
  }, []);

  return (
    <main ref={containerRef} className="relative flex-1 overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div style={{ transform: `scale(${zoom})` }} className="transition-transform duration-200 ease-out">
          <div 
            style={{ width: canvasContainerSize, height: canvasContainerSize }} 
            className="relative shadow-2xl shadow-black/5 rounded-lg overflow-hidden bg-white"
          >
            <CanvasPreview
              elements={elements}
              imageUrl={imageUrl}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
              updateElement={updateElement}
              containerSize={canvasContainerSize}
            />
          </div>
        </div>
      </div>

      <ZoomControls scale={zoom} setScale={setZoom} />
    </main>
  );
}
