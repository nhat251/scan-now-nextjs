"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { SITE_CONFIG, type SupportedLocale } from "@/constants/site";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return SITE_CONFIG.locales.includes(locale as SupportedLocale);
};

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLocale = isSupportedLocale(locale) ? locale : SITE_CONFIG.defaultLocale;

  const { control, reset, setValue } = useForm({
    defaultValues: {
      locale: currentLocale,
    },
  });

  const watchedLocale = useWatch({ control, name: "locale" });

  useEffect(() => {
    reset({ locale: currentLocale });
  }, [currentLocale, reset]);

  const handleLocaleChange = useCallback(
    (nextLocale: string) => {
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
    },
    [currentLocale, pathname, router, searchParams]
  );

  useEffect(() => {
    if (watchedLocale !== currentLocale) {
      handleLocaleChange(watchedLocale);
    }
  }, [watchedLocale, currentLocale, handleLocaleChange]);

  return (
    <Select value={watchedLocale} onValueChange={(val) => setValue("locale", val as SupportedLocale)}>
      <SelectTrigger
        className="bg-surface-container-low/70 h-9 w-fit gap-1 rounded-xl border-none px-3 text-xs font-semibold shadow-none"
        aria-label="Select language"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" position="popper">
        <SelectItem value="vi">VI</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
};
