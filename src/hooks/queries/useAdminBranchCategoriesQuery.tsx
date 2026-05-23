"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { getBranchCategories } from "@/services/admin";
import type { CategoryListParams, PaginatedCategoriesResponse } from "@/types/admin";

type UseAdminBranchCategoriesQueryParams = CategoryListParams & {
  branchId: string;
  delay?: number;
};

export const useAdminBranchCategoriesQuery = (
  { branchId, delay = 400, search, ...params }: UseAdminBranchCategoriesQueryParams,
  enabled = true
) => {
  const debouncedSearch = useDebounce(search || "", delay);

  return useQuery<PaginatedCategoriesResponse, PaginatedCategoriesResponse>({
    queryKey: [
      QUERY_KEY.ADMIN_BRANCH_CATEGORIES,
      branchId,
      String(params.pageNumber),
      String(params.pageSize),
      debouncedSearch,
      params.isActive === undefined ? "any" : String(params.isActive),
    ],
    queryFn: async () => {
      const response = await getBranchCategories(branchId, { ...params, search: debouncedSearch });
      return response.data.result;
    },
    enabled: enabled && Boolean(branchId),
  });
};
