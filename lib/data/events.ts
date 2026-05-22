import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export type ServerAnalyticsEvent =
  | "search_performed"
  | "moment_opened"
  | "link_copied"
  | "saved_moment"
  | "email_captured";

export interface ServerEvent {
  id: string;
  event: ServerAnalyticsEvent;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}

interface EventsFile {
  events: ServerEvent[];
}

const DATA_DIR = join(process.cwd(), "data");
const EVENTS_PATH = join(DATA_DIR, "events.json");
const MAX_EVENTS = 5000;

function readEventsFile(): EventsFile {
  if (!existsSync(EVENTS_PATH)) {
    return { events: [] };
  }

  try {
    return JSON.parse(readFileSync(EVENTS_PATH, "utf-8")) as EventsFile;
  } catch {
    return { events: [] };
  }
}

export function appendEvent(
  event: ServerAnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
): ServerEvent {
  mkdirSync(DATA_DIR, { recursive: true });

  const file = readEventsFile();
  const entry: ServerEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    event,
    timestamp: new Date().toISOString(),
    properties,
  };

  file.events.push(entry);
  file.events = file.events.slice(-MAX_EVENTS);

  writeFileSync(EVENTS_PATH, JSON.stringify(file, null, 2), "utf-8");
  return entry;
}

export function getEvents(): ServerEvent[] {
  return readEventsFile().events;
}

export function getEventSummary(): Record<ServerAnalyticsEvent, number> {
  const summary: Record<ServerAnalyticsEvent, number> = {
    search_performed: 0,
    moment_opened: 0,
    link_copied: 0,
    saved_moment: 0,
    email_captured: 0,
  };

  for (const entry of getEvents()) {
    summary[entry.event] += 1;
  }

  return summary;
}

export const VALID_EVENTS: ServerAnalyticsEvent[] = [
  "search_performed",
  "moment_opened",
  "link_copied",
  "saved_moment",
  "email_captured",
];

export function isValidEvent(event: string): event is ServerAnalyticsEvent {
  return VALID_EVENTS.includes(event as ServerAnalyticsEvent);
}
