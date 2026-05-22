"use client";

import { HeadphonesIcon, LogOutIcon, SettingsIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  onLogout: () => void;
};

const navItems = [
  {
    label: "Owner Management",
    icon: UsersIcon,
    active: true,
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    active: false,
  },
];

export const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border fixed inset-y-0 left-0 z-30 hidden w-72 border-r lg:flex lg:flex-col">
      <div className="border-sidebar-border flex items-center gap-3 border-b px-6 py-8">
        <div className="bg-primary-container text-on-primary flex size-12 items-center justify-center rounded-2xl shadow-md">
          <UsersIcon className="size-5" />
        </div>
        <div>
          <p className="text-primary text-2xl font-black tracking-tight">Scan Now</p>
          <p className="text-sidebar-foreground/70 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Global Admin Console
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                item.active
                  ? "bg-primary-container/15 text-primary border-primary-container/30 border shadow-sm"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </div>
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
