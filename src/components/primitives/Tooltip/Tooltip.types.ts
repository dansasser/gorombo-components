import type { ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content text */
  content: string;
  /** Position relative to trigger */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional CSS classes for tooltip */
  className?: string;
  /** Trigger element */
  children: ReactNode;
}
