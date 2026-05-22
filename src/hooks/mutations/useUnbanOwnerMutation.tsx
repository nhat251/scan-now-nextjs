"use client";

import useMutation from "@/hooks/useMutation";
import { unbanOwner } from "@/services/admin";
import type { ApiResponse } from "@/types/admin";

export const useUnbanOwnerMutation = () => {
  return useMutation<string, ApiResponse<null>>({
    mutationFn: async (id) => {
      const response = await unbanOwner(id);
      return response.data;
    },
    hasLoading: true,
  });
};
