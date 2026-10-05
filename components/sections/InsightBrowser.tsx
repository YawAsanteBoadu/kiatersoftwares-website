"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { InsightSummary } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import { insightCategoryOptions } from "@/lib/taxonomy";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { InsightGrid } from "./InsightGrid";

export function InsightBrowser({ insights }: { insights: InsightSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const active = insightCategoryOptions.some((option) => option.slug === requested) ? requested : null;

  // Only offer categories that have at least one post.
  const used = new Set(insights.map((insight) => insight.categorySlug));
  const options = insightCategoryOptions.filter((option) => used.has(option.slug));
  const visible = active ? insights.filter((insight) => insight.categorySlug === active) : insights;

  function select(slug: string | null) {
    router.replace(slug ? `${pathname}?category=${slug}` : pathname, { scroll: false });
    trackEvent("insight_category_filter", { category: slug ?? "all" });
  }

  return (
    <>
      {options.length > 1 && (
        <CategoryFilter label="Filter insights by category" options={options} active={active} onChange={select} />
      )}
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
      </p>
      <div className="mt-10">
        <InsightGrid insights={visible} />
      </div>
    </>
  );
}
