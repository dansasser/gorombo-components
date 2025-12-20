export interface SwitchProps {
  /** Input name for form submission */
  name?: string;
  /** Switch label */
  label?: string;
  /** Default on/off state */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}
