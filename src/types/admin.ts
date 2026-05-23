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

export type RestaurantRecord = {
  restaurantId: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string | null;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
  totalBranches: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type PaginatedRestaurantsResponse = {
  items: RestaurantRecord[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type RestaurantListParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDirection?: string;
};

export type CreateRestaurantPayload = {
  ownerId: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
};

export type UpdateRestaurantPayload = {
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
};

export type BranchRecord = {
  branchId: string;
  restaurantId: string;
  managerId: string | null;
  managerName: string | null;
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  openTime: string | null;
  closeTime: string | null;
  isActive: boolean;
  vatPercent: number;
  serviceChargePercent: number;
  serviceChargeFixed: number;
  createdAt: string;
  updatedAt: string | null;
};

export type PaginatedBranchesResponse = {
  items: BranchRecord[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type BranchListParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDirection?: string;
};

export type AvailableOwnerRecord = {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
};

export type RestaurantStatusFilter = "all" | "active" | "inactive";

export type CategoryRecord = {
  categoryId: string;
  branchId: string;
  branchName: string | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type PaginatedCategoriesResponse = {
  items: CategoryRecord[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CategoryListParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDirection?: string;
};

export type MenuItemRecord = {
  menuItemId: string;
  branchId: string;
  branchName: string | null;
  categoryId: string;
  categoryName: string | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  costPrice: number;
  preparationTime: number;
  displayOrder: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type PaginatedMenuItemsResponse = {
  items: MenuItemRecord[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type MenuItemsListParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  isAvailable?: boolean;
  isFeatured?: boolean;
  categoryId?: string;
  sortBy?: string;
  sortDirection?: string;
};

export type PriceHistoryRecord = {
  priceHistoryId: string;
  menuItemId: string;
  oldPrice: number;
  newPrice: number;
  changedById: string;
  changedByName: string | null;
  changedAt: string;
  note: string | null;
};
