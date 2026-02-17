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
    <div className="md:hidden">
      <Button
        onClick={() => setMenuState(!menuState)}
        variant={"none"}
        aria-label={menuState ? "Close Menu" : "Open Menu"}
      >
        {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {menuState && (
        <div className="bg-card/95 animate-in slide-in-from-top-5 fade-in absolute top-16 right-0 left-0 h-screen border-t backdrop-blur-sm duration-200">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col space-y-4">
              {menu.map((link) => (
                <Button
                  key={link.id}
                  variant="none"
                  onClick={() => {
                    scrollToElement(link.id);
                    setMenuState(false);
                  }}
                  className="text-muted-foreground hover:text-foreground block w-full justify-start py-2 text-left text-sm font-medium transition-colors"
                >
                  {link.text}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
