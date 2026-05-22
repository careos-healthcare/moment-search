"use client";

import Link from "next/link";
import { queryToSlug } from "@/lib/search";

interface TopicChipProps {
  label: string;
}

export function TopicChip({ label }: TopicChipProps) {
  return (
    <Link
      href={`/search/${queryToSlug(label)}`}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_0_20px_-8px_rgba(139,92,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
    >
      {label}
    </Link>
  );
}
