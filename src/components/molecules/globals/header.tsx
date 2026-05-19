import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/atoms/logo";
import { DesktopNav } from "@/components/molecules/globals/desktop-nav";
import { LanguageSwitcher } from "@/components/molecules/globals/language-switcher";
import { MobileNav } from "@/components/molecules/globals/mobile-nav";
import { Button } from "@/ui/button";

export const Header = async () => {
  const t = await getTranslations();

  return (
    <header className="border-outline-variant/50 bg-surface/90 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
        <Logo size={20} fill />

        <DesktopNav />

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button size="sm" className="px-6">
            {t("global.header.startNow")}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
