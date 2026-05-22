import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { EmailCapture } from "@/components/EmailCapture";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${BRAND.name} plans — find exact podcast and YouTube moments with Free, Pro, and Creator tiers.`,
};

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Try timestamp search free.",
    features: [
      "10 searches per day",
      "Save moments locally",
      "Shareable moment links",
      "YouTube timestamp playback",
    ],
    cta: "Current plan",
    highlighted: false,
    href: "/",
  },
  {
    name: "Pro",
    price: "£7.99",
    period: "/month",
    description: "For learners who search daily.",
    features: [
      "Unlimited moment search",
      "Full transcript index",
      "Priority new sources",
      "Advanced related moments",
      "Email support",
    ],
    cta: "Get early access",
    highlighted: true,
    href: "/#early-access",
  },
  {
    name: "Creator",
    price: "£29",
    period: "/month",
    description: "For podcasters and educators.",
    features: [
      "Everything in Pro",
      "Custom moment collections",
      "Embed widgets for your site",
      "Analytics on shared moments",
      "Bulk ingest your catalog",
    ],
    cta: "Get early access",
    highlighted: false,
    href: "/#early-access",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Logo />
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Find the exact moment faster. Upgrade when you need unlimited search
            across every podcast and video.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-xl sm:p-8 ${
                plan.highlighted
                  ? "border-violet-500/40 bg-violet-500/[0.08] shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]"
                  : "border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
                  Most popular
                </span>
              )}

              <h2 className="text-lg font-semibold text-white">{plan.name}</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">{plan.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 block rounded-xl px-4 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                  plan.highlighted
                    ? "bg-violet-600 text-white hover:bg-violet-500"
                    : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div id="early-access" className="mx-auto mt-16 max-w-xl scroll-mt-24">
          <EmailCapture source="pricing-page" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
