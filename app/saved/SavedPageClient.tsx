"use client";

import Link from "next/link";
import { MomentCard } from "@/components/MomentCard";
import { SiteNav } from "@/components/SiteNav";
import { EmailCapture } from "@/components/EmailCapture";
import { useSavedMomentsList } from "@/hooks/useSavedMoments";

export default function SavedPageClient() {
  const entries = useSavedMomentsList();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              MomentSearch
            </span>
          </Link>
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Saved moments
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Stored locally on this device — {entries.length} moment
          {entries.length !== 1 ? "s" : ""}.
        </p>

        {entries.length === 0 ? (
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <svg className="h-8 w-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">No saved moments yet</h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-400">
              Tap the bookmark on any result to save it here for quick access.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              Start searching
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {entries.map(({ moment }, index) => (
              <MomentCard key={moment.slug} moment={moment} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <EmailCapture source="saved-page" variant="compact" />
        </div>
      </main>
    </div>
  );
}
