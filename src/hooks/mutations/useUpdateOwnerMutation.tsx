"use client";

import useMutation from "@/hooks/useMutation";
import { updateOwner } from "@/services/admin";
import type { ApiResponse, OwnerRecord, UpdateOwnerPayload } from "@/types/admin";

export const useUpdateOwnerMutation = () => {
  return useMutation<{ id: string; payload: UpdateOwnerPayload }, ApiResponse<OwnerRecord>>({
    mutationFn: async (request) => {
      const response = await updateOwner(request);
      return response.data;
    },
    hasLoading: true,
  });
};
