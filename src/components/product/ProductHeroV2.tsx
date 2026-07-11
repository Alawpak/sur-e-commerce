"use client";

import { useState } from "react";
import Link from "next/link";
import { MEDIA } from "@/lib/cloudinary";

// Cutout portrait (transparent PNG), centered over the solid bone backdrop.
// Served from Cloudinary once configured (see src/lib/cloudinary.ts).
const HERO_CUTOUT = MEDIA.heroModel;

// 👉 Resize the model by editing the `h-[...]` classes on the <img> below
// (Tailwind needs the literal classes, not a JS variable, to generate the
// right CSS per breakpoint) — mobile default, then `sm:` and `lg:`
// overrides. It's her rendered height as a share of the hero's height:
// 100% = she fits fully inside the section; higher values crop her (feet
// and/or head run past the edges). Kept smaller on mobile so the "SUR"
// texture behind her still peeks out; bigger from `lg` up for the full
// editorial look.

// 👉 Small fine-tune nudge on top of her base position. On mobile/tablet
// she's centered; from `lg` up she shifts to the right (see the wrapper's
// `lg:justify-end lg:pr-*` below). Positive Y = down, negative Y = up.
const FIGURE_OFFSET_Y = "0px";
const FIGURE_OFFSET_X = "0px";

// Breakpoint note: below `lg` (mobile + tablet) the model and the "SUR"
// texture center themselves and she renders smaller so the texture still
// shows around her. The bottom-left/bottom-right text stays in its corners
// at every size. From `lg` (1024px) up, the model shifts right, bigger, and
// the texture bleeds off the left edge — the full editorial split.

export function ProductHeroV2() {
  const [src, setSrc] = useState<string | null>(HERO_CUTOUT);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-bone">
      {/* Background texture — giant, near-invisible wordmark filling the
          negative space. Centered near the top on mobile/tablet (clear of
          her face), vertically centered + bled off the left edge on
          desktop. Purely decorative, sits behind the model. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden pt-24 sm:pt-28 lg:items-center lg:justify-start lg:pt-0 min-[1000px]:max-[1200px]:!items-start min-[1000px]:max-[1200px]:!justify-center min-[1000px]:max-[1200px]:!pt-28"
        aria-hidden
      >
        <span
          className="whitespace-nowrap font-display font-black leading-none tracking-tighter lg:-ml-4 min-[1000px]:max-[1200px]:!ml-0 min-[1000px]:max-[1200px]:!text-[clamp(15rem,calc(840px_-_50vw),21.25rem)] min-[1200px]:max-[1600px]:!text-[25rem]"
          style={{ fontSize: "clamp(10rem, 34vw, 30rem)" }}
        >
          SUR
        </span>
      </div>

      {/* Model — centered + smaller on mobile/tablet, bigger and shifted
          right on desktop (see the h-[...] classes on the <img> below to
          resize per breakpoint, lg:pr-* to shift her on desktop). */}
      {src ? (
        <div className="absolute inset-0 z-0 flex items-end justify-center  lg:justify-end lg:pr-[8%] xl:pr-[10%] min-[1000px]:max-[1200px]:!justify-center min-[1000px]:max-[1200px]:!pr-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Modelo usando SUR STORE"
            onError={() => setSrc(null)}
            style={{
              transform: `translate(${FIGURE_OFFSET_X}, ${FIGURE_OFFSET_Y})`,
            }}
            className="h-[65%] w-auto max-w-none object-contain ml-[30px] lg:ml-0 sm:h-[70%] lg:h-[90%] min-[1000px]:max-[1400px]:!h-[78%] min-[1400px]:max-[2000px]:!h-[88%]"
          />
        </div>
      ) : null}

      <div className="absolute bottom-8 left-6 z-10 flex items-end gap-2.5 sm:bottom-10 sm:gap-3">
        <Link
          href="/shop"
          className="font-display font-black leading-[0.85] tracking-tight text-black hover:opacity-60"
          style={{ fontSize: "clamp(1.75rem, 5.5vw, 3.75rem)" }}
        >
          SHOP NOW!
        </Link>
      </div>

      <div className="absolute bottom-8 right-6 z-10 flex max-w-[160px] flex-col gap-3 text-right sm:max-w-xs sm:bottom-10 sm:gap-4 md:max-w-sm">
        <p className="text-[12px] leading-relaxed text-muted sm:text-[13px] md:text-sm">
          Piezas nacidas en Chiapas para entrenar duro y vestir sin pensarlo dos
          veces. Algodón pesado, corte relajado y un logo que se nota — hechas
          para correr, y para todo lo demás.
        </p>
      </div>
    </section>
  );
}
