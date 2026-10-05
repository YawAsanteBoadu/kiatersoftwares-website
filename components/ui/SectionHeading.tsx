import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Use "h1" only for the page's main heading. */
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-4", dark ? "text-brand-400" : "text-brand-800")}>{eyebrow}</p>}
      <Heading
        id={id}
        className={cn(
          "font-display font-semibold",
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          dark ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </Heading>
      {description && (
        <div className={cn("mt-5 text-lg leading-relaxed", dark ? "text-ink-200" : "text-ink-600")}>{description}</div>
      )}
    </div>
  );
}
