import { mockMoments } from "./mock-data";
import type { Moment, SearchResult } from "./types";

export function queryToSlug(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugToQuery(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,.-]+/)
    .filter((token) => token.length > 1);
}

function scoreMoment(moment: Moment, queryTokens: string[]): number {
  if (queryTokens.length === 0) return 0;

  const searchable = [
    moment.title,
    moment.creator,
    moment.show,
    moment.explanation,
    moment.whyThisMatters,
    ...moment.tags,
    moment.category,
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;

  for (const token of queryTokens) {
    if (moment.title.toLowerCase().includes(token)) score += 12;
    if (moment.tags.some((tag) => tag.toLowerCase().includes(token))) score += 10;
    if (moment.creator.toLowerCase().includes(token)) score += 8;
    if (moment.explanation.toLowerCase().includes(token)) score += 6;
    if (moment.whyThisMatters.toLowerCase().includes(token)) score += 5;
    if (moment.show.toLowerCase().includes(token)) score += 4;
    if (searchable.includes(token)) score += 3;
  }

  const fullQuery = queryTokens.join(" ");
  if (moment.title.toLowerCase().includes(fullQuery)) score += 20;
  if (moment.explanation.toLowerCase().includes(fullQuery)) score += 15;

  return score;
}

export function searchMoments(query: string): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const queryTokens = tokenize(trimmed);

  return mockMoments
    .map((moment) => ({
      ...moment,
      relevanceScore: scoreMoment(moment, queryTokens),
    }))
    .filter((result) => result.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export function getMomentById(id: string): Moment | undefined {
  return mockMoments.find((moment) => moment.id === id);
}

export function getRelatedMoments(moment: Moment): Moment[] {
  return moment.relatedMomentIds
    .map((id) => getMomentById(id))
    .filter((m): m is Moment => m !== undefined);
}

export const exampleQueries = [
  "best explanation of RAG",
  "Naval on leverage",
  "Huberman dopamine",
  "How Kubernetes works",
  "startup product-market fit",
  "Stoic philosophy daily practice",
] as const;
