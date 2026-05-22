"use client";

import useMutation from "@/hooks/useMutation";
import { createOwner } from "@/services/admin";
import type { ApiResponse, CreateOwnerPayload, OwnerRecord } from "@/types/admin";

export const useCreateOwnerMutation = () => {
  return useMutation<CreateOwnerPayload, ApiResponse<OwnerRecord>>({
    mutationFn: async (payload) => {
      const response = await createOwner(payload);
      return response.data;
    },
    hasLoading: true,
  });
};
