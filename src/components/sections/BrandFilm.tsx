import { MEDIA } from "@/lib/cloudinary";

// Full-bleed video section, sits right below the hero. Autoplay/muted/loop
// so it behaves like a background — no controls, no sound. Served from
// Cloudinary once configured (see src/lib/cloudinary.ts); falls back to
// public/timeline.mp4 until then.
export function BrandFilm() {
  return (
    <section className="relative h-[70svh] w-full overflow-hidden bg-ink">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={MEDIA.brandFilm} type="video/mp4" />
      </video>

      {/* Light scrim so the wordmark stays legible over any footage */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
