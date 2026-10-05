import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StartProjectSteps } from "@/components/sections/StartProjectSteps";
import { WeDontJustBuild } from "@/components/sections/WeDontJustBuild";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";

export const metadata: Metadata = pageMetadata({
  title: "How We Work — We Start With Understanding",
  description:
    "Research, Understand, Design, Build, Integrate, Transform. KAiTER Softwares doesn't start with code — we start with understanding how your business works.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title="We Don't Start With Code. We Start With Understanding."
        description="Our research-first approach means every system we build is designed around how your business actually operates — from the first conversation to the day it becomes part of your daily operations."
      >
        <WhatsAppCTAButton intent="bookConsultation" source="how_we_work_hero" size="lg">
          Book a Consultation
        </WhatsAppCTAButton>
      </PageHero>
      <ProcessSteps title="Research → Understand → Design → Build → Integrate → Transform" />
      <WeDontJustBuild />
      <StartProjectSteps source="how_we_work_start" className="bg-ink-50" />
      <div className="pt-16 sm:pt-20 lg:pt-28">
        <CTASection source="how_we_work_final" secondary={{ label: "Explore Our Work", href: "/our-work" }} />
      </div>
    </>
  );
}
