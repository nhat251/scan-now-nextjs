"use client";

import useMutation from "@/hooks/useMutation";
import { createRestaurant } from "@/services/admin";
import type { ApiResponse, CreateRestaurantPayload, RestaurantRecord } from "@/types/admin";

export const useCreateRestaurantMutation = () => {
  return useMutation<CreateRestaurantPayload, ApiResponse<RestaurantRecord>>({
    mutationFn: async (payload) => {
      const response = await createRestaurant(payload);
      return response.data;
    },
    hasLoading: true,
  });
};
