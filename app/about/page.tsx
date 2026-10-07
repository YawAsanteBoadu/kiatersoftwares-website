import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyKaiter } from "@/components/sections/WhyKaiter";
import { buttonClasses } from "@/components/ui/Button";
import { getTestimonials } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About — Technology Built From Understanding",
  description:
    "KAiTER Softwares is a subsidiary of Krobea Asante Institute of Technology, Engineering and Research (KAiTER), focused on transforming business operations through technology.",
  path: "/about",
});

export default function AboutPage() {
  const { parentOrg } = siteConfig;
  const testimonials = getTestimonials();

  return (
    <>
      <PageHero eyebrow="About KAiTER Softwares" title="Technology Built From Understanding." />

      <section aria-label="Our story" className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              KAiTER Softwares is a subsidiary of Krobea Asante Institute of Technology, Engineering and Research
              (KAiTER), focused on transforming business operations through technology.
            </p>
            <p>
              With over 6 years of software development experience, we have worked on software solutions for customers
              across different needs and business contexts.
            </p>
            <p className="font-semibold text-ink-950">
              Our philosophy is simple: technology should solve a real problem.
            </p>
          </div>
          <div className="rounded-3xl bg-ink-950 p-8 sm:p-12">
            <p className="text-lg leading-relaxed text-ink-300">
              That&rsquo;s why we don&rsquo;t begin every project by asking, &ldquo;What software should we
              build?&rdquo;
            </p>
            <p className="mt-6 font-display text-2xl leading-snug font-semibold text-white sm:text-3xl">
              We begin by asking,{" "}
              <span className="text-brand-400">
                &ldquo;How does your business work, and what needs to change?&rdquo;
              </span>
            </p>
          </div>
        </div>
      </section>

      <WhyKaiter />
      <TestimonialsSection testimonials={testimonials} />

      {/* Requirements §22 — Parent Organization */}
      <section aria-labelledby="powered-heading" className="section">
        <div className="container-page">
          <div className="flex flex-col gap-8 rounded-3xl border border-ink-100 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-800">Parent Organization</p>
              <h2 id="powered-heading" className="mt-3 text-3xl font-semibold">
                Powered by KAiTER
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                KAiTER Softwares operates as a subsidiary of {parentOrg.name}.
              </p>
            </div>
            {parentOrg.url && (
              <a
                href={parentOrg.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("secondary", "lg", "self-start lg:self-auto")}
              >
                Learn About KAiTER
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <CTASection source="about_final" secondary={{ label: "Explore Our Work", href: "/our-work" }} />
    </>
  );
}
