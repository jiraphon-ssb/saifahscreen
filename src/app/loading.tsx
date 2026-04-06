export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold tracking-tighter text-foreground mb-1">SAIFAH</p>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.3em] animate-pulse">Loading Studio...</p>
      </div>
    </div>
  );
}
