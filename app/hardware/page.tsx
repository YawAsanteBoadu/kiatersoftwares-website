import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { SoftwareHardwareModel } from "@/components/sections/SoftwareHardwareModel";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { hardwareCategories } from "@/lib/copy";

export const metadata: Metadata = pageMetadata({
  title: "Technology & Hardware Procurement — The Right Equipment for Your Business",
  description:
    "We help businesses identify and procure technology based on what their operations actually require — computers, servers, networking, business devices and specialized hardware.",
  path: "/hardware",
});

export default function HardwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & Hardware Procurement"
        title="The Right Technology Starts With the Right Equipment."
        description="We help businesses identify and procure technology based on what their operations actually require—not simply what is available on the market."
      >
        <WhatsAppCTAButton intent="hardwareConsultation" source="hardware_hero" size="lg">
          Request Hardware Consultation
        </WhatsAppCTAButton>
        <WhatsAppCTAButton intent="technologyQuote" source="hardware_hero" variant="outline-light" size="lg">
          Request a Technology Quote
        </WhatsAppCTAButton>
      </PageHero>

      <section aria-labelledby="hardware-categories-heading" className="section">
        <div className="container-page">
          <SectionHeading
            id="hardware-categories-heading"
            eyebrow="What we source"
            title="We don't simply sell hardware. We help you identify the technology your business actually needs."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hardwareCategories.map((category) => (
              <li key={category.title} id={category.title.toLowerCase().replace(/[^a-z]+/g, "-")}>
                <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-ink-950 text-brand-400">
                    <Icon name={category.icon} className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{category.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{category.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-ink-50">
        <SoftwareHardwareModel source="hardware_equation" />
      </div>

      <div className="pt-16 sm:pt-20 lg:pt-28">
        <CTASection
          title="Not sure what equipment your business needs?"
          description="Tell us how your team works. We'll recommend technology that fits your operations and your budget — and source it for you."
          primary={{ label: "Request Hardware Consultation", intent: "hardwareConsultation" }}
          secondary={{ label: "Request a Technology Quote", intent: "technologyQuote" }}
          source="hardware_final"
        />
      </div>
    </>
  );
}
