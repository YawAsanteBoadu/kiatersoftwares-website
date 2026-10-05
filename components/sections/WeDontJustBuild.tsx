/** Requirements §12 — the large "We Don't Just Build" statement. */
export function WeDontJustBuild() {
  return (
    <section aria-labelledby="dont-just-build-heading" className="section">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <h2 id="dont-just-build-heading" className="text-3xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            <span className="text-ink-400">Anyone can build software.</span>{" "}
            <span className="text-ink-950">We build with an understanding of the business behind it.</span>
          </h2>
          <div className="mt-10 grid gap-6 text-lg leading-relaxed text-ink-600 md:grid-cols-[auto_1fr] md:gap-10">
            <span
              className="hidden h-full w-1 rounded-full bg-gradient-to-b from-brand-500 to-brand-800 md:block"
              aria-hidden="true"
            />
            <div className="space-y-4">
              <p>
                Before writing code, we want to understand what happens when a customer walks into your business, how
                information moves, where your team spends time, where mistakes occur, and what prevents you from
                growing.
              </p>
              <p className="font-semibold text-ink-950">Then we turn that understanding into technology.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
