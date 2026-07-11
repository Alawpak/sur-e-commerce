"use client";

import { useEffect, useRef, useState } from "react";

// Full-screen preloader shown once per session while the critical, heavy
// assets (hero photo + brand film video — both destined to live on
// Cloudinary) warm up.
//
// Sequence:
//   1. "SUR STORE" fades in (blur → sharp) for `logoDurationMs` (~2s).
//   2. A preview square fades in centered ON TOP of the text (higher
//      z-index — the photo takes visual priority) with a curtain sweeping
//      top-to-bottom to reveal it, once it has actually finished loading
//      (never reveals a half-loaded/broken image).
//   3. Once the video's first frame is also ready, the same curtain sweeps
//      back closed bottom-to-top, then the whole overlay fades out,
//      revealing the real page underneath.
//
// When the hero image / video move to Cloudinary, just swap the src props
// below (in the root layout) for the res.cloudinary.com URLs — nothing else
// in this component changes.

interface PreloaderProps {
  imageSrc: string;
  videoSrc?: string;
  /** How long "SUR STORE" shows by itself before the image curtain appears. */
  logoDurationMs?: number;
}

type Phase = "logo" | "reveal" | "closing" | "exiting" | "done";

export function Preloader({
  imageSrc,
  videoSrc,
  logoDurationMs = 2000,
}: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("logo");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(!videoSrc);
  const [logoSharp, setLogoSharp] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);
  const exitStarted = useRef(false);

  // Text starts blurred + transparent, then flips a frame later so the
  // blur-to-sharp transition actually plays instead of mounting pre-resolved.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setLogoSharp(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Kick off preloading immediately (in parallel with the 2s logo beat),
  // independent of what's currently on screen.
  useEffect(() => {
    const img = new window.Image();
    img.src = imageSrc;
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true); // don't get stuck on a 404
    }

    if (videoSrc) {
      const video = document.createElement("video");
      video.muted = true;
      video.preload = "auto";
      video.src = videoSrc;
      const markLoaded = () => setVideoLoaded(true);
      video.addEventListener("loadeddata", markLoaded);
      video.addEventListener("error", markLoaded); // don't get stuck on a bad source
      video.load();
    }
  }, [imageSrc, videoSrc]);

  // Step 1 → 2: show the logo alone for a fixed beat, then bring in the image.
  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("reveal"), logoDurationMs);
    return () => window.clearTimeout(timer);
  }, [logoDurationMs]);

  // Open the curtain once we're on "reveal" and the photo has actually
  // loaded. Double rAF guarantees the box paints once with the curtain
  // still closed before the class flips — otherwise the box mounts with
  // the "open" class already applied and there's nothing to transition
  // from (the photo just pops in with no sweep).
  useEffect(() => {
    if (phase !== "reveal" || !imageLoaded) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhotoRevealed(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [phase, imageLoaded]);

  // Step 2 → 3: once the image + video are both ready (and the top-to-bottom
  // reveal has had time to play), sweep the curtain closed bottom-to-top.
  useEffect(() => {
    if (phase !== "reveal" || !imageLoaded || !videoLoaded) return;
    if (exitStarted.current) return;
    exitStarted.current = true;

    const curtainTimer = window.setTimeout(() => {
      setPhotoRevealed(false);
      setPhase("closing");
    }, 700);
    return () => window.clearTimeout(curtainTimer);
  }, [phase, imageLoaded, videoLoaded]);

  // Step 3 → 4: once the curtain has finished closing, fade the whole
  // overlay away.
  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(() => setPhase("exiting"), 700);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const doneTimer = window.setTimeout(() => setPhase("done"), 500);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  // Lock scroll while the loader is up.
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "exiting" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="relative flex items-center justify-center">
        <span
          className={`font-display font-black uppercase tracking-tight text-white transition-all duration-[1200ms] ease-out ${
            logoSharp ? "opacity-100 blur-none" : "opacity-0 blur-lg"
          }`}
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          SUR STORE
        </span>

        {/* Photo — centered on top of the text (higher z-index: the photo
            takes visual priority), with its own top-to-bottom / bottom-to-top
            curtain sweep. */}
        {phase !== "logo" ? (
          <div className="absolute inset-0 z-10 m-auto flex h-[35vh] w-fit items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="h-full w-auto object-contain"
            />

            {/* Curtain — origin at the bottom: shrinking (scale-y 1→0)
                uncovers top-to-bottom on the way in; growing back (0→1)
                covers bottom-to-top on the way out. */}
            <div
              className={`absolute inset-0 origin-bottom bg-ink transition-transform duration-700 ease-in-out ${
                photoRevealed ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
