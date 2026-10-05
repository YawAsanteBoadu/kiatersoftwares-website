import { whyKaiter } from "@/lib/copy";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Requirements §20 — six "Why KAiTER?" cards. */
export function WhyKaiter() {
  return (
    <section aria-labelledby="why-heading" className="section bg-ink-50">
      <div className="container-page">
        <SectionHeading
          id="why-heading"
          eyebrow="Business First. Research Driven."
          title="Why KAiTER?"
          align="center"
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyKaiter.map((item) => (
            <li key={item.title} className="rounded-2xl border border-ink-100 bg-white p-7">
              <span className="flex size-12 items-center justify-center rounded-xl bg-ink-950 text-brand-400">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
