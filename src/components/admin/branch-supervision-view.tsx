"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { BranchCategoriesTab } from "@/components/admin/branch-categories-tab";
import { BranchMenuItemsTab } from "@/components/admin/branch-menu-items-tab";
import { BranchOverviewTab } from "@/components/admin/branch-overview-tab";
import { BranchTablesTab } from "@/components/admin/branch-tables-tab";
import { Button } from "@/components/ui/button";
import { useAdminBranchDetailQuery } from "@/hooks/queries/useAdminBranchDetailQuery";
import { cn } from "@/lib/utils";

type BranchSupervisionViewProps = {
  branchIdentifier: string;
  restaurantIdentifier: string | null;
};

export const BranchSupervisionView = ({ branchIdentifier, restaurantIdentifier }: BranchSupervisionViewProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const branchQuery = useAdminBranchDetailQuery(restaurantIdentifier, branchIdentifier, Boolean(restaurantIdentifier));

  if (branchQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading branch details...</p>
      </div>
    );
  }

  if (branchQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-destructive text-sm">Unable to load branch details.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  const branch = branchQuery.data;

  if (!branch) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground text-sm">Branch not found.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  const branchId = branch.branchId;
  const restaurantSlug = restaurantIdentifier;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push(`/admin/restaurants/${restaurantSlug}`)}
        >
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div>
          <h1 className="text-on-surface text-2xl font-black tracking-tight sm:text-3xl">
            {branch.name}
          </h1>
          <p className="text-on-surface-variant text-sm">/{branch.slug}</p>
        </div>
      </div>

      <div className="border-border/60 bg-surface-container-lowest inline-flex items-center rounded-2xl border p-1 shadow-sm">
        {["overview", "categories", "menu-items", "tables"].map((tab) => (
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
            {tab === "overview" ? "Overview" : tab === "categories" ? "Categories" : tab === "menu-items" ? "Menu Items" : "Tables"}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "overview" ? (
          <BranchOverviewTab branch={branch} />
        ) : activeTab === "categories" ? (
          <BranchCategoriesTab branchId={branchId} branchSlug={branch.slug} restaurantSlug={restaurantSlug} enabled={activeTab === "categories"} />
        ) : activeTab === "menu-items" ? (
          <BranchMenuItemsTab branchId={branchId} enabled={activeTab === "menu-items"} />
        ) : (
          <BranchTablesTab branchId={branchId} branchSlug={branch.slug} restaurantSlug={restaurantSlug} enabled={activeTab === "tables"} />
        )}
      </div>
    </div>
  );
};
