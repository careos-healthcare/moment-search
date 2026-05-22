import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { MomentCard } from "@/components/MomentCard";
import { EmailCapture } from "@/components/EmailCapture";
import { SiteNav } from "@/components/SiteNav";
import { MomentOpenedTracker } from "@/components/MomentOpenedTracker";
import { MomentShareActions } from "@/components/MomentShareActions";
import { getChunkBySlug, getRelatedChunks } from "@/lib/data/dataset";
import { semanticToDisplay } from "@/lib/moments";
import { youtubeWatchUrl } from "@/lib/youtube/format";

interface MomentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MomentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chunk = getChunkBySlug(slug);

  if (!chunk) {
    return { title: "Moment not found" };
  }

  const title = `${chunk.creator} — ${chunk.timestamp}`;
  const description = chunk.text.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | MomentSearch`,
      description,
      type: "video.other",
    },
  };
}

export default async function MomentPage({ params }: MomentPageProps) {
  const { slug } = await params;
  const chunk = getChunkBySlug(slug);

  if (!chunk) {
    notFound();
  }

  const moment = semanticToDisplay({
    ...chunk,
    keywordScore: 0,
    similarityScore: 0,
    relevanceScore: 1,
  });

  const related = getRelatedChunks(chunk, 3).map((c) =>
    semanticToDisplay({
      ...c,
      keywordScore: 0,
      similarityScore: 0,
      relevanceScore: 0,
    }),
  );

  const youtubeUrl = youtubeWatchUrl(chunk.videoId, chunk.timestampSeconds);

  return (
    <div className="min-h-screen">
      <MomentOpenedTracker slug={slug} creator={chunk.creator} />
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

          <div className="flex items-center gap-3">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-xs font-medium text-zinc-400 transition-colors hover:text-white sm:inline sm:text-sm"
            >
              Open on YouTube ↗
            </a>
            <SiteNav />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <YouTubePlayer
          videoId={chunk.videoId}
          timestampSeconds={chunk.timestampSeconds}
          title={moment.title}
        />

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
            Exact moment · {chunk.timestamp}
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {moment.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {chunk.creator}
            <span className="mx-1.5 text-zinc-600">·</span>
            {chunk.show}
          </p>
          <MomentShareActions moment={moment} />
        </div>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Transcript at this moment
          </h2>
          <p className="text-base leading-relaxed text-zinc-200">
            <mark className="rounded bg-violet-500/20 px-1 py-0.5 text-violet-100">
              {chunk.text}
            </mark>
          </p>
        </section>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {chunk.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <EmailCapture source="moment-page" variant="compact" />
        </div>

        {related.length > 0 && (
          <section className="mt-12 border-t border-white/[0.06] pt-10">
            <h2 className="mb-1 text-lg font-semibold tracking-tight text-white">
              Related moments
            </h2>
            <p className="mb-6 text-sm text-zinc-500">
              More from this video and creator.
            </p>
            <div className="space-y-4">
              {related.map((relatedMoment, index) => (
                <MomentCard key={relatedMoment.slug} moment={relatedMoment} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
