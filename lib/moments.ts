import type { Moment, MomentCategory, SemanticSearchResult } from "@/lib/types";

export interface MomentDisplay {
  id: string;
  slug: string;
  title: string;
  creator: string;
  show: string;
  videoId?: string;
  timestamp: string;
  timestampSeconds: number;
  duration: string;
  snippet: string;
  whyThisMatters?: string;
  tags: string[];
  category: MomentCategory;
  relevanceScore?: number;
  source: "youtube" | "mock";
}

export function semanticToDisplay(result: SemanticSearchResult): MomentDisplay {
  return {
    id: result.id,
    slug: result.slug,
    title: deriveTitle(result.text, result.creator),
    creator: result.creator,
    show: result.show,
    videoId: result.videoId,
    timestamp: result.timestamp,
    timestampSeconds: result.timestampSeconds,
    duration: result.duration,
    snippet: result.text,
    tags: result.tags,
    category: result.category,
    relevanceScore: result.relevanceScore,
    source: "youtube",
  };
}

export function mockToDisplay(moment: Moment, relevanceScore?: number): MomentDisplay {
  return {
    id: moment.id,
    slug: moment.slug ?? moment.id,
    title: moment.title,
    creator: moment.creator,
    show: moment.show,
    videoId: moment.videoId,
    timestamp: moment.timestamp,
    timestampSeconds: moment.timestampSeconds,
    duration: moment.duration,
    snippet: moment.explanation,
    whyThisMatters: moment.whyThisMatters,
    tags: moment.tags,
    category: moment.category,
    relevanceScore,
    source: "mock",
  };
}

function deriveTitle(text: string, creator: string): string {
  const sentence = text.split(/(?<=[.!?])\s+/)[0]?.trim() ?? text;
  const trimmed = sentence.length > 90 ? `${sentence.slice(0, 87)}…` : sentence;
  return trimmed || `${creator} on this topic`;
}

export function momentSharePath(slug: string): string {
  return `/moment/${slug}`;
}

export function momentShareUrl(slug: string, origin = ""): string {
  return `${origin}${momentSharePath(slug)}`;
}
