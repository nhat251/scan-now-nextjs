"use client";

import { LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminBranchSessionsQuery } from "@/hooks/queries/useAdminBranchSessionsQuery";

type BranchActiveSessionsTabProps = {
  branchId: string;
  enabled: boolean;
};

const formatTime = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
};

export const BranchActiveSessionsTab = ({ branchId, enabled }: BranchActiveSessionsTabProps) => {
  const sessionsQuery = useAdminBranchSessionsQuery(branchId, enabled);

  const items = sessionsQuery.data ?? [];

  return (
    <div className="border-border/60 bg-surface-container-lowest overflow-hidden rounded-3xl border shadow-sm">
      <Table>
        <TableHeader className="bg-surface-container-low/60">
          <TableRow className="border-border/60 hover:bg-transparent">
            <TableHead className="text-on-surface-variant/80 px-6 py-4 text-xs font-black tracking-[0.22em] uppercase">Session Code</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Table</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Branch</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Opened At</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Expires At</TableHead>
            <TableHead className="text-on-surface-variant/80 text-xs font-black tracking-[0.22em] uppercase">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessionsQuery.isLoading ? (
            <TableRow>
              <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={6}>
                <LoaderCircle className="mx-auto size-5 animate-spin" />
              </TableCell>
            </TableRow>
          ) : sessionsQuery.isError ? (
            <TableRow>
              <TableCell className="text-destructive px-6 py-10 text-center text-sm" colSpan={6}>
                Unable to load sessions.
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell className="text-muted-foreground px-6 py-10 text-center text-sm" colSpan={6}>
                No active sessions found.
              </TableCell>
            </TableRow>
          ) : (
            items.map((session) => (
              <TableRow key={session.sessionId} className="border-border/40">
                <TableCell className="px-6 py-4">
                  <p className="text-on-surface font-bold tracking-wide">{session.sessionCode}</p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p>{session.tableNumber}</p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p>{session.branchName}</p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p>{formatTime(session.openedAt)}</p>
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <p>{formatTime(session.expiresAt)}</p>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant={session.isActive ? "default" : "secondary"} className="rounded-full px-2.5 py-1">
                    {session.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
