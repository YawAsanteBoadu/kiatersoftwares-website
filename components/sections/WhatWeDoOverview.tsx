import { ArrowRight } from "lucide-react";
import { servicePillars } from "@/lib/copy";
import { ButtonLink } from "@/components/ui/Button";
import { ServicePillarCard } from "@/components/cards/ServicePillarCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Requirements §10 — Home overview of the four pillars. */
export function WhatWeDoOverview() {
  return (
    <section aria-labelledby="what-we-do-heading" className="section">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="what-we-do-heading"
            eyebrow="What We Do"
            title="Technology That Works Around Your Business"
            description="Two connected capabilities — Software & Digital Systems and Technology & Hardware — working together as one technology solution."
          />
          <ButtonLink href="/what-we-do" variant="secondary" className="self-start lg:self-auto">
            See all services
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {servicePillars.map((pillar) => (
            <li key={pillar.id}>
              <ServicePillarCard pillar={pillar} compact source={`home_${pillar.id}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
