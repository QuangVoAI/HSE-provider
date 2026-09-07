import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const routes = [
  ["/", 1],
  ["/csms", 0.95],
  ["/health-management", 0.85],
  ["/contact", 0.85],
  ["/customers", 0.75],
  ["/chemical-management", 0.7],
  ["/training-management", 0.85],
  ["/risk-management", 0.85],
  ["/safety-culture", 0.8],
  ["/legal-compliance", 0.8],
  ["/contractor-management", 0.8],
  ["/environmental-management", 0.8],
  ["/equipment-management", 0.8],
  ["/safety-observation", 0.8],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.flatMap(([path, priority]) =>
    (["vi", "en"] as const).map((locale) => ({
      url: `${siteUrl}${path}?lang=${locale}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
  );
}
