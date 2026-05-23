"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getRestaurantById } from "@/services/admin";
import type { RestaurantRecord } from "@/types/admin";

export const useAdminRestaurantDetailQuery = (id: string | null, enabled = true) => {
  return useQuery<RestaurantRecord, RestaurantRecord>({
    queryKey: [QUERY_KEY.ADMIN_RESTAURANT_DETAIL, String(id)],
    queryFn: async () => {
      const response = await getRestaurantById(id!);
      return response.data.result;
    },
    enabled: enabled && Boolean(id),
  });
};
