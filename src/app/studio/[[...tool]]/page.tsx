"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Serves the Sanity Studio at /studio — a full CMS UI for adding/editing
// products (name, description, price, images, sizes, category) without
// touching code. Requires NEXT_PUBLIC_SANITY_PROJECT_ID to be set in
// .env.local (see .env.local.example).
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
