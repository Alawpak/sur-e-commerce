interface SurLogoProps {
  className?: string;
}

// SUR isotype: a bold square-cornered badge with the initial locked inside.
// Plain fill + text (no mask/knockout compositing), so it paints correctly
// on first frame regardless of font-load timing. Uses currentColor, so set
// the color via text-* / className.
export function SurLogo({ className }: SurLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="SUR"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontSize="50"
        fontWeight="800"
        fontFamily="var(--font-display, sans-serif)"
        fill="currentColor"
      >
        S
      </text>
    </svg>
  );
}
