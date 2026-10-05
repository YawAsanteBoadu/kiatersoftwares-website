import { ArrowRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "./ProjectGrid";

/** Requirements §13 teaser on Home. Renders nothing until projects are published. */
export function FeaturedWork({ projects }: { projects: ProjectSummary[] }) {
  if (projects.length === 0) return null;
  return (
    <section aria-labelledby="featured-work-heading" className="section bg-ink-50">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="featured-work-heading"
            eyebrow="Our Work"
            title="We've Built More Than Software. We've Built Solutions."
            description="Explore some of the digital products and systems developed by KAiTER Softwares."
          />
          <ButtonLink href="/our-work" variant="secondary" className="self-start lg:self-auto">
            Explore Our Work
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
