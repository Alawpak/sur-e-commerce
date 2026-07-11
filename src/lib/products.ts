import type { Product } from "@/types/product";
import {
  getFeaturedProduct as getMockFeatured,
  getProductBySlug as getMockBySlug,
  products as mockProducts,
} from "@/data/mock-products";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import {
  allProductsQuery,
  featuredProductQuery,
  featuredRelatedProductsQuery,
  productBySlugQuery,
} from "@/lib/sanity/queries";

// Single data-access layer. Components import from here and never touch the
// data source directly. Switch from mock to Sanity automatically once env vars
// are present — no component changes required.
//
// Caching note: next-sanity's client.fetch() runs through Next's own fetch,
// which caches indefinitely by default (separate from — and in addition to
// — Sanity's CDN cache, see client.ts). Without opting out, a query fetched
// once (e.g. the shop grid on first load) keeps serving that same stale
// response even after you edit/publish in the Studio, while a *new* query
// (a slug you hadn't visited yet) fetches fresh and looks fine — which is
// exactly the "detail page updates, grid doesn't" split you'd see. No
// caching in development so edits show up immediately; a short revalidate
// window in production so it isn't hitting Sanity on every request.
const fetchOptions = {
  next:
    process.env.NODE_ENV === "production"
      ? { revalidate: 60 }
      : { revalidate: 0 },
};

export async function getFeaturedProduct(): Promise<Product> {
  if (isSanityConfigured && sanityClient) {
    const product = await sanityClient.fetch<Product>(
      featuredProductQuery,
      {},
      fetchOptions
    );
    if (product) return product;
  }
  return getMockFeatured();
}

export async function getAllProducts(): Promise<Product[]> {
  if (isSanityConfigured && sanityClient) {
    const products = await sanityClient.fetch<Product[]>(
      allProductsQuery,
      {},
      fetchOptions
    );
    if (products?.length) return products;
  }
  return mockProducts;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (isSanityConfigured && sanityClient) {
    const product = await sanityClient.fetch<Product>(
      productBySlugQuery,
      { slug },
      fetchOptions
    );
    if (product) return product;
  }
  return getMockBySlug(slug);
}

export async function getRelatedProducts(
  slug: string,
  limit = 4
): Promise<Product[]> {
  // Featured products from Sanity, excluding the one being viewed. No mock
  // fallback here — until Sanity is configured (or nothing is marked
  // featured), this section is simply empty.
  if (!isSanityConfigured || !sanityClient) return [];
  const products = await sanityClient.fetch<Product[]>(
    featuredRelatedProductsQuery,
    { slug, limit },
    fetchOptions
  );
  return products ?? [];
}
