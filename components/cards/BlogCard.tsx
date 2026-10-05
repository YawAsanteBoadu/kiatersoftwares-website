import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { InsightSummary } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function BlogCard({ insight }: { insight: InsightSummary }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{insight.category}</Badge>
        {insight.draft && <Badge tone="warning">Draft</Badge>}
      </div>
      <h3 className="mt-5 text-xl leading-snug font-semibold">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink-600">{insight.excerpt}</p>
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-ink-500">
        <span>
          <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time> · {insight.readingMinutes} min
          read
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 text-brand-800 transition-transform group-hover:translate-x-1"
        />
      </div>
      <span
        className="pointer-events-none absolute inset-0 rounded-3xl ring-brand-700 ring-offset-2 group-has-[a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}
