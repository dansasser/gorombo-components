import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-main"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn(
              'w-full h-12 px-4 rounded-lg border bg-background-off',
              'text-text-main placeholder:text-text-sub',
              'transition-colors duration-200',
              'focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20',
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-200',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub">
              {icon}
            </span>
          )}
        </div>
        {hasError && (
          <p id={`${id}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${id}-helper`} className="text-sm text-text-sub">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
