import { defineRouting } from "next-intl/routing";

import { SITE_CONFIG } from "@/constants/site";

export const routing = defineRouting({
  locales: [...SITE_CONFIG.locales],
  defaultLocale: SITE_CONFIG.defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});
