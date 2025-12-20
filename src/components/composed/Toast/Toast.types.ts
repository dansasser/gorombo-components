export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastContainerProps {
  /** Position of toast container */
  position?: ToastPosition;
  /** Maximum number of visible toasts */
  maxToasts?: number;
  /** Additional CSS classes */
  className?: string;
}
