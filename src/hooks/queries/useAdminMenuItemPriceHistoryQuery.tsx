"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getMenuItemPriceHistory } from "@/services/admin";
import type { PriceHistoryRecord } from "@/types/admin";

export const useAdminMenuItemPriceHistoryQuery = (menuItemId: string | null, enabled = true) => {
  return useQuery<PriceHistoryRecord[], PriceHistoryRecord[]>({
    queryKey: [QUERY_KEY.ADMIN_MENU_ITEM_PRICE_HISTORY, String(menuItemId)],
    queryFn: async () => {
      const response = await getMenuItemPriceHistory(menuItemId!);
      return response.data.result;
    },
    enabled: enabled && Boolean(menuItemId),
  });
};
