"use client";

import { useMemo, useState } from "react";

import { AdminKpiCards } from "@/components/admin/admin-kpi-cards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CreateOwnerDialog } from "@/components/admin/create-owner-dialog";
import { OwnerFilters } from "@/components/admin/owner-filters";
import { OwnersTable } from "@/components/admin/owners-table";
import { QUERY_KEY } from "@/constants/queryKeys";
import { useBanOwnerMutation } from "@/hooks/mutations/useBanOwnerMutation";
import { useCreateOwnerMutation } from "@/hooks/mutations/useCreateOwnerMutation";
import { useUnbanOwnerMutation } from "@/hooks/mutations/useUnbanOwnerMutation";
import { useUpdateOwnerMutation } from "@/hooks/mutations/useUpdateOwnerMutation";
import { useAdminOwnersQuery } from "@/hooks/queries/useAdminOwnersQuery";
import { showNotify } from "@/stores/global";
import type { CreateOwnerPayload, OwnerRecord, OwnerStatusFilter, UpdateOwnerPayload } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";

type OwnerManagementViewProps = {
  isAuthorized: boolean;
};

const getFilterParams = (status: OwnerStatusFilter) => {
  if (status === "active") {
    return {
      isActive: true,
      isBanned: false,
    };
  }

  if (status === "banned") {
    return {
      isBanned: true,
    };
  }

  return {};
};

export const OwnerManagementView = ({ isAuthorized }: OwnerManagementViewProps) => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<OwnerRecord | null>(null);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState<OwnerStatusFilter>("all");

  const queryParams = useMemo(
    () => ({
      pageNumber,
      pageSize,
      search,
      ...getFilterParams(status),
    }),
    [pageNumber, pageSize, search, status]
  );

  const ownersQuery = useAdminOwnersQuery({ ...queryParams, delay: 400 }, isAuthorized);
  const createOwnerMutation = useCreateOwnerMutation();
  const updateOwnerMutation = useUpdateOwnerMutation();
  const banOwnerMutation = useBanOwnerMutation();
  const unbanOwnerMutation = useUnbanOwnerMutation();

  const invalidateOwners = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.ADMIN_OWNERS],
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };

  const handleStatusChange = (value: OwnerStatusFilter) => {
    setStatus(value);
    setPageNumber(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPageNumber(1);
  };

  const handleCreateOwner = async (payload: CreateOwnerPayload) => {
    const response = await createOwnerMutation.mutateAsync(payload);
    showNotify({
      type: "success",
      message: response.message || "Owner created successfully",
    });
    setDialogOpen(false);
    setSelectedOwner(null);
    await invalidateOwners();
  };

  const handleUpdateOwner = async (id: string, payload: UpdateOwnerPayload) => {
    const response = await updateOwnerMutation.mutateAsync({ id, payload });
    showNotify({
      type: "success",
      message: response.message || "Owner updated successfully",
    });
    setDialogOpen(false);
    setSelectedOwner(null);
    await invalidateOwners();
  };

  const handleBanOwner = async (owner: OwnerRecord) => {
    const response = await banOwnerMutation.mutateAsync(owner.userId);
    showNotify({
      type: "success",
      message: response.message || `${owner.fullName} has been banned`,
    });
    await invalidateOwners();
  };

  const handleUnbanOwner = async (owner: OwnerRecord) => {
    const response = await unbanOwnerMutation.mutateAsync(owner.userId);
    showNotify({
      type: "success",
      message: response.message || `${owner.fullName} has been unbanned`,
    });
    await invalidateOwners();
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <AdminPageHeader
        onCreateOwner={() => {
          setSelectedOwner(null);
          setDialogOpen(true);
        }}
      />

      <AdminKpiCards ownersPage={ownersQuery.data} />

      <OwnerFilters
        search={search}
        status={status}
        pageSize={pageSize}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <OwnersTable
        ownersPage={ownersQuery.data}
        isLoading={ownersQuery.isLoading || ownersQuery.isFetching}
        isError={ownersQuery.isError}
        isActionPending={banOwnerMutation.isPending || unbanOwnerMutation.isPending}
        onEdit={(owner) => {
          setSelectedOwner(owner);
          setDialogOpen(true);
        }}
        onBan={handleBanOwner}
        onUnban={handleUnbanOwner}
        onPageChange={setPageNumber}
      />

      <CreateOwnerDialog
        open={dialogOpen}
        owner={selectedOwner}
        isSubmitting={createOwnerMutation.isPending || updateOwnerMutation.isPending}
        onClose={() => {
          setDialogOpen(false);
          setSelectedOwner(null);
        }}
        onCreate={handleCreateOwner}
        onUpdate={handleUpdateOwner}
      />
    </div>
  );
};
