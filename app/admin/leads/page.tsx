import type { Metadata } from "next";
import { getLeads, getLeadSummary } from "@/lib/data/leads";

export const metadata: Metadata = {
  title: "Admin — Leads",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  const leads = getLeads();
  const summary = getLeadSummary();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">Email leads</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Captured from early-access forms · stored in{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-300">
          data/leads.json
        </code>
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total leads" value={String(summary.total)} />
        {Object.entries(summary.bySource).slice(0, 2).map(([source, count]) => (
          <StatCard key={source} label={`Source: ${source}`} value={String(count)} />
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.03]">
            <tr>
              <th className="px-4 py-3 font-medium text-zinc-400">Email</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Source</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Page</th>
              <th className="px-4 py-3 font-medium text-zinc-400">Captured</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No leads yet. Share the site and watch this fill up.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={`${lead.email}-${lead.createdAt}`}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="px-4 py-3 text-white">{lead.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{lead.source}</td>
                  <td className="px-4 py-3 text-zinc-400">{lead.sourcePage}</td>
                  <td className="px-4 py-3 tabular-nums text-zinc-500">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tabular-nums text-white">{value}</p>
    </div>
  );
}
