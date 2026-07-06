"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ShopCardProps {
  product: Product;
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "EUR" ? "€" : `${currency} `;
  return `${symbol}${price.toFixed(0)}`;
}

export function ShopCard({ product }: ShopCardProps) {
  const initialSrc = product.imageUrl ?? `/products/${product.slug}.jpg`;
  const [src, setSrc] = useState<string | null>(initialSrc);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image with reference badge */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={product.name}
            onError={() => setSrc(null)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <span className="font-display text-6xl font-black text-line">
              {product.refNumber}
            </span>
          </div>
        )}
      </div>

      {/* Info row below the image */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-ultra text-muted">
            {product.category.title}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-ink">
            {product.name}
          </h3>
        </div>
        <span className="text-lg font-semibold text-ink">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>
    </Link>
  );
}
