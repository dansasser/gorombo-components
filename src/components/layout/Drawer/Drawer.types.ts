import type { ReactNode } from 'react';

export type DrawerSide = 'left' | 'right';
export type DrawerWidth = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  /** Which side the drawer appears from */
  side?: DrawerSide;
  /** Width of the drawer */
  width?: DrawerWidth;
  /** Title shown in default header */
  title?: string;
  /** Show close button */
  showClose?: boolean;
  /** Hide the backdrop overlay */
  hideOverlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom header content - use slot="header" in Astro */
  header?: ReactNode;
  /** Footer content - use slot="footer" in Astro */
  footer?: ReactNode;
  /** Main drawer content */
  children?: ReactNode;
}
