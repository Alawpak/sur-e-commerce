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

export async function getFeaturedProduct(): Promise<Product> {
  if (isSanityConfigured && sanityClient) {
    const product = await sanityClient.fetch<Product>(featuredProductQuery);
    if (product) return product;
  }
  return getMockFeatured();
}

export async function getAllProducts(): Promise<Product[]> {
  if (isSanityConfigured && sanityClient) {
    const products = await sanityClient.fetch<Product[]>(allProductsQuery);
    if (products?.length) return products;
  }
  return mockProducts;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (isSanityConfigured && sanityClient) {
    const product = await sanityClient.fetch<Product>(productBySlugQuery, {
      slug,
    });
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
    { slug, limit }
  );
  return products ?? [];
}
