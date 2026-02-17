import { create } from "zustand";

type UserState = {
  isLogin: boolean;
  user: UserInfo | null;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type UserStore = UserState & {
  login: (user: UserInfo) => void;
  logout: () => void;
  setUser: (user: UserInfo) => void;
};

const initialState: UserState = {
  isLogin: false,
  user: null,
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,

  login: (user: UserInfo) => set({ isLogin: true, user }),
  logout: () => set({ ...initialState }),
  setUser: (user: UserInfo) => set({ user }),
}));

// Helper functions for usage outside of components
export const login = (user: UserInfo) => useUserStore.getState().login(user);
export const logout = () => useUserStore.getState().logout();
export const getUser = () => useUserStore.getState().user;
export const getIsLogin = () => useUserStore.getState().isLogin;
