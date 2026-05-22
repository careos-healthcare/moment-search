import type { Metadata } from "next";
import { MomentCard } from "@/components/MomentCard";
import { SearchHeader } from "@/components/SearchHeader";
import { EmptyState } from "@/components/EmptyState";
import {
  getRelatedMoments,
  searchMoments,
  slugToQuery,
} from "@/lib/search";

interface SearchPageProps {
  params: Promise<{ query: string }>;
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const { query: slug } = await params;
  const query = slugToQuery(slug);

  return {
    title: query ? `${query} — MomentSearch` : "Search — MomentSearch",
    description: `Find the exact podcast moment about "${query}". Timestamps, explanations, and related insights.`,
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { query: slug } = await params;
  const query = slugToQuery(slug);
  const results = searchMoments(query);

  const relatedIds = new Set<string>();
  const relatedMoments = results.slice(0, 2).flatMap((result) => {
    return getRelatedMoments(result).filter((m) => {
      if (results.some((r) => r.id === m.id) || relatedIds.has(m.id)) {
        return false;
      }
      relatedIds.add(m.id);
      return true;
    });
  });

  return (
    <div className="min-h-screen">
      <SearchHeader query={query} resultCount={results.length} />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {query && results.length > 0 && (
          <div className="mb-8">
            <h1 className="text-sm font-medium text-zinc-500">
              Results for{" "}
              <span className="text-zinc-300">&ldquo;{query}&rdquo;</span>
            </h1>
          </div>
        )}

        {!query ? (
          <EmptyState query="" variant="empty" />
        ) : results.length === 0 ? (
          <EmptyState query={query} variant="no-results" />
        ) : (
          <>
            <div className="space-y-4">
              {results.map((moment, index) => (
                <div
                  key={moment.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <MomentCard moment={moment} index={index} />
                </div>
              ))}
            </div>

            {relatedMoments.length > 0 && (
              <section className="mt-12 border-t border-white/[0.06] pt-10">
                <h2 className="mb-1 text-lg font-semibold tracking-tight text-white">
                  Related moments
                </h2>
                <p className="mb-6 text-sm text-zinc-500">
                  Connected insights you might also want to hear.
                </p>
                <div className="space-y-4">
                  {relatedMoments.slice(0, 3).map((moment, index) => (
                    <MomentCard key={moment.id} moment={moment} index={index} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
