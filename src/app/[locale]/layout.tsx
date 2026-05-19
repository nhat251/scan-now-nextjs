import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { ScrollToTopButton } from "@/components/atoms/scroll-to-top-button";
import { Footer } from "@/components/molecules/globals/footer";
import { GlobalLoading } from "@/components/molecules/globals/global-loading";
import { GlobalToast } from "@/components/molecules/globals/global-toast";
import { Header } from "@/components/molecules/globals/header";
import type { SupportedLocale } from "@/constants/site";
import { SITE_CONFIG } from "@/constants/site";
import { getLocaleMetadata } from "@/data/metadataSEO";
import { NextIntlProvider } from "@/providers/global/next-intl";
import { ReactQueryProvider } from "@/providers/global/query-client-provider";

const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return SITE_CONFIG.locales.includes(locale as SupportedLocale);
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => {
  return SITE_CONFIG.locales.map((locale) => ({ locale }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    return {};
  }
  return getLocaleMetadata(locale);
}

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
