// src/app/reviews/[brand]/[model]/page.tsx
// Server Component — do NOT add 'use client'

import Link from "next/link";
import TrimSelector from "./[brand]/[model]/TrimSelector";
import ShareButton from "@/components/ShareButton";

// From this depth, reach project-root/sanity/lib/client:
import { client } from "../../../sanity/lib/client";

// --- Data fetchers ---
async function getModel(modelSlug: string) {
  // Try by slug, then fall back by modelName (case-insensitive)
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
  // target can be model slug or modelName
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

// --- Page component (loosen typing to avoid bad PageProps constraint) ---
export default async function Page(props: any) {
  const { params } = props as { params: { brand: string; model: string } };
  const { model } = params;

  // Fetch model first
  const modelDoc = await getModel(model);

  // If not found, show friendly message
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

  // Use model slug if present, otherwise fallback to modelName for trims query
  const target = modelDoc?.slug?.current ?? modelDoc?.modelName ?? model;

  const trims = await getTrimsForModel(target);

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-6">
      {/* Breadcrumb + share */}
      <div className="flex items-center justify-between">
        <nav className="text-sm text-gray-600">
          <Link href="/reviews" className="hover:underline">
            รีวิวรถ
          </Link>{" "}
          &gt; {modelDoc?.brand?.name ?? "-"} &gt; {modelDoc?.modelName ?? "-"}
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
