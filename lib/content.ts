import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";
import industriesData from "@/content/industries.json";
import testimonialsData from "@/content/testimonials.json";
import { INSIGHT_CATEGORIES, PROJECT_CATEGORIES, PROJECT_STATUSES } from "./taxonomy";
import { slugify } from "./utils";

/**
 * Typed content loaders (Technical Spec §6). This is the only module that reads
 * /content, so a future move to a CMS only touches this file.
 *
 * Every file is validated at build time — a malformed frontmatter block fails
 * the build with a clear message instead of shipping a broken page.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const INSIGHTS_DIR = path.join(CONTENT_DIR, "insights");

/**
 * Drafts are visible in `next dev`, on Vercel preview deployments, or when
 * NEXT_PUBLIC_SHOW_DRAFTS=true. They never appear in a production build otherwise.
 */
export const showDrafts =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

const dateString = z
  .union([z.string(), z.date()])
  .transform((value) => (value instanceof Date ? value.toISOString() : new Date(value).toISOString()));

const imagePath = z.string().startsWith("/", "Image paths must be absolute, e.g. /images/projects/x.png");

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  industry: z.string().min(1),
  category: z.union([z.enum(PROJECT_CATEGORIES), z.array(z.enum(PROJECT_CATEGORIES)).min(1)]),
  /** Technology / system type shown on cards and the project hero, e.g. "Business Management System". */
  type: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  summary: z.string().min(1),
  liveUrl: z.url().optional(),
  coverImage: imagePath,
  coverAlt: z.string().optional(),
  screenshots: z.array(z.union([imagePath, z.object({ src: imagePath, alt: z.string().min(1) })])).default([]),
  technology: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  order: z.number().default(100),
  draft: z.boolean().default(false),
});

const insightSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(INSIGHT_CATEGORIES),
  excerpt: z.string().min(1),
  publishedAt: dateString,
  coverImage: imagePath.optional(),
  author: z.string().default("KAiTER Softwares"),
  draft: z.boolean().default(false),
});

const industrySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});

const testimonialSchema = z.object({
  quote: z.string().min(1),
  clientName: z.string().min(1),
  position: z.string().min(1),
  company: z.string().min(1),
  logo: imagePath.optional(),
});

export type Screenshot = { src: string; alt: string };

export type Project = Omit<z.infer<typeof projectSchema>, "category" | "screenshots"> & {
  categories: string[];
  categorySlugs: string[];
  screenshots: Screenshot[];
  body: string;
};

export type Insight = z.infer<typeof insightSchema> & {
  categorySlug: string;
  readingMinutes: number;
  body: string;
};

/** Card-sized shapes without the MDX body — safe to pass to client components. */
export type ProjectSummary = Omit<Project, "body">;
export type InsightSummary = Omit<Insight, "body">;

export function toProjectSummary({ body: _body, ...project }: Project): ProjectSummary {
  void _body;
  return project;
}

export function toInsightSummary({ body: _body, ...insight }: Insight): InsightSummary {
  void _body;
  return insight;
}

export type Industry = z.infer<typeof industrySchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  // Files starting with "_" (e.g. _template.mdx) are documentation, not content.
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
}

function parseFile<T extends z.ZodType>(dir: string, file: string, schema: T) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in content/${path.basename(dir)}/${file}:\n${z.prettifyError(result.error)}`);
  }
  const parsed = result.data as z.infer<T> & { slug: string };
  const expectedSlug = file.replace(/\.mdx$/, "");
  if (parsed.slug !== expectedSlug) {
    throw new Error(
      `content/${path.basename(dir)}/${file}: slug "${parsed.slug}" must match the filename "${expectedSlug}".`,
    );
  }
  return { data: parsed, body: content };
}

function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}

function screenshotAlt(projectTitle: string, src: string): string {
  const name = path
    .basename(src)
    .replace(/\.[a-z]+$/i, "")
    .replace(/[-_]+/g, " ");
  return `${projectTitle} — ${name} screenshot`;
}

const loadAllProjects = cache((): Project[] => {
  return listMdxFiles(PROJECTS_DIR)
    .map((file) => {
      const { data, body } = parseFile(PROJECTS_DIR, file, projectSchema);
      const categories = Array.isArray(data.category) ? data.category : [data.category];
      const { category: _category, screenshots, ...rest } = data;
      void _category;
      return {
        ...rest,
        categories,
        categorySlugs: categories.map(slugify),
        screenshots: screenshots.map((shot) =>
          typeof shot === "string" ? { src: shot, alt: screenshotAlt(data.title, shot) } : shot,
        ),
        body,
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});

const loadAllInsights = cache((): Insight[] => {
  return listMdxFiles(INSIGHTS_DIR)
    .map((file) => {
      const { data, body } = parseFile(INSIGHTS_DIR, file, insightSchema);
      return {
        ...data,
        categorySlug: slugify(data.category),
        readingMinutes: readingMinutes(body),
        body,
      } satisfies Insight;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
});

export function getAllProjects(): Project[] {
  return loadAllProjects().filter((project) => showDrafts || !project.draft);
}

export function getFeaturedProjects(limit = 3): Project[] {
  const projects = getAllProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getAllInsights(): Insight[] {
  return loadAllInsights().filter((insight) => showDrafts || !insight.draft);
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return getAllInsights().find((insight) => insight.slug === slug);
}

export function getRelatedInsights(insight: Insight, limit = 2): Insight[] {
  const others = getAllInsights().filter((item) => item.slug !== insight.slug);
  const sameCategory = others.filter((item) => item.category === insight.category);
  return [...sameCategory, ...others.filter((item) => item.category !== insight.category)].slice(0, limit);
}

export function getIndustries(): Industry[] {
  return z.array(industrySchema).parse(industriesData);
}

/** Only genuine, permissioned testimonials belong in testimonials.json (Requirements §24). */
export function getTestimonials(): Testimonial[] {
  return z.array(testimonialSchema).parse(testimonialsData);
}
