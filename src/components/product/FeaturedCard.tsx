"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface FeaturedCardProps {
  product: Product;
}

function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toFixed(2)}`;
}

export function FeaturedCard({ product }: FeaturedCardProps) {
  // Try an explicit imageUrl first, otherwise a conventional path derived from
  // the slug: /products/<slug>.jpg. If it fails to load, fall back to the
  // reference-number placeholder. Just drop files in public/products/.
  const initialSrc = product.imageUrl ?? `/products/${product.slug}.jpg`;
  const [src, setSrc] = useState<string | null>(initialSrc);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block w-[88vw] shrink-0 select-none sm:w-[58vw] lg:w-[42vw] xl:w-[30vw]"
    >
      {/* Product image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={product.name}
            draggable={false}
            onError={() => setSrc(null)}
            className="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <span className="font-display text-6xl font-black text-line">
              {product.refNumber}
            </span>
          </div>
        )}
      </div>

      {/* Caption — always visible, no hover required */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-ink">
            {product.name}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] tracking-ultra text-muted">
            <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-ink" />
            {product.category.title.toUpperCase()}
          </div>
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-ink">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>
    </Link>
  );
}
