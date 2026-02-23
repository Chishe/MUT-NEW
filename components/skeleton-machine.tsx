"use client";

export function SkeletonMachine() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-muted rounded mb-6" />

      {/* Grid Machine Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-background p-4 space-y-4"
          >
            {/* Machine Name */}
            <div className="h-4 w-24 bg-muted rounded" />

            {/* Status pill */}
            <div className="h-6 w-14 bg-muted rounded-full" />

            {/* Power icon placeholder */}
            <div className="h-4 w-4 bg-muted rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}