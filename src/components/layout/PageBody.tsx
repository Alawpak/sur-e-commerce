"use client";

import { usePathname } from "next/navigation";
import { HOMEPAGE_HERO } from "@/config/homepage";

// Most pages need top padding to clear the fixed header. The v2 hero is
// full-bleed and designed to sit right under it (transparent at the very
// top of the page), so it opts out of that padding on "/".
export function PageBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeroV2Home = pathname === "/" && HOMEPAGE_HERO === "v2";

  return <div className={isHeroV2Home ? "" : "pt-16"}>{children}</div>;
}
