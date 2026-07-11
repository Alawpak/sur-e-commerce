// GROQ queries. Used once Sanity is configured. The projections are written to
// map directly onto the Product/Category types in src/types/product.ts.
//
// Image compression: `imageUrl` appends Sanity's CDN transform params
// directly in the query — w=1600 (max width), q=75 (quality), auto=format
// (serves WebP/AVIF to browsers that support it). Upload photos at full
// quality in the Studio; the CDN resizes/compresses/caches on the fly, no
// manual compression step needed. Bump `w` for the product detail page if
// 1600px ever looks soft on large screens.

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
  "imageUrl": image.asset->url + "?w=1600&q=75&auto=format",
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
  "imageUrl": image.asset->url + "?w=1600&q=75&auto=format",
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
  "imageUrl": image.asset->url + "?w=1600&q=75&auto=format",
  category->{
    "id": _id,
    title,
    "slug": slug.current
  },
  specs
}`;
