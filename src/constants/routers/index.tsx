import { BASE_URL } from "@/constants/url";

export type navType = {
  id: string;
  text: string;
  path: string;
  createPath: () => string;
  isShow: boolean;
  isPrivate: boolean;
};

const createHomePath = () => `${BASE_URL.HOME}`;

export const nav_items: navType[] = [
  {
    id: "benefits",
    text: "Tính năng",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "feature-details",
    text: "Quy trình",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "pricing",
    text: "Bảng giá",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "final-cta",
    text: "Liên hệ",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
];
