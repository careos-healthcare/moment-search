import { SearchHeader } from "@/components/SearchHeader";
import { SearchResultsSkeleton } from "@/components/MomentCardSkeleton";

export default function SearchLoading() {
  return (
    <div className="min-h-screen">
      <SearchHeader />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8 space-y-2">
          <div className="h-4 w-48 animate-pulse rounded bg-white/[0.06]" />
        </div>
        <SearchResultsSkeleton />
      </div>
    </div>
  );
}
