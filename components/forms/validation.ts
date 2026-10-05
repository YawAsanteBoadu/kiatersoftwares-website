import type { ProjectBrief } from "@/lib/whatsapp";

export const PROBLEM_MIN_LENGTH = 20;
/** Keeps the wa.me URL comfortably within what WhatsApp and browsers accept. */
export const PROBLEM_MAX_LENGTH = 1500;

export type BriefErrors = Partial<Record<keyof ProjectBrief, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an error message per invalid field, in on-screen order. Empty object = valid. */
export function validateProjectBrief(brief: ProjectBrief): BriefErrors {
  const errors: BriefErrors = {};

  if (brief.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!brief.company.trim()) errors.company = "Please enter your company or organization.";

  if (!brief.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(brief.email.trim()))
    errors.email = "Please enter a valid email address, e.g. name@company.com.";

  const phoneDigits = brief.phone.replace(/\D/g, "");
  if (!brief.phone.trim()) errors.phone = "Please enter a phone or WhatsApp number.";
  else if (!/^[+\d\s()-]+$/.test(brief.phone.trim()) || phoneDigits.length < 9 || phoneDigits.length > 15)
    errors.phone = "Please enter a valid phone number, e.g. 024 000 0000.";

  if (!brief.industry) errors.industry = "Please select your industry.";
  if (brief.needs.length === 0) errors.needs = "Please choose at least one option.";

  const problem = brief.problem.trim();
  if (!problem) errors.problem = "Please tell us about the problem you want to solve.";
  else if (problem.length < PROBLEM_MIN_LENGTH)
    errors.problem = `Please add a little more detail (at least ${PROBLEM_MIN_LENGTH} characters).`;
  else if (problem.length > PROBLEM_MAX_LENGTH)
    errors.problem = `Please keep this under ${PROBLEM_MAX_LENGTH} characters.`;

  return errors;
}
