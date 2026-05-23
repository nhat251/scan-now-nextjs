"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  ShieldBanIcon,
  ShieldCheckIcon,
  StoreIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginatedRestaurantsResponse, RestaurantRecord } from "@/types/admin";

type RestaurantsTableProps = {
  restaurantsPage?: PaginatedRestaurantsResponse;
  isLoading: boolean;
  isError: boolean;
  isActionPending: boolean;
  onBan: (restaurant: RestaurantRecord) => void;
  onUnban: (restaurant: RestaurantRecord) => void;
  onPageChange: (page: number) => void;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

export const RestaurantsTable = ({
  restaurantsPage,
  isLoading,
  isError,
  isActionPending,
  onBan,
  onUnban,
  onPageChange,
}: RestaurantsTableProps) => {
  const router = useRouter();
  const items = restaurantsPage?.items || [];
  const pageNumber = restaurantsPage?.pageNumber ?? 1;
  const totalPages = restaurantsPage?.totalPages ?? 1;
  const totalItems = restaurantsPage?.totalItems ?? 0;

  return (
    <div className="space-y-4">
      <div className="border-border/60 bg-surface-container-lowest overflow-hidden rounded-3xl border shadow-sm">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-on-surface-variant/80 px-6 py-4 text-xs font-black tracking-[0.22em] uppercase">
                Restaurant
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Owner
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Branches
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Status
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Created
              </TableHead>
              <TableHead className="w-24 px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={6}>
                  Loading restaurants...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={6}>
                  Unable to load restaurants. Please check your session and try again.
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={6}>
                  No restaurants found for the current filters.
                </TableCell>
              </TableRow>
            ) : (
              items.map((restaurant) => (
                <TableRow key={restaurant.restaurantId} className="border-border/40">
                  <TableCell className="px-6 py-4 align-top">
                    <div className="flex items-center gap-3">
                      <div className="bg-surface-container-low border-border/50 flex size-11 items-center justify-center rounded-xl border">
                        {restaurant.logoUrl ? (
                          <Image
                            src={restaurant.logoUrl}
                            alt={restaurant.name}
                            width={44}
                            height={44}
                            className="size-full rounded-xl object-cover"
                            unoptimized
                          />
                        ) : (
                          <StoreIcon className="text-muted-foreground size-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-on-surface font-semibold">{restaurant.name}</p>
                        <p className="text-muted-foreground text-xs">/{restaurant.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="space-y-1 text-sm">
                      <p className="text-on-surface font-medium">{restaurant.ownerName}</p>
                      <p className="text-muted-foreground">{restaurant.ownerEmail}</p>
                      {restaurant.ownerPhone ? (
                        <p className="text-muted-foreground text-xs">{restaurant.ownerPhone}</p>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="text-on-surface font-medium">{restaurant.totalBranches}</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge
                      variant={restaurant.isActive ? "default" : "secondary"}
                      className="rounded-full px-2.5 py-1"
                    >
                      {restaurant.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground align-top text-sm">
                    {formatDate(restaurant.createdAt)}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-full"
                        onClick={() => router.push(`/admin/restaurants/${restaurant.restaurantId}`)}
                      >
                        <EyeIcon className="size-4" />
                      </Button>
                      {restaurant.isActive ? (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive rounded-full"
                          disabled={isActionPending}
                          onClick={() => onBan(restaurant)}
                        >
                          <ShieldBanIcon className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-full text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                          disabled={isActionPending}
                          onClick={() => onUnban(restaurant)}
                        >
                          <ShieldCheckIcon className="size-4" />
                        </Button>
                      )}
                    </div>
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
          <span className="text-on-surface font-semibold">{pageNumber}</span> of {totalPages} &middot; {totalItems}{" "}
          restaurants
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={pageNumber <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => onPageChange(pageNumber + 1)}
            disabled={pageNumber >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
