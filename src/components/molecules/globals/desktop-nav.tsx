"use client";

import { nav_items } from "@/constants/routers";
import { scrollToElement } from "@/helpers/scrollToElement";
import { useFilterShowMenuItems } from "@/hooks/useFilterShowMenuItems";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

export const DesktopNav = () => {
  const menu = useFilterShowMenuItems(nav_items);

  return (
    <nav className="border-border bg-background hidden rounded-full border px-1 py-1 md:flex">
      {menu.map((link) => (
        <Button
          key={link.id}
          variant="none"
          onClick={() => scrollToElement(link.id)}
          className={cn(
            "text-muted-foreground hover:text-foreground h-auto cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors hover:bg-transparent"
          )}
        >
          {link.text}
        </Button>
      ))}
    </nav>
  );
};
