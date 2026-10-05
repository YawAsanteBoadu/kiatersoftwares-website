"use client";

import type { CategoryOption } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

/** Accessible pill filter. Purely presentational — the parent owns state. */
export function CategoryFilter({
  options,
  active,
  onChange,
  label,
  counts,
}: {
  options: CategoryOption[];
  active: string | null;
  onChange: (slug: string | null) => void;
  label: string;
  counts?: Record<string, number>;
}) {
  const all = [{ label: "All", slug: "" }, ...options];
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0"
    >
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {all.map((option) => {
          const selected = (active ?? "") === option.slug;
          const count = option.slug ? counts?.[option.slug] : undefined;
          return (
            <li key={option.slug || "all"}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(option.slug || null)}
                className={cn(
                  "min-h-10 rounded-full px-4 text-sm font-medium whitespace-nowrap ring-1 transition-colors ring-inset",
                  selected
                    ? "bg-ink-950 text-white ring-ink-950"
                    : "bg-white text-ink-700 ring-ink-200 hover:bg-ink-50",
                )}
              >
                {option.label}
                {count !== undefined && (
                  <span className={cn("ml-1.5 tabular-nums", selected ? "text-ink-300" : "text-ink-500")}>{count}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
