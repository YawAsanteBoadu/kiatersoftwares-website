import { ArrowDown, Check, Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";

const layers = ["Software", "Hardware", "Infrastructure"];

const example = [
  { title: "Software", items: ["Management platform", "Reporting dashboard", "Customer system"] },
  { title: "Hardware", items: ["Workstations", "Tablets", "Networking equipment", "Printers", "Servers"] },
];

/** Requirements §18 — Software + Hardware Model. */
export function SoftwareHardwareModel({ source }: { source: string }) {
  return (
    <section aria-labelledby="equation-heading" className="section">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="equation-heading"
            eyebrow="Software + Hardware"
            title="Software Is Only One Part of the Technology Equation."
            description="A digital system is only effective when the people, software, hardware and infrastructure around it work together."
          />

          <div className="mt-10">
            <h3 className="text-sm font-semibold tracking-wide text-ink-500 uppercase">
              Example — a business may need
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {example.map((group) => (
                <div key={group.title} className="rounded-2xl border border-ink-100 p-5">
                  <p className="font-display font-semibold text-ink-950">{group.title}</p>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-ink-700">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-800" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-ink-950 p-6 text-ink-200">
              <p className="font-display font-semibold text-brand-400">KAiTER&rsquo;s role</p>
              <p className="mt-2 leading-relaxed">
                Help the business determine what it actually needs, build the digital system, source the appropriate
                technology, and bring the pieces together.
              </p>
            </div>
            <div className="mt-8">
              <WhatsAppCTAButton intent="technologyQuote" source={source}>
                Request a Technology Quote
              </WhatsAppCTAButton>
            </div>
          </div>
        </div>

        {/* Visual: Business Requirements ↓ Software + Hardware + Infrastructure ↓ Integrated Technology Environment */}
        <figure
          aria-label="Business requirements lead to software, hardware and infrastructure, which together form an integrated technology environment."
          className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-ink-50 p-6 sm:p-10 lg:self-start"
        >
          <div className="w-full rounded-2xl border border-ink-200 bg-white px-6 py-5 text-center font-display text-lg font-semibold text-ink-950">
            Business Requirements
          </div>
          <ArrowDown aria-hidden="true" className="size-6 text-brand-800" />
          <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {layers.map((layer, index) => (
              <div key={layer} className="contents">
                {index > 0 && <Plus aria-hidden="true" className="size-5 shrink-0 self-center text-ink-400" />}
                <div className="flex-1 rounded-2xl bg-brand-500 px-4 py-4 text-center font-semibold text-ink-950">
                  {layer}
                </div>
              </div>
            ))}
          </div>
          <ArrowDown aria-hidden="true" className="size-6 text-brand-800" />
          <div className="w-full rounded-2xl bg-ink-950 px-6 py-6 text-center font-display text-lg font-semibold text-white">
            Integrated Technology Environment
          </div>
        </figure>
      </div>
    </section>
  );
}
