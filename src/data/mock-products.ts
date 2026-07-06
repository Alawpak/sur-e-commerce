import type { Category, Product } from "@/types/product";

// Mock data used until Sanity is connected. Shape matches the Sanity query
// result, so swapping the data source later requires no component changes.

export const categories: Category[] = [
  { id: "cat-train", title: "Train", slug: "train" },
  { id: "cat-run", title: "Run", slug: "run" },
  { id: "cat-rest", title: "Rest", slug: "rest" },
];

const baseSpecs = {
  figure: "FIG. A",
  material: "SWEAT-WICKING KNIT",
  detail: "— 4-WAY STRETCH",
  construction: "STUDIO / MK-II",
  coordinates: "LAT. 41.3851° N",
};

const rawProducts: Product[] = [
  {
    id: "prod-001",
    refNumber: "001",
    name: "Aero Compress Tee",
    slug: "aero-compress-tee",
    sku: "SUR-TEE_AERO_M",
    imageUrl: "/products/FEA40D1B-F167-4610-A9A8-4C7224ABDE18.jpeg",
    description: "Seamless training tee. Soft, breathable, made to move.",
    price: 145,
    currency: "EUR",
    sizes: ["XS", "S", "M", "L", "XL"],
    category: categories[0],
    specs: baseSpecs,
  },
  {
    id: "prod-002",
    refNumber: "002",
    name: "Cadence Crew",
    slug: "cadence-crew",
    sku: "SUR-CRW_CADENCE_M",
    imageUrl: "/products/IMG_0146.jpeg",
    description: "Heavyweight cotton crew for the walk home after the run.",
    price: 180,
    currency: "EUR",
    sizes: ["S", "M", "L", "XL"],
    category: categories[2],
    specs: baseSpecs,
  },
  {
    id: "prod-003",
    refNumber: "003",
    name: "Indoor Short 5\"",
    slug: "indoor-short-5",
    sku: "SUR-SHR_INDOOR_M",
    imageUrl: "/products/IMG_0148.jpeg",
    description: "Lightweight lined short, built for high-output indoor work.",
    price: 110,
    currency: "EUR",
    sizes: ["XS", "S", "M", "L"],
    category: categories[0],
    specs: baseSpecs,
  },
  {
    id: "prod-004",
    refNumber: "004",
    name: "Easy Run Pant",
    slug: "easy-run-pant",
    sku: "SUR-PNT_EASY_M",
    imageUrl: "/products/IMG_0154.jpeg",
    description: "Tapered jogger that reads street, performs like training kit.",
    price: 195,
    currency: "EUR",
    sizes: ["S", "M", "L", "XL"],
    category: categories[1],
    specs: baseSpecs,
  },
  {
    id: "prod-005",
    refNumber: "005",
    name: "Cooldown Hoodie",
    slug: "cooldown-hoodie",
    sku: "SUR-HOD_COOLDOWN_M",
    imageUrl: "/products/IMG_0159.jpeg",
    description: "Brushed-back fleece hoodie for the slow part of the day.",
    price: 220,
    currency: "EUR",
    sizes: ["S", "M", "L", "XL"],
    category: categories[2],
    specs: baseSpecs,
  },
  {
    id: "prod-006",
    refNumber: "006",
    name: "Field Cap",
    slug: "field-cap",
    sku: "SUR-CAP_FIELD_OS",
    imageUrl: "/products/IMG_5371.jpeg",
    description: "Unstructured corduroy cap. One size, every session.",
    price: 75,
    currency: "EUR",
    sizes: ["S", "M", "L"],
    category: categories[1],
    specs: baseSpecs,
  },
];

// Pool of available photos (in public/products) to simulate galleries.
const photoPool = [
  "/products/FEA40D1B-F167-4610-A9A8-4C7224ABDE18.jpeg",
  "/products/IMG_0146.jpeg",
  "/products/IMG_0148.jpeg",
  "/products/IMG_0154.jpeg",
  "/products/IMG_0159.jpeg",
  "/products/IMG_5371.jpeg",
];

const colors = ["Cobalt", "Ecru", "Charcoal", "Stone", "Indigo", "Slate"];
const materials = [
  "100% cotton",
  "Cotton blend",
  "Recycled polyester",
  "Brushed fleece",
  "4-way stretch knit",
  "Corduroy",
];

// Enrich each product with a gallery, colorway, material and an occasional
// sale price — so the product page has content to render.
export const products: Product[] = rawProducts.map((product, i) => {
  const start = photoPool.indexOf(product.imageUrl ?? "");
  const base = start >= 0 ? start : i;
  const images = [0, 1, 2].map(
    (offset) => photoPool[(base + offset) % photoPool.length]
  );
  return {
    ...product,
    images,
    color: colors[i % colors.length],
    material: materials[i % materials.length],
    // Every other product is "on sale" for the strike-through demo.
    compareAtPrice: i % 2 === 0 ? Math.round(product.price * 1.35) : undefined,
  };
});

export function getFeaturedProduct(): Product {
  return products[0];
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
