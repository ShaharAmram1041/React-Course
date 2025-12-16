// src/stores/notifications.ts
import { create } from "zustand";
import { nanoid } from "nanoid";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  timestamp?: number;
  timeout?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id" | "timestamp">) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const newToast: Toast = {
      id: nanoid(),
      timestamp: Date.now(),
      ...toast,
    };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Optional auto-remove by timeout
    if (toast.timeout) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== newToast.id),
        }));
      }, toast.timeout);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearAll: () => set({ toasts: [] }),
}));
