/**
 * Central WhatsApp helper. Every lead-generating interaction in v1 resolves to
 * a wa.me link built here (Technical Spec §8).
 */

const DEFAULT_NUMBER = "233533289892";
const GHANA_COUNTRY_CODE = "233";

/**
 * Normalises a Ghanaian phone number to the international format wa.me
 * expects: digits only, country code, no leading zero or plus sign.
 * "0533289892" -> "233533289892", "+233 53 328 9892" -> "233533289892".
 */
export function toInternationalNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return GHANA_COUNTRY_CODE + digits.slice(1);
  return digits;
}

export const WHATSAPP_NUMBER = toInternationalNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_NUMBER);

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled messages for the simple CTA buttons (Technical Spec §8). */
export const ctaMessages = {
  startProject: "Hi KAiTER Softwares, I would like to start a project.",
  talkToExpert: "Hi KAiTER Softwares, I would like to talk to an expert about my business.",
  technologyQuote: "Hi, I would like to request a technology quote.",
  hardwareConsultation: "Hi KAiTER Softwares, I would like to request a hardware consultation for my business.",
  bookConsultation: "Hi KAiTER Softwares, I would like to book a consultation.",
  automateBusiness: "Hi KAiTER Softwares, I would like to automate parts of my business.",
} as const;

export type CtaIntent = keyof typeof ctaMessages;

export function similarProjectMessage(projectTitle: string): string {
  return `Hi KAiTER Softwares, I saw your "${projectTitle}" project and I need something similar for my business.`;
}

export type ProjectBrief = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  needs: string[];
  problem: string;
  timeline?: string;
};

/** Formats a Project Request Form submission into one readable WhatsApp message. */
export function formatProjectBrief(brief: ProjectBrief): string {
  const lines = [
    "*New Project Brief — KAiTER Softwares website*",
    "",
    `*Name:* ${brief.name.trim()}`,
    `*Company / Organization:* ${brief.company.trim()}`,
    `*Email:* ${brief.email.trim()}`,
    `*Phone / WhatsApp:* ${brief.phone.trim()}`,
    `*Industry:* ${brief.industry}`,
    `*What we need:* ${brief.needs.join(", ")}`,
  ];
  if (brief.timeline) lines.push(`*Expected timeline:* ${brief.timeline}`);
  lines.push("", "*The problem:*", brief.problem.trim());
  return lines.join("\n");
}
