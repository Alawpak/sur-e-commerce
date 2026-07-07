import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand palette — light background, electric indigo foreground.
        paper: "#f5f4f0", // light background (warm off-white)
        ink: "#1a0fd4", // primary foreground (text + giant type)
        muted: "#7a72d8", // dimmed labels / secondary meta text
        line: "#c5c0ec", // hairline grid / borders
        bone: "#f2f1eb", // neutral backdrop (hero v2)
      },
      fontFamily: {
        // Epoch — used for the oversized wordmark and display headings.
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        // Codec Cold — default body / UI text.
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Codec Warm — available for accents.
        warm: ["var(--font-warm)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.25em",
      },
      keyframes: {
        // Scrolls one full copy of the track left; the duplicate fills the gap
        // to create a seamless infinite marquee.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
