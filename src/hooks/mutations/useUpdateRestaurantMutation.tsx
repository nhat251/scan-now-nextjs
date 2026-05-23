"use client";

import useMutation from "@/hooks/useMutation";
import { updateRestaurant } from "@/services/admin";
import type { ApiResponse, RestaurantRecord, UpdateRestaurantPayload } from "@/types/admin";

export const useUpdateRestaurantMutation = () => {
  return useMutation<{ id: string; payload: UpdateRestaurantPayload }, ApiResponse<RestaurantRecord>>({
    mutationFn: async (request) => {
      const response = await updateRestaurant(request);
      return response.data;
    },
    hasLoading: true,
  });
};
