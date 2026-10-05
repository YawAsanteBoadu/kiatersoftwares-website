"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { buildWhatsAppLink, ctaMessages, type CtaIntent } from "@/lib/whatsapp";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./Button";

const intentEvents: Record<CtaIntent, AnalyticsEvent> = {
  startProject: "start_project_click",
  automateBusiness: "start_project_click",
  talkToExpert: "talk_to_expert_click",
  technologyQuote: "hardware_quote_click",
  hardwareConsultation: "hardware_quote_click",
  bookConsultation: "book_consultation_click",
};

type WhatsAppCTAButtonProps = {
  children: ReactNode;
  /** One of the standard CTA intents, or pass `message` + `event` for a custom one. */
  intent?: CtaIntent;
  message?: string;
  event?: AnalyticsEvent;
  /** Where on the site the click happened — reported with the analytics event. */
  source: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showIcon?: boolean;
};

/**
 * Every Start a Project / Talk to an Expert / Request a Technology Quote /
 * Book a Consultation CTA renders through this component (Technical Spec §7).
 * The href is a plain wa.me link, so it works before (and without) JavaScript.
 */
export function WhatsAppCTAButton({
  children,
  intent = "startProject",
  message,
  event,
  source,
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: WhatsAppCTAButtonProps) {
  const href = buildWhatsAppLink(message ?? ctaMessages[intent]);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, size, className)}
      onClick={() => trackEvent(event ?? intentEvents[intent], { source })}
    >
      {children}
      {showIcon && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
