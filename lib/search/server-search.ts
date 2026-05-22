import "server-only";

import {
  getChunkBySlug,
  getRelatedChunks,
  hasIngestedData,
  loadDataset,
} from "@/lib/data/dataset";
import { mockMoments } from "@/lib/mock-data";
import { mockToDisplay, semanticToDisplay, type MomentDisplay } from "@/lib/moments";
import { semanticSearch } from "@/lib/search/semantic-search";
import type { Moment, SearchResult } from "@/lib/types";

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

function searchMockMoments(query: string): SearchResult[] {
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

export function searchMoments(query: string): MomentDisplay[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  let results: MomentDisplay[] = [];

  if (hasIngestedData()) {
    const dataset = loadDataset();
    results = semanticSearch(trimmed, dataset).map(semanticToDisplay);
  }

  if (results.length < 5) {
    const mockResults = searchMockMoments(trimmed).map((m) =>
      mockToDisplay(m, m.relevanceScore),
    );
    const seen = new Set(results.map((r) => r.slug));
    for (const mock of mockResults) {
      if (!seen.has(mock.slug) && results.length < 20) {
        results.push(mock);
        seen.add(mock.slug);
      }
    }
  }

  return results
    .sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0))
    .slice(0, 20);
}

export function getRelatedMoments(current: MomentDisplay): MomentDisplay[] {
  if (current.source === "youtube" && hasIngestedData()) {
    const chunk = getChunkBySlug(current.slug);
    if (!chunk) return [];

    return getRelatedChunks(chunk, 3).map((c) =>
      semanticToDisplay({
        ...c,
        keywordScore: 0,
        similarityScore: 0,
        relevanceScore: 0,
      }),
    );
  }

  const mock = mockMoments.find((m) => m.id === current.id);
  if (!mock) return [];

  return mock.relatedMomentIds
    .map((id) => mockMoments.find((m) => m.id === id))
    .filter((m): m is Moment => m !== undefined)
    .map((m) => mockToDisplay(m));
}
