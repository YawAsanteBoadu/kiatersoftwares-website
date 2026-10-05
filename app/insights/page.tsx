import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { CTASection } from "@/components/sections/CTASection";
import { InsightBrowser } from "@/components/sections/InsightBrowser";
import { InsightGrid } from "@/components/sections/InsightGrid";
import { PageHero } from "@/components/sections/PageHero";
import { getAllInsights, toInsightSummary } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Insights — Business Technology, Automation & Digital Transformation",
  description:
    "Practical articles on business technology, digital transformation, software development, automation and technology procurement from KAiTER Softwares.",
  path: "/insights",
});

export default function InsightsPage() {
  const insights = getAllInsights().map(toInsightSummary);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Technology, explained for business."
        description="Practical thinking on business technology, digital transformation and making better technology decisions — written for business owners and decision-makers, not developers."
      />
      <section aria-label="Articles" className="section">
        <div className="container-page">
          <Suspense fallback={<InsightGrid insights={insights} />}>
            <InsightBrowser insights={insights} />
          </Suspense>
        </div>
      </section>
      <CTASection source="insights_final" secondary={{ label: "Book a Consultation", intent: "bookConsultation" }} />
    </>
  );
}
