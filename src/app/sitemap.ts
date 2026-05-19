import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants/site";

// eslint-disable-next-line import/no-default-export
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_CONFIG.baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SITE_CONFIG.locales.map((locale) => ({
      url: `${SITE_CONFIG.baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: locale === SITE_CONFIG.defaultLocale ? 1 : 0.9,
    })),
  ];
}
