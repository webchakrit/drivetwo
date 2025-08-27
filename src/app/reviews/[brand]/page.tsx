import { client } from '../../../../sanity/lib/client'
import { urlForImage } from '../../../../sanity/lib/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getBrand(brandSlug: string) {
  const brand = await client.fetch(`
    *[_type == "brand" && name match $brandSlug + "*"][0] {
      _id,
      name,
      country,
      logo
    }
  `, { brandSlug })
  
  if (!brand) return null
  
  const models = await client.fetch(`
    *[_type == "carModel" && references($brandId)] {
      _id,
      modelName,
      segment,
      origin,
      heroImages,
      defaultYouTubeUrl,
      "trimCount": count(*[_type == "carTrim" && references(^._id)]),
      slug
    }
  `, { brandId: brand._id })
  
  return { brand, models }
}

export default async function BrandModelsPage({ 
  params 
}: { 
  params: { brand: string } 
}) {
  const data = await getBrand(params.brand)
  
  if (!data) {
    notFound()
  }
  
  const { brand, models } = data

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Link href="/reviews" className="inline-flex items-center text-red-600 hover:text-red-800 mb-4">
            ← กลับไปหน้าแบรนด์
          </Link>
          
          {brand.logo && (
            <div className="w-32 h-32 mx-auto mb-6">
              <img
                src={urlForImage(brand.logo)?.url() || '/placeholder-logo.png'}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-black mb-4">{brand.name}</h1>
          <p className="text-lg text-gray-600">{brand.country}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model: any) => (
            <Link 
              key={model._id} 
              href={`/reviews/${params.brand}/${model.slug.current}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-gray-200">
                {model.heroImages && model.heroImages[0] && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={urlForImage(model.heroImages[0])?.url() || '/placeholder-car.png'}
                      alt={model.modelName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">{model.modelName}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">{model.segment}</span>
                    <span className="text-sm text-gray-600">{model.origin}</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {model.trimCount} รุ่นย่อย
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
