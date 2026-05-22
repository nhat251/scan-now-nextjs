import { BanIcon, CircleCheckBigIcon, UsersIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { OwnerRecord, PaginatedOwnersResponse } from "@/types/admin";

type AdminKpiCardsProps = {
  ownersPage?: PaginatedOwnersResponse;
};

const countActiveOwners = (items: OwnerRecord[]) => {
  return items.filter((owner) => owner.isActive && !owner.isBanned).length;
};

const countBannedOwners = (items: OwnerRecord[]) => {
  return items.filter((owner) => owner.isBanned).length;
};

export const AdminKpiCards = ({ ownersPage }: AdminKpiCardsProps) => {
  const items = ownersPage?.items || [];

  const cards = [
    {
      label: "Total Owners",
      value: ownersPage?.totalItems ?? 0,
      icon: UsersIcon,
      accent: "text-primary",
      detail: "Fetched from backend",
    },
    {
      label: "Active On Page",
      value: countActiveOwners(items),
      icon: CircleCheckBigIcon,
      accent: "text-success-foreground",
      detail: "Visible active accounts",
    },
    {
      label: "Banned On Page",
      value: countBannedOwners(items),
      icon: BanIcon,
      accent: "text-destructive",
      detail: "Visible banned accounts",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.label} className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="flex items-start justify-between gap-4 px-6 py-6">
              <div className="space-y-3">
                <p className="text-on-surface-variant text-sm font-medium">{card.label}</p>
                <p className="text-on-surface text-3xl font-black tracking-tight">{card.value}</p>
                <p className="text-on-surface-variant text-xs font-medium tracking-[0.18em] uppercase">
                  {card.detail}
                </p>
              </div>
              <div className="bg-surface-container-low border-border/50 flex size-12 items-center justify-center rounded-2xl border">
                <Icon className={card.accent} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
