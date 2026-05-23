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
import { useAdminBranchMenuItemsQuery } from "@/hooks/queries/useAdminBranchMenuItemsQuery";
import type { MenuItemRecord, MenuItemsListParams } from "@/types/admin";

type BranchMenuItemsTabProps = {
  branchId: string;
  enabled: boolean;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

export const BranchMenuItemsTab = ({ branchId, enabled }: BranchMenuItemsTabProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isActive, setIsActive] = useState<string>("all");
  const [isAvailable, setIsAvailable] = useState<string>("all");
  const [isFeatured, setIsFeatured] = useState<string>("all");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const categoriesQuery = useAdminBranchCategoriesQuery({ branchId, pageNumber: 1, pageSize: 100 }, enabled);

  const params: MenuItemsListParams = {
    pageNumber,
    pageSize: 10,
    search,
    isActive: isActive === "all" ? undefined : isActive === "active",
    isAvailable: isAvailable === "all" ? undefined : isAvailable === "yes",
    isFeatured: isFeatured === "all" ? undefined : isFeatured === "yes",
    categoryId: categoryId === "all" ? undefined : categoryId,
    sortBy: sortBy === "name" ? undefined : sortBy,
    sortDirection: sortDirection === "asc" ? undefined : sortDirection,
  };

  const menuItemsQuery = useAdminBranchMenuItemsQuery({ branchId, ...params }, enabled);

  const items = menuItemsQuery.data?.items || [];
  const totalPages = menuItemsQuery.data?.totalPages ?? 1;
  const totalItems = menuItemsQuery.data?.totalItems ?? 0;

  const handleViewMenuItem = (menuItem: MenuItemRecord) => {
    router.push(`/admin/menu-items/${menuItem.menuItemId}`);
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
              placeholder="Search menu items by name"
              className="bg-background border-border/60 h-10 rounded-2xl pl-11"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={isActive} onValueChange={(v) => { setIsActive(v); setPageNumber(1); }}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-32 rounded-2xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={isAvailable} onValueChange={(v) => { setIsAvailable(v); setPageNumber(1); }}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-32 rounded-2xl">
                <SelectValue placeholder="Available" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Available</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>

            <Select value={isFeatured} onValueChange={(v) => { setIsFeatured(v); setPageNumber(1); }}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-32 rounded-2xl">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Featured</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryId} onValueChange={(v) => { setCategoryId(v); setPageNumber(1); }}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-40 rounded-2xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesQuery.data?.items.map((c) => (
                  <SelectItem key={c.categoryId} value={c.categoryId}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-40 rounded-2xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="displayOrder">Display Order</SelectItem>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="isActive">Status</SelectItem>
                <SelectItem value="isAvailable">Available</SelectItem>
                <SelectItem value="isFeatured">Featured</SelectItem>
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
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Name</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Category</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Price</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Cost Price</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Prep Time</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Available</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Featured</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Active</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Created At</TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Updated At</TableHead>
              <TableHead className="w-16 px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItemsQuery.isLoading ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={12}>
                  Loading menu items...
                </TableCell>
              </TableRow>
            ) : menuItemsQuery.isError ? (
              <TableRow>
                <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={12}>
                  Unable to load menu items.
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={12}>
                  No menu items found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((menuItem) => (
                <TableRow key={menuItem.menuItemId} className="border-border/40">
                  <TableCell className="px-6 py-4">
                    {menuItem.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={menuItem.imageUrl}
                        alt={menuItem.name}
                        className="border-border/40 size-10 rounded-xl border object-cover"
                      />
                    ) : (
                      <div className="bg-surface-container-low border-border/40 flex size-10 items-center justify-center rounded-xl border">
                        <span className="text-muted-foreground text-xs">—</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="text-on-surface font-semibold">{menuItem.name}</p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{menuItem.categoryName || "—"}</p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p className="font-semibold">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(menuItem.price)}
                    </p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(menuItem.costPrice)}
                    </p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{menuItem.preparationTime} min</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant={menuItem.isAvailable ? "default" : "secondary"} className="rounded-full px-2.5 py-1">
                      {menuItem.isAvailable ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant={menuItem.isFeatured ? "default" : "secondary"} className="rounded-full px-2.5 py-1">
                      {menuItem.isFeatured ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant={menuItem.isActive ? "default" : "secondary"} className="rounded-full px-2.5 py-1">
                      {menuItem.isActive ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{formatDate(menuItem.createdAt)}</p>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{menuItem.updatedAt ? formatDate(menuItem.updatedAt) : "—"}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full"
                      onClick={() => handleViewMenuItem(menuItem)}
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
          <span className="text-on-surface font-semibold">{menuItemsQuery.data?.pageNumber ?? 1}</span> of{" "}
          {totalPages} &middot; {totalItems} menu items
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPageNumber((p) => p - 1)}
            disabled={pageNumber <= 1 || menuItemsQuery.isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPageNumber((p) => p + 1)}
            disabled={pageNumber >= totalPages || menuItemsQuery.isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
