"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/client/analytics";

interface EmailCaptureProps {
  source: string;
  variant?: "inline" | "compact";
}

export function EmailCapture({ source, variant = "inline" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      trackEvent("email_captured", { source });
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Unable to submit. Please try again.");
    }
  }

  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10 backdrop-blur-xl ${
        isCompact ? "p-4 sm:p-5" : "p-6 sm:p-8"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
        Early access
      </p>
      <h2
        className={`mt-2 font-semibold tracking-tight text-white ${
          isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
        }`}
      >
        Get early access to unlimited moment search
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Be first to search every podcast and video — exact timestamps, no fluff.
      </p>

      {status === "success" ? (
        <p className="mt-4 text-sm font-medium text-emerald-400">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label htmlFor={`email-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${source}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            disabled={status === "loading"}
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim()}
            className="shrink-0 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "Joining…" : "Get access"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">{message}</p>
      )}
    </div>
  );
}
