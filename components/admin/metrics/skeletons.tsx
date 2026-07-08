import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shape-matched loading fallbacks, one per dashboard section, so each part
 * of the page shimmers independently while its own data streams in.
 */

export function StatStripSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border shadow-xs sm:grid-cols-4 xl:grid-cols-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2.5 bg-card px-3.5 py-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-9" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GrowthKpisSkeleton() {
  return (
    <div className="grid h-full gap-px overflow-hidden rounded-md border bg-border shadow-xs lg:grid-rows-3 max-lg:grid-cols-3 max-sm:grid-cols-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col justify-center gap-1.5 bg-card px-4 py-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-md border bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-56" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
      <Skeleton className="h-[240px] w-full" />
    </div>
  );
}

/** Fallback for one cell of the analytics quad (the grid supplies dividers). */
export function MiniCardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-3 bg-card p-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-2 h-24 w-full" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-md border bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </div>
    </div>
  );
}
