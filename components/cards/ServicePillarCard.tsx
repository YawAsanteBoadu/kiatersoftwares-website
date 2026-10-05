import { ArrowRight, Check } from "lucide-react";
import type { ServicePillar } from "@/lib/copy";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";

function PillarCta({ pillar, source, compact }: { pillar: ServicePillar; source: string; compact?: boolean }) {
  const variant = compact ? "ghost" : "primary";
  const className = compact ? "-ml-3" : undefined;
  if ("href" in pillar.cta) {
    return (
      <ButtonLink href={pillar.cta.href} variant={variant} className={className}>
        {pillar.cta.label}
        <ArrowRight aria-hidden="true" className="size-4" />
      </ButtonLink>
    );
  }
  return (
    <WhatsAppCTAButton intent={pillar.cta.intent} source={source} variant={variant} className={className}>
      {pillar.cta.label}
    </WhatsAppCTAButton>
  );
}

/** One of the four What We Do pillars. `compact` is the Home overview card. */
export function ServicePillarCard({
  pillar,
  compact = false,
  source,
}: {
  pillar: ServicePillar;
  compact?: boolean;
  source: string;
}) {
  if (compact) {
    return (
      <article className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-lg sm:p-7">
        <div className="flex items-center justify-between">
          <span className="flex size-12 items-center justify-center rounded-xl bg-ink-950 text-white">
            <Icon name={pillar.icon} className="size-5" />
          </span>
          <span className="font-display text-sm font-semibold text-ink-300">{pillar.letter}</span>
        </div>
        <h3 className="mt-6 text-xl font-semibold">{pillar.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-600">{pillar.summary}</p>
        <div className="mt-5">
          <PillarCta pillar={pillar} source={source} compact />
        </div>
      </article>
    );
  }

  return (
    <article
      id={pillar.id}
      className="grid gap-8 rounded-3xl border border-ink-100 bg-white p-6 sm:p-10 lg:grid-cols-2 lg:gap-12"
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-ink-950 text-white">
            <Icon name={pillar.icon} className="size-6" />
          </span>
          <span className="eyebrow text-brand-800">Pillar {pillar.letter}</span>
        </div>
        <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">{pillar.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">{pillar.summary}</p>
        {pillar.details && <p className="mt-4 leading-relaxed text-ink-600">{pillar.details}</p>}
        <div className="mt-8">
          <PillarCta pillar={pillar} source={`what_we_do_${pillar.id}`} />
        </div>
      </div>
      <div className="rounded-2xl bg-ink-50 p-6 sm:p-8">
        {pillar.listTitle && (
          <h3 className="text-sm font-semibold tracking-wide text-ink-500 uppercase">{pillar.listTitle}</h3>
        )}
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {pillar.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-ink-800">
              <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-800" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
