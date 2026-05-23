"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { getBranchMenuItems } from "@/services/admin";
import type { MenuItemsListParams, PaginatedMenuItemsResponse } from "@/types/admin";

type UseAdminBranchMenuItemsQueryParams = MenuItemsListParams & {
  branchId: string;
  delay?: number;
};

export const useAdminBranchMenuItemsQuery = (
  { branchId, delay = 400, search, ...params }: UseAdminBranchMenuItemsQueryParams,
  enabled = true
) => {
  const debouncedSearch = useDebounce(search || "", delay);

  return useQuery<PaginatedMenuItemsResponse, PaginatedMenuItemsResponse>({
    queryKey: [
      QUERY_KEY.ADMIN_BRANCH_MENU_ITEMS,
      branchId,
      String(params.pageNumber),
      String(params.pageSize),
      debouncedSearch,
      params.isActive === undefined ? "any" : String(params.isActive),
      params.isAvailable === undefined ? "any" : String(params.isAvailable),
      params.isFeatured === undefined ? "any" : String(params.isFeatured),
      params.categoryId || "all",
    ],
    queryFn: async () => {
      const response = await getBranchMenuItems(branchId, { ...params, search: debouncedSearch });
      return response.data.result;
    },
    enabled: enabled && Boolean(branchId),
  });
};
