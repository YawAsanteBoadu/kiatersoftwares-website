import { trustPoints } from "@/lib/copy";

/** Requirements §8 — immediately below the hero. */
export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="border-b border-ink-100 bg-white">
      <div className="container-page py-12 sm:py-14">
        <h2 id="trust-heading" className="text-center text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
          Technology Built Around Real Business Needs
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <li key={point.title} className="border-l-2 border-brand-500 pl-4 sm:pl-5">
              <p className="font-display text-xl font-semibold text-ink-950 sm:text-2xl">{point.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600 sm:text-base">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
