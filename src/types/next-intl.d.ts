import type { messages } from "@/i18n";

import "next-intl";

declare module "next-intl" {
  interface AppConfig {
    Locale: "vi";
    Messages: typeof messages;
  }
}
