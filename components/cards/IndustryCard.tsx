import type { Industry } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-shadow hover:shadow-lg">
      <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
        <Icon name={industry.icon} className="size-6" />
      </span>
      <h3 className="mt-6 text-xl font-semibold">{industry.name}</h3>
      <p className="mt-2 leading-relaxed text-ink-600">{industry.description}</p>
    </article>
  );
}
