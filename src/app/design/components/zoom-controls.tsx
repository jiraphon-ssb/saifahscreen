'use client';

import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface ZoomControlsProps {
    scale: number;
    setScale: (value: React.SetStateAction<number>) => void;
}

export default function ZoomControls({ scale, setScale }: ZoomControlsProps) {
    const scalePercentage = Math.round(scale * 100);

    const zoom = (direction: 'in' | 'out') => {
        setScale(currentScale => {
            const step = 0.1;
            const newScale = direction === 'in' ? currentScale + step : currentScale - step;
            return Math.max(0.1, Math.min(newScale, 3)); // Clamp between 10% and 300%
        });
    }

    const resetZoom = () => {
        setScale(1);
    }

    return (
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1 rounded-lg border border-border/50 bg-card/80 p-1 shadow-lg backdrop-blur-sm">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => zoom('out')} aria-label="ย่อ">
                <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-9 w-20 text-xs tabular-nums" onClick={resetZoom}>
                {scalePercentage}%
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => zoom('in')} aria-label="ขยาย">
                <ZoomIn className="h-4 w-4" />
            </Button>
        </div>
    )
}
