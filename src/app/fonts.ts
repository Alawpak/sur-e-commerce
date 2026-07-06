import localFont from "next/font/local";

// Local font definitions. Paths are relative to this file (src/app/).
// Each family exposes a CSS variable consumed by Tailwind (see tailwind.config.ts).

// ─── Epoch — display / wordmark ──────────────────────────────
export const epoch = localFont({
  src: [{ path: "./fonts/epoch/Epoch.otf", weight: "400", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});

// ─── Codec Cold — body / UI text ─────────────────────────────
export const codecCold = localFont({
  src: [
    {
      path: "./fonts/codec/Codec-Cold-Thin-trial-BF65ba4d31a7479.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-Thin-Italic-trial-BF65ba4d320d1c0.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-Extralight-trial-BF65ba4d2fe9937.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-Extralight-Italic-trial-BF65ba4d2fdb1a4.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-Light-trial-BF65ba4d3061f6f.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-Light-Italic-trial-BF65ba4d3067ab5.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-Regular-trial-BF65ba4d30cf311.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-Regular-Italic-trial-BF65ba4d313e482.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-News-trial-BF65ba4d30ea9b6.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-News-Italic-trial-BF65ba4d32eddba.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-Bold-trial-BF65ba4d2f37e70.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-Bold-Italic-trial-BF65ba4d32b6aa7.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-ExtraBold-trial-BF65ba4d2fc711a.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-ExtraBold-Italic-trial-BF65ba4d2fbeccf.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Cold-Heavy-trial-BF65ba4d32e3296.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Cold-Heavy-Italic-trial-BF65ba4d32c1496.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

// ─── Codec Warm — third family, available for accents ────────
export const codecWarm = localFont({
  src: [
    {
      path: "./fonts/codec/Codec-Warm-Thin-trial-BF65ba4d32e4ffc.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-Thin-Italic-trial-BF65ba4d32c1801.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-ExtraLight-trial-BF65ba4d3126588.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-ExtraLight-Italic-trial-BF65ba4d30e9bee.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-Light-trial-BF65ba4d328922e.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-Light-Italic-trial-BF65ba4d326ee0a.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-Regular-trial-BF65ba4d32e3e75.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-Regular-Italic-trial-BF65ba4d32a1ee7.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-News-trial-BF65ba4d32a4db7.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-News-Italic-trial-BF65ba4d328246d.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-Bold-trial-BF65ba4d3196742.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-Bold-Italic-trial-BF65ba4d31bfb46.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-ExtraBold-trial-BF65ba4d31ebcb6.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-ExtraBold-Italic-trial-BF65ba4d3241b59.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/codec/Codec-Warm-Heavy-trial-BF65ba4d31285c2.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/codec/Codec-Warm-Heavy-Italic-trial-BF65ba4d30def54.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-warm",
  display: "swap",
});
