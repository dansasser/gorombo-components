import type { ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  /** Platform name for aria-label */
  platform: string;
  href: string;
  /** SVG icon element */
  icon: ReactNode;
}

export interface FooterProps {
  /** Logo element (SVG) */
  logo?: ReactNode;
  /** Brand name text */
  brandName?: string;
  /** Tagline/description below logo */
  tagline?: string;
  /** Inline links (Privacy, Terms, etc.) */
  links?: FooterLink[];
  /** Social media links with icons */
  social?: SocialLink[];
  /** Copyright text */
  copyright?: string;
  /** Additional CSS classes */
  className?: string;
}
