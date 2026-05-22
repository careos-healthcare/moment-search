import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { Logo } from "@/components/Logo";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLoginForm />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-white/[0.06] bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="text-zinc-600">/</span>
            <nav className="flex gap-3 text-sm">
              <Link
                href="/admin/leads"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Leads
              </Link>
              <Link
                href="/admin/analytics"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Analytics
              </Link>
            </nav>
          </div>
          <AdminSignOutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
