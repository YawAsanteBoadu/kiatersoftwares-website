import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { HeroVisual } from "./HeroVisual";

/** Requirements §6–7 — Home hero. */
export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />

      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            We Turn Business Challenges Into <span className="text-brand-400">Digital Systems.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl">
            We research how your business operates, work with you to understand its challenges, and build reliable
            software and technology solutions designed around your real-world needs.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCTAButton intent="startProject" source="home_hero" size="lg">
              Start a Project
            </WhatsAppCTAButton>
            <ButtonLink href="/our-work" variant="outline-light" size="lg">
              Explore Our Work
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
          <p className="mt-8 flex items-center gap-3 text-sm font-medium text-ink-300">
            <span className="h-px w-8 bg-brand-500" aria-hidden="true" />
            Building Software Solutions since 2020
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
