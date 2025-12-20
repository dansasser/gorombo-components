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
  /** Icon element to display (use slot="icon" in Astro) */
  icon?: ReactNode;
  /** Material Symbols icon name - serializable alternative to icon prop */
  iconName?: string;
  /** Position of icon relative to children */
  iconPosition?: 'left' | 'right';
}
