"use client";

import { useRouter } from "next/navigation";

export function AdminSignOutButton() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
    >
      Sign out
    </button>
  );
}
