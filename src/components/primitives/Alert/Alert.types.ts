import type { ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Alert title */
  title?: string;
  /** Alert variant */
  variant?: AlertVariant;
  /** Icon name (Material Symbols) - uses default if not provided */
  iconName?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Alert content */
  children?: ReactNode;
}
