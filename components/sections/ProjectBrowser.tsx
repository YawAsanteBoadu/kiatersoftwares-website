"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { ProjectSummary } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import { projectCategoryOptions } from "@/lib/taxonomy";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { ProjectGrid } from "./ProjectGrid";

/**
 * /our-work client-side category filter. State lives in ?category= so filtered
 * views are shareable (Technical Spec §5).
 */
export function ProjectBrowser({ projects }: { projects: ProjectSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const active = projectCategoryOptions.some((option) => option.slug === requested) ? requested : null;

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const project of projects) {
      for (const slug of project.categorySlugs) result[slug] = (result[slug] ?? 0) + 1;
    }
    return result;
  }, [projects]);

  const visible = active ? projects.filter((project) => project.categorySlugs.includes(active)) : projects;

  function select(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    trackEvent("project_category_filter", { category: slug ?? "all" });
  }

  return (
    <>
      <CategoryFilter
        label="Filter projects by category"
        options={projectCategoryOptions}
        active={active}
        onChange={select}
        counts={counts}
      />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="mt-10">
        <ProjectGrid projects={visible} />
      </div>
    </>
  );
}
