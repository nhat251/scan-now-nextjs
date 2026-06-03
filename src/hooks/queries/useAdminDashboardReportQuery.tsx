import { QUERY_KEY } from "@/constants/queryKeys";
import useQuery from "@/hooks/useQuery";
import { getAdminDashboardReport } from "@/services/admin";
import type { AdminDashboardReportResponse, ApiResponse } from "@/types/admin";
import type { UseQueryResult } from "@tanstack/react-query";

export const useAdminDashboardReportQuery = (enabled = true): UseQueryResult<AdminDashboardReportResponse, Error> => {
  return useQuery<ApiResponse<AdminDashboardReportResponse>, AdminDashboardReportResponse>({
    queryKey: [QUERY_KEY.ADMIN_DASHBOARD_REPORT],
    queryFn: getAdminDashboardReport,
    select: (res) => res.data.result,
    enabled,
  });
};
