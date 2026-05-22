import type { MomentDisplay } from "@/lib/moments";
import { momentSharePath } from "@/lib/moments";
import { youtubeWatchUrl } from "@/lib/youtube/format";

export function buildShareCardText(
  moment: MomentDisplay,
  origin = "https://momentsearch.app",
): string {
  const url = `${origin}${momentSharePath(moment.slug)}`;
  const youtubeLine = moment.videoId
    ? `\n▶ YouTube: ${youtubeWatchUrl(moment.videoId, moment.timestampSeconds)}`
    : "";

  return [
    `"${moment.title}"`,
    `${moment.creator} · ${moment.show}`,
    `⏱ ${moment.timestamp} (${moment.duration})`,
    "",
    moment.snippet.slice(0, 220) + (moment.snippet.length > 220 ? "…" : ""),
    youtubeLine,
    "",
    `Found on MomentSearch → ${url}`,
  ]
    .filter(Boolean)
    .join("\n");
}
