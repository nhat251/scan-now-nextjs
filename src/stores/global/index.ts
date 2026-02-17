import type { ToasterProps } from "sonner";
import { create } from "zustand";

import { showToast } from "@/components/globals/global-toast";

export const DEFAULT_DURATION_NOTIFICATION = 2000;
export const DEFAULT_POSITION_NOTIFICATION: ToasterProps["position"] = "top-right";

export type AlertType = "success" | "info" | "warning" | "error";

type NotifyPayload = {
  type?: AlertType;
  message: string;
  position?: ToasterProps["position"];
  duration?: number;
};

type GlobalState = {
  loading: boolean;
};

type GlobalStore = GlobalState & {
  showLoading: () => void;
  closeLoading: () => void;
  showNotify: (payload: NotifyPayload) => void;
};

const initialState: GlobalState = {
  loading: false,
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  ...initialState,

  showLoading: () => set({ loading: true }),
  closeLoading: () => set({ loading: false }),

  showNotify: ({ type = "success", message, position, duration }) => {
    showToast(type, message, {
      position: position || DEFAULT_POSITION_NOTIFICATION,
      duration: duration || DEFAULT_DURATION_NOTIFICATION,
    });
  },
}));

// Helper functions for usage outside of components
export const showLoading = () => useGlobalStore.getState().showLoading();
export const closeLoading = () => useGlobalStore.getState().closeLoading();
export const showNotify = (payload: NotifyPayload) => useGlobalStore.getState().showNotify(payload);
