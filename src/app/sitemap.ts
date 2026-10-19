import type { MetadataRoute } from "next";
import { WORK_AREAS } from "@/data/work-areas";

const BASE_URL = "https://labmanagergestionale.com";

// lastModified is a static per-page date. Update it by hand when the page's
// content changes, so Google receives a reliable freshness signal.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-10-19",
      changeFrequency: "weekly",
      priority: 1,
    },
    ...WORK_AREAS.map((area) => ({
      url: `${BASE_URL}${area.href}`,
      lastModified: "2026-10-19",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${BASE_URL}/pricing`,
      lastModified: "2026-10-19",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
