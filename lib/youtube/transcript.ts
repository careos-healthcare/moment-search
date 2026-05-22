import { YoutubeTranscript } from "youtube-transcript";
import type { TranscriptSegment } from "@/lib/types";

interface RawTranscriptLine {
  text?: string;
  offset?: number;
  duration?: number;
}

function usesMilliseconds(segments: RawTranscriptLine[]): boolean {
  const sample = segments.slice(0, 8);
  if (sample.length === 0) return false;
  const avgDuration =
    sample.reduce((sum, line) => sum + (line.duration ?? 0), 0) / sample.length;
  return avgDuration > 30;
}

function normalizeSegments(lines: RawTranscriptLine[]): TranscriptSegment[] {
  const ms = usesMilliseconds(lines);

  return lines
    .map((line): TranscriptSegment | null => {
      const text = line.text?.trim();
      if (!text) return null;

      const rawOffset = typeof line.offset === "number" ? line.offset : 0;
      const rawDuration = typeof line.duration === "number" ? line.duration : ms ? 2000 : 2;

      return {
        text,
        offset: ms ? rawOffset / 1000 : rawOffset,
        duration: ms ? rawDuration / 1000 : rawDuration,
      };
    })
    .filter((segment): segment is TranscriptSegment => segment !== null);
}

async function fetchTimedTextFallback(videoId: string): Promise<TranscriptSegment[]> {
  const languages = ["en", "en-US", "en-GB"];

  for (const lang of languages) {
    const url = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=${lang}&fmt=srv3`;
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; YouTubeTimeSearch/1.0)" },
    });

    if (!response.ok) continue;

    const xml = await response.text();
    const segments = parseTimedTextXml(xml);
    if (segments.length > 0) return segments;
  }

  return [];
}

function parseTimedTextXml(xml: string): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  const textBlockRegex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g;

  let match: RegExpExecArray | null;
  while ((match = textBlockRegex.exec(xml)) !== null) {
    const text = decodeXmlEntities(stripTags(match[3])).trim();
    if (!text) continue;

    segments.push({
      text,
      offset: parseFloat(match[1]),
      duration: parseFloat(match[2]),
    });
  }

  return segments;
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, "");
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export async function fetchYouTubeTranscript(videoId: string): Promise<TranscriptSegment[]> {
  try {
    const raw = await YoutubeTranscript.fetchTranscript(videoId);
    const segments = normalizeSegments(raw as RawTranscriptLine[]);

    if (segments.length > 0) return segments;
  } catch {
    // Fall through to timedtext parsing.
  }

  const fallback = await fetchTimedTextFallback(videoId);
  if (fallback.length === 0) {
    throw new Error(`No transcript available for video ${videoId}`);
  }

  return fallback;
}

export function chunkTranscript(
  segments: TranscriptSegment[],
  options: {
    maxChars?: number;
    maxSeconds?: number;
    minChars?: number;
  } = {},
): Array<{ startSeconds: number; endSeconds: number; text: string }> {
  const maxChars = options.maxChars ?? 320;
  const maxSeconds = options.maxSeconds ?? 55;
  const minChars = options.minChars ?? 80;

  const chunks: Array<{ startSeconds: number; endSeconds: number; text: string }> = [];
  let buffer = "";
  let startSeconds = 0;
  let endSeconds = 0;

  const flush = () => {
    const text = buffer.trim();
    if (text.length >= minChars) {
      chunks.push({ startSeconds, endSeconds, text });
    }
    buffer = "";
  };

  for (const segment of segments) {
    if (!buffer) {
      startSeconds = segment.offset;
    }

    const next = buffer ? `${buffer} ${segment.text}` : segment.text;
    endSeconds = segment.offset + segment.duration;
    const span = endSeconds - startSeconds;

    if (next.length > maxChars || span > maxSeconds) {
      flush();
      buffer = segment.text;
      startSeconds = segment.offset;
      endSeconds = segment.offset + segment.duration;
      continue;
    }

    buffer = next;
  }

  flush();
  return chunks;
}
