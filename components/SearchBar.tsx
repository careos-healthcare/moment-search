"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { queryToSlug } from "@/lib/search/url";

interface SearchBarProps {
  defaultValue?: string;
  size?: "hero" | "compact";
  autoFocus?: boolean;
  placeholder?: string;
}

export function SearchBar({
  defaultValue = "",
  size = "hero",
  autoFocus = false,
  placeholder = "Search for the exact moment…",
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const submit = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      router.push(`/search/${queryToSlug(trimmed)}`);
    },
    [router],
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit(query);
  }

  const isHero = size === "hero";

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <label htmlFor="moment-search" className="sr-only">
        Search podcast moments
      </label>
      <div
        className={`group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 focus-within:border-violet-500/40 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)] hover:border-white/15 ${
          isHero ? "px-5 py-4 sm:px-6 sm:py-5" : "px-4 py-3"
        }`}
      >
        <SearchIcon className="shrink-0 text-zinc-500 transition-colors group-focus-within:text-violet-400" />
        <input
          ref={inputRef}
          id="moment-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          enterKeyHint="search"
          className={`w-full bg-transparent text-white placeholder:text-zinc-500 focus:outline-none ${
            isHero ? "text-base sm:text-lg" : "text-sm sm:text-base"
          }`}
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className={`shrink-0 rounded-xl bg-violet-600 font-medium text-white transition-all duration-200 hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 ${
            isHero ? "px-5 py-2.5 text-sm" : "px-4 py-2 text-xs sm:text-sm"
          }`}
        >
          Find
        </button>
      </div>
    </form>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 ${className ?? ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}
