import type { Metadata } from "next";

import type { SupportedLocale } from "@/constants/site";
import { SITE_CONFIG } from "@/constants/site";

// ============================================================================
// LOCALE-SPECIFIC METADATA
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
    title: "Nguyen Sinh Nhat | Nhà phát triển Fullstack",
    description:
      "Portfolio của Nguyen Sinh Nhat - Nhà phát triển Fullstack với chuyên môn về React, Next.js, Node.js, TypeScript và các công nghệ web hiện đại. Khám phá các dự án, kinh nghiệm và kỹ năng.",
    ogTitle: "Nguyen Sinh Nhat | Nhà phát triển Fullstack",
    ogDescription:
      "Portfolio của Nguyen Sinh Nhat - Chuyên gia phát triển web với React, Next.js và các công nghệ hiện đại.",
    ogLocale: "vi_VN",
    twitterTitle: "Nguyen Sinh Nhat | Nhà phát triển Fullstack",
    twitterDescription:
      "Portfolio của Nguyen Sinh Nhat - Chuyên gia phát triển web với React, Next.js và các công nghệ hiện đại.",
    ogImageAlt: "Nguyen Sinh Nhat - Portfolio Nhà phát triển Fullstack",
    canonicalUrl: `${SITE_CONFIG.baseUrl}/vi`,
  },
  en: {
    title: "Nguyen Sinh Nhat | Fullstack Developer",
    description:
      "Portfolio of Nguyen Sinh Nhat - Fullstack Developer with expertise in React, Next.js, Node.js, TypeScript, and modern web technologies. Explore projects, experience, and skills.",
    ogTitle: "Nguyen Sinh Nhat | Fullstack Developer",
    ogDescription:
      "Portfolio of Nguyen Sinh Nhat - Fullstack Developer specializing in React, Next.js, and modern web technologies.",
    ogLocale: "en_US",
    twitterTitle: "Nguyen Sinh Nhat | Fullstack Developer",
    twitterDescription:
      "Portfolio of Nguyen Sinh Nhat - Fullstack Developer specializing in React, Next.js, and modern web technologies.",
    ogImageAlt: "Nguyen Sinh Nhat - Fullstack Developer Portfolio",
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
  applicationName: "Nguyen Sinh Nhat Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
  keywords: [
    "Nguyen Sinh Nhat",
    "Portfolio",
    "Fullstack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "NestJS",
    "Vietnam Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "Tailwind CSS",
    "Shadcn UI",
    "Agile",
    "Scrum",
    "Web3",
    "Blockchain",
    "AI",
  ],
  authors: [{ name: "Nguyen Sinh Nhat", url: SITE_CONFIG.baseUrl }],
  creator: "Nguyen Sinh Nhat",
  publisher: "Nguyen Sinh Nhat",
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
    siteName: "Nguyen Sinh Nhat Portfolio",
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
    creator: "@nhat251",
  },
  appleWebApp: {
    title: "Nguyen Sinh Nhat Portfolio",
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
    default: "Nguyen Sinh Nhat | Fullstack Developer",
    template: "%s | Nguyen Sinh Nhat",
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
    authors: SHARED_METADATA.authors,
    creator: SHARED_METADATA.creator,
    publisher: SHARED_METADATA.publisher,
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
      siteName: "Nguyen Sinh Nhat Portfolio",
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
      creator: "@nhat251",
    },
    appleWebApp: SHARED_METADATA.appleWebApp,
  };
}
