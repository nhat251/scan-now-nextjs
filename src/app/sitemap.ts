import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants/site";

// eslint-disable-next-line import/no-default-export
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
