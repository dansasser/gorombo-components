import type { ReactNode } from 'react';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps {
  /** Maximum width of the container */
  maxWidth?: ContainerMaxWidth;
  /** Horizontal padding */
  padding?: ContainerPadding;
  /** Center the container */
  centered?: boolean;
  /** Render as a different HTML element */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  /** Additional CSS classes */
  className?: string;
  /** Container content */
  children: ReactNode;
}
