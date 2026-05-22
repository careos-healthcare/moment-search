import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${BRAND.name} team.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/[0.06] px-4 py-4 sm:px-6">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Contact</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Questions, feedback, or creator partnerships — we&apos;d love to hear
          from you.
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <div>
            <h2 className="text-sm font-medium text-zinc-500">Email</h2>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="mt-1 block text-lg text-violet-400 transition-colors hover:text-violet-300"
            >
              {BRAND.contactEmail}
            </a>
          </div>

          <div>
            <h2 className="text-sm font-medium text-zinc-500">X / Twitter</h2>
            <a
              href="https://x.com/youtubetimesearch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-lg text-violet-400 transition-colors hover:text-violet-300"
            >
              {BRAND.twitterHandle}
            </a>
          </div>

          <div>
            <h2 className="text-sm font-medium text-zinc-500">Website</h2>
            <a
              href={BRAND.siteUrl}
              className="mt-1 block text-lg text-zinc-300 transition-colors hover:text-white"
            >
              {BRAND.siteUrl.replace("https://", "")}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
