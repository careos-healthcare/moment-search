import Link from "next/link";

export default function MomentNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold text-white">Moment not found</h1>
      <p className="mt-3 max-w-md text-zinc-400">
        This moment hasn&apos;t been ingested yet. Run{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-300">
          npm run ingest
        </code>{" "}
        to build the local transcript dataset.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
      >
        Back to search
      </Link>
    </main>
  );
}
