import type { Metadata } from "next";

// Its own root layout (separate from src/app/(site)/layout.tsx) so the
// Studio does NOT inherit Tailwind's global reset — Sanity Studio ships its
// own styles and the two clash if both load on the same page.
export const metadata: Metadata = {
  title: "Studio — SUR STORE",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
