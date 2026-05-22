import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${BRAND.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/[0.06] px-4 py-4 sm:px-6">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <div className="prose prose-invert mt-8 space-y-6 text-sm leading-relaxed text-zinc-300">
          <p>
            {BRAND.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) helps you find
            exact moments inside podcasts and YouTube videos. This policy
            explains what we collect and why.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">What we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
              <li>Search queries and usage events to improve the product</li>
              <li>Email addresses if you join our early-access list</li>
              <li>Saved moments stored locally in your browser</li>
              <li>Basic technical logs (IP, browser type) via our host</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">How we use data</h2>
            <p className="mt-3 text-zinc-400">
              We use collected data to operate {BRAND.name}, measure product
              interest, respond to support requests, and notify you about product
              updates if you opt in.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Third parties</h2>
            <p className="mt-3 text-zinc-400">
              Embedded YouTube players and links are subject to Google&apos;s
              privacy policy. We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-3 text-zinc-400">
              Questions? Email{" "}
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="text-violet-400 hover:text-violet-300"
              >
                {BRAND.contactEmail}
              </a>{" "}
              or visit our{" "}
              <Link href="/contact" className="text-violet-400 hover:text-violet-300">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
