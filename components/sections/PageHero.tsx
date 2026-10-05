import type { ReactNode } from "react";

/** Header band for inner pages — carries the page's single h1. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <div className="absolute -top-32 -left-20 -z-10 h-96 w-[40rem] rounded-full bg-brand-500/15 blur-3xl" />
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-400">{eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <div className="mt-6 text-lg leading-relaxed text-ink-200 sm:text-xl">{description}</div>}
          {children && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
