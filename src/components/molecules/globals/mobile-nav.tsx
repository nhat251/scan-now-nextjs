"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { nav_items } from "@/constants/routers";
import { scrollToElement } from "@/helpers/scrollToElement";
import { useFilterShowMenuItems } from "@/hooks/useFilterShowMenuItems";
import { Button } from "@/ui/button";

export const MobileNav = () => {
  const [menuState, setMenuState] = useState(false);
  const menu = useFilterShowMenuItems(nav_items);

  return (
    <div className="relative md:hidden">
      <Button
        onClick={() => setMenuState(!menuState)}
        variant="none"
        className="text-on-surface"
        aria-label={menuState ? "Close Menu" : "Open Menu"}
      >
        {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
      </Button>

      {menuState && (
        <div className="bg-surface/95 animate-in slide-in-from-top-2 fade-in border-outline-variant/50 absolute top-14 right-0 z-50 w-72 rounded-2xl border p-4 shadow-xl backdrop-blur-md duration-200">
          <nav className="flex flex-col gap-2">
            {menu.map((link) => (
              <Button
                key={link.id}
                variant="none"
                onClick={() => {
                  scrollToElement(link.id);
                  setMenuState(false);
                }}
                className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low w-full justify-start rounded-xl px-4 py-3 text-left text-sm font-semibold"
              >
                {link.text}
              </Button>
            ))}
            <Button
              size="sm"
              className="mt-2 w-full"
              onClick={() => {
                scrollToElement("final-cta");
                setMenuState(false);
              }}
            >
              Bắt đầu ngay
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};
