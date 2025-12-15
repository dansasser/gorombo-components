// Re-export NavLink from Header for consistency
export type { NavLink } from '../Header/Header.types';

export interface NavDropdownProps {
  /** Dropdown label */
  label: string;
  /** Dropdown items */
  items: import('../Header/Header.types').NavLink[];
  /** Additional CSS classes */
  className?: string;
}

export interface NavigationProps {
  /** Navigation links */
  links: import('../Header/Header.types').NavLink[];
  /** Orientation of the navigation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional CSS classes */
  className?: string;
}
