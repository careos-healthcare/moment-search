export function MomentCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row">
        <div className="aspect-video w-full shrink-0 animate-pulse bg-white/[0.06] sm:aspect-auto sm:h-auto sm:w-44 md:w-52" />
        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="space-y-2">
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/[0.08]" />
            <div className="h-4 w-1/2 animate-pulse rounded-lg bg-white/[0.06]" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-md bg-white/[0.06]" />
            <div className="h-6 w-20 animate-pulse rounded-md bg-white/[0.06]" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/[0.06]" />
            <div className="h-4 w-full animate-pulse rounded bg-white/[0.06]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.06]" />
          </div>
          <div className="h-20 animate-pulse rounded-xl bg-violet-500/[0.06]" />
          <div className="flex gap-2">
            <div className="h-5 w-14 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-5 w-12 animate-pulse rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <MomentCardSkeleton key={i} />
      ))}
    </div>
  );
}
