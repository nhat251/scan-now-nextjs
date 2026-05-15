import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ScrollToTopButton } from "@/components/atoms/scroll-to-top-button";
import { Footer } from "@/components/molecules/globals/footer";
import { GlobalLoading } from "@/components/molecules/globals/global-loading";
import { GlobalToast } from "@/components/molecules/globals/global-toast";
import { Header } from "@/components/molecules/globals/header";
import { SITE_CONFIG } from "@/constants/site";
import { APP_LAYOUT_METADATA } from "@/data/metadataSEO";
import { NextIntlProvider } from "@/providers/global/next-intl";
import { ReactQueryProvider } from "@/providers/global/query-client-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = APP_LAYOUT_METADATA;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.defaultLocale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
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
        {process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
