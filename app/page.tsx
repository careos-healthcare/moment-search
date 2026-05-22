import { SearchBar } from "@/components/SearchBar";
import { TopicChip } from "@/components/TopicChip";
import { HeroBackground } from "@/components/HeroBackground";
import { SiteNav } from "@/components/SiteNav";
import { EmailCapture } from "@/components/EmailCapture";
import CreatorLandingSection from "@/components/CreatorLandingSection";
import CtaSection from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";
import { exampleQueries } from "@/lib/search/url";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <HeroBackground />

      <div className="relative z-10 flex w-full items-center justify-between px-4 pt-4 sm:px-6">
        <p className="hidden text-xs text-zinc-500 sm:block">{BRAND.tagline}</p>
        <SiteNav />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            {BRAND.tagline}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Search YouTube and podcasts by exact timestamp.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            Jump directly to the moment experts explain what you care about.
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

        <CtaSection />

        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
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

        <CreatorLandingSection />

        <div id="early-access" className="mt-16 w-full max-w-xl scroll-mt-24">
          <EmailCapture source="homepage" />
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
