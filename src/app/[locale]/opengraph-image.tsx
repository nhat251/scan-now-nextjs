/* eslint-disable import/no-default-export, no-console */
"use no memo";
import { ImageResponse } from "next/og";

import { OGImageTemplate } from "@/components/og-image-template";
import { SITE_CONFIG, type SupportedLocale } from "@/constants/site";
import { getLocaleMetadata } from "@/data/metadataSEO";
import { loadReferralFonts } from "@/lib/og-fonts";
import { loadImageAsPngDataUrl } from "@/lib/og-image-utils";

export const alt = "Scan Now — Smart QR Ordering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Node.js runtime is required to use sharp and read files
export const runtime = "nodejs";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Validate locale
  const targetLocale: SupportedLocale = SITE_CONFIG.locales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : SITE_CONFIG.defaultLocale;

  // 1. Load the logo image file and convert to PNG Base64 Data URL using sharp helper
  let logoBase64 = "";
  try {
    logoBase64 = await loadImageAsPngDataUrl("/icons/logo-transparent.webp");
  } catch (error) {
    console.error("Failed to read logo file:", error);
  }

  // 2. Fetch SEO metadata for the locale
  const metadata = getLocaleMetadata(targetLocale);

  // Extract clean title and description
  let titleText = typeof metadata.title === "string" ? metadata.title : "Scan Now";
  if (titleText.includes("—")) {
    const parts = titleText.split("—");
    titleText = parts[1].trim();
  } else if (titleText.includes("|")) {
    const parts = titleText.split("|");
    titleText = parts[0].trim();
  }

  const descriptionText = metadata.description || "";

  // 3. Load font files using cloned og-fonts helper
  const fonts = loadReferralFonts();

  return new ImageResponse(
    OGImageTemplate({
      title: titleText,
      description: descriptionText,
      logoBase64: logoBase64,
    }),
    {
      ...size,
      fonts: fonts.map((f) => ({
        name: f.name,
        data: f.data,
        weight: f.weight,
        style: f.style,
      })),
    }
  );
}
