"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

import { RestaurantBranchesTab } from "@/components/admin/restaurant-branches-tab";
import { RestaurantOverviewTab } from "@/components/admin/restaurant-overview-tab";
import { Button } from "@/components/ui/button";
import { useAdminRestaurantDetailQuery } from "@/hooks/queries/useAdminRestaurantDetailQuery";
import { cn } from "@/lib/utils";

type RestaurantDetailViewProps = {
  restaurantIdentifier: string;
};

export const RestaurantDetailView = ({ restaurantIdentifier }: RestaurantDetailViewProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const restaurantQuery = useAdminRestaurantDetailQuery(restaurantIdentifier, true);

  if (restaurantQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading restaurant details...</p>
      </div>
    );
  }

  if (restaurantQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-destructive text-sm">Unable to load restaurant details.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  const restaurant = restaurantQuery.data;

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground text-sm">Restaurant not found.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/admin/restaurants")}
          >
            <ArrowLeftIcon className="size-5" />
          </Button>
          <div>
            <h1 className="text-on-surface text-2xl font-black tracking-tight sm:text-3xl">
              {restaurant.name}
            </h1>
            <p className="text-on-surface-variant text-sm">/{restaurant.slug}</p>
          </div>
        </div>
        <Button
          size="lg"
          className="rounded-2xl"
          onClick={() => router.push(`/admin/restaurants/${restaurant.slug}/edit`)}
        >
          <PencilIcon className="size-4" />
          Edit Restaurant
        </Button>
      </div>

      <div className="border-border/60 bg-surface-container-lowest inline-flex items-center rounded-2xl border p-1 shadow-sm">
        {["overview", "branches"].map((tab) => (
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
            {tab === "overview" ? "Overview" : "Branches"}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "overview" ? (
          <RestaurantOverviewTab restaurant={restaurant} />
        ) : (
          <RestaurantBranchesTab restaurantSlug={restaurant.slug} enabled={activeTab === "branches"} />
        )}
      </div>
    </div>
  );
};
