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
    <div className="group relative block w-[88vw] shrink-0 select-none sm:w-[58vw] lg:w-[42vw] xl:w-[30vw]">
      {/* Product image — not clickable, just draggable surface */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={product.name}
            draggable={false}
            onError={() => setSrc(null)}
            className="pointer-events-none h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <span className="font-display text-6xl font-black text-line">
              {product.refNumber}
            </span>
          </div>
        )}

        {/* Hover info panel — the only clickable target */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-x-3 bottom-3 block translate-y-3 bg-white px-4 py-4 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <p className="text-[13px] font-semibold uppercase tracking-wide text-ink">
            {product.name}
          </p>
          <p className="mt-0.5 text-[12px] text-muted">({product.sku})</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">
              {formatPrice(product.price, product.currency)}
            </span>
            <span aria-hidden className="text-ink">
              →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
