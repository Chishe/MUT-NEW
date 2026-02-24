"use client";

export function SkeletonMachine() {
  return (
    <div className="h-full">
      <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch animate-pulse">
        
        {/* ซ้าย (Control Panel Skeleton) */}
        <div className="md:col-span-1 h-full flex flex-col gap-6">
          <div className="h-full rounded-3xl border bg-white/5 p-10 flex flex-col items-center justify-center gap-16">
            
            {/* START Lamp Skeleton */}
            <div className="flex flex-col items-center gap-6">
              <div className="w-28 h-28 rounded-full bg-muted" />
              <div className="space-y-2 text-center">
                <div className="h-3 w-24 bg-muted rounded mx-auto" />
                <div className="h-5 w-20 bg-muted rounded mx-auto" />
              </div>
            </div>

            {/* SELECTOR Skeleton */}
            <div className="flex flex-col items-center gap-6">
              <div className="w-28 h-28 rounded-full bg-muted" />
              <div className="space-y-2 text-center">
                <div className="h-3 w-28 bg-muted rounded mx-auto" />
                <div className="h-5 w-16 bg-muted rounded mx-auto" />
              </div>
            </div>

          </div>
        </div>

        {/* ขวา (Machine Status Skeleton) */}
        <div className="md:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
          
          {/* Title */}
          <div className="h-6 w-40 bg-muted rounded mb-6" />

          {/* Grid Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border bg-background p-4 space-y-4"
              >
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-6 w-16 bg-muted rounded-full" />
                <div className="h-4 w-4 bg-muted rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}