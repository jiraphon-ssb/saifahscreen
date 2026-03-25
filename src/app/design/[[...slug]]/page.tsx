'use client';

import DesignTool from "../components/design-tool";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// This is the single entry point for the design tool.
// It handles stateless design loading via URL parameters.
export default function Page() {
  return (
    <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Loading Designer...</p>
        </div>
    }>
        <DesignTool designId={null} />
    </Suspense>
  );
}
