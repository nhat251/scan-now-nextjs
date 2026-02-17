import { getRequestConfig } from "next-intl/server";

import common from "@/i18n/messages/vi/common.json";

export const messages = {
  common,
};

export default getRequestConfig(() => {
  return {
    locale: "vi",
    messages,
  };
});
