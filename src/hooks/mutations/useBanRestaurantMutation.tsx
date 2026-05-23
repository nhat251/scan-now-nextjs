"use client";

import useMutation from "@/hooks/useMutation";
import { banRestaurant } from "@/services/admin";
import type { ApiResponse, RestaurantRecord } from "@/types/admin";

export const useBanRestaurantMutation = () => {
  return useMutation<string, ApiResponse<RestaurantRecord>>({
    mutationFn: async (id) => {
      const response = await banRestaurant(id);
      return response.data;
    },
    hasLoading: true,
  });
};
