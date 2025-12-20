import { useState, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { CheckboxProps } from './Checkbox.types';

export function Checkbox({
  name,
  label,
  defaultChecked = false,
  disabled = false,
  required = false,
  error,
  helperText,
  className,
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();
  const hasError = !!error;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className={cn(
          'flex items-center gap-3 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            disabled={disabled}
            required={required}
            className="sr-only peer"
          />
          <div
            className={cn(
              'w-5 h-5 rounded border-2 transition-colors',
              'flex items-center justify-center',
              checked
                ? 'bg-primary border-primary'
                : 'bg-white border-gray-300',
              hasError && !checked && 'border-red-500',
              'peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2'
            )}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 6l3 3 5-6" />
              </svg>
            )}
          </div>
        </div>
        {label && (
          <span className="text-sm text-text-main">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        )}
      </label>
      {(helperText || error) && (
        <p className={cn('text-sm', hasError ? 'text-red-500' : 'text-text-sub')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';
