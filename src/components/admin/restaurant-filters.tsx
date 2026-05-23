"use client";

import { SearchIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RestaurantStatusFilter } from "@/types/admin";

type RestaurantFiltersProps = {
  search: string;
  status: RestaurantStatusFilter;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: RestaurantStatusFilter) => void;
  onPageSizeChange: (value: number) => void;
};

export const RestaurantFilters = ({
  search,
  status,
  pageSize,
  onSearchChange,
  onStatusChange,
  onPageSizeChange,
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

        <div className="flex flex-col gap-3 sm:flex-row">
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

          <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
            <SelectTrigger className="bg-background border-border/60 h-12 min-w-40 rounded-2xl">
              <SelectValue placeholder="10 per page" />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
