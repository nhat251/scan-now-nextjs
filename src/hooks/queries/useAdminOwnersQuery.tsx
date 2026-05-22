"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { getOwners } from "@/services/admin";
import type { OwnerListParams, PaginatedOwnersResponse } from "@/types/admin";

type UseAdminOwnersQueryParams = OwnerListParams & {
  delay?: number;
};

export const useAdminOwnersQuery = ({
  delay = 100,
  search,
  ...params
}: UseAdminOwnersQueryParams, enabled = true) => {
  const debouncedSearch = useDebounce(search || "", delay);

  return useQuery<PaginatedOwnersResponse, PaginatedOwnersResponse>({
    queryKey: [
      QUERY_KEY.ADMIN_OWNERS,
      String(params.pageNumber),
      String(params.pageSize),
      debouncedSearch,
      params.isActive === undefined ? "any" : String(params.isActive),
      params.isBanned === undefined ? "any" : String(params.isBanned),
    ],
    queryFn: async () => {
      const response = await getOwners({
        ...params,
        search: debouncedSearch,
      });
      return response.data.result;
    },
    enabled,
  });
};
