// GROQ queries. Used once Sanity is configured. The projections are written to
// map directly onto the Product/Category types in src/types/product.ts.

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
  "imageUrl": image.asset->url,
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
  "imageUrl": image.asset->url,
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
  "imageUrl": image.asset->url,
  category->{
    "id": _id,
    title,
    "slug": slug.current
  },
  specs
}`;
