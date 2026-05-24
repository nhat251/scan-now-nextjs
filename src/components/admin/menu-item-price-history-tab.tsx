"use client";

import { LoaderCircle } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminMenuItemPriceHistoryQuery } from "@/hooks/queries/useAdminMenuItemPriceHistoryQuery";

type MenuItemPriceHistoryTabProps = {
  menuItemId: string;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
};

export const MenuItemPriceHistoryTab = ({ menuItemId }: MenuItemPriceHistoryTabProps) => {
  const priceHistoryQuery = useAdminMenuItemPriceHistoryQuery(menuItemId, true);

  const items = priceHistoryQuery.data ?? [];

  return (
    <div className="border-border/60 bg-surface-container-lowest overflow-hidden rounded-3xl border shadow-sm">
      <Table>
        <TableHeader className="bg-surface-container-low/60">
          <TableRow className="border-border/60 hover:bg-transparent">
            <TableHead className="text-on-surface-variant/80 px-6 py-4 text-xs font-black tracking-[0.22em] uppercase">Old Price</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">New Price</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Changed By</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Changed At</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceHistoryQuery.isLoading ? (
            <TableRow>
              <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={5}>
                <LoaderCircle className="mx-auto size-5 animate-spin" />
              </TableCell>
            </TableRow>
          ) : priceHistoryQuery.isError ? (
            <TableRow>
              <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={5}>
                Unable to load price history.
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={5}>
                No price history available.
              </TableCell>
            </TableRow>
          ) : (
            items.map((record) => (
              <TableRow key={record.priceHistoryId} className="border-border/40">
                <TableCell className="px-6 py-4">
                  <p className="text-muted-foreground text-sm line-through">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(record.oldPrice)}
                  </p>
                </TableCell>
                <TableCell className="py-4">
                  <p className="text-on-surface font-semibold">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(record.newPrice)}
                  </p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p>{record.changedByName || "—"}</p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p>{formatDate(record.changedAt)}</p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p className="text-muted-foreground max-w-xs truncate">{record.note || "—"}</p>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
