import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.90"],
  experimental: {
    // iCloud Drive may create conflicted copies inside Turbopack's database
    // (for example `CURRENT 2`), which makes the persistent cache unreadable.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
