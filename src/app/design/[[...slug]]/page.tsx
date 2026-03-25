'use client';

import DesignTool from "../components/design-tool";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

// This is the single entry point for the design tool.
// It handles:
// - /design (new design)
// - /design/new (new design)
// - /design/[id] (edit existing design)
export default function Page() {
  const params = useParams<{ slug?: string[] }>();

  // slug will be undefined for /design
  // slug will be ['new'] for /design/new
  // slug will be ['<id>'] for /design/<id>
  const designId = params.slug?.[0] && params.slug[0] !== 'new' ? params.slug[0] : null;

  return (
    <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Loading Designer...</p>
        </div>
    }>
        <DesignTool designId={designId} />
    </Suspense>
  );
}
