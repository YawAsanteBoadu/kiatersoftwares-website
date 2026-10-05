import { problems } from "@/lib/copy";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";

/** Requirements §9 — "Your Business Is Unique" pain points. */
export function ProblemSection() {
  return (
    <section aria-labelledby="problem-heading" className="section bg-ink-50">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The Problem"
              id="problem-heading"
              title="Your Business Is Unique. Your Technology Should Be Too."
              description="Every business has its own processes, people, challenges and goals. Off-the-shelf tools may solve part of the problem, but sometimes your business needs technology designed around the way you actually operate."
            />
            <div className="mt-8">
              <WhatsAppCTAButton intent="talkToExpert" source="home_problem">
                Talk to Us About Your Business
              </WhatsAppCTAButton>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {problems.map((problem, index) => (
              <li
                key={problem.title}
                className={
                  "rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md" +
                  (index === problems.length - 1 ? " sm:col-span-2" : "")
                }
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <Icon name={problem.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{problem.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{problem.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
