export type AnalyticsEvent =
  | "search_performed"
  | "moment_opened"
  | "link_copied"
  | "saved_moment"
  | "email_captured";

export interface AnalyticsEntry {
  event: AnalyticsEvent;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}

const STORAGE_KEY = "momentsearch_analytics";
const MAX_EVENTS = 500;

function readLocalEvents(): AnalyticsEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalyticsEntry[];
  } catch {
    return [];
  }
}

function writeLocalEvent(entry: AnalyticsEntry): void {
  if (typeof window === "undefined") return;

  const events = readLocalEvents();
  events.push(entry);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(events.slice(-MAX_EVENTS)),
  );
}

function getSourcePage(): string {
  if (typeof window === "undefined") return "unknown";
  return window.location.pathname;
}

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;

  const enriched = {
    ...properties,
    sourcePage: properties?.sourcePage ?? getSourcePage(),
  };

  const entry: AnalyticsEntry = {
    event,
    timestamp: new Date().toISOString(),
    properties: enriched,
  };

  writeLocalEvent(entry);

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties: enriched }),
  }).catch(() => {
    // Local fallback already persisted.
  });
}

export function getAnalyticsEvents(): AnalyticsEntry[] {
  return readLocalEvents();
}

export function getAnalyticsSummary(): Record<AnalyticsEvent, number> {
  const summary: Record<AnalyticsEvent, number> = {
    search_performed: 0,
    moment_opened: 0,
    link_copied: 0,
    saved_moment: 0,
    email_captured: 0,
  };

  for (const entry of readLocalEvents()) {
    summary[entry.event] += 1;
  }

  return summary;
}

export function getCurrentSourcePage(): string {
  return getSourcePage();
}
