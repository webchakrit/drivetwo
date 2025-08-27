import { client } from '../../../sanity/lib/client'
import ReviewsPageClient from './ReviewsPageClient'

async function getLatestTrims() {
  return await client.fetch(`
    *[_type=="carTrim"]|order(_createdAt desc)[0...12]{
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
  `)
}

// Server Component
export default async function ReviewsPage() {
  const latestTrims = await getLatestTrims()

  return <ReviewsPageClient initialTrims={latestTrims} />
}
