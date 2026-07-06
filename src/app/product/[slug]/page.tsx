import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyPanel } from "@/components/product/BuyPanel";
import { ShopCard } from "@/components/product/ShopCard";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  return { title: product ? `${product.name} — SUR STORE` : "SUR STORE" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(params.slug, 4);

  return (
    <main className="px-6 pb-24 pt-8">
      {/* Two columns: scrolling gallery (left) + sticky buy panel (right) */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[60fr_40fr] md:gap-16">
        <ProductGallery product={product} />

        <div className="md:sticky md:top-24 md:h-fit md:self-start md:pt-2">
          <BuyPanel product={product} />
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-32">
          <h2 className="mb-10 font-display text-4xl font-black tracking-tight md:text-5xl">
            RELATED PRODUCTS
          </h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (
              <ShopCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
