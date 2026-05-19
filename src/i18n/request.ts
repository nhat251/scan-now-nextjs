import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { SITE_CONFIG } from "@/constants/site";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale && hasLocale(SITE_CONFIG.locales, requestedLocale) ? requestedLocale : SITE_CONFIG.defaultLocale;

  const messages = (await import(`./messages/${locale}/common.json`)).default;

  return {
    locale,
    messages,
  };
});
