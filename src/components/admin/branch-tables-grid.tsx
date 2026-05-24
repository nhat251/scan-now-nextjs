"use client";

import { useRouter } from "next/navigation";
import { EyeIcon, LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminBranchTablesQuery } from "@/hooks/queries/useAdminBranchTablesQuery";
import type { TableListParams } from "@/types/admin";

const statusConfig: Record<number, { label: string; badge: "default" | "secondary" | "outline" | "destructive"; cardBorder: string; cardBg: string }> = {
  0: { label: "Available", badge: "default", cardBorder: "border-emerald-500/30", cardBg: "bg-emerald-500/5" },
  1: { label: "Occupied", badge: "outline", cardBorder: "border-amber-500/30", cardBg: "bg-amber-500/5" },
  2: { label: "Reserved", badge: "default", cardBorder: "border-blue-500/30", cardBg: "bg-blue-500/5" },
  3: { label: "Disabled", badge: "secondary", cardBorder: "border-gray-400/30", cardBg: "bg-gray-400/5" },
};

const formatTime = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { timeStyle: "short" }).format(new Date(value));
};

type BranchTablesGridProps = {
  branchId: string;
  search: string;
  status: string;
  pageNumber: number;
  onPageChange: (page: number) => void;
  enabled: boolean;
};

export const BranchTablesGrid = ({ branchId, search, status, pageNumber, onPageChange, enabled }: BranchTablesGridProps) => {
  const router = useRouter();

  const params: TableListParams = {
    pageNumber,
    pageSize: 20,
    search,
    status: status === "all" ? undefined : Number(status) as 0 | 1 | 2 | 3,
  };

  const tablesQuery = useAdminBranchTablesQuery({ branchId, ...params }, enabled);

  const items = tablesQuery.data?.items || [];
  const totalPages = tablesQuery.data?.totalPages ?? 1;
  const totalItems = tablesQuery.data?.totalItems ?? 0;

  if (tablesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoaderCircle className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  if (tablesQuery.isError) {
    return <p className="text-destructive py-8 text-center text-sm">Unable to load tables.</p>;
  }

  if (items.length === 0) {
    return <p className="text-muted-foreground py-8 text-center text-sm">No tables found.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((table) => {
          const config = statusConfig[table.status] || statusConfig[3];

          return (
            <div
              key={table.tableId}
              className={`border-border/60 ${config.cardBg} ${config.cardBorder} bg-surface-container-lowest flex flex-col rounded-3xl border p-5 shadow-sm transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-on-surface text-2xl font-black tracking-tight">{table.tableNumber}</p>
                  <p className="text-muted-foreground text-sm">Capacity: {table.capacity}</p>
                </div>
                <Badge variant={config.badge} className="rounded-full px-3 py-1 text-[11px]">
                  {config.label}
                </Badge>
              </div>

              {table.currentSession ? (
                <div className="border-border/40 mt-4 space-y-2 rounded-2xl border bg-white/50 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface font-bold tracking-wide">{table.currentSession.sessionCode}</span>
                    <Badge variant={table.currentSession.isActive ? "default" : "secondary"} className="rounded-full px-2 py-0.5 text-[10px]">
                      {table.currentSession.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Opened: {formatTime(table.currentSession.createdAt)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Expires: {formatTime(table.currentSession.expiresAt)}
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-center rounded-2xl border border-dashed py-3 text-sm text-gray-400">
                  No active session
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <p className="text-muted-foreground text-[11px]">
                  {table.isActive ? "Active" : "Inactive"}
                </p>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                  onClick={() => router.push(`/admin/branches/${branchId}/tables/${table.tableId}`)}
                >
                  <EyeIcon className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-border/60 bg-surface-container-lowest flex flex-col gap-3 rounded-3xl border px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Showing page{" "}
          <span className="text-on-surface font-semibold">{tablesQuery.data?.pageNumber ?? 1}</span> of{" "}
          {totalPages} &middot; {totalItems} tables
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={pageNumber <= 1 || tablesQuery.isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => onPageChange(pageNumber + 1)}
            disabled={pageNumber >= totalPages || tablesQuery.isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
