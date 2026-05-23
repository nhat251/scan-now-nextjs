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
    return pathname.startsWith(href);
  };

  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border fixed inset-y-0 left-0 z-30 hidden w-72 border-r lg:flex lg:flex-col">
      <div className="border-sidebar-border flex items-center gap-3 border-b px-6 py-8">
        <div className="bg-primary-container text-on-primary flex size-12 items-center justify-center rounded-2xl shadow-md">
          <UsersIcon className="size-5" />
        </div>
        <div>
          <p className="text-primary text-2xl font-black tracking-tight">Scan Now</p>
          <p className="text-sidebar-foreground/70 text-[11px] font-semibold tracking-[0.24em] uppercase">Global Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
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

      <div className="border-sidebar-border space-y-2 border-t px-4 py-6">
        <div className="text-sidebar-foreground/75 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium">
          <HeadphonesIcon className="size-4" />
          <span>Support</span>
        </div>
        <Button
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start rounded-2xl px-4"
          onClick={onLogout}
        >
          <LogOutIcon className="size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
