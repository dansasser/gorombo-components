import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outlined';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Make button full width of container */
  fullWidth?: boolean;
  /** Icon element to display */
  icon?: ReactNode;
  /** Position of icon relative to children */
  iconPosition?: 'left' | 'right';
}
