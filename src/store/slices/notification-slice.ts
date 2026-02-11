import * as Crypto from 'expo-crypto';
import { StateCreator } from 'zustand';

type ToastItem = {
  toastMessage: string;
  toastId: string;
  duration?: number;
  actionLabel?: string;
};

type ToastInput = Omit<ToastItem, 'toastId'>;

export interface NotificationSlice {
  toasts: ToastItem[];
  removeToast: (toastId: string) => void;
  addToast: (item: ToastInput) => void;
}

export const createNotificationSlice: StateCreator<NotificationSlice> = (
  set
) => ({
  toasts: [],
  removeToast: (toastId) =>
    set((state) => ({
      toasts: state.toasts.filter((item) => item.toastId !== toastId),
    })),
  addToast: (item) =>
    set((state) => ({
      toasts: [...state.toasts, { ...item, toastId: Crypto.randomUUID() }],
    })),
});
