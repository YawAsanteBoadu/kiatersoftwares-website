import type { Metadata } from "next";
import { siteConfig } from "./site";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "KAiTER Softwares — We Turn Business Challenges Into Digital Systems",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Raster image for social previews (SVG is not supported by most platforms). */
  image?: { url: string; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  section?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

/**
 * Builds a page's metadata. Next.js replaces (rather than merges) nested
 * `openGraph` objects, so every page sets the complete set here: canonical URL,
 * Open Graph and Twitter tags with a guaranteed preview image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  section,
  noIndex,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const ogImage = image && !image.url.endsWith(".svg") ? image : DEFAULT_OG_IMAGE;
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: "en_GH",
      url: path,
      title: socialTitle,
      description,
      images: [ogImage],
      ...(type === "article" ? { publishedTime, section, authors: [siteConfig.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage.url] },
  };
}
