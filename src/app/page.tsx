import { ProductHero } from "@/components/product/ProductHero";
import { ProductHeroV2 } from "@/components/product/ProductHeroV2";
import { BrandFilm } from "@/components/sections/BrandFilm";
import { CollectionShowcase } from "@/components/sections/CollectionShowcase";
import { ExploreLinks } from "@/components/sections/ExploreLinks";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { getAllProducts } from "@/lib/products";
import { HOMEPAGE_HERO } from "@/config/homepage";

// Same gap between every section on the page (matches Footer's own mt-4,
// so the space before the footer lines up too). Change this one value to
// re-tune all of it at once.
const SECTION_GAP = "gap-4";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className={`flex flex-col ${SECTION_GAP}`}>
      {HOMEPAGE_HERO === "v2" ? <ProductHeroV2 /> : <ProductHero />}
      <ExploreLinks products={products} />
      <CollectionShowcase products={products} />
      <FeaturedProducts products={products} />
      <BrandFilm />
    </main>
  );
}
