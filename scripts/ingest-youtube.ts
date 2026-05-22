#!/usr/bin/env npx tsx
/**
 * Ingest YouTube transcripts for curated seed videos.
 * Usage: npm run ingest
 */
import { seedVideos } from "../data/seed-videos";
import { saveDataset, loadDataset } from "../lib/data/dataset";
import { chunkTranscript, fetchYouTubeTranscript } from "../lib/youtube/transcript";
import {
  chunkSlug,
  formatDuration,
  formatTimestamp,
} from "../lib/youtube/format";
import type { MomentDataset, TranscriptChunk, VideoRecord } from "../lib/types";

async function ingestVideo(seed: (typeof seedVideos)[number]): Promise<{
  video: VideoRecord;
  chunks: TranscriptChunk[];
}> {
  console.log(`\n→ ${seed.creator}: ${seed.title} (${seed.videoId})`);

  const segments = await fetchYouTubeTranscript(seed.videoId);
  console.log(`  ${segments.length} transcript segments`);

  const rawChunks = chunkTranscript(segments);
  console.log(`  ${rawChunks.length} semantic chunks`);

  const chunks: TranscriptChunk[] = rawChunks.map((block, index) => {
    const durationSeconds = Math.max(1, block.endSeconds - block.startSeconds);
    const slug = chunkSlug(seed.videoId, block.startSeconds);

    return {
      id: `${seed.videoId}-${index}`,
      slug,
      videoId: seed.videoId,
      title: seed.title,
      creator: seed.creator,
      show: seed.show,
      category: seed.category,
      tags: seed.tags,
      timestampSeconds: block.startSeconds,
      endSeconds: block.endSeconds,
      timestamp: formatTimestamp(block.startSeconds),
      durationSeconds,
      duration: formatDuration(durationSeconds),
      text: block.text,
    };
  });

  const video: VideoRecord = {
    videoId: seed.videoId,
    title: seed.title,
    creator: seed.creator,
    show: seed.show,
    category: seed.category,
    tags: seed.tags,
    ingestedAt: new Date().toISOString(),
    segmentCount: segments.length,
    chunkCount: chunks.length,
  };

  return { video, chunks };
}

async function main() {
  const existing = loadDataset();
  const byVideoId = new Map(existing.videos.map((v) => [v.videoId, v]));
  const chunksByVideo = new Map<string, TranscriptChunk[]>();

  for (const chunk of existing.chunks) {
    const list = chunksByVideo.get(chunk.videoId) ?? [];
    list.push(chunk);
    chunksByVideo.set(chunk.videoId, list);
  }

  let success = 0;
  let failed = 0;

  for (const seed of seedVideos) {
    try {
      const { video, chunks } = await ingestVideo(seed);
      byVideoId.set(seed.videoId, video);
      chunksByVideo.set(seed.videoId, chunks);
      success += 1;
    } catch (error) {
      failed += 1;
      console.error(`  ✗ Failed: ${error instanceof Error ? error.message : error}`);
    }
  }

  const videos = [...byVideoId.values()];
  const chunks = [...chunksByVideo.values()].flat();

  const dataset: MomentDataset = {
    version: 1,
    updatedAt: new Date().toISOString(),
    videos,
    chunks,
  };

  saveDataset(dataset);

  console.log(`\n✓ Ingested ${success}/${seedVideos.length} videos (${failed} failed)`);
  console.log(`✓ ${chunks.length} searchable chunks → data/moments.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
