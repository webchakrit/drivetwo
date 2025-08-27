export const dynamic = 'force-dynamic';

import Link from "next/link";
import TrimSelector from "./TrimSelector";
import ShareButton from "../../../../components/ShareButton";
import { client } from "../../../../../sanity/lib/client";

async function getModel(modelSlug: string) {
  const bySlug = await client.fetch(
    `*[_type=="carModel" && slug.current == $slug][0]{
      _id,
      modelName,
      slug,
      "brand": brand->{ name, "slug": slug.current },
      heroImages,
      defaultYouTubeUrl,
      specBase
    }`,
    { slug: modelSlug }
  );
  if (bySlug) return bySlug;

  const byName = await client.fetch(
    `*[_type=="carModel" && lower(modelName) == lower($slug)][0]{
      _id,
      modelName,
      slug,
      "brand": brand->{ name, "slug": slug.current },
      heroImages,
      defaultYouTubeUrl,
      specBase
    }`,
    { slug: modelSlug }
  );
  return byName ?? null;
}

async function getTrimsForModel(target: string) {
  const trims = await client.fetch(
    `*[_type=="carTrim" && (model->slug.current == $target || lower(model->modelName) == lower($target))]|order(_createdAt asc){
      _id, trimName, priceTHB,
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
    }`,
    { target }
  );
  return trims as any[];
}

export default async function Page(props: any) {
  const { params } = props as { params: { brand: string; model: string } };
  const { model } = params;

  const modelDoc = await getModel(model);

  if (!modelDoc) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-2 text-2xl font-bold">ยังไม่มีข้อมูลรุ่นนี้</h1>
        <p className="mb-4 text-gray-600">รุ่นที่คุณค้นหายังไม่ถูกเพิ่มเข้ามาในระบบ</p>
        <Link href="/reviews" className="text-[#df2531] underline">
          ← กลับไปหน้ารีวิว
        </Link>
      </div>
    );
  }

  const target = modelDoc?.slug?.current ?? modelDoc?.modelName ?? model;
  const trims = await getTrimsForModel(target);

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <nav className="text-sm text-gray-600">
          <Link href="/reviews" className="hover:underline">รีวิวรถ</Link> &gt; {modelDoc?.brand?.name ?? "-"} &gt; {modelDoc?.modelName ?? "-"}
        </nav>
        <ShareButton className="ml-3" />
      </div>

      <h1 className="text-2xl font-bold">{modelDoc?.modelName ?? "-"}</h1>

      {Array.isArray(trims) && trims.length > 0 ? (
        <TrimSelector model={modelDoc} trims={trims} />
      ) : (
        <div className="rounded-lg border bg-white p-6 text-gray-600">
          ยังไม่มีข้อมูลรุ่นย่อยสำหรับรุ่นนี้
        </div>
      )}
    </div>
  );
}