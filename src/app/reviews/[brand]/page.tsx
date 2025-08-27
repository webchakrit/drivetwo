export const dynamic = 'force-dynamic';

import Link from "next/link";
import { client } from "../../../../sanity/lib/client";

async function getBrandModels(brandParam: string) {
  const data = await client.fetch(
    `*[_type=="carModel" && (
        brand->slug.current == $brand
        || lower(brand->name) == lower($brand)
      )]|order(modelName asc){
        _id,
        modelName,
        "brandName": brand->name,
        "brandSlug": brand->slug.current,
        slug,
        heroImages
      }`,
    { brand: brandParam }
  );
  return data as any[];
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  const { brand } = params;
  const models = await getBrandModels(brand);

  if (!models || models.length === 0) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="mb-2 text-2xl font-bold">ยังไม่มีโมเดลภายใต้แบรนด์นี้</h1>
        <p className="mb-4 text-gray-600">เรายังไม่พบข้อมูลรุ่นสำหรับแบรนด์: {brand}</p>
        <Link href="/reviews" className="text-[#df2531] underline">← กลับไปหน้ารีวิว</Link>
      </div>
    );
  }

  const brandName = models[0]?.brandName ?? brand;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <nav className="text-sm text-gray-600">
        <Link href="/reviews" className="hover:underline">รีวิวรถ</Link> &gt; {brandName}
      </nav>

      <h1 className="text-2xl font-bold">รุ่นภายใต้ {brandName}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {models.map((m) => (
          <Link
            key={m._id}
            href={`/reviews/${(m.brandSlug ?? brand).toLowerCase()}/${(m.slug?.current ?? m.modelName).toLowerCase().replace(/\s+/g, '-')}`}
            className="block rounded-lg border bg-white p-4 hover:shadow"
          >
            <div className="mb-2 text-lg font-semibold">{m.modelName}</div>
            <div className="text-sm text-gray-500">คลิกเพื่อดูสเปกรุ่นย่อย</div>
          </Link>
        ))}
      </div>
    </div>
  );
}