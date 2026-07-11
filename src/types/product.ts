// Domain types shared across the app (mock data + Sanity both conform to these).

export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Category {
  id: string;
  title: string;
  slug: string;
}

/** One colorway of a product — its own swatch + its own photo set. Selecting
 * a swatch on the product page swaps the gallery to that color's images. */
export interface ProductColor {
  name: string;
  /** Hex code, e.g. "#E63946" — pasted in Sanity, used directly as a CSS color. */
  hex: string;
  images: string[];
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
  /** Other colorways of the same product, each with its own photos. Omit for single-color products. */
  colors?: ProductColor[];
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
