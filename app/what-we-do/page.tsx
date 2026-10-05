import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ServicePillarCard } from "@/components/cards/ServicePillarCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { SoftwareHardwareModel } from "@/components/sections/SoftwareHardwareModel";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { servicePillars } from "@/lib/copy";

export const metadata: Metadata = pageMetadata({
  title: "What We Do — Technology That Works Around Your Business",
  description:
    "Custom software development, business automation, digital transformation, and technology & hardware procurement — two connected capabilities working together as one technology solution.",
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Technology That Works Around Your Business"
        description="We understand your business, identify the problem, research the right technology, and transform your operations into reliable digital systems."
      >
        <WhatsAppCTAButton intent="startProject" source="what_we_do_hero" size="lg">
          Start a Project
        </WhatsAppCTAButton>
        <WhatsAppCTAButton intent="talkToExpert" source="what_we_do_hero" variant="outline-light" size="lg">
          Talk to an Expert
        </WhatsAppCTAButton>
      </PageHero>

      <section aria-label="Service pillars" className="section bg-ink-50">
        <div className="container-page">
          <nav aria-label="Service pillars" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {servicePillars.map((pillar) => (
                <li key={pillar.id}>
                  <a
                    href={`#${pillar.id}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-ink-700 ring-1 ring-ink-200 hover:bg-ink-100"
                  >
                    <span className="font-display font-bold text-brand-800">{pillar.letter}</span>
                    {pillar.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6">
            {servicePillars.map((pillar) => (
              <ServicePillarCard key={pillar.id} pillar={pillar} source={`what_we_do_${pillar.id}`} />
            ))}
          </div>
        </div>
      </section>

      <SoftwareHardwareModel source="what_we_do_equation" />

      <CTASection source="what_we_do_final" secondary={{ label: "Explore Our Work", href: "/our-work" }} />
    </>
  );
}
