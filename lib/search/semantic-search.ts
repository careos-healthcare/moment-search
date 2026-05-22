import type { MomentDataset, SemanticSearchResult, TranscriptChunk } from "@/lib/types";
import { cosineSimilarity, keywordScore, termFrequency, tokenize } from "./tokenize";

const MAX_RESULTS = 20;

function scoreChunk(chunk: TranscriptChunk, queryTokens: string[]): SemanticSearchResult {
  const searchable = [
    chunk.title,
    chunk.creator,
    chunk.show,
    chunk.text,
    ...chunk.tags,
    chunk.category,
  ].join(" ");

  const kw = keywordScore(queryTokens, searchable, {
    [chunk.creator.toLowerCase()]: 4,
    [chunk.category]: 3,
  });

  const queryTf = termFrequency(queryTokens);
  const chunkTf = termFrequency(tokenize(searchable));
  const similarity = cosineSimilarity(queryTf, chunkTf);

  const maxKw = Math.max(1, queryTokens.length * 4);
  const normalizedKw = Math.min(1, kw / maxKw);
  const relevanceScore = normalizedKw * 0.55 + similarity * 0.45;

  return {
    ...chunk,
    keywordScore: kw,
    similarityScore: similarity,
    relevanceScore,
  };
}

export function semanticSearch(
  query: string,
  dataset: MomentDataset,
  limit = MAX_RESULTS,
): SemanticSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed || dataset.chunks.length === 0) return [];

  const queryTokens = tokenize(trimmed);
  if (queryTokens.length === 0) return [];

  return dataset.chunks
    .map((chunk) => scoreChunk(chunk, queryTokens))
    .filter((result) => result.relevanceScore > 0.08 || result.keywordScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

export function semanticRelated(
  chunk: TranscriptChunk,
  dataset: MomentDataset,
  limit = 3,
): SemanticSearchResult[] {
  const query = [chunk.title, ...chunk.tags.slice(0, 3), chunk.text.slice(0, 120)].join(" ");
  return semanticSearch(query, dataset, limit + 1).filter((r) => r.slug !== chunk.slug).slice(0, limit);
}
