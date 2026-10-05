import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { getIndustries } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Industries — Technology for the Way Your Industry Works",
  description:
    "Software and technology for education, healthcare, retail, logistics, agriculture, hospitality and professional services — and custom solutions for any industry.",
  path: "/industries",
});

export default function IndustriesPage() {
  const industries = getIndustries();

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Technology for the Way Your Industry Works"
        description="Every industry has its own processes, regulations and realities. We research how yours works before recommending any technology."
      />
      <section aria-label="Industries we serve" className="section">
        <div className="container-page">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <li key={industry.name}>
                <IndustryCard industry={industry} />
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-ink-50 px-6 py-10 text-center">
            <p className="max-w-xl text-lg text-ink-700">
              Not sure where your business fits? We research your requirements and design accordingly.
            </p>
            <WhatsAppCTAButton intent="bookConsultation" source="industries_custom">
              Book a Consultation
            </WhatsAppCTAButton>
          </div>
        </div>
      </section>
      <CTASection source="industries_final" secondary={{ label: "Explore Our Work", href: "/our-work" }} />
    </>
  );
}
