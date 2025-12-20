export interface SkeletonProps {
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Additional CSS classes */
  className?: string;
}
