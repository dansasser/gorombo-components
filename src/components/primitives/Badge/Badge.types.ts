import type { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Icon to display before text */
  icon?: ReactNode;
  /** Show a dot indicator instead of icon */
  dot?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Badge content */
  children: ReactNode;
}
