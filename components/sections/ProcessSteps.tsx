import { processSteps } from "@/lib/copy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Requirements §11 — The KAiTER Difference, numbered 01–06. */
export function ProcessSteps({ title = "We Don't Start With Code. We Start With Understanding." }: { title?: string }) {
  return (
    <section aria-labelledby="difference-heading" className="section relative isolate overflow-hidden bg-ink-950">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page">
        <SectionHeading id="difference-heading" tone="dark" eyebrow="The KAiTER Difference" title={title} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step.number} className={cn("relative p-7 sm:p-8", index === 5 ? "bg-brand-500" : "bg-ink-950")}>
              <span
                className={cn("font-display text-5xl font-bold", index === 5 ? "text-ink-900" : "text-brand-300")}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className={cn("mt-4 text-xl font-semibold", index === 5 ? "text-ink-950" : "text-white")}>
                <span className="sr-only">Step {step.number}: </span>
                {step.title}
              </h3>
              <p className={cn("mt-2 leading-relaxed", index === 5 ? "text-ink-900" : "text-ink-300")}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
