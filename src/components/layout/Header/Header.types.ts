import type { ReactNode } from 'react';
import type { NavLink } from '../Navigation/Navigation.types';

export interface HeaderProps {
  /** Logo element or text */
  logo: ReactNode;
  /** Link for the logo */
  logoHref?: string;
  /** Navigation links */
  links?: NavLink[];
  /** Call-to-action button(s) */
  cta?: ReactNode;
  /** Make header sticky */
  sticky?: boolean;
  /** Hide header on scroll down */
  hideOnScroll?: boolean;
  /** Additional CSS classes */
  className?: string;
}
