import Link from "next/link";
import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

const components = {
  a: MdxLink,
};

/** Renders trusted, version-controlled MDX from /content with brand typography. */
export function Mdx({ source, className }: { source: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none",
        "prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink-950",
        "prose-h2:mt-14 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl",
        "prose-p:text-ink-700 prose-strong:text-ink-950 prose-li:text-ink-700 prose-li:marker:text-brand-800",
        "prose-a:font-medium prose-a:text-brand-800 prose-a:underline-offset-4 hover:prose-a:text-brand-900",
        "prose-blockquote:border-l-brand-500 prose-blockquote:text-ink-800 prose-blockquote:not-italic",
        className,
      )}
    >
      <MDXRemote source={source} components={components} />
    </div>
  );
}
