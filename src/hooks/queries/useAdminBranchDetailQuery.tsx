"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getBranchDetail } from "@/services/admin";
import type { BranchRecord } from "@/types/admin";

export const useAdminBranchDetailQuery = (
  restaurantId: string | null,
  branchId: string | null,
  enabled = true
) => {
  return useQuery<BranchRecord, BranchRecord>({
    queryKey: [QUERY_KEY.ADMIN_BRANCH_DETAIL, String(restaurantId), String(branchId)],
    queryFn: async () => {
      const response = await getBranchDetail(restaurantId!, branchId!);
      return response.data.result;
    },
    enabled: enabled && Boolean(restaurantId) && Boolean(branchId),
  });
};
