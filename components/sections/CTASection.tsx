import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import type { AnalyticsEvent } from "@/lib/analytics";
import type { CtaIntent } from "@/lib/whatsapp";

type Secondary = { label: string; href: string } | { label: string; intent: CtaIntent };

/** Closing call-to-action band — every page ends with a clear next step (Requirements §29). */
export function CTASection({
  title = "Have a Business Problem? Let's Talk.",
  description = "Tell us how your business works and what needs to change. We'll research it with you and propose the right solution.",
  primary = { label: "Start a Project", intent: "startProject" as CtaIntent },
  secondary = { label: "Talk to an Expert", intent: "talkToExpert" },
  primaryMessage,
  primaryEvent,
  source,
  children,
}: {
  title?: string;
  description?: ReactNode;
  primary?: { label: string; intent: CtaIntent };
  primaryMessage?: string;
  primaryEvent?: AnalyticsEvent;
  secondary?: Secondary | null;
  source: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={`cta-${source}`} className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand-900 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-60" />
        <div className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-brand-500/25 blur-3xl" />
        <h2
          id={`cta-${source}`}
          className="mx-auto max-w-3xl text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {description && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-50">{description}</p>}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppCTAButton
            intent={primary.intent}
            message={primaryMessage}
            event={primaryEvent}
            source={source}
            variant="primary"
            size="lg"
          >
            {primary.label}
          </WhatsAppCTAButton>
          {secondary &&
            ("href" in secondary ? (
              <ButtonLink href={secondary.href} variant="outline-light" size="lg">
                {secondary.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            ) : (
              <WhatsAppCTAButton intent={secondary.intent} source={source} variant="outline-light" size="lg">
                {secondary.label}
              </WhatsAppCTAButton>
            ))}
        </div>
        {children}
      </div>
    </section>
  );
}
