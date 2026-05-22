"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/client/analytics";

export function SearchPerformedTracker({ query }: { query: string }) {
  useEffect(() => {
    if (!query.trim()) return;
    trackEvent("search_performed", { query: query.trim() });
  }, [query]);

  return null;
}
