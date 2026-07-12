import Link from "next/link";
import type { Product } from "@/types/product";
import { MEDIA } from "@/lib/cloudinary";

// Two-up navigation shortcut, full page on desktop — each column 50%
// width, 100% height. ("NUESTRA HISTORIA" — the old third column — was
// removed; this used to be a three-up layout, see git history if it needs
// to come back.)
//
// Layout note: uses flexbox, not grid — flex's default `align-items:
// stretch` gives each column a *definite* height to resolve percentage
// heights against. See CollectionShowcase for the same technique / the bug
// it was fixing.
//
// Dedicated brand imagery (Cloudinary — see src/lib/cloudinary.ts), not tied
// to the product catalog, so this doesn't break/go blank as the catalog
// grows or shrinks.

interface ExploreColumn {
  label: string;
  href: string;
  imageUrl?: string;
  imageAlt: string;
}

interface ExploreLinksProps {
  products: Product[];
}

function ExploreTile({
  column,
  heightClass,
}: {
  column: ExploreColumn;
  heightClass: string;
}) {
  return (
    <Link
      href={column.href}
      className="group flex w-full flex-col gap-3 lg:h-full"
    >
      <span className="font-display text-sm font-black uppercase tracking-tight text-ink md:text-base">
        {column.label}
      </span>

      <div
        className={`relative w-full overflow-hidden bg-white aspect-[4/5] ${heightClass}`}
      >
        {column.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={column.imageUrl}
            alt={column.imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <span className="font-display text-4xl font-black text-line">
              ?
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ExploreLinks({ products }: ExploreLinksProps) {
  const columns: ExploreColumn[] = [
    {
      label: "NUESTROS PRODUCTOS",
      href: "/shop",
      imageUrl: MEDIA.exploreShop || products[7]?.imageUrl,
      imageAlt: "Nuestros productos",
    },
    {
      label: "COMUNIDAD SURUNNING",
      href: "https://www.instagram.com/surcycle.mx",
      imageUrl: MEDIA.exploreCommunity || products[9]?.imageUrl,
      imageAlt: "Nuestra comunidad",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-8 px-6 sm:flex-row sm:gap-4 lg:h-[50svh]">
      {/* Each column: 50% width, full height. Uses flex-1 (not h-full) so it
          fills exactly the remaining space below the label instead of
          adding 100% on top of the label's own height and overflowing. */}
      <div className="w-full sm:w-1/3">
        <ExploreTile
          column={columns[0]}
          heightClass="lg:aspect-auto lg:flex-1"
        />
      </div>
      <div className="w-full sm:w-2/3">
        <ExploreTile
          column={columns[1]}
          heightClass="lg:aspect-auto lg:flex-1"
        />
      </div>
    </section>
  );
}
