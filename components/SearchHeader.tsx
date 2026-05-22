import Link from "next/link";
import { SearchBar } from "./SearchBar";

interface SearchHeaderProps {
  query?: string;
  resultCount?: number;
}

export function SearchHeader({ query, resultCount }: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded-lg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-white sm:inline">
              MomentSearch
            </span>
          </Link>

          {query && resultCount !== undefined && (
            <p className="text-xs text-zinc-500 sm:text-sm">
              <span className="font-medium text-zinc-300">{resultCount}</span>{" "}
              moment{resultCount !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <SearchBar defaultValue={query} size="compact" />
      </div>
    </header>
  );
}
