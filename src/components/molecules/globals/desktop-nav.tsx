"use client";

import { nav_items } from "@/constants/routers";
import { scrollToElement } from "@/helpers/scrollToElement";
import { useFilterShowMenuItems } from "@/hooks/useFilterShowMenuItems";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

export const DesktopNav = () => {
  const menu = useFilterShowMenuItems(nav_items);

  return (
    <nav className="border-outline-variant/40 bg-surface-container-low/80 hidden rounded-full border px-1 py-1 md:flex">
      {menu.map((link, index) => (
        <Button
          key={link.id}
          variant="none"
          onClick={() => scrollToElement(link.id)}
          className={cn(
            "hover:text-primary h-auto cursor-pointer rounded-full px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors",
            index === 0
              ? "border-primary/40 text-primary border-b-2"
              : "text-on-surface-variant hover:bg-surface-container-high"
          )}
        >
          {link.text}
        </Button>
      ))}
    </nav>
  );
};
