import Link from "next/link";

import { Logo } from "@/components/icons/logo";
import { DesktopNav } from "@/components/molecules/globals/desktop-nav";
import { MobileNav } from "@/components/molecules/globals/mobile-nav";
import { Button } from "@/ui/button";

export const Header = () => {
  return (
    <header className="border-outline-variant/50 bg-surface/90 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo
            className="text-lg font-semibold tracking-tight"
            width="36"
            height="36"
            bgColor="var(--primary-container)"
          />
          <span className="text-primary text-xl font-bold tracking-tight">Scan Now</span>
        </Link>

        <DesktopNav />

        <div className="hidden items-center md:flex">
          <Button size="sm" className="px-6">
            Bắt đầu ngay
          </Button>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
