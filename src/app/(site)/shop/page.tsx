import type { Metadata } from "next";
import { ShopCard } from "@/components/product/ShopCard";
import { ShopHero } from "@/components/product/ShopHero";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — SUR STORE",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main className="pb-24">
      <ShopHero label="TODOS" />

      <div className="mb-12 mt-10 flex items-baseline justify-between px-6">
        <span className="text-[11px] tracking-ultra text-muted">
          COLECCIÓN
        </span>
        <span className="text-[11px] tracking-ultra text-muted">
          ({products.length}) PRODUCTOS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-2 gap-y-10 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
