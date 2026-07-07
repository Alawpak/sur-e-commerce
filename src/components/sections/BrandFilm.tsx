// Full-bleed video section, sits right below the hero. Autoplay/muted/loop
// so it behaves like a background — no controls, no sound. Drop a
// replacement at public/timeline.mp4 to swap the footage, no code changes
// needed.
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
        <source src="/timeline.mp4" type="video/mp4" />
      </video>

      {/* Light scrim so the wordmark stays legible over any footage */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
