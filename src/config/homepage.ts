// Switch which homepage hero renders. Both versions stay in the codebase —
// flip this one value to A/B test or roll back instantly, no deletions needed.
//
//   "v1" — the original oversized-wordmark hero (ProductHero)
//   "v2" — full-bleed photo hero with overlay nav (ProductHeroV2)
export type HomepageHeroVariant = "v1" | "v2";

export const HOMEPAGE_HERO: HomepageHeroVariant = "v2";
