export type MomentCategory =
  | "ai"
  | "startups"
  | "productivity"
  | "psychology"
  | "health"
  | "philosophy";

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
}

export interface SearchResult extends Moment {
  relevanceScore: number;
}
