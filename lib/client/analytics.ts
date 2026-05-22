export type AnalyticsEvent =
  | "search_performed"
  | "moment_opened"
  | "link_copied"
  | "email_captured";

export interface AnalyticsEntry {
  event: AnalyticsEvent;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}

const STORAGE_KEY = "momentsearch_analytics";
const MAX_EVENTS = 500;

function readEvents(): AnalyticsEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalyticsEntry[];
  } catch {
    return [];
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;

  const events = readEvents();
  events.push({
    event,
    timestamp: new Date().toISOString(),
    properties,
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(events.slice(-MAX_EVENTS)),
  );
}

export function getAnalyticsEvents(): AnalyticsEntry[] {
  return readEvents();
}

export function getAnalyticsSummary(): Record<AnalyticsEvent, number> {
  const summary: Record<AnalyticsEvent, number> = {
    search_performed: 0,
    moment_opened: 0,
    link_copied: 0,
    email_captured: 0,
  };

  for (const entry of readEvents()) {
    summary[entry.event] += 1;
  }

  return summary;
}
