"use client";

import { useState } from "react";
import type { Product, Size } from "@/types/product";
import { useCartStore } from "@/store/cart-store";

interface AddToCartButtonProps {
  product: Product;
  size: Size;
}

export function AddToCartButton({ product, size }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem(product, size);
    setJustAdded(true);
    openCart();
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="border border-ink px-8 py-3 text-[11px] tracking-ultra transition-colors hover:bg-ink hover:text-paper"
    >
      {justAdded ? "[ ADDED ✓ ]" : "[ ADD TO CART ]"}
    </button>
  );
}
