import type { MetadataRoute } from "next";
import { getAllInsights, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/what-we-do",
  "/our-work",
  "/how-we-work",
  "/industries",
  "/hardware",
  "/about",
  "/insights",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : route === "/contact" || route === "/our-work" ? 0.9 : 0.7,
    })),
    ...getAllProjects()
      .filter((project) => !project.draft)
      .map((project) => ({
        url: `${base}/our-work/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...getAllInsights()
      .filter((insight) => !insight.draft)
      .map((insight) => ({
        url: `${base}/insights/${insight.slug}`,
        lastModified: new Date(insight.publishedAt),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
