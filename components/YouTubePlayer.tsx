interface YouTubePlayerProps {
  videoId: string;
  timestampSeconds: number;
  title: string;
}

export function YouTubePlayer({ videoId, timestampSeconds, title }: YouTubePlayerProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${Math.floor(timestampSeconds)}&autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
