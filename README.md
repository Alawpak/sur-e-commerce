# SURCYCLE Store

E-commerce frontend built with Next.js (App Router), React, TypeScript, Tailwind CSS, Zustand and Sanity-ready data layer.

## Stack

- **Next.js 14 / React 18 / TypeScript** — pages, routing, server components
- **Tailwind CSS** — styling (design tokens in `tailwind.config.ts`)
- **Zustand** — cart state with `localStorage` persistence (`src/store/cart-store.ts`)
- **Sanity** — headless CMS (client + schemas ready; runs on mock data until configured)
- **Cloudinary** — supported as a remote image host (`next.config.mjs`)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app runs on **mock data** out of the box.

## Connecting Sanity (later)

1. Create a project at https://sanity.io/manage.
2. Copy `.env.local.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In your Sanity Studio, use the schemas in `sanity/schemas/` (`product.ts`, `category.ts`).
4. Mark a product as `featured` to show it on the homepage hero.

No component changes are needed — `src/lib/products.ts` switches from mock data to Sanity automatically once the env vars are present.

## Project structure

```
src/
  app/              # Next.js App Router (layout, homepage, globals.css)
  components/
    layout/         # Header (nav + BAG counter)
    product/        # ProductHero, SizeSelector, AddToCartButton
  store/            # Zustand cart store
  lib/              # data-access layer + Sanity client/queries
  data/             # mock product data
  types/            # shared domain types
  hooks/            # useHasMounted (hydration guard)
sanity/schemas/     # Sanity document schemas (copy into your Studio)
```
