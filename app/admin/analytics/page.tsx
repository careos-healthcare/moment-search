import type { Metadata } from "next";
import { getEvents, getEventSummary } from "@/lib/data/events";
import type { ServerAnalyticsEvent } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Admin — Analytics",
  robots: { index: false, follow: false },
};

const EVENT_LABELS: Record<ServerAnalyticsEvent, string> = {
  search_performed: "Searches",
  moment_opened: "Moments opened",
  link_copied: "Links copied",
  saved_moment: "Moments saved",
  email_captured: "Emails captured",
};

export default function AdminAnalyticsPage() {
  const events = getEvents().slice().reverse();
  const summary = getEventSummary();
  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Launch analytics
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Server-captured events from{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-300">
          data/events.json
        </code>
        {" "}(with client local fallback when offline).
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total events" value={String(total)} highlight />
        {(Object.entries(summary) as [ServerAnalyticsEvent, number][]).map(
          ([event, count]) => (
            <StatCard key={event} label={EVENT_LABELS[event]} value={String(count)} />
          ),
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08]">
        <div className="border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <h2 className="text-sm font-medium text-zinc-300">Recent events</h2>
        </div>
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 border-b border-white/[0.06] bg-zinc-950">
              <tr>
                <th className="px-4 py-3 font-medium text-zinc-400">Event</th>
                <th className="px-4 py-3 font-medium text-zinc-400">Details</th>
                <th className="px-4 py-3 font-medium text-zinc-400">Time</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-zinc-500">
                    No events recorded yet. Use the app to generate validation data.
                  </td>
                </tr>
              ) : (
                events.slice(0, 100).map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-violet-300">
                      {entry.event}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {formatProperties(entry.properties)}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-zinc-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-violet-500/30 bg-violet-500/10"
          : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-white">{value}</p>
    </div>
  );
}

function formatProperties(
  properties?: Record<string, string | number | boolean>,
): string {
  if (!properties || Object.keys(properties).length === 0) return "—";

  return Object.entries(properties)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" · ");
}
