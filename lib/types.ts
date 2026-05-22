export type MomentCategory =
  | "ai"
  | "startups"
  | "productivity"
  | "psychology"
  | "health"
  | "philosophy";

export interface TranscriptSegment {
  text: string;
  offset: number;
  duration: number;
}

export interface TranscriptChunk {
  id: string;
  slug: string;
  videoId: string;
  title: string;
  creator: string;
  show: string;
  category: MomentCategory;
  tags: string[];
  timestampSeconds: number;
  endSeconds: number;
  timestamp: string;
  durationSeconds: number;
  duration: string;
  text: string;
}

export interface VideoRecord {
  videoId: string;
  title: string;
  creator: string;
  show: string;
  category: MomentCategory;
  tags: string[];
  ingestedAt: string;
  segmentCount: number;
  chunkCount: number;
}

export interface MomentDataset {
  version: number;
  updatedAt: string;
  videos: VideoRecord[];
  chunks: TranscriptChunk[];
}

export interface SemanticSearchResult extends TranscriptChunk {
  relevanceScore: number;
  keywordScore: number;
  similarityScore: number;
}

/** Legacy mock moment shape (fallback when dataset is empty). */
export interface Moment {
  id: string;
  title: string;
  creator: string;
  show: string;
  timestamp: string;
  timestampSeconds: number;
  duration: string;
  durationSeconds: number;
  explanation: string;
  whyThisMatters: string;
  tags: string[];
  category: MomentCategory;
  relatedMomentIds: string[];
  videoId?: string;
  slug?: string;
}

export interface SearchResult extends Moment {
  relevanceScore: number;
}

export interface SeedVideo {
  videoId: string;
  title: string;
  creator: string;
  show: string;
  category: MomentCategory;
  tags: string[];
}
