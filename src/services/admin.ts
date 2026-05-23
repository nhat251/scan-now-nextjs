import { axiosBasic } from "@/services/axiosBasic";
import type {
  ApiResponse,
  AuthResponse,
  BranchListParams,
  BranchRecord,
  CreateOwnerPayload,
  CreateRestaurantPayload,
  LoginPayload,
  OwnerListParams,
  OwnerRecord,
  PaginatedBranchesResponse,
  PaginatedOwnersResponse,
  PaginatedRestaurantsResponse,
  RestaurantListParams,
  RestaurantRecord,
  UpdateOwnerPayload,
  UpdateRestaurantPayload,
} from "@/types/admin";

const buildOwnerParams = (params: OwnerListParams) => {
  return {
    PageNumber: params.pageNumber,
    PageSize: params.pageSize,
    Search: params.search || undefined,
    IsActive: params.isActive,
    IsBanned: params.isBanned,
    SortBy: params.sortBy,
    SortDirection: params.sortDirection,
  };
};

const buildRestaurantParams = (params: RestaurantListParams) => {
  return {
    PageNumber: params.pageNumber,
    PageSize: params.pageSize,
    Search: params.search || undefined,
    IsActive: params.isActive,
    SortBy: params.sortBy,
    SortDirection: params.sortDirection,
  };
};

const buildBranchParams = (params: BranchListParams) => {
  return {
    PageNumber: params.pageNumber,
    PageSize: params.pageSize,
    Search: params.search || undefined,
    IsActive: params.isActive,
    SortBy: params.sortBy,
    SortDirection: params.sortDirection,
  };
};

export const loginAdmin = async (payload: LoginPayload) => {
  return await axiosBasic.post<ApiResponse<AuthResponse>>("/api/auth/login", payload);
};

export const getOwners = async (params: OwnerListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedOwnersResponse>>("/api/admin/users/owners", {
    params: buildOwnerParams(params),
  });
};

export const createOwner = async (payload: CreateOwnerPayload) => {
  return await axiosBasic.post<ApiResponse<OwnerRecord>>("/api/admin/users/owners", payload);
};

export const updateOwner = async ({ id, payload }: { id: string; payload: UpdateOwnerPayload }) => {
  return await axiosBasic.put<ApiResponse<OwnerRecord>>(`/api/admin/users/owners/${id}`, payload);
};

export const banOwner = async (id: string) => {
  return await axiosBasic.patch<ApiResponse<null>>(`/api/admin/users/owners/${id}/ban`);
};

export const unbanOwner = async (id: string) => {
  return await axiosBasic.patch<ApiResponse<null>>(`/api/admin/users/owners/${id}/unban`);
};

export const getRestaurants = async (params: RestaurantListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedRestaurantsResponse>>("/api/admin/restaurants", {
    params: buildRestaurantParams(params),
  });
};

export const getRestaurantById = async (id: string) => {
  return await axiosBasic.get<ApiResponse<RestaurantRecord>>(`/api/admin/restaurants/${id}`);
};

export const createRestaurant = async (payload: CreateRestaurantPayload) => {
  return await axiosBasic.post<ApiResponse<RestaurantRecord>>("/api/admin/restaurants", payload);
};

export const updateRestaurant = async ({ id, payload }: { id: string; payload: UpdateRestaurantPayload }) => {
  return await axiosBasic.put<ApiResponse<RestaurantRecord>>(`/api/admin/restaurants/${id}`, payload);
};

export const banRestaurant = async (id: string) => {
  return await axiosBasic.patch<ApiResponse<RestaurantRecord>>(`/api/admin/restaurants/${id}/ban`);
};

export const unbanRestaurant = async (id: string) => {
  return await axiosBasic.patch<ApiResponse<RestaurantRecord>>(`/api/admin/restaurants/${id}/unban`);
};

export const getRestaurantBranches = async (restaurantId: string, params: BranchListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedBranchesResponse>>(`/api/admin/restaurants/${restaurantId}/branches`, {
    params: buildBranchParams(params),
  });
};

export const getBranchDetail = async (restaurantId: string, branchId: string) => {
  return await axiosBasic.get<ApiResponse<BranchRecord>>(`/api/admin/restaurants/${restaurantId}/branches/${branchId}`);
};

export const getAvailableOwners = async (params: { pageNumber: number; pageSize: number }) => {
  return await axiosBasic.get<ApiResponse<{ items: OwnerRecord[]; pageNumber: number; pageSize: number; totalItems: number; totalPages: number }>>(
    "/api/admin/users/owners/available",
    { params }
  );
};
