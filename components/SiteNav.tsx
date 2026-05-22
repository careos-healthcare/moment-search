import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
      <NavLink href="/saved">Saved</NavLink>
      <NavLink href="/pricing">Pricing</NavLink>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:px-3 sm:text-sm"
    >
      {children}
    </Link>
  );
}
