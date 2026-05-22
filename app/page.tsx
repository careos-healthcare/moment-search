import { SearchBar } from "@/components/SearchBar";
import { TopicChip } from "@/components/TopicChip";
import { HeroBackground } from "@/components/HeroBackground";
import { exampleQueries } from "@/lib/search";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <HeroBackground />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="w-full max-w-2xl text-center">
          {/* Logo mark */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            Moment retrieval engine
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find the exact{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              moment
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            Find the exact moment experts explain anything clearly. Skip the
            full episode — jump straight to the insight.
          </p>

          <div className="mt-10">
            <SearchBar size="hero" autoFocus />
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
              Try an example
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleQueries.map((query) => (
                <TopicChip key={query} label={query} />
              ))}
            </div>
          </div>
        </div>

        {/* Feature hints */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {[
            {
              title: "Exact timestamps",
              desc: "Jump to the precise second, not approximate chapters.",
            },
            {
              title: "Curated clarity",
              desc: "Moments where complex ideas click into place.",
            },
            {
              title: "Related insights",
              desc: "Discover connected moments across episodes.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center backdrop-blur-sm transition-colors hover:border-white/[0.1] hover:bg-white/[0.04]"
            >
              <h2 className="text-sm font-semibold text-white">
                {feature.title}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/[0.06] py-6 text-center text-xs text-zinc-600">
        MomentSearch — discover learning moments, not chatbots.
      </footer>
    </main>
  );
}
