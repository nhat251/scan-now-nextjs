import { useMemo } from "react";

import type { navType } from "@/constants/routers";
import { useUserStore } from "@/stores/user";

export const useFilterShowMenuItems = (menu: navType[]): navType[] => {
  const isLogin = useUserStore((state) => state.isLogin);

  return useMemo(
    () => menu.filter((item) => item.isShow && (item.isPrivate ? isLogin : true)),
    [menu, isLogin]
  );
};
