"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { getBranchTables } from "@/services/admin";
import type { PaginatedTablesResponse, TableListParams } from "@/types/admin";

type UseAdminBranchTablesQueryParams = TableListParams & {
  branchId: string;
  delay?: number;
};

export const useAdminBranchTablesQuery = (
  { branchId, delay = 400, search, ...params }: UseAdminBranchTablesQueryParams,
  enabled = true
) => {
  const debouncedSearch = useDebounce(search || "", delay);

  return useQuery<PaginatedTablesResponse, PaginatedTablesResponse>({
    queryKey: [
      QUERY_KEY.ADMIN_BRANCH_TABLES,
      branchId,
      String(params.pageNumber),
      String(params.pageSize),
      debouncedSearch,
      params.status !== undefined ? String(params.status) : "any",
      params.isActive === undefined ? "any" : String(params.isActive),
    ],
    queryFn: async () => {
      const response = await getBranchTables(branchId, { ...params, search: debouncedSearch });
      return response.data.result;
    },
    enabled: enabled && Boolean(branchId),
    refetchInterval: 30000,
  });
};
