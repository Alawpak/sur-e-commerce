interface SurLogoProps {
  className?: string;
}

// SUR isotype: a heavy geometric "S" with "UR" knocked out of the
// top-right bar. Uses currentColor, so set the color via text-* / className.
// Approximate recreation — swap for the official vector when available.
export function SurLogo({ className }: SurLogoProps) {
  return (
    <svg
      viewBox="0 0 100 116"
      className={className}
      role="img"
      aria-label="SUR"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="sur-knockout">
          {/* White = visible logo fill */}
          <rect width="100" height="116" fill="black" />
          <path
            d="M64 4
               C40 4 18 8 18 30
               C18 47 33 52 50 55
               C63 57 70 59 70 67
               C70 76 58 78 44 78
               C30 78 18 75 8 70
               L8 96
               C20 110 40 112 56 112
               C82 112 96 100 96 78
               C96 60 80 54 62 51
               C49 49 44 47 44 40
               C44 33 54 30 66 30
               L96 30
               L96 4
               Z"
            fill="white"
          />
          {/* Center counter (the hole of the S) */}
          <circle cx="50" cy="58" r="11" fill="black" />
          {/* "UR" knocked out of the top-right bar */}
          <text
            x="82"
            y="22"
            fill="black"
            fontSize="15"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="var(--font-display, sans-serif)"
            transform="rotate(-90 82 17)"
          >
            UR
          </text>
        </mask>
      </defs>

      <rect width="100" height="116" fill="currentColor" mask="url(#sur-knockout)" />
    </svg>
  );
}
