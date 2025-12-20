export interface SelectOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Disable this option */
  disabled?: boolean;
}

export interface SelectProps {
  /** Array of options */
  options: SelectOption[];
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Input name for form submission */
  name?: string;
  /** Label text */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message (shows error state) */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}
