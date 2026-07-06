import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, isSanityConfigured, projectId } from "./client";

// Helper to build optimized image URLs from Sanity image references.
const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource): string | undefined {
  if (!builder) return undefined;
  return builder.image(source).auto("format").fit("max").url();
}
