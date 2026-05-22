export default function CtaSection() {
  return (
    <section className="mt-16 w-full max-w-3xl rounded-3xl border border-white/[0.08] bg-gradient-to-r from-red-500/10 via-violet-500/10 to-indigo-500/10 px-6 py-10 text-center backdrop-blur-xl sm:px-10">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Stop scrubbing through 3 hour podcasts.
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
        Search by what you want explained — not by episode title. Jump straight
        to the timestamp where someone actually answers your question.
      </p>
    </section>
  );
}
