import { BellIcon, HelpCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/types/admin";

type AdminTopbarProps = {
  adminUser: AdminUser | null;
};

const getInitials = (name?: string | null) => {
  if (!name) return "AD";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export const AdminTopbar = ({ adminUser }: AdminTopbarProps) => {
  return (
    <header className="bg-background/90 border-border/70 sticky top-0 z-20 flex h-18 items-center justify-between gap-4 border-b px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircleIcon className="size-4" />
        </Button>

        <div className="border-border/70 bg-surface-container-lowest flex items-center gap-3 rounded-full border px-3 py-2 shadow-sm">
          <div className="hidden text-right sm:block">
            <p className="text-sm leading-tight font-semibold">
              {adminUser?.fullName || "Admin Profile"}
            </p>
            <p className="text-muted-foreground text-xs">{adminUser?.role || "Administrator"}</p>
          </div>
          <Avatar className="border-primary/15 size-10 border">
            <AvatarImage
              src={adminUser?.avatarUrl || undefined}
              alt={adminUser?.fullName || "Admin avatar"}
            />
            <AvatarFallback className="bg-primary-container/15 text-primary font-semibold">
              {getInitials(adminUser?.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
