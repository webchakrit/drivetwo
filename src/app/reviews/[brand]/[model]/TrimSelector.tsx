'use client'

import React, { useState, useMemo } from 'react'

type ModelDoc = {
  _id: string
  modelName?: string
  slug?: { current?: string }
  brand?: { name?: string; slug?: string }
  heroImages?: any[]
  defaultYouTubeUrl?: string
  specBase?: Record<string, any>
}

type TrimDoc = Record<string, any> & {
  _id: string
  trimName?: string
  priceTHB?: number
  promo?: string
  youtubeUrl?: string
  gallery?: any[]
  modelSlug?: string
  modelName?: string
  brand?: string
}

type TrimSelectorProps = {
  model: ModelDoc
  trims: TrimDoc[]
}

// Helper functions
function slugify(input?: string | null) {
  return (input ?? 'unknown').toLowerCase().trim().replace(/\s+/g, '-')
}

const fmtPrice = (n?: number) => (typeof n === 'number' ? n.toLocaleString('th-TH') + ' บาท' : '-')
const fmt = (v?: any, suffix = '') => (v ?? '-') + (v ? suffix : '')

function mergeSpec(base: Record<string, any> = {}, trim: Record<string, any> = {}) {
  return { ...base, ...trim }
}

// Share link function
function shareLink() {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href)
    alert('คัดลอกลิงก์แล้ว!')
  }
}

export default function TrimSelector({ model, trims }: TrimSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedTrim = trims?.[selectedIndex]
  const mergedSpec = useMemo(() => mergeSpec(model?.specBase, selectedTrim), [model?.specBase, selectedTrim])

  return (
    <div className="space-y-6">
      {/* Trim buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {trims?.map((t, i) => (
          <button key={t._id} onClick={() => setSelectedIndex(i)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${i === selectedIndex ? 'bg-[#df2531] text-white border-[#df2531]' : 'bg-white text-black border-gray-300'}`} aria-pressed={i === selectedIndex}>
            {t.trimName ?? 'รุ่นย่อย'}
            {typeof t.priceTHB === 'number' ? `• ${t.priceTHB.toLocaleString('th-TH')} บ.` : ''}
          </button>
        ))}
      </div>

      {/* Quick stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">ราคา</div>
          <div className="text-lg font-semibold">{fmtPrice(selectedTrim?.priceTHB)}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">0–100 กม./ชม.</div>
          <div className="text-lg font-semibold">{fmt(selectedTrim?.zeroTo100_s, ' วินาที')}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">ความเร็วสูงสุด</div>
          <div className="text-lg font-semibold">{fmt(selectedTrim?.topSpeed_kmh, ' กม./ชม.')}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">ระยะทาง</div>
          <div className="text-lg font-semibold">
            {fmt(selectedTrim?.range_km, ' กม.')}
            {selectedTrim?.range_standard ? ` (${selectedTrim.range_standard})` : ''}
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">ขับเคลื่อน</div>
          <div className="text-lg font-semibold">{selectedTrim?.drive ?? '-'}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-500">แรงม้า/แรงบิด</div>
          <div className="text-lg font-semibold">
            {selectedTrim?.power_hp ?? '-'} hp / {selectedTrim?.torque_Nm ?? '-'} Nm
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="rounded-lg border bg-white p-4">
        {selectedTrim?.youtubeUrl ? (
          <div className="aspect-video w-full">
            <iframe className="h-full w-full" src={selectedTrim.youtubeUrl.replace('watch?v=', 'embed/')} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        ) : selectedTrim?.gallery?.length ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {selectedTrim.gallery.slice(0, 6).map((img: any, idx: number) => (
              <div key={idx} className="aspect-video w-full rounded bg-gray-100" />
            ))}
          </div>
        ) : model?.heroImages?.length ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {model.heroImages.slice(0, 6).map((img: any, idx: number) => (
              <div key={idx} className="aspect-video w-full rounded bg-gray-100" />
            ))}
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center rounded bg-gray-100 text-gray-500">
            <svg className="mb-2 h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">ยังไม่มีสื่อสำหรับรุ่นนี้</span>
          </div>
        )}
      </div>

      {/* Spec table */}
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-3 text-base font-semibold">ตารางสเปก</div>
        <div className="space-y-4">
          {/* สมรรถนะ */}
          {[
            ['แรงม้า (hp)', selectedTrim?.power_hp],
            ['แรงบิด (Nm)', selectedTrim?.torque_Nm],
            ['0-100 กม./ชม.', selectedTrim?.zeroTo100_s ? `${selectedTrim.zeroTo100_s} วินาที` : null],
            ['ความเร็วสูงสุด', selectedTrim?.topSpeed_kmh ? `${selectedTrim.topSpeed_kmh} กม./ชม.` : null],
            ['ระยะทาง', selectedTrim?.range_km ? `${selectedTrim.range_km} กม. (${selectedTrim.range_standard || 'N/A'})` : null],
            ['แบตเตอรี่', selectedTrim?.battery_kWh ? `${selectedTrim.battery_kWh} kWh` : null],
            ['ชาร์จ AC', selectedTrim?.chargingAC_kW ? `${selectedTrim.chargingAC_kW} kW` : null],
            ['ชาร์จ DC', selectedTrim?.chargingDC_kW ? `${selectedTrim.chargingDC_kW} kW` : null],
          ].filter(([, v]) => v !== null && v !== undefined && v !== '') && (
            <div key="performance">
              <h4 className="mb-2 text-sm font-medium text-gray-700 border-b pb-1">สมรรถนะ</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ['แรงม้า (hp)', selectedTrim?.power_hp],
                  ['แรงบิด (Nm)', selectedTrim?.torque_Nm],
                  ['0-100 กม./ชม.', selectedTrim?.zeroTo100_s ? `${selectedTrim.zeroTo100_s} วินาที` : null],
                  ['ความเร็วสูงสุด', selectedTrim?.topSpeed_kmh ? `${selectedTrim.topSpeed_kmh} กม./ชม.` : null],
                  ['ระยะทาง', selectedTrim?.range_km ? `${selectedTrim.range_km} กม. (${selectedTrim.range_standard || 'N/A'})` : null],
                  ['แบตเตอรี่', selectedTrim?.battery_kWh ? `${selectedTrim.battery_kWh} kWh` : null],
                  ['ชาร์จ AC', selectedTrim?.chargingAC_kW ? `${selectedTrim.chargingAC_kW} kW` : null],
                  ['ชาร์จ DC', selectedTrim?.chargingDC_kW ? `${selectedTrim.chargingDC_kW} kW` : null],
                ].filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => (
                  <div key={String(k)} className="flex items-center justify-between rounded border p-2">
                    <div className="text-sm text-gray-600">{k as string}</div>
                    <div className="text-sm font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ช่วงล่าง/เบรก */}
          {[
            ['ช่วงล่างหน้า', selectedTrim?.suspension_front],
            ['ช่วงล่างหลัง', selectedTrim?.suspension_rear],
            ['เบรก', selectedTrim?.brakes],
            ['ล้อ (นิ้ว)', selectedTrim?.wheel_in],
            ['ยาง', selectedTrim?.tire],
          ].filter(([, v]) => v !== null && v !== undefined && v !== '') && (
            <div key="chassis">
              <h4 className="mb-2 text-sm font-medium text-gray-700 border-b pb-1">ช่วงล่าง/เบรก</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ['ช่วงล่างหน้า', selectedTrim?.suspension_front],
                  ['ช่วงล่างหลัง', selectedTrim?.suspension_rear],
                  ['เบรก', selectedTrim?.brakes],
                  ['ล้อ (นิ้ว)', selectedTrim?.wheel_in],
                  ['ยาง', selectedTrim?.tire],
                ].filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => (
                  <div key={String(k)} className="flex items-center justify-between rounded border p-2">
                    <div className="text-sm text-gray-600">{k as string}</div>
                    <div className="text-sm font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* เทคโนโลยี */}
          {[
            ['จออินโฟ (นิ้ว)', selectedTrim?.infotainment_in],
            ['CarPlay', selectedTrim?.carplay ? 'มี' : null],
            ['Android Auto', selectedTrim?.android_auto ? 'มี' : null],
            ['ชาร์จไร้สาย', selectedTrim?.wireless_charge ? 'มี' : null],
            ['HUD', selectedTrim?.hud ? 'มี' : null],
            ['Sunroof', selectedTrim?.sunroof],
            ['OTA', selectedTrim?.ota ? 'มี' : null],
          ].filter(([, v]) => v !== null && v !== undefined && v !== '') && (
            <div key="technology">
              <h4 className="mb-2 text-sm font-medium text-gray-700 border-b pb-1">เทคโนโลยี</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ['จออินโฟ (นิ้ว)', selectedTrim?.infotainment_in],
                  ['CarPlay', selectedTrim?.carplay ? 'มี' : null],
                  ['Android Auto', selectedTrim?.android_auto ? 'มี' : null],
                  ['ชาร์จไร้สาย', selectedTrim?.wireless_charge ? 'มี' : null],
                  ['HUD', selectedTrim?.hud ? 'มี' : null],
                  ['Sunroof', selectedTrim?.sunroof],
                  ['OTA', selectedTrim?.ota ? 'มี' : null],
                ].filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => (
                  <div key={String(k)} className="flex items-center justify-between rounded border p-2">
                    <div className="text-sm text-gray-600">{k as string}</div>
                    <div className="text-sm font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ความปลอดภัย */}
          {[
            ['ถุงลม (ใบ)', selectedTrim?.airbags],
            ['AEB', selectedTrim?.AEB ? 'มี' : null],
            ['ACC', selectedTrim?.ACC ? 'มี' : null],
            ['LKA', selectedTrim?.LKA ? 'มี' : null],
            ['BSM', selectedTrim?.BSM ? 'มี' : null],
            ['กล้อง 360°', selectedTrim?.camera360 ? 'มี' : null],
            ['ISOFIX', selectedTrim?.isofix ? 'มี' : null],
          ].filter(([, v]) => v !== null && v !== undefined && v !== '') && (
            <div key="safety">
              <h4 className="mb-2 text-sm font-medium text-gray-700 border-b pb-1">ความปลอดภัย</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ['ถุงลม (ใบ)', selectedTrim?.airbags],
                  ['AEB', selectedTrim?.AEB ? 'มี' : null],
                  ['ACC', selectedTrim?.ACC ? 'มี' : null],
                  ['LKA', selectedTrim?.LKA ? 'มี' : null],
                  ['BSM', selectedTrim?.BSM ? 'มี' : null],
                  ['กล้อง 360°', selectedTrim?.camera360 ? 'มี' : null],
                  ['ISOFIX', selectedTrim?.isofix ? 'มี' : null],
                ].filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => (
                  <div key={String(k)} className="flex items-center justify-between rounded border p-2">
                    <div className="text-sm text-gray-600">{k as string}</div>
                    <div className="text-sm font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* อื่นๆ */}
          {[
            ['ที่นั่ง (ที่)', selectedTrim?.seats],
            ['วัสดุเบาะ', selectedTrim?.upholstery],
            ['โซนแอร์', selectedTrim?.ac_zone],
            ['ประเภทพลังงาน', selectedTrim?.type],
            ['ระบบขับเคลื่อน', selectedTrim?.drive],
          ].filter(([, v]) => v !== null && v !== undefined && v !== '') && (
            <div key="other">
              <h4 className="mb-2 text-sm font-medium text-gray-700 border-b pb-1">อื่นๆ</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ['ที่นั่ง (ที่)', selectedTrim?.seats],
                  ['วัสดุเบาะ', selectedTrim?.upholstery],
                  ['โซนแอร์', selectedTrim?.ac_zone],
                  ['ประเภทพลังงาน', selectedTrim?.type],
                  ['ระบบขับเคลื่อน', selectedTrim?.drive],
                ].filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => (
                  <div key={String(k)} className="flex items-center justify-between rounded border p-2">
                    <div className="text-sm text-gray-600">{k as string}</div>
                    <div className="text-sm font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
