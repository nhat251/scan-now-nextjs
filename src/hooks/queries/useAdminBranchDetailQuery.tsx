"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getBranchDetailByIdentifier } from "@/services/admin";
import type { BranchRecord } from "@/types/admin";

export const useAdminBranchDetailQuery = (
  restaurantIdentifier: string | null,
  branchIdentifier: string | null,
  enabled = true
) => {
  return useQuery<BranchRecord, BranchRecord>({
    queryKey: [QUERY_KEY.ADMIN_BRANCH_DETAIL, String(restaurantIdentifier), String(branchIdentifier)],
    queryFn: async () => {
      const response = await getBranchDetailByIdentifier(restaurantIdentifier!, branchIdentifier!);
      return response.data.result;
    },
    enabled: enabled && Boolean(restaurantIdentifier) && Boolean(branchIdentifier),
  });
};
