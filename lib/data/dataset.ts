import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "fs";
import { join } from "path";
import type { MomentDataset, TranscriptChunk } from "@/lib/types";

const DATA_DIR = join(process.cwd(), "data");
const DATASET_PATH = join(DATA_DIR, "moments.json");

const EMPTY_DATASET: MomentDataset = {
  version: 1,
  updatedAt: new Date(0).toISOString(),
  videos: [],
  chunks: [],
};

let cachedDataset: MomentDataset | null = null;
let cacheMtime = 0;

function readDatasetFromDisk(): MomentDataset {
  if (!existsSync(DATASET_PATH)) return EMPTY_DATASET;

  try {
    const raw = readFileSync(DATASET_PATH, "utf-8");
    return JSON.parse(raw) as MomentDataset;
  } catch {
    return EMPTY_DATASET;
  }
}

export function loadDataset(): MomentDataset {
  if (existsSync(DATASET_PATH)) {
    const stat = statSync(DATASET_PATH);
    if (cachedDataset && stat.mtimeMs === cacheMtime) {
      return cachedDataset;
    }
    cachedDataset = readDatasetFromDisk();
    cacheMtime = stat.mtimeMs;
    return cachedDataset;
  }

  return EMPTY_DATASET;
}

export function saveDataset(dataset: MomentDataset): void {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATASET_PATH, JSON.stringify(dataset, null, 2), "utf-8");
  cachedDataset = dataset;
  cacheMtime = Date.now();
}

export function getDatasetPath(): string {
  return DATASET_PATH;
}

export function getChunkBySlug(slug: string): TranscriptChunk | undefined {
  const dataset = loadDataset();
  return dataset.chunks.find((chunk) => chunk.slug === slug);
}

export function getRelatedChunks(chunk: TranscriptChunk, limit = 3): TranscriptChunk[] {
  const dataset = loadDataset();
  const sameVideo = dataset.chunks.filter(
    (c) => c.videoId === chunk.videoId && c.slug !== chunk.slug,
  );
  const sameCreator = dataset.chunks.filter(
    (c) =>
      c.creator === chunk.creator &&
      c.slug !== chunk.slug &&
      c.videoId !== chunk.videoId,
  );

  const scored = [...sameVideo, ...sameCreator].map((candidate) => {
    const timeDistance = Math.abs(candidate.timestampSeconds - chunk.timestampSeconds);
    const sameVidBonus = candidate.videoId === chunk.videoId ? 1000 : 0;
    return { candidate, score: sameVidBonus - timeDistance };
  });

  const seen = new Set<string>();
  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ candidate }) => candidate)
    .filter((c) => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    })
    .slice(0, limit);
}

export function hasIngestedData(): boolean {
  return loadDataset().chunks.length > 0;
}
