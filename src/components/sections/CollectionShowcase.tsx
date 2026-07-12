import Link from "next/link";
import type { Product } from "@/types/product";

// First-collection callout: a big editorial shot (left) with the collection
// name/description, paired with 2 real products (right), full-screen on
// desktop. Uses whatever product photos already exist in the catalog — swap
// the slice below once there are dedicated collection photos.
//
// Layout note: this uses flexbox (not CSS grid) for the height split.
// Flex's `align-items: stretch` reliably gives nested children a *definite*
// height to fill; a grid with only `h-full`/`aspect-auto` on auto-sized
// tracks doesn't reliably do that across levels, which is what was
// collapsing the right-side tiles to their content height (~50%) with
// leftover blank space instead of stretching full height.

const COLLECTION_NAME = "XOXO SUR";
const COLLECTION_TAG = "26 COLLECTION";
const COLLECTION_DESCRIPTION = "Diseños originales con la esencia de SUR.";

function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toFixed(2)}`;
}

interface CollectionShowcaseProps {
  products: Product[];
}

export function CollectionShowcase({ products }: CollectionShowcaseProps) {
  const [hero, ...rest] = products;
  // .filter(Boolean) guards against a catalog smaller than expected (fixed
  // indices here would silently produce `undefined` entries and crash the
  // .map below instead of just showing fewer tiles).
  const gridProducts = rest.slice(0, 2).filter(Boolean);

  if (!hero || gridProducts.length === 0) return null;

  return (
    <section className="flex w-full flex-col gap-3 sm:gap-4 lg:h-[100svh] lg:flex-row">
      {/* Left: collection hero shot + copy */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white lg:aspect-auto lg:h-full lg:w-1/2">
        {hero.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.imageUrl}
            alt={COLLECTION_NAME}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-paper md:p-10">
          <span className="font-display text-4xl font-black leading-none tracking-tight md:text-6xl">
            {COLLECTION_NAME}
          </span>
          <span className="text-[11px] tracking-ultra text-paper/80">
            {COLLECTION_TAG}
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-paper/80">
            {COLLECTION_DESCRIPTION}
          </p>
          <Link
            href="/shop"
            className="mt-2 w-fit text-[11px] tracking-ultra text-paper underline underline-offset-4 hover:opacity-70"
          >
            VER TODA LA COLECCIÓN
          </Link>
        </div>
      </div>

      {/* Right: 2 real products, side by side, each only half the height of
          the left hero (top-aligned, leaving bone/paper space below —
          matches the reference, where these tiles don't reach full height). */}
      <div className="flex items-start gap-3 sm:gap-4 lg:h-full lg:w-1/2">
        {gridProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative aspect-square w-full overflow-hidden bg-white lg:aspect-auto lg:h-1/2"
          >
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <span className="font-display text-4xl font-black text-line">
                  {product.refNumber}
                </span>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-paper/90 px-3 py-2 text-[11px] tracking-ultra text-ink">
              <span className="truncate">{product.name}</span>
              <span className="shrink-0">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
