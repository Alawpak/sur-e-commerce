"use client";

import { useEffect, useRef } from "react";
import type { Product } from "@/types/product";
import { FeaturedCard } from "./FeaturedCard";

interface FeaturedMarqueeProps {
  products: Product[];
}

// Auto-scrolling, drag/swipe-able product row.
// Uses a translateX offset (not scrollLeft) so the continuous auto-advance
// is reliable. The track holds two copies of the list and wraps by one copy
// width for a seamless loop. Drag/swipe adjusts the same offset.
export function FeaturedMarquee({ products }: FeaturedMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const track = [...products, ...products];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SPEED = 35; // px per second
    let offset = 0; // current translateX (negative = moved left)
    let dragging = false;
    let paused = false;
    let startX = 0;
    let startOffset = 0;
    let moved = false;
    let lastTime = 0;
    let rafId = 0;

    // Width of one copy of the list (half the track).
    const copyWidth = () => el.scrollWidth / 2;

    const apply = () => {
      const w = copyWidth();
      if (w > 0) {
        // Wrap offset into (-w, 0].
        offset = ((offset % w) + w) % w; // 0..w
        offset -= w; // -w..0
      }
      el.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const frame = (t: number) => {
      if (!lastTime) lastTime = t;
      const dt = (t - lastTime) / 1000;
      lastTime = t;

      if (!dragging && !paused && !prefersReducedMotion) {
        offset -= SPEED * dt;
        apply();
      }
      rafId = window.requestAnimationFrame(frame);
    };
    rafId = window.requestAnimationFrame(frame);

    // ── Drag / swipe ──────────────────────────────────────────
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      startX = e.clientX;
      startOffset = offset;
      el.dataset.dragged = "false";
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 6) {
        moved = true;
        el.dataset.dragged = "true";
      }
      offset = startOffset + delta;
      apply();
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved || el.dataset.dragged === "true") {
        e.preventDefault();
        e.stopPropagation();
        el.dataset.dragged = "false";
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [products]);

  if (products.length === 0) return null;

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max cursor-grab touch-pan-y gap-3 will-change-transform"
      >
        {track.map((product, index) => (
          <FeaturedCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
