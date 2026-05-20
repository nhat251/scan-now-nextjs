import { Logo } from "@/components/atoms/logo";
import { CTAButton } from "@/components/molecules/cta-button";
import { DesktopNav } from "@/components/molecules/globals/desktop-nav";
import { LanguageSwitcher } from "@/components/molecules/globals/language-switcher";
import { MobileNav } from "@/components/molecules/globals/mobile-nav";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="max-w flex h-[72px] items-center justify-between px-5 shadow-[0_20px_60px_rgba(25,28,30,0.08)] backdrop-blur-xl md:px-6 lg:px-8">
        <Logo size={20} fill />

        <DesktopNav />

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <CTAButton />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
