export interface SpacerProps {
  /** Vertical size (CSS value or preset) */
  y?: string | number | 'sm' | 'md' | 'lg' | 'xl';
  /** Horizontal size (CSS value or preset) */
  x?: string | number | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}
