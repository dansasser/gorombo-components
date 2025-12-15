import type { ReactNode } from 'react';

export type DrawerSide = 'left' | 'right';
export type DrawerWidth = 'sm' | 'md' | 'lg';

export interface MobileDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Side of the screen to appear from */
  side?: DrawerSide;
  /** Width of the drawer */
  width?: DrawerWidth;
  /** Drawer title (optional) */
  title?: string;
  /** Show close button */
  showClose?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Drawer content */
  children: ReactNode;
}
