"use client";

import type { Size } from "@/types/product";

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size;
  onSelect: (size: Size) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="flex gap-1.5">
      {sizes.map((size) => {
        const isActive = size === selectedSize;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            aria-pressed={isActive}
            className={`h-8 w-9 border text-[11px] tracking-wider transition-colors ${
              isActive
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink hover:border-ink"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
