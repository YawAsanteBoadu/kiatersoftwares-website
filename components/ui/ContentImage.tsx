import Image, { type ImageProps } from "next/image";

/**
 * next/image wrapper for content images. SVGs are served as-is (the image
 * optimizer does not process SVG); raster images get full optimization.
 */
export function ContentImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  return <Image {...props} unoptimized={props.unoptimized ?? src.endsWith(".svg")} alt={props.alt} />;
}
