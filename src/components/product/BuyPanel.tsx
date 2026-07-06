"use client";

import { useState } from "react";
import type { Product, Size } from "@/types/product";
import { useCartStore } from "@/store/cart-store";

interface BuyPanelProps {
  product: Product;
}

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "EUR" ? "€" : `${currency} `;
  return `${symbol}${price.toFixed(2)}`;
}

export function BuyPanel({ product }: BuyPanelProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<Size>(
    product.sizes[Math.floor(product.sizes.length / 2)] ?? product.sizes[0]
  );
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const onSale =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;

  function handleAdd() {
    addItem(product, selectedSize);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div>
      <h1 className="font-display text-6xl font-black leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
        {product.name.toUpperCase()}
      </h1>

      <p className="mt-8 max-w-md text-[17px] leading-relaxed text-muted">
        {product.description}
      </p>

      {/* Meta line */}
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[15px] tracking-wide text-muted">
        {product.color && (
          <span>
            Color: <span className="text-ink">{product.color}</span>
          </span>
        )}
        <span>
          SKU: <span className="text-ink">{product.sku}</span>
        </span>
        {product.material && (
          <span>
            Material: <span className="text-ink">{product.material}</span>
          </span>
        )}
      </div>

      {/* Size selector — full width row */}
      <div className="mt-8 flex gap-3">
        {product.sizes.map((size) => {
          const active = size === selectedSize;
          return (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={active}
              className={`h-16 flex-1 border text-[15px] font-medium tracking-wider transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-3 text-[11px] tracking-wide text-muted underline-offset-4 hover:underline"
      >
        Product Measurements
      </button>

      {/* Price */}
      <div className="mt-10 flex items-baseline gap-4">
        {onSale && (
          <span className="text-4xl font-medium text-muted line-through">
            {formatPrice(product.compareAtPrice!, product.currency)}
          </span>
        )}
        <span className="text-5xl font-bold text-ink">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => setWished((w) => !w)}
          aria-pressed={wished}
          aria-label="Add to wishlist"
          className={`flex h-16 w-16 shrink-0 items-center justify-center border text-xl transition-colors ${
            wished ? "border-ink bg-ink text-paper" : "border-ink text-ink"
          }`}
        >
          {wished ? "♥" : "♡"}
        </button>
        <button
          type="button"
          onClick={handleAdd}
          className="h-16 flex-1 border border-ink bg-ink text-[13px] tracking-ultra text-paper transition-opacity hover:opacity-90"
        >
          {added ? "ADDED ✓" : "ADD TO CART"}
        </button>
      </div>

      <p className="mt-4 text-[11px] tracking-wide text-muted">
        Delivery in 3–5 working days.
      </p>
    </div>
  );
}
