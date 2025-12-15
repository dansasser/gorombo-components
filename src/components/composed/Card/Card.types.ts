import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Make the card interactive (hover effects) */
  interactive?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Card content */
  children: ReactNode;
}

export interface CardHeaderProps {
  /** Icon or image to display */
  icon?: ReactNode;
  /** Card title */
  title: string;
  /** Card subtitle or description */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
}

export interface CardBodyProps {
  /** Additional CSS classes */
  className?: string;
  /** Body content */
  children: ReactNode;
}

export interface CardFooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Footer content */
  children: ReactNode;
}
