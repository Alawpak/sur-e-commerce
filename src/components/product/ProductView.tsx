"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyPanel } from "@/components/product/BuyPanel";
import { ColorSwatches } from "@/components/product/ColorSwatches";

interface ProductViewProps {
  product: Product;
}

// Owns the selected-color state and shares it between the gallery (left,
// swaps photos) and the buy panel (right, shows the swatches + size/add to
// cart). Kept as one client component so both sides stay in sync without
// prop-drilling through the server page.
export function ProductView({ product }: ProductViewProps) {
  const colors = product.colors ?? [];
  const [colorIndex, setColorIndex] = useState(0);
  const activeColor = colors[colorIndex];

  const galleryImages = activeColor?.images?.length
    ? activeColor.images
    : product.images;

  const displayProduct: Product = activeColor
    ? { ...product, images: galleryImages, color: activeColor.name }
    : product;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[60fr_40fr] md:gap-16">
      <ProductGallery product={displayProduct} />

      <div className="md:sticky md:top-24 md:h-fit md:self-start md:pt-2">
        <ColorSwatches
          colors={colors}
          activeIndex={colorIndex}
          onSelect={setColorIndex}
        />
        <BuyPanel product={displayProduct} />
      </div>
    </div>
  );
}
