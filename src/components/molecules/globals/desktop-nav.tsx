"use client";

import { useTranslations } from "next-intl";

import { nav_items } from "@/constants/routers";
import { scrollToElement } from "@/helpers/scrollToElement";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useFilterShowMenuItems } from "@/hooks/useFilterShowMenuItems";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

export const DesktopNav = () => {
  const menu = useFilterShowMenuItems(nav_items);
  const activeSection = useActiveSection(menu.map((item) => item.id));
  const t = useTranslations();

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {menu.map((link) => {
        const isActive = activeSection === link.id;

        return (
          <Button
            key={link.id}
            variant="none"
            onClick={() => scrollToElement(link.id)}
            className={cn(
              "text-on-surface-variant hover:text-primary hover:bg-surface-container-low h-auto rounded-xl px-4 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors",
              isActive && "text-primary bg-primary/8"
            )}
          >
            <span className="relative">
              {t(link.labelKey as Parameters<typeof t>[0])}
              <span
                className={cn(
                  "bg-primary absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full transition-transform duration-200",
                  isActive && "scale-x-100"
                )}
              />
            </span>
          </Button>
        );
      })}
    </nav>
  );
};
