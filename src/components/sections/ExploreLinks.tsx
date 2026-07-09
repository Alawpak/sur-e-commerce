import Link from "next/link";
import type { Product } from "@/types/product";

// Three-up navigation shortcut, full page on desktop:
//   left   — 50% width, 100% height
//   middle — 25% width, 40% height (top-aligned, blank space below)
//   right  — 25% width, 60% height (top-aligned, blank space below)
//
// Layout note: uses flexbox, not grid — flex's default `align-items:
// stretch` gives each column a *definite* height to resolve percentage
// heights against (h-full, h-[40%], h-[60%]). See CollectionShowcase for
// the same technique / the bug it was fixing.
//
// Uses whatever product photos are already in the catalog as placeholders —
// swap `imageUrl` per column once there's dedicated story/community imagery.

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
  // Indices 3-5 so these don't repeat the photos already used by
  // CollectionShowcase (which uses products[0..2]).
  const columns: ExploreColumn[] = [
    {
      label: "NUESTROS PRODUCTOS",
      href: "/shop",
      imageUrl: products[7]?.imageUrl,
      imageAlt: "Nuestros productos",
    },
    {
      label: "NUESTRA HISTORIA",
      href: "/about",
      imageUrl: products[8]?.imageUrl,
      imageAlt: "Nuestra historia",
    },
    {
      label: "NUESTRA COMUNIDAD",
      href: "https://www.instagram.com/surcycle.mx",
      imageUrl: products[9]?.imageUrl,
      imageAlt: "Nuestra comunidad",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-8 px-6 sm:flex-row sm:gap-4 lg:h-[100svh]">
      {/* Left: 50% width, full height. Uses flex-1 (not h-full) so it fills
          exactly the remaining space below the label instead of adding
          100% on top of the label's own height and overflowing. */}
      <div className="w-full sm:w-1/2">
        <ExploreTile
          column={columns[0]}
          heightClass="lg:aspect-auto lg:flex-1"
        />
      </div>

      {/* Right half: middle (40% height) + right (60% height) side by side */}
      <div className="flex w-full flex-col gap-8 sm:w-1/2 sm:flex-row sm:gap-4">
        <div className="w-full sm:w-1/2">
          <ExploreTile
            column={columns[1]}
            heightClass="lg:aspect-auto lg:h-[40%]"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <ExploreTile
            column={columns[2]}
            heightClass="lg:aspect-auto lg:h-[60%]"
          />
        </div>
      </div>
    </section>
  );
}
