import type { ReactNode } from 'react';

export interface FooterLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
}

export interface FooterSection {
  /** Section title */
  title: string;
  /** Links in this section */
  links: FooterLink[];
}

export interface SocialLink {
  /** Platform name for aria-label */
  platform: string;
  /** Link URL */
  href: string;
  /** Icon element */
  icon: ReactNode;
}

export interface FooterProps {
  /** Logo element */
  logo?: ReactNode;
  /** Footer sections with links */
  sections?: FooterSection[];
  /** Social media links */
  social?: SocialLink[];
  /** Copyright text */
  copyright?: string;
  /** Background variant */
  background?: 'light' | 'dark';
  /** Additional CSS classes */
  className?: string;
  /** Additional content */
  children?: ReactNode;
}
