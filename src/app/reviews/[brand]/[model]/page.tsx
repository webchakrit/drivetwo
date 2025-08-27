import { client } from '../../../../../sanity/lib/client'
import TrimSelector from './TrimSelector'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

async function getModelData(modelSlug: string) {
  const model = await client.fetch(`
    *[_type=="carModel" && slug.current == $modelSlug][0]{
      _id, modelName, slug, "brand": brand->{ name, "slug": slug.current }, heroImages, defaultYouTubeUrl, specBase
    }
  `, { modelSlug })

  const trims = await client.fetch(`
    *[_type=="carTrim" && model->slug.current == $modelSlug]|order(_createdAt asc){
      _id, trimName, priceTHB, promo,
      type, drive, power_hp, torque_Nm, battery_kWh, chargingAC_kW, chargingDC_kW,
      zeroTo100_s, topSpeed_kmh, range_km, range_standard, consumption,
      suspension_front, suspension_rear, brakes, wheel_in, tire,
      airbags, AEB, ACC, LKA, BSM, camera360, isofix,
      seats, upholstery, ac_zone, infotainment_in, carplay, android_auto, wireless_charge, hud, sunroof, ota,
      gallery, youtubeUrl,
      year, MY,
      "brand": model->brand->name,
      "modelName": model->modelName,
      "modelSlug": model->slug.current
    }
  `, { modelSlug })

  return { model, trims }
}

export default async function Page({ params }: { params: { brand: string; model: string } }) {
  const { model, trims } = await getModelData(params.model)

  if (!model) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลรุ่นนี้</h1>
          <p className="text-gray-600 mb-6">รุ่นที่คุณค้นหาอาจยังไม่มีในระบบ</p>
          <Link href="/reviews" className="inline-flex items-center px-4 py-2 bg-[#df2531] text-white rounded-lg hover:bg-red-700 transition-colors">
            กลับไปหน้ารีวิว
          </Link>
        </div>
      </div>
    )
  }

  if (!trims || trims.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ยังไม่มีข้อมูลรุ่นย่อย</h1>
          <p className="text-gray-600 mb-6">รุ่น {model.modelName} ยังไม่มีข้อมูลรุ่นย่อยในระบบ</p>
          <Link href="/reviews" className="inline-flex items-center px-4 py-2 bg-[#df2531] text-white rounded-lg hover:bg-red-700 transition-colors">
            กลับไปหน้ารีวิว
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/reviews" className="hover:text-[#df2531] transition-colors">
          รีวิวรถ
        </Link>
        <span className="mx-2"> &gt; </span>
        <span className="text-gray-900">{model?.brand?.name || 'ไม่ระบุแบรนด์'}</span>
        <span className="mx-2"> &gt; </span>
        <span className="text-gray-900">{model?.modelName || 'ไม่ระบุรุ่น'}</span>
      </nav>

      {/* Header with Share Button */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">{model?.modelName || 'ไม่ระบุรุ่น'}</h1>
          <p className="text-lg text-gray-600">{model?.brand?.name || 'ไม่ระบุแบรนด์'}</p>
        </div>
        <ShareButton className="ml-3" />
      </div>

      {/* Trim Selector */}
      <TrimSelector model={model} trims={trims} />
    </div>
  )
}
