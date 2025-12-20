import type { ReactNode } from 'react';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** Trigger element */
  trigger: ReactNode;
  /** Trigger label - serializable alternative to trigger */
  triggerLabel?: string;
  /** Position relative to trigger */
  position?: PopoverPosition;
  /** Close when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Additional CSS classes for popover */
  className?: string;
  /** Popover content */
  children: ReactNode;
}
