"use client";

import { usePathname } from "next/navigation";
import { HOMEPAGE_HERO } from "@/config/homepage";

// Most pages need top padding to clear the fixed header. Full-bleed heroes
// (homepage v2, and the shop listing hero) sit right under it — transparent
// at the very top of the page — so they opt out of that padding.
const FULL_BLEED_PATHS = new Set(["/shop"]);

export function PageBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeroV2Home = pathname === "/" && HOMEPAGE_HERO === "v2";
  const isFullBleed = isHeroV2Home || FULL_BLEED_PATHS.has(pathname);

  return <div className={isFullBleed ? "" : "pt-16"}>{children}</div>;
}
