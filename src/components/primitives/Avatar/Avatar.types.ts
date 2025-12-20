export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials (e.g., "JD" for John Doe) */
  initials?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape variant */
  shape?: 'circle' | 'square';
  /** Additional CSS classes */
  className?: string;
}
