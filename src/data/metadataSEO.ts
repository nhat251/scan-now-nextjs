import type { Metadata } from "next";

import { SITE_CONFIG } from "@/constants/site";

export const APP_LAYOUT_METADATA: Metadata = {
  applicationName: "Nguyen Sinh Nhat Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: "Nguyen Sinh Nhat | Fullstack Developer",
    template: "%s | Nguyen Sinh Nhat",
  },
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
  description:
    "Portfolio of Nguyen Sinh Nhat - Fullstack Developer with expertise in React, Next.js, Node.js, TypeScript, and modern web technologies. Explore projects, experience, and skills.",
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
  alternates: {
    canonical: SITE_CONFIG.baseUrl,
  },
  verification: {
    google: "4kSLgxKYQK5ZZt3GmGs-sfQAlRNqRXBNTM3KPm56-Kc",
  },
  openGraph: {
    title: "Nguyen Sinh Nhat | Fullstack Developer",
    description:
      "Portfolio of Nguyen Sinh Nhat - Fullstack Developer specializing in React, Next.js, and modern web technologies.",
    url: SITE_CONFIG.baseUrl,
    siteName: "Nguyen Sinh Nhat Portfolio",
    images: [
      {
        url: "/images/avatar.png",
        width: 1200,
        height: 630,
        alt: "Nguyen Sinh Nhat - Fullstack Developer Portfolio",
      },
    ],
    locale: SITE_CONFIG.defaultLocale === "vi" ? "vi_VN" : "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Sinh Nhat | Fullstack Developer",
    description:
      "Portfolio of Nguyen Sinh Nhat - Fullstack Developer specializing in React, Next.js, and modern web technologies.",
    images: ["/images/avatar.png"],
    creator: "@nhat251", // Assuming handle or remove if not applicable
  },
  appleWebApp: {
    title: "Nguyen Sinh Nhat Portfolio",
    statusBarStyle: "default",
    capable: true,
  },
};
