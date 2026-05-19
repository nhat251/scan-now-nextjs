import type { Metadata } from "next";

import type { SupportedLocale } from "@/constants/site";
import { SITE_CONFIG } from "@/constants/site";

// ============================================================================
// LOCALE-SPECIFIC METADATA — Scan Now F&B ordering platform
// ============================================================================

const LOCALE_METADATA: Record<SupportedLocale, {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  twitterTitle: string;
  twitterDescription: string;
  ogImageAlt: string;
  canonicalUrl: string;
}> = {
  vi: {
    title: "Scan Now — Phần mềm gọi món QR thông minh cho nhà hàng",
    description:
      "Scan Now giúp hơn 300.000 nhà hàng F&B tăng tốc phục vụ, giảm thất thoát và tạo trải nghiệm gọi món hiện đại. Khách quét QR tại bàn, gọi món và thanh toán trực tiếp — setup chỉ 15 phút.",
    ogTitle: "Scan Now — Giải pháp gọi món thông minh cho nhà hàng hiện đại",
    ogDescription:
      "Tăng tốc phục vụ, giảm thất thoát và nâng cao trải nghiệm khách hàng với phần mềm gọi món QR Scan Now. Dùng thử miễn phí 14 ngày.",
    ogLocale: "vi_VN",
    twitterTitle: "Scan Now — Phần mềm gọi món QR cho nhà hàng F&B",
    twitterDescription:
      "Hơn 300.000 nhà hàng tin dùng. Quét QR, gọi món, thanh toán — setup 15 phút. Dùng thử miễn phí 14 ngày.",
    ogImageAlt: "Scan Now — Phần mềm gọi món QR thông minh cho nhà hàng",
    canonicalUrl: `${SITE_CONFIG.baseUrl}/vi`,
  },
  en: {
    title: "Scan Now — Smart QR Ordering Software for Restaurants",
    description:
      "Scan Now helps 300,000+ F&B businesses speed up service, reduce losses, and deliver a modern ordering experience. Guests scan QR at table, order and pay directly — setup in 15 minutes.",
    ogTitle: "Scan Now — Smart Restaurant Ordering Management Software",
    ogDescription:
      "Speed up service, cut losses, and enhance customer experience with Scan Now QR ordering software. Start your 14-day free trial today.",
    ogLocale: "en_US",
    twitterTitle: "Scan Now — Smart QR Ordering Software for F&B",
    twitterDescription:
      "Trusted by 300,000+ restaurants. Scan QR, order, pay — setup in 15 min. Free 14-day trial.",
    ogImageAlt: "Scan Now — Smart QR Ordering Software for Restaurants",
    canonicalUrl: `${SITE_CONFIG.baseUrl}/en`,
  },
};

const OTHER_LOCALES: Record<SupportedLocale, SupportedLocale[]> = {
  vi: ["en"],
  en: ["vi"],
};

const OG_LOCALE_URL: Record<SupportedLocale, string> = {
  vi: `${SITE_CONFIG.baseUrl}/vi`,
  en: `${SITE_CONFIG.baseUrl}/en`,
};

// ============================================================================
// SHARED METADATA (common across all locales)
// ============================================================================

const SHARED_METADATA: Partial<Metadata> = {
  applicationName: "Scan Now",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
  keywords: [
    "Scan Now",
    "QR ordering software",
    "restaurant ordering system",
    "F&B management software",
    "QR menu",
    "digital menu",
    "table ordering",
    "restaurant POS",
    "online ordering",
    "restaurant management",
    "contactless ordering",
    "food and beverage software",
    "phần mềm gọi món",
    "quét mã QR nhà hàng",
    "quản lý nhà hàng",
    "thực đơn số",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4kSLgxKYQK5ZZt3GmGs-sfQAlRNqRXBNTM3KPm56-Kc",
  },
  openGraph: {
    url: SITE_CONFIG.baseUrl,
    siteName: "Scan Now",
    images: [
      {
        url: "/images/avatar.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/avatar.png"],
  },
  appleWebApp: {
    title: "Scan Now",
    statusBarStyle: "default",
    capable: true,
  },
};

// ============================================================================
// PUBLIC API
// ============================================================================

/** Legacy export for backward compatibility */
export const APP_LAYOUT_METADATA: Metadata = {
  ...SHARED_METADATA,
  title: {
    default: LOCALE_METADATA.en.title,
    template: "%s | Scan Now",
  },
  description: LOCALE_METADATA.en.description,
  alternates: {
    canonical: SITE_CONFIG.baseUrl,
  },
  openGraph: {
    ...SHARED_METADATA.openGraph,
    title: LOCALE_METADATA.en.ogTitle,
    description: LOCALE_METADATA.en.ogDescription,
    locale: "en_US",
  },
  twitter: {
    ...SHARED_METADATA.twitter,
    title: LOCALE_METADATA.en.twitterTitle,
    description: LOCALE_METADATA.en.twitterDescription,
  },
};

/**
 * Generate locale-specific metadata for generateMetadata() in layouts.
 * Merges shared metadata with locale-specific overrides.
 */
export function getLocaleMetadata(locale: SupportedLocale): Metadata {
  const meta = LOCALE_METADATA[locale];
  const otherLocales = OTHER_LOCALES[locale];

  const languages: Record<string, string> = {};
  for (const other of otherLocales) {
    languages[other] = OG_LOCALE_URL[other];
  }

  return {
    applicationName: SHARED_METADATA.applicationName,
    generator: SHARED_METADATA.generator,
    referrer: SHARED_METADATA.referrer,
    metadataBase: SHARED_METADATA.metadataBase,
    title: meta.title,
    description: meta.description,
    keywords: SHARED_METADATA.keywords,
    icons: SHARED_METADATA.icons,
    formatDetection: SHARED_METADATA.formatDetection,
    robots: SHARED_METADATA.robots,
    alternates: {
      canonical: meta.canonicalUrl,
      languages,
    },
    verification: SHARED_METADATA.verification,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: meta.canonicalUrl,
      siteName: "Scan Now",
      images: [
        {
          url: "/images/avatar.png",
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
      locale: meta.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: ["/images/avatar.png"],
    },
    appleWebApp: SHARED_METADATA.appleWebApp,
  };
}
