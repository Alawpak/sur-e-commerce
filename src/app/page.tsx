import { ProductHero } from "@/components/product/ProductHero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="flex flex-col">
      <ProductHero />
      <FeaturedProducts products={products} />
    </main>
  );
}
