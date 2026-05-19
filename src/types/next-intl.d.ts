import type common from "@/i18n/messages/vi/common.json";

import "next-intl";

declare module "next-intl" {
  interface AppConfig {
    Locale: "vi" | "en";
    Messages: typeof common;
  }
}
