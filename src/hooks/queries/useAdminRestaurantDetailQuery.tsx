"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getRestaurantDetail } from "@/services/admin";
import type { RestaurantRecord } from "@/types/admin";

export const useAdminRestaurantDetailQuery = (identifier: string | null, enabled = true) => {
  return useQuery<RestaurantRecord, RestaurantRecord>({
    queryKey: [QUERY_KEY.ADMIN_RESTAURANT_DETAIL, String(identifier)],
    queryFn: async () => {
      const response = await getRestaurantDetail(identifier!);
      return response.data.result;
    },
    enabled: enabled && Boolean(identifier),
  });
};
