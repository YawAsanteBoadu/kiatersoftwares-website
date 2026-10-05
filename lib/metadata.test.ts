import { describe, expect, it } from "vitest";
import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("sets the page's own canonical and Open Graph URL", () => {
    const meta = pageMetadata({ title: "About", description: "d", path: "/about" });
    expect(meta.alternates?.canonical).toBe("/about");
    expect(meta.openGraph).toMatchObject({ url: "/about", siteName: "KAiTER Softwares" });
  });

  it("falls back to the default preview image for SVG covers", () => {
    const meta = pageMetadata({ title: "P", description: "d", path: "/p", image: { url: "/x.svg", alt: "x" } });
    expect(meta.twitter).toMatchObject({ images: ["/opengraph-image"] });
  });

  it("uses a raster cover image when provided", () => {
    const meta = pageMetadata({ title: "P", description: "d", path: "/p", image: { url: "/x.png", alt: "x" } });
    expect(meta.twitter).toMatchObject({ images: ["/x.png"] });
  });
});
