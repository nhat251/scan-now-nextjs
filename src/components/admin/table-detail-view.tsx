"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CalendarDaysIcon, CircleCheckBigIcon, CircleXIcon, ClockIcon, HashIcon, UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminBranchTableDetailQuery } from "@/hooks/queries/useAdminBranchTableDetailQuery";
import { cn } from "@/lib/utils";

type TableDetailViewProps = {
  branchId: string;
  tableId: string;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

const formatTime = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { timeStyle: "short" }).format(new Date(value));
};

const statusConfig: Record<number, { label: string; color: string }> = {
  0: { label: "Available", color: "bg-emerald-500/10 text-emerald-600" },
  1: { label: "Occupied", color: "bg-amber-500/10 text-amber-600" },
  2: { label: "Reserved", color: "bg-blue-500/10 text-blue-600" },
  3: { label: "Disabled", color: "bg-gray-400/10 text-gray-500" },
};

const DetailRow = ({ icon: Icon, label, value, className, iconClass }: { icon: React.ElementType; label: string; value: React.ReactNode; className?: string; iconClass?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", iconClass || "bg-primary/10 text-primary")}>
      <Icon className="size-[18px]" />
    </div>
    <div className="min-w-0">
      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{label}</p>
      <p className="text-on-surface text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export const TableDetailView = ({ branchId, tableId }: TableDetailViewProps) => {
  const router = useRouter();

  const tableQuery = useAdminBranchTableDetailQuery(branchId, tableId, true);

  if (tableQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading table details...</p>
      </div>
    );
  }

  if (tableQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-destructive text-sm">Unable to load table details.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push(`/admin/branches/${branchId}`)}>
          Back to Branch
        </Button>
      </div>
    );
  }

  const table = tableQuery.data;

  if (!table) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground text-sm">Table not found.</p>
        <Button variant="outline" className="rounded-xl" onClick={() => router.push(`/admin/branches/${branchId}`)}>
          Back to Branch
        </Button>
      </div>
    );
  }

  const statusInfo = statusConfig[table.status] || statusConfig[3];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push(`/admin/branches/${branchId}`)}
        >
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div>
          <h1 className="text-on-surface text-2xl font-black tracking-tight sm:text-3xl">Table {table.tableNumber}</h1>
          <p className="text-on-surface-variant text-sm">{table.branchName}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Table Information</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailRow icon={HashIcon} label="Table Number" value={table.tableNumber} />
                <DetailRow icon={UsersIcon} label="Capacity" value={`${table.capacity} persons`} />
                <DetailRow
                  icon={table.isActive ? CircleCheckBigIcon : CircleXIcon}
                  label="Active"
                  value={table.isActive ? "Yes" : "No"}
                  iconClass={table.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}
                />
                <DetailRow
                  icon={CircleCheckBigIcon}
                  label="Status"
                  value={statusInfo.label}
                  iconClass={statusInfo.color}
                />
              </div>
            </CardContent>
          </Card>

          {table.currentSession ? (
            <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Current Session</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailRow icon={HashIcon} label="Session ID" value={table.currentSession.sessionId} />
                  <DetailRow icon={HashIcon} label="Session Code" value={table.currentSession.sessionCode} />
                  <DetailRow icon={CalendarDaysIcon} label="Opened At" value={formatDate(table.currentSession.createdAt) + " " + formatTime(table.currentSession.createdAt)} />
                  <DetailRow icon={ClockIcon} label="Expires At" value={formatDate(table.currentSession.expiresAt) + " " + formatTime(table.currentSession.expiresAt)} />
                  <DetailRow
                    icon={table.currentSession.isActive ? CircleCheckBigIcon : CircleXIcon}
                    label="Status"
                    value={table.currentSession.isActive ? "Active" : "Inactive"}
                    iconClass={table.currentSession.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}
                  />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Table Status</span>
                <Badge variant={
                  table.status === 0 ? "default" :
                  table.status === 1 ? "outline" :
                  table.status === 2 ? "default" : "secondary"
                } className={`rounded-full px-3 py-1 ${
                  table.status === 1 ? "border-amber-500 text-amber-600" : ""
                }`}>
                  {statusInfo.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {!table.currentSession ? (
            <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Current Session</h3>
                <div className="flex items-center justify-center rounded-2xl border border-dashed py-6 text-sm text-gray-400">
                  No active session
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">System</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <CalendarDaysIcon className="text-muted-foreground size-4 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Created</p>
                    <p className="text-on-surface text-sm font-medium">{formatDate(table.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="text-muted-foreground size-4 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Updated</p>
                    <p className="text-on-surface text-sm font-medium">
                      {table.updatedAt ? formatDate(table.updatedAt) : "Not updated"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
