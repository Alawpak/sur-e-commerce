import type { Metadata } from "next";
import { ShopCard } from "@/components/product/ShopCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — SUR STORE",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main className="px-6 pb-24 pt-12">
      <div className="mb-12 flex items-baseline justify-between">
        <h1 className="font-display text-4xl font-black tracking-tight md:text-6xl">
          SHOP
        </h1>
        <span className="text-[11px] tracking-ultra text-muted">
          ({products.length}) PRODUCTS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
