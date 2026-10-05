import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/content";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { ContentImage } from "@/components/ui/ContentImage";

/**
 * Requirements §14 — project name, industry, what it solves,
 * technology / system type, status, and "View Project".
 */
export function ProjectCard({ project, priority = false }: { project: ProjectSummary; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-shadow hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        <ContentImage
          src={project.coverImage}
          alt={project.coverAlt ?? `${project.title} — ${project.type}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {project.draft && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-ink-950">
            Draft — sample content
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{project.industry}</Badge>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-4 text-xl font-semibold">
          <Link href={`/our-work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-ink-500">{project.type}</p>
        <p className="mt-3 flex-1 leading-relaxed text-ink-600">{project.summary}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-800 group-hover:text-brand-900">
          View Project
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span
        className="pointer-events-none absolute inset-0 rounded-3xl ring-brand-700 ring-offset-2 group-has-[a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
