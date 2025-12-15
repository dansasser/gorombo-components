export interface NavLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
  /** Nested links for dropdown */
  children?: NavLink[];
}

export interface NavigationProps {
  /** Navigation links */
  links: NavLink[];
  /** Orientation of the navigation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional CSS classes */
  className?: string;
}

export interface NavDropdownProps {
  /** Dropdown trigger label */
  label: string;
  /** Dropdown items */
  items: NavLink[];
  /** Additional CSS classes */
  className?: string;
}
