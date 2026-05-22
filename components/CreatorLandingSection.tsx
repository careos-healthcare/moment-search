import Link from "next/link";

export default function CreatorLandingSection() {
  return (
    <section className="mt-20 w-full max-w-4xl rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-transparent to-violet-500/[0.06] p-8 backdrop-blur-xl sm:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
            For creators & audiences
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Turn your podcast archive into searchable moments.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Listeners don&apos;t want another chatbot — they want the exact
            minute where you explained leverage, dopamine, or product-market
            fit. MomentSearch indexes transcripts and returns timestamped
            clips your audience can share.
          </p>
        </div>

        <div className="space-y-4">
          {[
            "Ingest your back catalog in minutes",
            "Every answer links to an exact timestamp",
            "Shareable moment pages drive new listeners",
            "See what topics people search most",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                ✓
              </span>
              {item}
            </div>
          ))}

          <Link
            href="/pricing"
            className="mt-2 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
          >
            See creator plans
          </Link>
        </div>
      </div>
    </section>
  );
}
