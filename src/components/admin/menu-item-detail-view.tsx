"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { MenuItemOverviewTab } from "@/components/admin/menu-item-overview-tab";
import { MenuItemPriceHistoryTab } from "@/components/admin/menu-item-price-history-tab";
import { Button } from "@/components/ui/button";
import { useAdminMenuItemDetailQuery } from "@/hooks/queries/useAdminMenuItemDetailQuery";
import { cn } from "@/lib/utils";

type MenuItemDetailViewProps = {
  menuItemId: string;
};

export const MenuItemDetailView = ({ menuItemId }: MenuItemDetailViewProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const menuItemQuery = useAdminMenuItemDetailQuery(menuItemId, true);

  if (menuItemQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading menu item details...</p>
      </div>
    );
  }

  if (menuItemQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-destructive text-sm">Unable to load menu item details.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  const menuItem = menuItemQuery.data;

  if (!menuItem) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground text-sm">Menu item not found.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push(`/admin/branches/${menuItem.branchId}?restaurantId=${menuItem.branchId}`)}
        >
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div>
          <h1 className="text-on-surface text-2xl font-black tracking-tight sm:text-3xl">
            {menuItem.name}
          </h1>
          <p className="text-on-surface-variant text-sm">{menuItem.categoryName || "Uncategorized"}</p>
        </div>
      </div>

      <div className="border-border/60 bg-surface-container-lowest inline-flex items-center rounded-2xl border p-1 shadow-sm">
        {["overview", "price-history"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200",
              activeTab === tab
                ? "bg-background text-on-surface shadow-sm"
                : "text-muted-foreground hover:text-on-surface"
            )}
          >
            {tab === "overview" ? "Overview" : "Price History"}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "overview" ? (
          <MenuItemOverviewTab menuItem={menuItem} />
        ) : (
          <MenuItemPriceHistoryTab menuItemId={menuItemId} />
        )}
      </div>
    </div>
  );
};
