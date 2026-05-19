import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { Logo } from "@/components/icons/logo";
import { DesktopNav } from "@/components/molecules/globals/desktop-nav";
import { MobileNav } from "@/components/molecules/globals/mobile-nav";
import { Button } from "@/ui/button";

export const Header = async () => {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  return (
    <header className="border-outline-variant/50 bg-surface/90 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <Logo
            className="text-lg font-semibold tracking-tight"
            width="36"
            height="36"
            bgColor="var(--primary-container)"
          />
          <span className="text-primary text-xl font-bold tracking-tight">{t("global.brand")}</span>
        </Link>

        <DesktopNav />

        <div className="hidden items-center md:flex">
          <Button size="sm" className="px-6">
            {t("global.header.startNow")}
          </Button>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
