"use client";

import { useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OwnerStatusFilter } from "@/types/admin";

type OwnerFiltersProps = {
  search: string;
  status: OwnerStatusFilter;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OwnerStatusFilter) => void;
  onPageSizeChange: (value: number) => void;
};

export const OwnerFilters = ({
  search,
  status,
  pageSize,
  onSearchChange,
  onStatusChange,
  onPageSizeChange,
}: OwnerFiltersProps) => {
  const { control, reset, setValue } = useForm({
    defaultValues: {
      search,
      status,
      pageSize: String(pageSize),
    },
  });

  const watchedSearch = useWatch({ control, name: "search" });
  const watchedStatus = useWatch({ control, name: "status" });
  const watchedPageSize = useWatch({ control, name: "pageSize" });

  useEffect(() => {
    reset({ search, status, pageSize: String(pageSize) });
  }, [search, status, pageSize, reset]);

  useEffect(() => {
    if (watchedSearch !== search) {
      onSearchChange(watchedSearch);
    }
  }, [watchedSearch, search, onSearchChange]);

  useEffect(() => {
    if (watchedStatus !== status) {
      onStatusChange(watchedStatus);
    }
  }, [watchedStatus, status, onStatusChange]);

  useEffect(() => {
    const sizeNum = Number(watchedPageSize);
    if (sizeNum !== pageSize && !isNaN(sizeNum)) {
      onPageSizeChange(sizeNum);
    }
  }, [watchedPageSize, pageSize, onPageSizeChange]);

  return (
    <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
      <CardContent className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-2xl">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            value={watchedSearch}
            onChange={(event) => setValue("search", event.target.value)}
            placeholder="Search by full name, username, or email"
            className="bg-background border-border/60 h-12 rounded-2xl pl-11"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={watchedStatus} onValueChange={(value) => setValue("status", value as OwnerStatusFilter)}>
            <SelectTrigger className="bg-background border-border/60 h-12 min-w-40 rounded-2xl">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>

          <Select value={watchedPageSize} onValueChange={(value) => setValue("pageSize", value)}>
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
