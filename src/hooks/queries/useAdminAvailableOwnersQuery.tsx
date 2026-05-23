"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getAvailableOwners } from "@/services/admin";
import type { OwnerRecord } from "@/types/admin";

type AvailableOwnersResponse = {
  items: OwnerRecord[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export const useAdminAvailableOwnersQuery = (enabled = true) => {
  return useQuery<AvailableOwnersResponse, AvailableOwnersResponse>({
    queryKey: [QUERY_KEY.ADMIN_OWNERS_AVAILABLE],
    queryFn: async () => {
      const response = await getAvailableOwners({ pageNumber: 1, pageSize: 100 });
      return response.data.result;
    },
    enabled,
  });
};
