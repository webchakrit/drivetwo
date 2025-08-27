import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      // หรือจะใส่แบบ domains ก็ได้: domains: ["cdn.sanity.io"]
    ],
  },
  // สำคัญ: ให้ Next transpile แพ็กเกจเหล่านี้ (แก้เคส turbopack/esm)
  transpilePackages: [
    "sanity",
    "@sanity/client",
    "@sanity/vision",
    "next-sanity",
    "@portabletext/react",
  ],
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
