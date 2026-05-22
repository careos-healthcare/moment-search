import Link from "next/link";
import { queryToSlug } from "@/lib/search";

interface EmptyStateProps {
  query: string;
  variant: "no-results" | "empty";
}

export function EmptyState({ query, variant }: EmptyStateProps) {
  const isNoResults = variant === "no-results";

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
        <svg
          className="h-8 w-8 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          {isNoResults ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          )}
        </svg>
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {isNoResults ? "No moments found" : "Search for a moment"}
      </h2>

      <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-400">
        {isNoResults ? (
          <>
            We couldn&apos;t find podcast moments matching{" "}
            <span className="text-zinc-300">&ldquo;{query}&rdquo;</span>. Try
            different keywords or browse an example topic below.
          </>
        ) : (
          "Type a topic, creator, or concept to discover the exact timestamp where experts explain it clearly."
        )}
      </p>

      {isNoResults && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["RAG explained", "Naval leverage", "Huberman dopamine"].map(
            (suggestion) => (
              <Link
                key={suggestion}
                href={`/search/${queryToSlug(suggestion)}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-violet-500/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                {suggestion}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
