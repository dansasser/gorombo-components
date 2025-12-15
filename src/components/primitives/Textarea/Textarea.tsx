import { forwardRef, useId, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../../utils/cn';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      autoResize = false,
      className,
      id: providedId,
      rows = 4,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const hasError = Boolean(error);
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const adjustHeight = useCallback(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize, textareaRef]);

    useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      onChange?.(e);
    };

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
        <textarea
          ref={textareaRef}
          id={id}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          onChange={handleChange}
          className={cn(
            'w-full p-4 rounded-lg border bg-background-off',
            'text-text-main placeholder:text-text-sub',
            'transition-colors duration-200 resize-y',
            'focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-200',
            autoResize && 'resize-none overflow-hidden',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
