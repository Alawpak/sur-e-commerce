// GROQ queries. Used once Sanity is configured. The projections are written to
// map directly onto the Product/Category types in src/types/product.ts.
//
// Image compression: every URL below appends Sanity's CDN transform params
// directly in the query (`w`, `q`, `auto=format` — serves WebP/AVIF to
// browsers that support it). Upload photos at full quality in the Studio;
// the CDN resizes/compresses/caches on the fly, no manual compression step
// needed.
//
// Two different sizes on purpose:
//   - `imageUrl` (card thumbnail, grid views) — the FIRST image in the
//     product's `images` array, at w=1600/q=80. Small enough to stay fast
//     in a grid of many cards.
//   - `images` (product detail gallery, ProductGallery.tsx) — ALL images,
//     in upload order, at w=2400/q=85 — noticeably sharper since it's one
//     product filling most of the screen, not a grid of many.
// Bump the `w` further if either ever looks soft on very large screens.

const imageUrlProjection = `images[0].asset->url + "?w=1600&q=80&auto=format"`;
const galleryProjection = `images[]{ "url": asset->url + "?w=2400&q=85&auto=format" }.url`;

export const featuredProductQuery = `
*[_type == "product" && featured == true][0]{
  "id": _id,
  refNumber,
  name,
  "slug": slug.current,
  description,
  price,
  currency,
  sizes,
  "imageUrl": ${imageUrlProjection},
  "images": ${galleryProjection},
  category->{
    "id": _id,
    title,
    "slug": slug.current
  },
  specs
}`;

export const allProductsQuery = `
*[_type == "product"] | order(refNumber asc){
  "id": _id,
  refNumber,
  name,
  "slug": slug.current,
  description,
  price,
  currency,
  sizes,
  "imageUrl": ${imageUrlProjection},
  "images": ${galleryProjection},
  category->{
    "id": _id,
    title,
    "slug": slug.current
  },
  specs
}`;

export const productBySlugQuery = `
*[_type == "product" && slug.current == $slug][0]{
  "id": _id,
  refNumber,
  name,
  "slug": slug.current,
  description,
  price,
  currency,
  sizes,
  "imageUrl": ${imageUrlProjection},
  "images": ${galleryProjection},
  category->{
    "id": _id,
    title,
    "slug": slug.current
  },
  specs
}`;

// "Related products" on the product detail page — featured products from
// Sanity, excluding the one currently being viewed.
export const featuredRelatedProductsQuery = `
*[_type == "product" && featured == true && slug.current != $slug]
  | order(refNumber asc) [0...$limit]{
  "id": _id,
  refNumber,
  name,
  "slug": slug.current,
  description,
  price,
  currency,
  sizes,
  "imageUrl": ${imageUrlProjection},
  "images": ${galleryProjection},
  category->{
    "id": _id,
    title,
    "slug": slug.current
  },
  specs
}`;
