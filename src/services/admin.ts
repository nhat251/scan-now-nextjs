import { axiosBasic } from "@/services/axiosBasic";
import type {
  ApiResponse,
  AuthResponse,
  CreateOwnerPayload,
  LoginPayload,
  OwnerListParams,
  OwnerRecord,
  PaginatedOwnersResponse,
  UpdateOwnerPayload,
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
