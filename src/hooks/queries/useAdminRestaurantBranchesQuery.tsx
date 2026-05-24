"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { getRestaurantBranchesByIdentifier } from "@/services/admin";
import type { BranchListParams, PaginatedBranchesResponse } from "@/types/admin";

type UseAdminRestaurantBranchesQueryParams = BranchListParams & {
  restaurantIdentifier: string;
  delay?: number;
};

export const useAdminRestaurantBranchesQuery = (
  { restaurantIdentifier, delay = 400, search, ...params }: UseAdminRestaurantBranchesQueryParams,
  enabled = true
) => {
  const debouncedSearch = useDebounce(search || "", delay);

  return useQuery<PaginatedBranchesResponse, PaginatedBranchesResponse>({
    queryKey: [
      QUERY_KEY.ADMIN_RESTAURANT_BRANCHES,
      restaurantIdentifier,
      String(params.pageNumber),
      String(params.pageSize),
      debouncedSearch,
      params.isActive === undefined ? "any" : String(params.isActive),
    ],
    queryFn: async () => {
      const response = await getRestaurantBranchesByIdentifier(restaurantIdentifier, { ...params, search: debouncedSearch });
      return response.data.result;
    },
    enabled: enabled && Boolean(restaurantIdentifier),
  });
};
