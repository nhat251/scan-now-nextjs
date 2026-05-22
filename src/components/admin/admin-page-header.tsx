import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminPageHeaderProps = {
  onCreateOwner: () => void;
};

export const AdminPageHeader = ({ onCreateOwner }: AdminPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <h1 className="text-on-surface text-3xl font-black tracking-tight sm:text-4xl">Owner Management</h1>
        <p className="text-on-surface-variant max-w-2xl text-sm leading-6 sm:text-base">
          Centralized control for restaurant owner accounts across the platform.
        </p>
      </div>

      <Button size="lg" className="rounded-2xl" onClick={onCreateOwner}>
        <PlusIcon className="size-4" />
        Create Owner
      </Button>
    </div>
  );
};
