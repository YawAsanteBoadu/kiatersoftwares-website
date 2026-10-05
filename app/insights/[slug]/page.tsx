import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Mdx } from "@/components/ui/Mdx";
import { getAllInsights, getInsightBySlug, getRelatedInsights, toInsightSummary } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    image: insight.coverImage ? { url: insight.coverImage, alt: insight.title } : undefined,
    type: "article",
    publishedTime: insight.publishedAt,
    section: insight.category,
    noIndex: insight.draft,
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const related = getRelatedInsights(insight).map(toInsightSummary);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.publishedAt,
    author: { "@type": "Organization", name: insight.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/brand/kaiter-mark.png` },
    },
    mainEntityOfPage: `${siteConfig.url}/insights/${insight.slug}`,
    articleSection: insight.category,
  };

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-ink-950">
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
          <div className="container-page max-w-4xl pt-10 pb-16 sm:pb-20">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-ink-300 hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All insights
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Badge tone="dark">{insight.category}</Badge>
              {insight.draft && <Badge tone="warning">Draft</Badge>}
            </div>
            <h1 className="mt-5 text-3xl leading-tight font-semibold text-white sm:text-5xl">{insight.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-200">{insight.excerpt}</p>
            <p className="mt-8 text-sm text-ink-400">
              {insight.author} · <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time> ·{" "}
              {insight.readingMinutes} min read
            </p>
          </div>
        </header>
        <div className="container-page max-w-3xl py-14 sm:py-20">
          <Mdx source={insight.body} />
        </div>
      </article>

      <CTASection
        title="Have a Business Problem? Let's Talk."
        source={`insight_${insight.slug}`}
        secondary={{ label: "Book a Consultation", intent: "bookConsultation" }}
      />

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="pb-16 sm:pb-20 lg:pb-28">
          <div className="container-page">
            <h2 id="related-heading" className="text-2xl font-semibold sm:text-3xl">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <BlogCard insight={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
