"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, EyeIcon, SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminBranchCategoriesQuery } from "@/hooks/queries/useAdminBranchCategoriesQuery";
import type { CategoryListParams, CategoryRecord } from "@/types/admin";

type BranchCategoriesTabProps = {
  branchId: string;
  branchSlug: string;
  restaurantSlug: string | null;
  enabled: boolean;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

export const BranchCategoriesTab = ({ branchId, branchSlug, restaurantSlug, enabled }: BranchCategoriesTabProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isActive, setIsActive] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const params: CategoryListParams = {
    pageNumber,
    pageSize: 10,
    search,
    isActive: isActive === "all" ? undefined : isActive === "active",
    sortBy: sortBy === "name" ? undefined : sortBy,
    sortDirection: sortDirection === "asc" ? undefined : sortDirection,
  };

  const categoriesQuery = useAdminBranchCategoriesQuery({ branchId, ...params }, enabled);

  const items = categoriesQuery.data?.items || [];
  const totalPages = categoriesQuery.data?.totalPages ?? 1;
  const totalItems = categoriesQuery.data?.totalItems ?? 0;

  const handleViewCategory = (category: CategoryRecord) => {
    const href = restaurantSlug
      ? `/admin/branches/${branchSlug}/categories/${category.categoryId}?restaurantSlug=${restaurantSlug}&branchId=${branchId}`
      : `/admin/branches/${branchSlug}/categories/${category.categoryId}?branchId=${branchId}`;
    router.push(href);
  };

  return (
    <div className="space-y-4">
      <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
        <CardContent className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center">
          <div className="relative w-full max-w-md">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search categories by name"
              className="bg-background border-border/60 h-10 rounded-2xl pl-11"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={isActive} onValueChange={(v) => { setIsActive(v); setPageNumber(1); }}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-36 rounded-2xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-40 rounded-2xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="displayOrder">Display Order</SelectItem>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="isActive">Status</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="border-border/60 h-10 w-10 rounded-xl"
              onClick={() => setSortDirection((d) => (d === "asc" ? "desc" : "asc"))}
            >
              {sortDirection === "asc" ? (
                <ArrowUpNarrowWideIcon className="size-4" />
              ) : (
                <ArrowDownNarrowWideIcon className="size-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border-border/60 bg-surface-container-lowest overflow-hidden rounded-3xl border shadow-sm">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-on-surface-variant/80 px-6 py-4 text-xs font-black tracking-[0.22em] uppercase">Image</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Category Name</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Description</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Display Order</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Status</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Created At</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Updated At</TableHead>
              <TableHead className="w-16 px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesQuery.isLoading ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={8}>
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : categoriesQuery.isError ? (
              <TableRow>
                <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={8}>
                  Unable to load categories.
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={8}>
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((category) => (
                <TableRow key={category.categoryId} className="border-border/40">
                  <TableCell className="px-6 py-4">
                    {category.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="border-border/40 size-10 rounded-xl border object-cover"
                      />
                    ) : (
                      <div className="bg-surface-container-low border-border/40 flex size-10 items-center justify-center rounded-xl border">
                        <span className="text-muted-foreground text-xs">—</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="text-on-surface font-semibold">{category.name}</p>
                  </TableCell>
                  <TableCell className="max-w-xs align-top">
                    <p className="text-muted-foreground truncate text-sm">{category.description || "—"}</p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{category.displayOrder}</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant={category.isActive ? "default" : "secondary"} className="rounded-full px-2.5 py-1">
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{formatDate(category.createdAt)}</p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{category.updatedAt ? formatDate(category.updatedAt) : "—"}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full"
                      onClick={() => handleViewCategory(category)}
                    >
                      <EyeIcon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="border-border/60 bg-surface-container-lowest flex flex-col gap-3 rounded-3xl border px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Showing page{" "}
          <span className="text-on-surface font-semibold">{categoriesQuery.data?.pageNumber ?? 1}</span> of{" "}
          {totalPages} &middot; {totalItems} categories
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPageNumber((p) => p - 1)}
            disabled={pageNumber <= 1 || categoriesQuery.isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPageNumber((p) => p + 1)}
            disabled={pageNumber >= totalPages || categoriesQuery.isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
