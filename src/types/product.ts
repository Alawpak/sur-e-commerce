// Domain types shared across the app (mock data + Sanity both conform to these).

export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface Product {
  id: string;
  /** Catalog index shown as "[ 001 ]" in the UI. */
  refNumber: string;
  name: string;
  slug: string;
  /** Product code shown under the name, e.g. "SUR-TEE_AERO_M". */
  sku: string;
  /** Short tagline / engineering description. */
  description: string;
  price: number;
  /** Original price for sale display (struck through). Omit if not on sale. */
  compareAtPrice?: number;
  currency: string;
  sizes: Size[];
  category: Category;
  /** Primary image (card thumbnail). The hero/cards work without it. */
  imageUrl?: string;
  /** Gallery for the product page (left column). Falls back to [imageUrl]. */
  images?: string[];
  /** Colorway name, e.g. "Cobalt". */
  color?: string;
  /** Material, e.g. "100% cotton". */
  material?: string;
  /** Free-form spec lines rendered in the corner meta blocks. */
  specs: {
    figure: string; // e.g. "FIG. A"
    material: string; // e.g. "SWEAT-WICKING KNIT"
    detail: string; // e.g. "— 4-WAY STRETCH"
    construction: string; // e.g. "COMPRESSION / MK-II"
    coordinates: string; // e.g. "LAT. 41.3851° N"
  };
}
