"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getBranchCategoryDetail } from "@/services/admin";
import type { CategoryRecord } from "@/types/admin";

export const useAdminBranchCategoryDetailQuery = (
  branchId: string | null,
  categoryId: string | null,
  enabled = true
) => {
  return useQuery<CategoryRecord, CategoryRecord>({
    queryKey: [QUERY_KEY.ADMIN_BRANCH_CATEGORY_DETAIL, String(branchId), String(categoryId)],
    queryFn: async () => {
      const response = await getBranchCategoryDetail(branchId!, categoryId!);
      return response.data.result;
    },
    enabled: enabled && Boolean(branchId) && Boolean(categoryId),
  });
};
