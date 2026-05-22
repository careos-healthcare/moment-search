import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-center text-xs text-zinc-500">
          {BRAND.name} — {BRAND.tagline}
        </p>
        <nav
          className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-600"
          aria-label="Footer"
        >
          <Link href="/privacy" className="transition-colors hover:text-zinc-300">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-300">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-zinc-300">
            Contact
          </Link>
          <Link href="/saved" className="transition-colors hover:text-zinc-300">
            Saved
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-zinc-300">
            Pricing
          </Link>
          <a
            href="https://x.com/youtubetimesearch"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            X / Twitter
          </a>
        </nav>
        <p className="mt-4 text-center text-[11px] text-zinc-700">
          © {new Date().getFullYear()} {BRAND.name}
        </p>
      </div>
    </footer>
  );
}
