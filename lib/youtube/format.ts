export function formatTimestamp(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

export function youtubeWatchUrl(videoId: string, timestampSeconds: number): string {
  return `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(timestampSeconds)}s`;
}

export function youtubeEmbedUrl(
  videoId: string,
  timestampSeconds: number,
  autoplay = true,
): string {
  const params = new URLSearchParams({
    start: String(Math.floor(timestampSeconds)),
    rel: "0",
    modestbranding: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function youtubeThumbnailUrl(videoId: string, quality: "default" | "mq" | "hq" = "mq"): string {
  const map = { default: "default", mq: "mqdefault", hq: "hqdefault" };
  return `https://img.youtube.com/vi/${videoId}/${map[quality]}.jpg`;
}

export function chunkSlug(videoId: string, timestampSeconds: number): string {
  return `${videoId}-${Math.floor(timestampSeconds)}`;
}

export function parseChunkSlug(slug: string): { videoId: string; timestampSeconds: number } | null {
  const match = slug.match(/^([a-zA-Z0-9_-]{11})-(\d+)$/);
  if (!match) return null;
  return {
    videoId: match[1],
    timestampSeconds: Number(match[2]),
  };
}
