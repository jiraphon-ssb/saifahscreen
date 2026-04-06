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
        <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white/90 backdrop-blur-sm p-1 shadow-md">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={() => zoom('out')} aria-label="ย่อ">
                <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-9 w-16 text-xs tabular-nums font-bold rounded-lg" onClick={resetZoom}>
                {scalePercentage}%
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={() => zoom('in')} aria-label="ขยาย">
                <ZoomIn className="h-4 w-4" />
            </Button>
        </div>
    )
}
