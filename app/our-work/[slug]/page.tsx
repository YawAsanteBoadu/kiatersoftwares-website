import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { ContentImage } from "@/components/ui/ContentImage";
import { Mdx } from "@/components/ui/Mdx";
import { WhatsAppCTAButton } from "@/components/ui/WhatsAppCTAButton";
import { getAllProjects, getProjectBySlug, toProjectSummary } from "@/lib/content";
import { similarProjectMessage } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.type}`,
    description: project.summary,
    path: `/our-work/${project.slug}`,
    image: { url: project.coverImage, alt: project.coverAlt ?? project.title },
    type: "article",
    noIndex: project.draft,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const more = getAllProjects()
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3)
    .map(toProjectSummary);

  const facts = [
    { label: "Industry", value: project.industry },
    { label: "Type", value: project.type },
    { label: "Category", value: project.categories.join(", ") },
  ];

  return (
    <>
      {/* Project Hero — Requirements §15 */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        <div className="container-page pt-10 pb-16 sm:pb-20">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-ink-300 hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {project.draft && <Badge tone="warning">Draft — sample content</Badge>}
                <StatusBadge status={project.status} />
              </div>
              <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">{project.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-200 sm:text-xl">{project.summary}</p>
              <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold tracking-wide text-ink-400 uppercase">{fact.label}</dt>
                    <dd className="mt-1 font-medium text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink-950 hover:bg-brand-50"
                >
                  Visit Project
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-ink-800 ring-1 ring-white/10">
              <ContentImage
                src={project.coverImage}
                alt={project.coverAlt ?? `${project.title} — ${project.type}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge, Approach, Solution, Key Features, Business Impact — from the MDX body */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <Mdx source={project.body} className="[&>h2:first-child]:mt-0" />
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {project.technology && project.technology.length > 0 && (
              <div className="rounded-2xl border border-ink-100 p-6">
                <h2 className="text-sm font-semibold tracking-wide text-ink-500 uppercase">Technology</h2>
                <p className="mt-1 text-xs text-ink-500">For technical visitors</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technology.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-2xl bg-ink-950 p-6 text-white">
              <p className="font-display text-lg font-semibold">Need something similar?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                Tell us about your business and we&rsquo;ll research the right solution with you.
              </p>
              <WhatsAppCTAButton
                message={similarProjectMessage(project.title)}
                event="similar_project_click"
                source={`project_${project.slug}_aside`}
                variant="light"
                className="mt-5 w-full"
              >
                Start a Project
              </WhatsAppCTAButton>
            </div>
          </aside>
        </div>
      </section>

      {project.screenshots.length > 0 && (
        <section aria-labelledby="screenshots-heading" className="section bg-ink-50">
          <div className="container-page">
            <h2 id="screenshots-heading" className="text-3xl font-semibold">
              Screenshots
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <li key={shot.src}>
                  <figure className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
                    <div className="relative aspect-[16/10]">
                      <ContentImage
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="px-5 py-3 text-sm text-ink-600">{shot.alt}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.liveUrl && (
        <section aria-labelledby="live-preview-heading" className="section">
          <div className="container-page">
            <h2 id="live-preview-heading" className="mb-8 text-3xl font-semibold sm:text-4xl">
              Live Preview
            </h2>
            <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-lg">
              <iframe
                src={project.liveUrl}
                title={`${project.title} live preview`}
                className="w-full"
                style={{
                  height: "900px",
                  border: "none",
                }}
                loading="lazy"
                allow="geolocation; microphone; camera"
              />
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <p className="text-sm text-ink-600">Viewing live website</p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition-colors hover:bg-brand-400"
              >
                Open Full Screen
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="pt-16 sm:pt-20 lg:pt-28">
        <CTASection
          title="Need Something Similar for Your Business?"
          description="Tell us how your business works. We'll research the problem with you and propose the right solution."
          primaryMessage={similarProjectMessage(project.title)}
          primaryEvent="similar_project_click"
          source={`project_${project.slug}`}
          secondary={{ label: "Explore Our Work", href: "/our-work" }}
        />
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-projects-heading" className="pb-16 sm:pb-20 lg:pb-28">
          <div className="container-page">
            <h2 id="more-projects-heading" className="text-2xl font-semibold sm:text-3xl">
              More projects
            </h2>
            <div className="mt-8">
              <ProjectGrid projects={more} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
