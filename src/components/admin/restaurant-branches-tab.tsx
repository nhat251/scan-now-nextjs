"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminRestaurantBranchesQuery } from "@/hooks/queries/useAdminRestaurantBranchesQuery";
import type { BranchListParams, BranchRecord } from "@/types/admin";

type RestaurantBranchesTabProps = {
  restaurantSlug: string;
  enabled: boolean;
};

const formatTime = (value: string | null) => {
  if (!value) return "—";
  return value.slice(0, 5);
};

export const RestaurantBranchesTab = ({ restaurantSlug, enabled }: RestaurantBranchesTabProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const params: BranchListParams = { pageNumber, pageSize, search };

  const branchesQuery = useAdminRestaurantBranchesQuery(
    { restaurantIdentifier: restaurantSlug, ...params },
    enabled
  );

  const items = branchesQuery.data?.items || [];
  const totalPages = branchesQuery.data?.totalPages ?? 1;
  const totalItems = branchesQuery.data?.totalItems ?? 0;

  const handleViewBranchSupervision = (branch: BranchRecord) => {
    router.push(`/admin/branches/${branch.slug}?restaurantSlug=${restaurantSlug}`);
  };

  return (
    <div className="space-y-4">
      <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search branches by name, address, or phone"
              className="bg-background border-border/60 h-11 rounded-2xl pl-11"
            />
          </div>
        </CardContent>
      </Card>

      <div className="border-border/60 bg-surface-container-lowest overflow-hidden rounded-3xl border shadow-sm">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-on-surface-variant/80 px-6 py-4 text-xs font-black tracking-[0.22em] uppercase">
                Branch Name
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Manager
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Contact
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Hours
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Status
              </TableHead>
              <TableHead className="w-16 px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {branchesQuery.isLoading ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={6}>
                  Loading branches...
                </TableCell>
              </TableRow>
            ) : branchesQuery.isError ? (
              <TableRow>
                <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={6}>
                  Unable to load branches.
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={6}>
                  No branches found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((branch) => (
                <TableRow key={branch.branchId} className="border-border/40">
                  <TableCell className="px-6 py-4 align-top">
                    <p className="text-on-surface font-semibold">{branch.name}</p>
                    <p className="text-muted-foreground text-xs">/{branch.slug}</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="text-on-surface font-medium">
                      {branch.managerName || "Unassigned"}
                    </p>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="space-y-1 text-sm">
                      {branch.address ? <p>{branch.address}</p> : null}
                      {branch.phone ? (
                        <p className="text-muted-foreground">{branch.phone}</p>
                      ) : null}
                      {branch.email ? (
                        <p className="text-muted-foreground text-xs">{branch.email}</p>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="align-top text-sm">
                    <p>{formatTime(branch.openTime)} - {formatTime(branch.closeTime)}</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge
                      variant={branch.isActive ? "default" : "secondary"}
                      className="rounded-full px-2.5 py-1"
                    >
                      {branch.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full"
                      onClick={() => handleViewBranchSupervision(branch)}
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
          <span className="text-on-surface font-semibold">{branchesQuery.data?.pageNumber ?? 1}</span> of{" "}
          {totalPages} &middot; {totalItems} branches
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPageNumber((p) => p - 1)}
            disabled={pageNumber <= 1 || branchesQuery.isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setPageNumber((p) => p + 1)}
            disabled={pageNumber >= totalPages || branchesQuery.isLoading}
          >
            Next
          </Button>
        </div>
      </div>


    </div>
  );
};
