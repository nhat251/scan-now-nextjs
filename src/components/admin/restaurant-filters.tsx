"use client";

import { SearchIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RestaurantStatusFilter } from "@/types/admin";

type RestaurantFiltersProps = {
  search: string;
  status: RestaurantStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: RestaurantStatusFilter) => void;
};

export const RestaurantFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: RestaurantFiltersProps) => {
  return (
    <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
      <CardContent className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-2xl">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by restaurant name, slug, or owner"
            className="bg-background border-border/60 h-12 rounded-2xl pl-11"
          />
        </div>

        <Select value={status} onValueChange={(value) => onStatusChange(value as RestaurantStatusFilter)}>
          <SelectTrigger className="bg-background border-border/60 h-12 min-w-40 rounded-2xl">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
