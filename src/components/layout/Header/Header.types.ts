import type { ReactNode } from 'react';

export interface NavLink {
  label: string;
  href: string;
  /** Icon name (Material Symbols) */
  icon?: string;
  /** Description text for dropdown items */
  description?: string;
  /** Mark as featured item */
  featured?: boolean;
  children?: NavLink[];
}

export interface HeaderProps {
  /** Logo element (SVG or image) - use slot="logo" in Astro */
  logo?: ReactNode;
  /** Logo text displayed next to logo */
  logoText?: string;
  /** Link for the logo */
  logoHref?: string;
  /** Make header sticky */
  sticky?: boolean;
  /** Hide header on scroll down */
  hideOnScroll?: boolean;
  /** Show hamburger menu button (calls openDrawer from store) */
  showMobileMenu?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Desktop navigation - use slot="nav" in Astro */
  nav?: ReactNode;
  /** Right-side actions - use slot="actions" in Astro */
  actions?: ReactNode;
  /** Additional content */
  children?: ReactNode;
}

/** @deprecated Use HeaderProps with children composition instead */
export interface LegacyHeaderProps {
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
