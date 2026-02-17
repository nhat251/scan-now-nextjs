import { BASE_URL } from "@/constants/url";

export type navType = {
  id: string;
  text: string;
  path: string;
  createPath: () => string;
  isShow: boolean;
  isPrivate: boolean;
};

export const nav_items: navType[] = [
  {
    id: "home",
    text: "Home",
    path: BASE_URL.HOME,
    createPath: () => `${BASE_URL.HOME}`,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "login",
    text: "Login",
    path: BASE_URL.LOGIN,
    createPath: () => `${BASE_URL.LOGIN}`,
    isShow: true,
    isPrivate: false,
  },
];
