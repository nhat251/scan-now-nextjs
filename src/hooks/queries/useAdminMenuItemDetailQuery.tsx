"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getMenuItemDetail } from "@/services/admin";
import type { MenuItemRecord } from "@/types/admin";

export const useAdminMenuItemDetailQuery = (menuItemId: string | null, enabled = true) => {
  return useQuery<MenuItemRecord, MenuItemRecord>({
    queryKey: [QUERY_KEY.ADMIN_MENU_ITEM_DETAIL, String(menuItemId)],
    queryFn: async () => {
      const response = await getMenuItemDetail(menuItemId!);
      return response.data.result;
    },
    enabled: enabled && Boolean(menuItemId),
  });
};
