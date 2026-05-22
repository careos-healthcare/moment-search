"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/client/analytics";
import type { MomentDisplay } from "@/lib/moments";
import { momentSharePath } from "@/lib/moments";
import { buildShareCardText } from "@/lib/share-card";
import { youtubeWatchUrl } from "@/lib/youtube/format";

interface MomentShareActionsProps {
  moment: MomentDisplay;
}

export function MomentShareActions({ moment }: MomentShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);

  const sharePath = momentSharePath(moment.slug);
  const youtubeUrl = moment.videoId
    ? youtubeWatchUrl(moment.videoId, moment.timestampSeconds)
    : null;

  async function copyShareLink() {
    const url = `${window.location.origin}${sharePath}`;
    await navigator.clipboard.writeText(url);
    trackEvent("link_copied", { slug: moment.slug, format: "url" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyShareCard() {
    const text = buildShareCardText(moment, window.location.origin);
    await navigator.clipboard.writeText(text);
    trackEvent("link_copied", { slug: moment.slug, format: "share_card" });
    setCardCopied(true);
    setTimeout(() => setCardCopied(false), 2000);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {youtubeUrl && (
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white sm:text-sm"
        >
          Open on YouTube ↗
        </a>
      )}
      <button
        type="button"
        onClick={copyShareLink}
        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white sm:text-sm"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={copyShareCard}
        className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-500 sm:text-sm"
      >
        {cardCopied ? "Copied!" : "Copy share card"}
      </button>
    </div>
  );
}
