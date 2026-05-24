"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { RestaurantFilters } from "@/components/admin/restaurant-filters";
import { RestaurantPageHeader } from "@/components/admin/restaurant-page-header";
import { RestaurantsTable } from "@/components/admin/restaurants-table";
import { QUERY_KEY } from "@/constants/queryKeys";
import { useBanRestaurantMutation } from "@/hooks/mutations/useBanRestaurantMutation";
import { useUnbanRestaurantMutation } from "@/hooks/mutations/useUnbanRestaurantMutation";
import { useAdminRestaurantsQuery } from "@/hooks/queries/useAdminRestaurantsQuery";
import { showNotify } from "@/stores/global";
import type { RestaurantRecord, RestaurantStatusFilter } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";

type RestaurantManagementViewProps = {
  isAuthorized: boolean;
};

const getFilterParams = (status: RestaurantStatusFilter) => {
  if (status === "active") {
    return { isActive: true };
  }
  if (status === "inactive") {
    return { isActive: false };
  }
  return {};
};

export const RestaurantManagementView = ({ isAuthorized }: RestaurantManagementViewProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState<RestaurantStatusFilter>("all");

  const queryParams = useMemo(
    () => ({
      pageNumber,
      pageSize: 10,
      search,
      ...getFilterParams(status),
    }),
    [pageNumber, search, status]
  );

  const restaurantsQuery = useAdminRestaurantsQuery({ ...queryParams, delay: 400 }, isAuthorized);
  const banRestaurantMutation = useBanRestaurantMutation();
  const unbanRestaurantMutation = useUnbanRestaurantMutation();

  const invalidateRestaurants = async () => {
    await queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.ADMIN_RESTAURANTS],
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };

  const handleStatusChange = (value: RestaurantStatusFilter) => {
    setStatus(value);
    setPageNumber(1);
  };

  const handleBanRestaurant = async (restaurant: RestaurantRecord) => {
    const response = await banRestaurantMutation.mutateAsync(restaurant.restaurantId);
    showNotify({
      type: "success",
      message: response.message || `${restaurant.name} has been banned`,
    });
    await invalidateRestaurants();
  };

  const handleUnbanRestaurant = async (restaurant: RestaurantRecord) => {
    const response = await unbanRestaurantMutation.mutateAsync(restaurant.restaurantId);
    showNotify({
      type: "success",
      message: response.message || `${restaurant.name} has been unbanned`,
    });
    await invalidateRestaurants();
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <RestaurantPageHeader
        onCreateRestaurant={() => router.push("/admin/restaurants/create")}
      />

      <RestaurantFilters
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      <RestaurantsTable
        restaurantsPage={restaurantsQuery.data}
        isLoading={restaurantsQuery.isLoading || restaurantsQuery.isFetching}
        isError={restaurantsQuery.isError}
        isActionPending={banRestaurantMutation.isPending || unbanRestaurantMutation.isPending}
        onBan={handleBanRestaurant}
        onUnban={handleUnbanRestaurant}
        onPageChange={setPageNumber}
      />
    </div>
  );
};
