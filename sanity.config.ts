import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import product from "./sanity/schemas/product";
import category from "./sanity/schemas/category";

import { projectId, dataset, apiVersion } from "./src/lib/sanity/client";

// Embedded Studio config — served at /studio inside the Next.js app (see
// src/app/studio/[[...tool]]/page.tsx). Project ID/dataset come from the
// same env vars the read client uses, so there's one source of truth.
export default defineConfig({
  name: "sur-store",
  title: "SUR STORE",

  projectId,
  dataset,
  apiVersion,

  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: [product, category],
  },
});
