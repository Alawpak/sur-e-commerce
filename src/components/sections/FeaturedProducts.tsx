import type { Product } from "@/types/product";
import { FeaturedMarquee } from "@/components/product/FeaturedMarquee";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="pb-24 pt-24">
      <div className="mb-8 text-center">
        <span className="text-[11px] tracking-ultra text-muted">
          ( FEATURED PRODUCTS )
        </span>
      </div>

      <FeaturedMarquee products={products} />
    </section>
  );
}
