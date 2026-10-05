import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectBrowser } from "@/components/sections/ProjectBrowser";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { getAllProjects, toProjectSummary } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — We've Built More Than Software. We've Built Solutions.",
  description:
    "Explore some of the digital products and systems developed by KAiTER Softwares — web applications, mobile applications, business systems and more.",
  path: "/our-work",
});

export default function OurWorkPage() {
  const projects = getAllProjects().map(toProjectSummary);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="We've Built More Than Software. We've Built Solutions."
        description="Explore some of the digital products and systems developed by KAiTER Softwares."
      />

      <section aria-label="Projects" className="section">
        <div className="container-page">
          {projects.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-ink-200 bg-ink-50 px-6 py-16 text-center">
              <h2 className="text-2xl font-semibold">Our project showcase is being prepared</h2>
              <p className="mt-3 leading-relaxed text-ink-600">
                We&rsquo;re documenting our projects and case studies with our clients&rsquo; permission. In the
                meantime, we&rsquo;re happy to walk you through relevant work directly.
              </p>
              <div className="mt-8 flex justify-center">
                <WhatsAppCTAButton intent="talkToExpert" source="our_work_empty">
                  Talk to an Expert
                </WhatsAppCTAButton>
              </div>
            </div>
          ) : (
            // The fallback is the full, unfiltered grid, so every project is in the static HTML.
            <Suspense fallback={<ProjectGrid projects={projects} />}>
              <ProjectBrowser projects={projects} />
            </Suspense>
          )}
        </div>
      </section>

      <CTASection
        title={projects.length > 0 ? "Need Something Similar for Your Business?" : undefined}
        source="our_work_final"
        secondary={{ label: "Talk to an Expert", intent: "talkToExpert" }}
      />
    </>
  );
}
