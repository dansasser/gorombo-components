import type { ComponentPropsWithoutRef } from 'react';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Make the textarea full width */
  fullWidth?: boolean;
  /** Enable auto-resize based on content */
  autoResize?: boolean;
}
