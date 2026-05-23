import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type RestaurantPageHeaderProps = {
  onCreateRestaurant: () => void;
};

export const RestaurantPageHeader = ({ onCreateRestaurant }: RestaurantPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <h1 className="text-on-surface text-3xl font-black tracking-tight sm:text-4xl">Restaurants</h1>
        <p className="text-on-surface-variant max-w-2xl text-sm leading-6 sm:text-base">
          Manage all restaurants across the platform.
        </p>
      </div>
      <Button size="lg" className="rounded-2xl" onClick={onCreateRestaurant}>
        <PlusIcon className="size-4" />
        Create Restaurant
      </Button>
    </div>
  );
};
