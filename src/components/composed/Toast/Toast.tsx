import { useStore } from '@nanostores/react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { toasts, removeToast } from '../../../stores/toastStore';
import type { ToastType } from '../../../stores/toastStore';
import type { ToastContainerProps, ToastPosition } from './Toast.types';

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

const typeStyles: Record<ToastType, { bg: string; icon: string; iconColor: string }> = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'check_circle',
    iconColor: 'text-green-500',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'error',
    iconColor: 'text-red-500',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'warning',
    iconColor: 'text-yellow-500',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'info',
    iconColor: 'text-blue-500',
  },
};

export function ToastContainer({
  position = 'top-right',
  maxToasts = 5,
  className,
}: ToastContainerProps) {
  const $toasts = useStore(toasts);
  const visibleToasts = $toasts.slice(-maxToasts);

  if (visibleToasts.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-[200] flex flex-col gap-2',
        positionStyles[position],
        className
      )}
    >
      {visibleToasts.map((toast) => {
        const styles = typeStyles[toast.type];

        return (
          <div
            key={toast.id}
            role="alert"
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
              'min-w-[300px] max-w-[400px]',
              'animate-in slide-in-from-right-full duration-200',
              styles.bg
            )}
          >
            <Icon name={styles.icon} size="md" className={styles.iconColor} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-main">{toast.title}</p>
              {toast.message && (
                <p className="mt-1 text-sm text-text-sub">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded hover:bg-black/5 transition-colors"
              aria-label="Dismiss"
            >
              <Icon name="close" size="sm" className="text-text-sub" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

ToastContainer.displayName = 'ToastContainer';
