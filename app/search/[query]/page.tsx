import type { Metadata } from "next";
import { MomentCard } from "@/components/MomentCard";
import { SearchHeader } from "@/components/SearchHeader";
import { EmptyState } from "@/components/EmptyState";
import { EmailCapture } from "@/components/EmailCapture";
import { SearchPerformedTracker } from "@/components/SearchPerformedTracker";
import {
  getRelatedMoments,
  searchMoments,
} from "@/lib/search/server-search";
import { slugToQuery } from "@/lib/search/url";
import { hasIngestedData } from "@/lib/data/dataset";

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
  const usingTranscripts = hasIngestedData();

  const relatedIds = new Set<string>();
  const relatedMoments = results.slice(0, 2).flatMap((result) => {
    return getRelatedMoments(result).filter((m) => {
      if (results.some((r) => r.slug === m.slug) || relatedIds.has(m.slug)) {
        return false;
      }
      relatedIds.add(m.slug);
      return true;
    });
  });

  return (
    <div className="min-h-screen">
      <SearchPerformedTracker query={query} />
      <SearchHeader query={query} resultCount={results.length} />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {query && results.length > 0 && (
          <div className="mb-8 space-y-1">
            <h1 className="text-sm font-medium text-zinc-500">
              Results for{" "}
              <span className="text-zinc-300">&ldquo;{query}&rdquo;</span>
            </h1>
            {usingTranscripts && (
              <p className="text-xs text-violet-400/80">
                Ranked by transcript relevance · exact timestamps
              </p>
            )}
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
                  key={moment.slug}
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
                    <MomentCard key={moment.slug} moment={moment} index={index} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <div className="mt-12">
          <EmailCapture source="search-results" variant="compact" />
        </div>
      </div>
    </div>
  );
}
