import type { ComponentPropsWithoutRef } from 'react';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Icon element to display inside the input */
  icon?: React.ReactNode;
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
  /** Make the input full width */
  fullWidth?: boolean;
}
