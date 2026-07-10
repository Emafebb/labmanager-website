import type { MetadataRoute } from "next";

const BASE_URL = "https://labmanagergestionale.com";

// lastModified is a static per-page date. Update it by hand when the page's
// content changes, so Google receives a reliable freshness signal.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-06-15",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/ordini`,
      lastModified: "2026-06-15",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: "2026-06-04",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: "2026-06-15",
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
