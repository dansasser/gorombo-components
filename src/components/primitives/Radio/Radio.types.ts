export interface RadioOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Disable this option */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Input name for form submission */
  name: string;
  /** Array of radio options */
  options: RadioOption[];
  /** Default selected value */
  defaultValue?: string;
  /** Group label */
  label?: string;
  /** Orientation of options */
  orientation?: 'horizontal' | 'vertical';
  /** Disabled state for all options */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
}
