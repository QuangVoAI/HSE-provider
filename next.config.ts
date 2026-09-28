import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.90"],
  async headers() {
    const staticAssetHeaders = [
      { key: "Cache-Control", value: "public, max-age=604800, s-maxage=31536000, stale-while-revalidate=86400" },
    ];

    return [
      { source: "/assets/:path*", headers: staticAssetHeaders },
      { source: "/brand-icons/:path*", headers: staticAssetHeaders },
      { source: "/fonts/:path*", headers: staticAssetHeaders },
    ];
  },
  experimental: {
    // iCloud Drive may create conflicted copies inside Turbopack's database
    // (for example `CURRENT 2`), which makes the persistent cache unreadable.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
