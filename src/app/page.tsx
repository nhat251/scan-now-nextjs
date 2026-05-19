import { redirect } from "next/navigation";

import { SITE_CONFIG } from "@/constants/site";

const RootPage = () => {
  redirect(`/${SITE_CONFIG.defaultLocale}`);
};

export default RootPage;
