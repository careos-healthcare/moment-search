"use client";

import { useState } from "react";
import type { Moment } from "@/lib/types";

const categoryColors: Record<Moment["category"], string> = {
  ai: "from-blue-500/20 to-cyan-500/10",
  startups: "from-orange-500/20 to-amber-500/10",
  productivity: "from-emerald-500/20 to-teal-500/10",
  psychology: "from-pink-500/20 to-rose-500/10",
  health: "from-green-500/20 to-lime-500/10",
  philosophy: "from-purple-500/20 to-violet-500/10",
};

interface MomentCardProps {
  moment: Moment;
  index?: number;
}

export function MomentCard({ moment, index = 0 }: MomentCardProps) {
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  const gradient = categoryColors[moment.category];

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05] hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-44 md:w-52">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

          {/* Waveform decoration */}
          <div className="absolute inset-x-0 bottom-0 flex h-12 items-end justify-center gap-[3px] px-4 pb-3 opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-white/60 transition-all duration-300 group-hover:bg-white/80"
                style={{
                  height: `${20 + Math.sin(i * 0.8) * 12 + (i % 3) * 6}px`,
                }}
              />
            ))}
          </div>

          {/* Play button */}
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause moment" : "Play moment"}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-white">
              {playing ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </span>
          </button>

          {/* Timestamp badge */}
          <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm">
            {moment.timestamp}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                {moment.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                {moment.creator}
                <span className="mx-1.5 text-zinc-600">·</span>
                {moment.show}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSaved(!saved)}
              aria-label={saved ? "Remove from saved" : "Save moment"}
              aria-pressed={saved}
              className="shrink-0 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              {saved ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </button>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1 tabular-nums">
              <ClockIcon />
              {moment.duration}
            </span>
            <span className="rounded-md bg-white/[0.06] px-2 py-1 capitalize">
              {moment.category}
            </span>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-zinc-300">
            {moment.explanation}
          </p>

          <div className="mb-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.06] px-4 py-3">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">
              Why this matters
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {moment.whyThisMatters}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {moment.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}

function BookmarkFilledIcon() {
  return (
    <svg className="h-5 w-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
