"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { getRestaurants } from "@/services/admin";
import type { PaginatedRestaurantsResponse, RestaurantListParams } from "@/types/admin";

type UseAdminRestaurantsQueryParams = RestaurantListParams & {
  delay?: number;
};

export const useAdminRestaurantsQuery = (
  { delay = 400, search, ...params }: UseAdminRestaurantsQueryParams,
  enabled = true
) => {
  const debouncedSearch = useDebounce(search || "", delay);

  return useQuery<PaginatedRestaurantsResponse, PaginatedRestaurantsResponse>({
    queryKey: [
      QUERY_KEY.ADMIN_RESTAURANTS,
      String(params.pageNumber),
      String(params.pageSize),
      debouncedSearch,
      params.isActive === undefined ? "any" : String(params.isActive),
    ],
    queryFn: async () => {
      const response = await getRestaurants({ ...params, search: debouncedSearch });
      return response.data.result;
    },
    enabled,
  });
};
