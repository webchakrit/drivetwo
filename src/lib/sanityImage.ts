import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlForImage(source: any) {
  try { 
    return builder.image(source); 
  } catch { 
    return builder.image(null as any); 
  }
}
