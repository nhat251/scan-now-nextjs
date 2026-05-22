export type ApiResponse<T> = {
  result: T;
  code: number;
  message: string;
};

export type OwnerRecord = {
  userId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  isBanned: boolean;
  restaurantId: string | null;
  restaurantName: string | null;
  createdAt: string;
};

export type PaginatedOwnersResponse = {
  items: OwnerRecord[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type OwnerListParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  isBanned?: boolean;
  sortBy?: string;
  sortDirection?: string;
};

export type CreateOwnerPayload = {
  fullName: string;
  username: string;
  email: string;
  phoneNumber?: string | null;
  password: string;
};

export type UpdateOwnerPayload = {
  fullName: string;
  username: string;
  email: string;
  phoneNumber?: string | null;
};

export type AdminUser = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type AuthResponse = {
  user: AdminUser | null;
  accessToken: string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type OwnerStatusFilter = "all" | "active" | "banned";
