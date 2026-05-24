"use client";

import { useState } from "react";
import { RefreshCcwIcon } from "lucide-react";

import { BranchActiveSessionsTab } from "@/components/admin/branch-active-sessions-tab";
import { BranchTablesGrid } from "@/components/admin/branch-tables-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QUERY_KEY } from "@/constants/queryKeys";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

type BranchTablesTabProps = {
  branchId: string;
  enabled: boolean;
};

export const BranchTablesTab = ({ branchId, enabled }: BranchTablesTabProps) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [activeView, setActiveView] = useState("tables");

  const invalidateTables = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_BRANCH_TABLES, branchId] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ADMIN_BRANCH_SESSIONS, branchId] });
  };

  return (
    <div className="space-y-4">
      <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
        <CardContent className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center">
          <div className="relative w-full max-w-md">
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search by table number"
              className="bg-background border-border/60 h-10 rounded-2xl pl-4"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={status} onValueChange={(v) => { setStatus(v); setPageNumber(1); }}>
              <SelectTrigger className="bg-background border-border/60 h-10 min-w-36 rounded-2xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="OCCUPIED">Occupied</SelectItem>
                <SelectItem value="RESERVED">Reserved</SelectItem>
                <SelectItem value="DISABLED">Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="border-border/60 h-10 w-10 rounded-xl"
              onClick={invalidateTables}
            >
              <RefreshCcwIcon className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border-border/60 bg-surface-container-lowest inline-flex items-center rounded-2xl border p-1 shadow-sm">
        {["tables", "sessions"].map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setActiveView(view)}
            className={cn(
              "rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200",
              activeView === view
                ? "bg-background text-on-surface shadow-sm"
                : "text-muted-foreground hover:text-on-surface"
            )}
          >
            {view === "tables" ? "Tables" : "Active Sessions"}
          </button>
        ))}
      </div>

      {activeView === "tables" ? (
        <BranchTablesGrid
          branchId={branchId}
          search={search}
          status={status}
          pageNumber={pageNumber}
          onPageChange={setPageNumber}
          enabled={enabled}
        />
      ) : (
        <BranchActiveSessionsTab branchId={branchId} enabled={enabled} />
      )}
    </div>
  );
};
