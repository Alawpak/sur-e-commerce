"use client";

import type { ProductColor } from "@/types/product";

interface ColorSwatchesProps {
  colors: ProductColor[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

// Row of hex-colored circles. Clicking one swaps the gallery to that color's
// photos (see ProductView, which owns the shared selection state).
export function ColorSwatches({
  colors,
  activeIndex,
  onSelect,
}: ColorSwatchesProps) {
  if (colors.length === 0) return null;

  const active = colors[activeIndex];

  return (
    <div className="mb-8">
      <p className="mb-3 text-[11px] tracking-ultra text-muted">
        COLOR: <span className="text-ink">{active?.name}</span>
      </p>
      <div className="flex items-center gap-3">
        {colors.map((color, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={`${color.name}-${i}`}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              aria-label={color.name}
              title={color.name}
              className={`h-8 w-8 rounded-full border transition-shadow ${
                isActive
                  ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                  : "border-line hover:border-ink"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}
