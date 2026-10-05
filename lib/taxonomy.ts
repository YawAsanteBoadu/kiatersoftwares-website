import { slugify } from "./utils";

/** Project filter categories — Section 16 of the requirements document. */
export const PROJECT_CATEGORIES = [
  "Web Applications",
  "Mobile Applications",
  "Business Systems",
  "E-commerce",
  "Education",
  "Healthcare",
  "Agriculture",
  "Logistics",
  "Other",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = ["Completed", "Live", "Prototype"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/** Insight categories — Section 28 of the requirements document. */
export const INSIGHT_CATEGORIES = [
  "Business Technology",
  "Digital Transformation",
  "Software Development",
  "Business Automation",
  "Technology Procurement",
  "Industry Insights",
  "KAiTER Projects",
] as const;
export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

export type CategoryOption = { label: string; slug: string };

export const projectCategoryOptions: CategoryOption[] = PROJECT_CATEGORIES.map((label) => ({
  label,
  slug: slugify(label),
}));

export const insightCategoryOptions: CategoryOption[] = INSIGHT_CATEGORIES.map((label) => ({
  label,
  slug: slugify(label),
}));
