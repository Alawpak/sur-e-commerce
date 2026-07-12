import Image from "next/image";
import { MEDIA } from "@/lib/cloudinary";

// Full-bleed hero for the shop/listing page. Served from Cloudinary once
// configured (see src/lib/cloudinary.ts). Lives under a fixed transparent
// header (see PageBody.tsx), so it needs its own top padding cleared via
// min-height rather than relying on page padding.
const HERO_IMAGE = MEDIA.shopHero;

// The source photo is a wide panoramic crop (~1.92:1). With object-fit:
// cover filling a *tall* box, a narrower viewport forces a much bigger
// zoom to still cover the full width — that's the "it zooms in more as
// the screen gets smaller" effect. Scaling the box height down on mobile
// (and back up from `lg`) keeps the zoom level closer to consistent across
// breakpoints instead of over-cropping on phones.

interface ShopHeroProps {
  /** Overlay label, bottom-left — e.g. "TODOS" for the full catalog, or a
   * category name like "TOPS" when this is reused for a filtered view. */
  label: string;
}

export function ShopHero({ label }: ShopHeroProps) {
  return (
    <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-transparent sm:h-[55vh] lg:h-[70vh]">
      <Image
        src={HERO_IMAGE}
        alt="SUR STORE — todos los productos"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 50%" }}
      />

      {/* Darken the bottom edge so the label stays legible over any photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/10" />

      <div className="absolute bottom-8 left-6 z-10 sm:bottom-4">
        <h1
          className="font-display font-normal leading-none tracking-tight text-white"
          style={{ fontSize: "clamp(1.75rem, 7vw, 3rem)" }}
        >
          {label}
        </h1>
      </div>
    </section>
  );
}
