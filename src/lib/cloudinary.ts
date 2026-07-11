// Thin helper for design/brand assets served from Cloudinary (hero photos,
// the loading-screen photo, the brand film video) — NOT product photos,
// those go through Sanity's own image pipeline instead.
//
// Falls back to the matching /public path when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
// isn't set yet, so nothing breaks before you've uploaded anything — once
// you set the env var and upload an asset with the same public ID, it
// switches over automatically with no other code changes.

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function cloudinaryUrl(
  resourceType: "image" | "video",
  publicId: string,
  fallbackPath: string,
  transforms = "f_auto,q_auto",
): string {
  if (!CLOUD_NAME) return fallbackPath;
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transforms}/${publicId}`;
}

// NOTE: the "hero" folder shown in the Cloudinary Media Library is just a
// browsing/organization label (dynamic folders) — it is NOT part of the
// actual public ID used for delivery. Confirmed via the asset's own "Copy
// URL": .../video/upload/v.../timeline.mp4, no "hero/" prefix. So these
// public IDs are flat, matching just the filename.
export const MEDIA = {
  heroModel: cloudinaryUrl("image", "girl_hero", "/hero/girl_hero.png"),
  loadingImage: cloudinaryUrl(
    "image",
    "loading-image",
    "/hero/loading-image.jpg",
  ),
  shopHero: cloudinaryUrl("image", "products-hero", "/hero/products-hero.jpg"),
  // Video needs an explicit extension in the URL — Cloudinary can't resolve
  // a delivery format without one (f_auto still picks the best one to send).
  brandFilm: cloudinaryUrl("video", "timeline.mp4", "/timeline.mp4"),
};
