import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    // หรือจะใส่แบบ domains ก็ได้: domains: ["cdn.sanity.io"]
  },
};

export default nextConfig;
