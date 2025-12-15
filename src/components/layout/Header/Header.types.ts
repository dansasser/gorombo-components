import type { ReactNode } from 'react';

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface HeaderProps {
  /** Logo element (SVG or image) */
  logo: ReactNode;
  /** Logo text displayed next to logo */
  logoText?: string;
  /** Link for the logo */
  logoHref?: string;
  /** Navigation links (supports nested dropdowns) */
  links?: NavLink[];
  /** Right-side action buttons */
  actions?: ReactNode;
  /** Additional icon buttons (e.g., cart) */
  iconButtons?: ReactNode;
  /** Make header sticky */
  sticky?: boolean;
  /** Hide header on scroll down */
  hideOnScroll?: boolean;
  /** Additional CSS classes */
  className?: string;
}
