import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${BRAND.name}.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/[0.06] px-4 py-4 sm:px-6">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-300">
          <p>
            By using {BRAND.name}, you agree to these terms. If you do not
            agree, please do not use the service.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">The service</h2>
            <p className="mt-3 text-zinc-400">
              {BRAND.name} provides search and timestamp discovery across
              publicly available podcast and video transcripts. Results are
              provided for informational purposes and may not always be exact.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Acceptable use</h2>
            <p className="mt-3 text-zinc-400">
              You may not abuse the service, scrape it at excessive volume,
              attempt to bypass access limits, or use it for unlawful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Content</h2>
            <p className="mt-3 text-zinc-400">
              Video and podcast content belongs to its respective creators.
              {BRAND.name} does not claim ownership of third-party media.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Disclaimer</h2>
            <p className="mt-3 text-zinc-400">
              The service is provided &ldquo;as is&rdquo; without warranties.
              We are not liable for decisions made based on search results.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-3 text-zinc-400">
              <Link href="/contact" className="text-violet-400 hover:text-violet-300">
                Contact us
              </Link>{" "}
              with any questions about these terms.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
