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
  /** The number from Cloudinary's own "Copy URL" (.../upload/v<version>/...).
   * This account's URLs seem to need it pinned — omitting it 404s even
   * though Cloudinary docs treat it as optional. Update this if you
   * replace the asset (new upload = new version number). */
  version?: number,
  transforms = "f_auto,q_auto",
): string {
  if (!CLOUD_NAME) return fallbackPath;
  const versionSegment = version ? `v${version}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transforms}/${versionSegment}${publicId}`;
}

// NOTE: the "hero" folder shown in the Cloudinary Media Library is just a
// browsing/organization label (dynamic folders) — it is NOT part of the
// actual public ID used for delivery. Confirmed via the asset's own "Copy
// URL", which also confirmed images need an explicit extension in the
// delivery URL just like video does (Cloudinary can't resolve a delivery
// format without one) — so every entry below ends in .jpg/.png/.mp4 even
// though f_auto overrides the actual format it sends. The public IDs
// themselves are still flat (no folder prefix).
export const MEDIA = {
  heroModel: cloudinaryUrl("image", "girl_hero.png", "/hero/girl_hero.png"),
  loadingImage: cloudinaryUrl(
    "image",
    "loading-image.jpg",
    "/hero/loading-image.jpg",
  ),
  // No version pinned yet for this one — per the note above, this account
  // 404s on unpinned URLs, which was leaving the ShopHero section's fallback
  // background exposed through the transparent header on /shop. Serving the
  // local file directly until the Cloudinary version number is added (grab
  // it from "Copy URL" in the Media Library, then swap this back to
  // cloudinaryUrl("image", "products-hero.jpg", "/hero/products-hero.jpg", <version>)).
  shopHero: "/hero/products-hero.jpg",
  // Confirmed working with this version pinned.
  brandFilm: cloudinaryUrl("video", "timeline.mp4", "/timeline.mp4", 1783795657),

  // ExploreLinks (homepage "NUESTROS PRODUCTOS / NUESTRA COMUNIDAD" tiles)
  // — dedicated brand imagery, not tied to any product. No local fallback
  // file exists for these; they show the "?" placeholder until uploaded.
  // Upload with these exact Public IDs (Cloudinary strips the extension you
  // type into the Public ID field on upload — it's added back here at
  // delivery time).
  exploreShop: cloudinaryUrl("image", "explore-shop.jpg", ""),
  // Confirmed working with this version pinned.
  exploreCommunity: cloudinaryUrl(
    "image",
    "explore-community.jpg",
    "",
    1783800423,
  ),
};
