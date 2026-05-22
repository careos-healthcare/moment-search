import { SearchBar } from "./SearchBar";
import { SiteNav } from "./SiteNav";
import { Logo } from "./Logo";

interface SearchHeaderProps {
  query?: string;
  resultCount?: number;
}

export function SearchHeader({ query, resultCount }: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          <div className="flex items-center gap-3">
            {query && resultCount !== undefined && (
              <p className="hidden text-xs text-zinc-500 sm:block sm:text-sm">
                <span className="font-medium text-zinc-300">{resultCount}</span>{" "}
                moment{resultCount !== 1 ? "s" : ""} found
              </p>
            )}
            <SiteNav />
          </div>
        </div>

        <SearchBar defaultValue={query} size="compact" />
      </div>
    </header>
  );
}
