"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getBranchTableDetail } from "@/services/admin";
import type { TableRecord } from "@/types/admin";

export const useAdminBranchTableDetailQuery = (
  branchId: string | null,
  tableId: string | null,
  enabled = true
) => {
  return useQuery<TableRecord, TableRecord>({
    queryKey: [QUERY_KEY.ADMIN_BRANCH_TABLE_DETAIL, String(branchId), String(tableId)],
    queryFn: async () => {
      const response = await getBranchTableDetail(branchId!, tableId!);
      return response.data.result;
    },
    enabled: enabled && Boolean(branchId) && Boolean(tableId),
  });
};
