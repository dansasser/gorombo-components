import { atom } from 'nanostores';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export const toasts = atom<Toast[]>([]);

let toastId = 0;

export const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = `toast-${++toastId}`;
  const newToast: Toast = { ...toast, id };
  toasts.set([...toasts.get(), newToast]);

  // Auto-remove after duration (default 5000ms)
  const duration = toast.duration ?? 5000;
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }

  return id;
};

export const removeToast = (id: string) => {
  toasts.set(toasts.get().filter((t) => t.id !== id));
};

export const clearToasts = () => {
  toasts.set([]);
};

// Convenience methods
export const toast = {
  success: (title: string, message?: string, duration?: number) =>
    addToast({ type: 'success', title, message, duration }),
  error: (title: string, message?: string, duration?: number) =>
    addToast({ type: 'error', title, message, duration }),
  warning: (title: string, message?: string, duration?: number) =>
    addToast({ type: 'warning', title, message, duration }),
  info: (title: string, message?: string, duration?: number) =>
    addToast({ type: 'info', title, message, duration }),
};
