"use client";

import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getBranchSessions } from "@/services/admin";
import type { SessionRecord } from "@/types/admin";

export const useAdminBranchSessionsQuery = (branchId: string | null, enabled = true) => {
  return useQuery<SessionRecord[], SessionRecord[]>({
    queryKey: [QUERY_KEY.ADMIN_BRANCH_SESSIONS, String(branchId)],
    queryFn: async () => {
      const response = await getBranchSessions(branchId!);
      return response.data.result;
    },
    enabled: enabled && Boolean(branchId),
    refetchInterval: 30000,
  });
};
