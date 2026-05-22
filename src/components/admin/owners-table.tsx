"use client";

import { PencilIcon, ShieldBanIcon, ShieldCheckIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import type { OwnerRecord, PaginatedOwnersResponse } from "@/types/admin";

type OwnersTableProps = {
  ownersPage?: PaginatedOwnersResponse;
  isLoading: boolean;
  isError: boolean;
  isActionPending: boolean;
  onEdit: (owner: OwnerRecord) => void;
  onBan: (owner: OwnerRecord) => void;
  onUnban: (owner: OwnerRecord) => void;
  onPageChange: (page: number) => void;
};

const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(value));
};

export const OwnersTable = ({
  ownersPage,
  isLoading,
  isError,
  isActionPending,
  onEdit,
  onBan,
  onUnban,
  onPageChange,
}: OwnersTableProps) => {
  const items = ownersPage?.items || [];
  const pageNumber = ownersPage?.pageNumber ?? 1;
  const totalPages = ownersPage?.totalPages ?? 1;
  const totalItems = ownersPage?.totalItems ?? 0;

  return (
    <div className="space-y-4">
      <div className="border-border/60 bg-surface-container-lowest overflow-hidden rounded-3xl border shadow-sm">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-on-surface-variant/80 px-6 py-4 text-xs font-black tracking-[0.22em] uppercase">
                Owner
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Username
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Contact
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Restaurant
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Status
              </TableHead>
              <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">
                Created
              </TableHead>
              <TableHead className="w-16 px-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={7}>
                  Loading owners...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={7}>
                  Unable to load owners. Please check your session and try again.
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={7}>
                  No owners found for the current filters.
                </TableCell>
              </TableRow>
            ) : (
              items.map((owner) => (
                <TableRow key={owner.userId} className="border-border/40">
                  <TableCell className="px-6 py-4 align-top">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-primary/10 size-11 border">
                        <AvatarFallback className="bg-primary-container/10 text-primary font-semibold">
                          {getInitials(owner.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-on-surface font-semibold">{owner.fullName}</p>
                        <p className="text-muted-foreground text-xs">ID: {owner.userId.slice(0, 8)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-on-surface align-top font-medium">@{owner.username}</TableCell>
                  <TableCell className="align-top">
                    <div className="space-y-1 text-sm">
                      <p>{owner.email}</p>
                      <p className="text-muted-foreground">{owner.phoneNumber || "No phone number"}</p>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="text-on-surface font-medium">{owner.restaurantName || "Unassigned"}</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge
                      variant={owner.isBanned ? "destructive" : owner.isActive ? "default" : "outline"}
                      className="rounded-full px-2.5 py-1"
                    >
                      {owner.isBanned ? "Banned" : owner.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground align-top text-sm">{formatDate(owner.createdAt)}</TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-full"
                        disabled={isActionPending}
                        onClick={() => onEdit(owner)}
                      >
                        <PencilIcon className="size-4" />
                      </Button>
                      {owner.isBanned ? (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-full text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                          disabled={isActionPending}
                          onClick={() => onUnban(owner)}
                        >
                          <ShieldCheckIcon className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive rounded-full"
                          disabled={isActionPending}
                          onClick={() => onBan(owner)}
                        >
                          <ShieldBanIcon className="size-4" />
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
          Showing page <span className="text-on-surface font-semibold">{pageNumber}</span> of {totalPages} · {totalItems} owners
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" className="rounded-full" onClick={() => onPageChange(pageNumber - 1)} disabled={pageNumber <= 1 || isLoading}>
            Previous
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => onPageChange(pageNumber + 1)} disabled={pageNumber >= totalPages || isLoading}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
