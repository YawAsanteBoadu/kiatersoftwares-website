import type { InsightSummary } from "@/lib/content";
import { BlogCard } from "@/components/cards/BlogCard";

export function InsightGrid({ insights }: { insights: InsightSummary[] }) {
  if (insights.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-ink-200 bg-ink-50 px-6 py-14 text-center text-ink-600">
        No articles in this category yet.
      </p>
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight) => (
        <li key={insight.slug}>
          <BlogCard insight={insight} />
        </li>
      ))}
    </ul>
  );
}
