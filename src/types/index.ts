import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Common size variants used across components
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Extended size variants including xl
 */
export type SizeExtended = Size | 'xl';

/**
 * Base props that all components should accept
 */
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props for components that can be polymorphic (render as different elements)
 */
export type PolymorphicProps<E extends React.ElementType, P = object> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P> & {
    as?: E;
  };

/**
 * Variant map type for component styling
 */
export type VariantMap<T extends string> = Record<T, string>;
