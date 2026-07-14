import type { MetadataRoute } from "next";

const BASE_URL = "https://labmanagergestionale.com";

// lastModified is a static per-page date. Update it by hand when the page's
// content changes, so Google receives a reliable freshness signal.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-07-14",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/ordini`,
      lastModified: "2026-07-14",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: "2026-07-13",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
