import type { Viewport } from "next";
import { Inter } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD151" },
    { media: "(prefers-color-scheme: dark)", color: "#FFD151" },
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
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        {process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
