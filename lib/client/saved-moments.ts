import type { MomentDisplay } from "@/lib/moments";

export interface SavedMomentEntry {
  moment: MomentDisplay;
  savedAt: string;
}

const STORAGE_KEY = "momentsearch_saved";
export const SAVED_MOMENTS_CHANGED = "saved-moments-changed";

function readSaved(): SavedMomentEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedMomentEntry[];
  } catch {
    return [];
  }
}

function writeSaved(entries: SavedMomentEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(SAVED_MOMENTS_CHANGED));
}

export function getSavedMoments(): SavedMomentEntry[] {
  return readSaved().sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  );
}

export function isMomentSaved(slug: string): boolean {
  return readSaved().some((entry) => entry.moment.slug === slug);
}

export function saveMoment(moment: MomentDisplay): void {
  const entries = readSaved().filter((entry) => entry.moment.slug !== moment.slug);
  entries.unshift({
    moment,
    savedAt: new Date().toISOString(),
  });
  writeSaved(entries);
}

export function removeMoment(slug: string): void {
  writeSaved(readSaved().filter((entry) => entry.moment.slug !== slug));
}

export function toggleSavedMoment(moment: MomentDisplay): boolean {
  if (isMomentSaved(moment.slug)) {
    removeMoment(moment.slug);
    return false;
  }
  saveMoment(moment);
  return true;
}
