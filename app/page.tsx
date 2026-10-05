import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WeDontJustBuild } from "@/components/sections/WeDontJustBuild";
import { WhatWeDoOverview } from "@/components/sections/WhatWeDoOverview";
import { WhyKaiter } from "@/components/sections/WhyKaiter";
import { getFeaturedProjects, getTestimonials, toProjectSummary } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "KAiTER Softwares — We Turn Business Challenges Into Digital Systems",
  description:
    "We research how your business operates, work with you to understand its challenges, and build reliable software and technology solutions designed around your real-world needs.",
  path: "/",
  absoluteTitle: true,
});

/**
 * Section order follows the requirements document (Technical Spec §5):
 * Hero → Trust Strip → Problem → What We Do → KAiTER Difference →
 * "We Don't Just Build" → Why KAiTER → CTA. Featured work and testimonials
 * appear only once real, published content exists.
 */
export default function HomePage() {
  const featured = getFeaturedProjects(3).map(toProjectSummary);
  const testimonials = getTestimonials();

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <WhatWeDoOverview />
      <ProcessSteps />
      <WeDontJustBuild />
      <FeaturedWork projects={featured} />
      <WhyKaiter />
      <TestimonialsSection testimonials={testimonials} />
      <div className="pt-16 sm:pt-20 lg:pt-28">
        <CTASection source="home_final" secondary={{ label: "Explore Our Work", href: "/our-work" }} />
      </div>
    </>
  );
}
