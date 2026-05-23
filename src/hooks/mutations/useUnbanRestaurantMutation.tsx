"use client";

import useMutation from "@/hooks/useMutation";
import { unbanRestaurant } from "@/services/admin";
import type { ApiResponse, RestaurantRecord } from "@/types/admin";

export const useUnbanRestaurantMutation = () => {
  return useMutation<string, ApiResponse<RestaurantRecord>>({
    mutationFn: async (id) => {
      const response = await unbanRestaurant(id);
      return response.data;
    },
    hasLoading: true,
  });
};
