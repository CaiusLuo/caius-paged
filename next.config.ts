import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Amap images (POI photos)
      {
        protocol: "https",
        hostname: "*.amap.com",
      },
      // Amap/Autonavi store images
      {
        protocol: "https",
        hostname: "*.autonavi.com",
      },
      {
        protocol: "http",
        hostname: "*.autonavi.com",
      },
      // Unsplash images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
