// src/app/reviews/page.tsx
// Server Component — lists latest trims and passes to Client side for filtering

export const dynamic = 'force-dynamic'; // prevent build-time prerender errors

import { client } from "../../../sanity/lib/client";
import ReviewsPageClient from "./ReviewsPageClient";

async function getLatestTrims() {
  // latest 24 trims
  return await client.fetch(`
    *[_type=="carTrim"]|order(_createdAt desc)[0...24]{
      _id,
      trimName,
      priceTHB,
      type,
      drive,
      power_hp,
      range_km,
      range_standard,
      gallery,
      year,
      MY,
      "model": model->{
        _id,
        modelName,
        slug,
        heroImages,
        "brand": brand->{ name, logo }
      }
    }
  `);
}

export default async function ReviewsPage() {
  const latestTrims = await getLatestTrims();
  return <ReviewsPageClient initialTrims={latestTrims} />;
}