"use client";

import { useCallback, useEffect, useState } from "react";
import type { MomentDisplay } from "@/lib/moments";
import { trackEvent } from "@/lib/client/analytics";
import {
  getSavedMoments,
  isMomentSaved,
  SAVED_MOMENTS_CHANGED,
  toggleSavedMoment,
} from "@/lib/client/saved-moments";

export function useSavedMoment(moment: MomentDisplay) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isMomentSaved(moment.slug));

    function sync() {
      setSaved(isMomentSaved(moment.slug));
    }

    window.addEventListener(SAVED_MOMENTS_CHANGED, sync);
    return () => window.removeEventListener(SAVED_MOMENTS_CHANGED, sync);
  }, [moment.slug]);

  const toggle = useCallback(() => {
    const next = toggleSavedMoment(moment);
    setSaved(next);
    if (next) {
      trackEvent("saved_moment", { slug: moment.slug, creator: moment.creator });
    }
  }, [moment]);

  return { saved, toggle };
}

export function useSavedMomentsList() {
  const [entries, setEntries] = useState<ReturnType<typeof getSavedMoments>>([]);

  useEffect(() => {
    function sync() {
      setEntries(getSavedMoments());
    }

    sync();
    window.addEventListener(SAVED_MOMENTS_CHANGED, sync);
    return () => window.removeEventListener(SAVED_MOMENTS_CHANGED, sync);
  }, []);

  return entries;
}
