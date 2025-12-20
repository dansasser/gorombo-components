export interface CheckboxProps {
  /** Input name for form submission */
  name?: string;
  /** Checkbox label */
  label?: string;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Additional CSS classes */
  className?: string;
}
