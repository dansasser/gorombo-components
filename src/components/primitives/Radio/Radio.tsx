import { useState, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { RadioGroupProps } from './Radio.types';

export function RadioGroup({
  name,
  options,
  defaultValue,
  label,
  orientation = 'vertical',
  disabled = false,
  required = false,
  error,
  className,
}: RadioGroupProps) {
  const [selected, setSelected] = useState(defaultValue || '');
  const groupId = useId();
  const hasError = !!error;

  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      {label && (
        <legend className="text-sm font-medium text-text-main mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      <div
        className={cn(
          'flex gap-4',
          orientation === 'vertical' && 'flex-col gap-2'
        )}
        role="radiogroup"
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isDisabled = disabled || option.disabled;
          const isSelected = selected === option.value;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'flex items-center gap-3 cursor-pointer',
                isDisabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="relative">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => setSelected(e.target.value)}
                  disabled={isDisabled}
                  required={required}
                  className="sr-only peer"
                />
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 transition-colors',
                    'flex items-center justify-center',
                    isSelected
                      ? 'border-primary'
                      : 'border-gray-300',
                    hasError && !isSelected && 'border-red-500',
                    'peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2'
                  )}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              </div>
              <span className="text-sm text-text-main">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </fieldset>
  );
}

RadioGroup.displayName = 'RadioGroup';
