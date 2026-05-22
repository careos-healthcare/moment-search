"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/client/analytics";

export function MomentOpenedTracker({
  slug,
  creator,
}: {
  slug: string;
  creator: string;
}) {
  useEffect(() => {
    trackEvent("moment_opened", { slug, creator });
  }, [slug, creator]);

  return null;
}
