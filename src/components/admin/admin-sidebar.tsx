"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeadphonesIcon, LogOutIcon, SettingsIcon, StoreIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  onLogout: () => void;
};

const navItems = [
  { label: "Owner Management", icon: UsersIcon, href: "/admin" },
  { label: "Restaurant Management", icon: StoreIcon, href: "/admin/restaurants" },
  { label: "Settings", icon: SettingsIcon, href: "#" },
];

export const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    if (href === "/admin/restaurants") return pathname.startsWith("/admin/restaurants") || pathname.startsWith("/admin/branches");
    return pathname.startsWith(href);
  };

  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border fixed inset-y-0 left-0 z-30 hidden w-60 border-r lg:flex lg:flex-col">
      <div className="border-sidebar-border flex items-center gap-3 border-b px-5 py-7">
        <div className="bg-primary-container text-on-primary flex size-10 items-center justify-center rounded-xl shadow-sm">
          <StoreIcon className="size-5" />
        </div>
        <p className="text-primary text-xl font-black tracking-tight">Scan Now</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary-container/15 text-primary border-primary-container/30 border shadow-sm"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-sidebar-border space-y-1 border-t px-3 py-4">
        <div className="text-sidebar-foreground/75 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium">
          <HeadphonesIcon className="size-4" />
          <span>Support</span>
        </div>
        <Button
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start rounded-xl px-3"
          onClick={onLogout}
        >
          <LogOutIcon className="size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
