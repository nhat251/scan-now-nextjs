import { axiosBasic } from "@/services/axiosBasic";
import type {
  AdminDashboardReportResponse,
  ApiResponse,
  AuthResponse,
  BranchListParams,
  BranchRecord,
  CategoryListParams,
  CategoryRecord,
  CreateOwnerPayload,
  CreateRestaurantPayload,
  LoginPayload,
  MenuItemRecord,
  MenuItemsListParams,
  OwnerListParams,
  OwnerRecord,
  PaginatedBranchesResponse,
  PaginatedCategoriesResponse,
  PaginatedMenuItemsResponse,
  PaginatedOwnersResponse,
  PaginatedRestaurantsResponse,
  PaginatedTablesResponse,
  PriceHistoryRecord,
  RestaurantListParams,
  RestaurantRecord,
  SessionRecord,
  TableListParams,
  TableRecord,
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

const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isGuid = (value: string) => guidPattern.test(value);

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

export const getRestaurantBySlug = async (slug: string) => {
  return await axiosBasic.get<ApiResponse<RestaurantRecord>>(`/api/admin/restaurants/by-slug/${encodeURIComponent(slug)}`);
};

export const getRestaurantDetail = (identifier: string) => {
  return isGuid(identifier) ? getRestaurantById(identifier) : getRestaurantBySlug(identifier);
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

export const getRestaurantBranchesBySlug = async (restaurantSlug: string, params: BranchListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedBranchesResponse>>(`/api/admin/restaurants/by-slug/${encodeURIComponent(restaurantSlug)}/branches`, {
    params: buildBranchParams(params),
  });
};

export const getRestaurantBranchesByIdentifier = (restaurantIdentifier: string, params: BranchListParams) => {
  return isGuid(restaurantIdentifier)
    ? getRestaurantBranches(restaurantIdentifier, params)
    : getRestaurantBranchesBySlug(restaurantIdentifier, params);
};

export const getBranchDetail = async (restaurantId: string, branchId: string) => {
  return await axiosBasic.get<ApiResponse<BranchRecord>>(`/api/admin/restaurants/${restaurantId}/branches/${branchId}`);
};

export const getBranchDetailBySlug = async (restaurantSlug: string, branchSlug: string) => {
  return await axiosBasic.get<ApiResponse<BranchRecord>>(
    `/api/admin/restaurants/by-slug/${encodeURIComponent(restaurantSlug)}/branches/${encodeURIComponent(branchSlug)}`
  );
};

export const getBranchDetailByIdentifier = (restaurantIdentifier: string, branchIdentifier: string) => {
  return isGuid(restaurantIdentifier) && isGuid(branchIdentifier)
    ? getBranchDetail(restaurantIdentifier, branchIdentifier)
    : getBranchDetailBySlug(restaurantIdentifier, branchIdentifier);
};

export const getAvailableOwners = async (params: { pageNumber: number; pageSize: number }) => {
  return await axiosBasic.get<ApiResponse<{ items: OwnerRecord[]; pageNumber: number; pageSize: number; totalItems: number; totalPages: number }>>(
    "/api/admin/users/owners/available",
    { params }
  );
};

const buildCategoryParams = (params: CategoryListParams) => {
  return {
    PageNumber: params.pageNumber,
    PageSize: params.pageSize,
    Search: params.search || undefined,
    IsActive: params.isActive,
    SortBy: params.sortBy,
    SortDirection: params.sortDirection,
  };
};

const buildMenuItemsParams = (params: MenuItemsListParams) => {
  return {
    PageNumber: params.pageNumber,
    PageSize: params.pageSize,
    Search: params.search || undefined,
    IsActive: params.isActive,
    IsAvailable: params.isAvailable,
    IsFeatured: params.isFeatured,
    CategoryId: params.categoryId,
    SortBy: params.sortBy,
    SortDirection: params.sortDirection,
  };
};

export const getBranchCategories = async (branchId: string, params: CategoryListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedCategoriesResponse>>(
    `/api/admin/branches/${branchId}/categories`,
    { params: buildCategoryParams(params) }
  );
};

export const getBranchCategoryDetail = async (branchId: string, categoryId: string) => {
  return await axiosBasic.get<ApiResponse<CategoryRecord>>(
    `/api/admin/branches/${branchId}/categories/${categoryId}`
  );
};

export const getBranchMenuItems = async (branchId: string, params: MenuItemsListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedMenuItemsResponse>>(
    `/api/admin/branches/${branchId}/menu-items`,
    { params: buildMenuItemsParams(params) }
  );
};

export const getMenuItemDetail = async (menuItemId: string) => {
  return await axiosBasic.get<ApiResponse<MenuItemRecord>>(`/api/admin/menu-items/${menuItemId}`);
};

export const getMenuItemPriceHistory = async (menuItemId: string) => {
  return await axiosBasic.get<ApiResponse<PriceHistoryRecord[]>>(
    `/api/admin/menu-items/${menuItemId}/price-history`
  );
};

const buildTableParams = (params: TableListParams) => {
  return {
    PageNumber: params.pageNumber,
    PageSize: params.pageSize,
    Search: params.search || undefined,
    Status: params.status,
    IsActive: params.isActive,
    SortBy: params.sortBy,
    SortDirection: params.sortDirection,
  };
};

export const getBranchTables = async (branchId: string, params: TableListParams) => {
  return await axiosBasic.get<ApiResponse<PaginatedTablesResponse>>(
    `/api/admin/branches/${branchId}/tables`,
    { params: buildTableParams(params) }
  );
};

export const getBranchTableDetail = async (branchId: string, tableId: string) => {
  return await axiosBasic.get<ApiResponse<TableRecord>>(
    `/api/admin/branches/${branchId}/tables/${tableId}`
  );
};

export const getBranchSessions = async (branchId: string) => {
  return await axiosBasic.get<ApiResponse<SessionRecord[]>>(
    `/api/admin/branches/${branchId}/sessions`
  );
};

export const getAdminDashboardReport = async () => {
  return await axiosBasic.get<ApiResponse<AdminDashboardReportResponse>>("/api/admin/reports/dashboard");
};
