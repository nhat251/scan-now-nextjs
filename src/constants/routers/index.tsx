import { BASE_URL } from "@/constants/url";

export type navType = {
  id: string;
  labelKey: string;
  path: string;
  createPath: () => string;
  isShow: boolean;
  isPrivate: boolean;
};

const createHomePath = () => `${BASE_URL.HOME}`;

export const nav_items: navType[] = [
  {
    id: "benefits",
    labelKey: "global.nav.features",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "feature-details",
    labelKey: "global.nav.process",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "pricing",
    labelKey: "global.nav.pricing",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
  {
    id: "final-cta",
    labelKey: "global.nav.contact",
    path: BASE_URL.HOME,
    createPath: createHomePath,
    isShow: true,
    isPrivate: false,
  },
];
