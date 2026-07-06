"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

// Left column: a vertical stack of product images that scrolls normally.
function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center bg-white">
        <span className="font-display text-6xl font-black text-line">SUR</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="aspect-[4/5] w-full bg-white object-cover"
    />
  );
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : [];

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center bg-white">
        <span className="font-display text-7xl font-black text-line">
          {product.refNumber}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {images.map((src, i) => (
        <GalleryImage key={`${src}-${i}`} src={src} alt={`${product.name} ${i + 1}`} />
      ))}
    </div>
  );
}
