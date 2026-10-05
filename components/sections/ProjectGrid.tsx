import type { ProjectSummary } from "@/lib/content";
import { ProjectCard } from "@/components/cards/ProjectCard";

export function ProjectGrid({ projects, emptyMessage }: { projects: ProjectSummary[]; emptyMessage?: string }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 bg-ink-50 px-6 py-14 text-center">
        <p className="font-display text-lg font-semibold text-ink-900">
          {emptyMessage ?? "No projects in this category yet."}
        </p>
        <p className="mt-2 text-ink-600">
          Have something similar in mind? We research every new requirement from scratch.
        </p>
      </div>
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <ProjectCard project={project} priority={index < 2} />
        </li>
      ))}
    </ul>
  );
}
