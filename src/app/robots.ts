import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants/site";

// eslint-disable-next-line import/no-default-export
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
  };
}
