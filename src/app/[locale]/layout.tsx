import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { ScrollToTopButton } from "@/components/atoms/scroll-to-top-button";
import { Footer } from "@/components/molecules/globals/footer";
import { GlobalLoading } from "@/components/molecules/globals/global-loading";
import { GlobalToast } from "@/components/molecules/globals/global-toast";
import { Header } from "@/components/molecules/globals/header";
import { SITE_CONFIG } from "@/constants/site";
import { NextIntlProvider } from "@/providers/global/next-intl";
import { ReactQueryProvider } from "@/providers/global/query-client-provider";

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

  return (
    <NextIntlProvider>
      <ReactQueryProvider>
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
      </ReactQueryProvider>
      <GlobalToast />
      <GlobalLoading />
    </NextIntlProvider>
  );
}
