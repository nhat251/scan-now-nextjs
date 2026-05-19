"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { SITE_CONFIG, type SupportedLocale } from "@/constants/site";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return SITE_CONFIG.locales.includes(locale as SupportedLocale);
};

export const LanguageSwitcher = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLocale = isSupportedLocale(locale) ? locale : SITE_CONFIG.defaultLocale;
  const shortLabel = currentLocale === "vi" ? t("global.locale.short.vi") : t("global.locale.short.en");

  const handleLocaleChange = (nextLocale: string) => {
    if (!isSupportedLocale(nextLocale) || nextLocale === currentLocale) {
      return;
    }

    const segments = pathname.split("/");

    if (segments.length > 1 && isSupportedLocale(segments[1] ?? "")) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    let nextPathname = segments.join("/");

    if (!nextPathname.startsWith("/")) {
      nextPathname = `/${nextPathname}`;
    }

    nextPathname = nextPathname.replace(/\/{2,}/g, "/");

    if (nextPathname.length > 1 && nextPathname.endsWith("/")) {
      nextPathname = nextPathname.slice(0, -1);
    }

    const query = searchParams.toString();
    const hash = window.location.hash;
    const href = `${nextPathname}${query ? `?${query}` : ""}${hash}`;

    router.replace(href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-w-16 px-3 text-xs tracking-[0.08em] uppercase"
          aria-label={t("global.locale.selectAriaLabel")}
        >
          {shortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t("global.locale.label")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleLocaleChange}>
          <DropdownMenuRadioItem value="vi">{t("global.locale.vi")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">{t("global.locale.en")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
