'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '../../lib/sanityImage'
import FilterPanel from './FilterPanel'

type ReviewsPageClientProps = {
  initialTrims: any[]
}

// Helper function สำหรับทำ slug ให้ปลอดภัย
function slugify(input?: string | null): string {
  return (input ?? 'unknown').toLowerCase().trim().replace(/\s+/g, '-')
}

export default function ReviewsPageClient({ initialTrims }: ReviewsPageClientProps) {
  const [filteredTrims, setFilteredTrims] = useState(initialTrims)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">รีวิวรถยนต์</h1>
          <p className="text-lg text-gray-600">รุ่นย่อยล่าสุดที่เพิ่มเข้ามา</p>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          trims={initialTrims} 
          onFiltersChange={setFilteredTrims} 
        />
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            แสดงผล {filteredTrims.length} รุ่นจากทั้งหมด {initialTrims.length} รุ่น
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrims.map((trim: any) => {
            // สร้าง slug ที่ปลอดภัย
            const brandSlug = slugify(trim?.model?.brand?.name)
            const modelSlug = trim?.model?.slug?.current
              ? slugify(trim.model.slug.current)
              : slugify(trim?.model?.modelName)

            return (
              <Link 
                key={trim._id} 
                href={`/reviews/${brandSlug}/${modelSlug}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-gray-200">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    {trim?.gallery && trim.gallery[0] ? (
                      <Image
                        src={urlForImage(trim.gallery[0])?.url() || '/placeholder-car.png'}
                        alt={trim?.trimName || 'รุ่นย่อย'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : trim?.model?.heroImages && trim.model.heroImages[0] ? (
                      <Image
                        src={urlForImage(trim.model.heroImages[0])?.url() || '/placeholder-car.png'}
                        alt={trim?.trimName || 'รุ่นย่อย'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">ไม่มีรูปภาพ</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {trim?.model?.brand?.logo && (
                        <Image
                          src={urlForImage(trim.model.brand.logo)?.url() || '/placeholder-logo.png'}
                          alt={trim?.model?.brand?.name || 'แบรนด์'}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      )}
                      <span className="text-sm text-gray-600">{trim?.model?.brand?.name || 'ไม่ระบุแบรนด์'}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-black mb-2">{trim?.model?.modelName || 'ไม่ระบุรุ่น'}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-lg font-medium text-red-600">{trim?.trimName || 'ไม่ระบุชื่อ'}</p>
                      {trim?.promo && (
                        <span className="ml-2 rounded bg-[#df2531] px-2 py-1 text-xs text-white font-medium">
                          โปรโมชัน
                        </span>
                      )}
                    </div>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trim?.type && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {trim.type}
                        </span>
                      )}
                      {trim?.drive && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {trim.drive}
                        </span>
                      )}
                      {trim?.range_km && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {trim.range_km} km
                        </span>
                      )}
                      {trim?.range_standard && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                          {trim.range_standard}
                        </span>
                      )}
                    </div>
                    
                    {/* Price */}
                    {trim?.priceTHB && (
                      <div className="text-center py-3 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-black">
                          ฿{trim.priceTHB.toLocaleString('th-TH')}
                        </div>
                        <div className="text-sm text-gray-600">ราคาเริ่มต้น</div>
                      </div>
                    )}
                    
                    {/* Year */}
                    {trim?.year && (
                      <div className="text-center mt-3">
                        <span className="text-sm text-gray-600">ปี {trim.year}</span>
                        {trim?.MY && <span className="text-sm text-gray-600 ml-2">({trim.MY})</span>}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* No Results Message */}
        {filteredTrims.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              ไม่พบรุ่นย่อยที่ตรงกับตัวกรองที่เลือก
            </div>
            <p className="text-gray-400">
              ลองปรับเปลี่ยนตัวกรองหรือล้างตัวกรองเพื่อดูผลลัพธ์ทั้งหมด
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
