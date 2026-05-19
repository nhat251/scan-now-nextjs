import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SITE_CONFIG } from "@/constants/site";

const isSupportedLocale = (locale: string): locale is (typeof SITE_CONFIG.locales)[number] => {
  return SITE_CONFIG.locales.includes(locale as (typeof SITE_CONFIG.locales)[number]);
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => {
  return SITE_CONFIG.locales.map((locale) => ({ locale }));
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return children;
}
