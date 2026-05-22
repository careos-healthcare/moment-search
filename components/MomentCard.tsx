"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { MomentDisplay } from "@/lib/moments";
import { momentSharePath } from "@/lib/moments";
import {
  youtubeThumbnailUrl,
  youtubeWatchUrl,
} from "@/lib/youtube/format";

const categoryColors: Record<MomentDisplay["category"], string> = {
  ai: "from-blue-500/20 to-cyan-500/10",
  startups: "from-orange-500/20 to-amber-500/10",
  productivity: "from-emerald-500/20 to-teal-500/10",
  psychology: "from-pink-500/20 to-rose-500/10",
  health: "from-green-500/20 to-lime-500/10",
  philosophy: "from-purple-500/20 to-violet-500/10",
};

interface MomentCardProps {
  moment: MomentDisplay;
  index?: number;
}

export function MomentCard({ moment, index = 0 }: MomentCardProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const gradient = categoryColors[moment.category];
  const hasVideo = Boolean(moment.videoId);
  const sharePath = momentSharePath(moment.slug);
  const youtubeUrl = moment.videoId
    ? youtubeWatchUrl(moment.videoId, moment.timestampSeconds)
    : null;

  async function copyShareLink() {
    const url = `${window.location.origin}${sharePath}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05] hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail / preview */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-44 md:w-52">
          {hasVideo ? (
            <>
              <Image
                src={youtubeThumbnailUrl(moment.videoId!, "hq")}
                alt=""
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
            </>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </>
          )}

          <Link
            href={sharePath}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50"
            aria-label={`Play exact moment: ${moment.title}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-white">
              <PlayIcon />
            </span>
          </Link>

          <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm">
            {moment.timestamp}
          </div>

          {hasVideo && (
            <div className="absolute right-3 top-3 rounded-md bg-red-600/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              YouTube
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link href={sharePath} className="group/title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded">
                <h3 className="text-base font-semibold leading-snug tracking-tight text-white transition-colors group-hover/title:text-violet-200 sm:text-lg">
                  {moment.title}
                </h3>
              </Link>
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
            {moment.source === "youtube" && (
              <span className="rounded-md bg-violet-500/10 px-2 py-1 text-violet-300">
                Transcript match
              </span>
            )}
          </div>

          <p className="mb-4 text-sm leading-relaxed text-zinc-300 line-clamp-4">
            {moment.snippet}
          </p>

          {moment.whyThisMatters && (
            <div className="mb-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.06] px-4 py-3">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">
                Why this matters
              </p>
              <p className="text-sm leading-relaxed text-zinc-300">
                {moment.whyThisMatters}
              </p>
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <Link
              href={sharePath}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:text-sm"
            >
              <PlayIcon className="h-3.5 w-3.5" />
              Play exact moment
            </Link>

            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:text-sm"
              >
                Open on YouTube
                <ExternalIcon />
              </a>
            )}

            <button
              type="button"
              onClick={copyShareLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:text-sm"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "ml-0.5 h-5 w-5"} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
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

function ExternalIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5M21 3l-9 9m0 0h5.25M12 12V3" />
    </svg>
  );
}
