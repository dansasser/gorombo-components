export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

export interface IconProps {
  /** Material Symbols icon name (e.g., 'home', 'settings', 'arrow_forward') */
  name: string;
  /** Size of the icon */
  size?: IconSize;
  /** Font weight for the icon */
  weight?: IconWeight;
  /** Fill the icon (1) or outline (0) */
  fill?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Hide from screen readers when decorative */
  'aria-hidden'?: boolean;
}
