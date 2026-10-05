import { startSteps } from "@/lib/copy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { cn } from "@/lib/utils";

/** Requirements §25 — How to Start a Project. */
export function StartProjectSteps({
  source,
  showCta = true,
  className,
}: {
  source: string;
  showCta?: boolean;
  className?: string;
}) {
  return (
    <section aria-labelledby="start-heading" className={cn("section", className)}>
      <div className="container-page">
        <SectionHeading
          id="start-heading"
          eyebrow="How to Start"
          title="Have a Business Problem? Let's Talk."
          align="center"
        />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {startSteps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-ink-100 bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-500 font-display font-bold text-ink-950">
                {index + 1}
              </span>
              <p className="mt-2 text-xs font-semibold tracking-wide text-ink-500 uppercase">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
            </li>
          ))}
        </ol>
        {showCta && (
          <div className="mt-10 flex justify-center">
            <WhatsAppCTAButton intent="startProject" source={source} size="lg">
              Start a Conversation
            </WhatsAppCTAButton>
          </div>
        )}
      </div>
    </section>
  );
}
