import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Label for the trigger button (uses Button component) */
  triggerLabel?: string;
  /** Custom trigger element (use slot="trigger" in Astro) */
  trigger?: ReactNode;
  /** Modal title shown in header */
  title?: string;
  /** Modal description shown below title */
  description?: string;
  /** Size of the modal */
  size?: ModalSize;
  /** Show close button in header */
  showClose?: boolean;
  /** Close when clicking backdrop */
  closeOnBackdrop?: boolean;
  /** Close when pressing Escape */
  closeOnEscape?: boolean;
  /** Custom header content (use slot="header" in Astro) */
  header?: ReactNode;
  /** Custom footer content (use slot="footer" in Astro) */
  footer?: ReactNode;
  /** Additional CSS classes for modal panel */
  className?: string;
  /** Modal body content */
  children?: ReactNode;
}
