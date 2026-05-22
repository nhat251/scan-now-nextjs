"use client";

import useMutation from "@/hooks/useMutation";
import { banOwner } from "@/services/admin";
import type { ApiResponse } from "@/types/admin";

export const useBanOwnerMutation = () => {
  return useMutation<string, ApiResponse<null>>({
    mutationFn: async (id) => {
      const response = await banOwner(id);
      return response.data;
    },
    hasLoading: true,
  });
};
