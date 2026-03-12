/**
 * Input Component
 * Reusable input field with variants
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Input variant */
    variant?: 'default' | 'outline';
    /** Input size */
    size?: 'sm' | 'md' | 'lg';
    /** Error state */
    error?: boolean;
    /** Left icon */
    leftIcon?: React.ReactNode;
    /** Right icon */
    rightIcon?: React.ReactNode;
}

const variants = {
    default: 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
    outline: 'bg-transparent border-zinc-300 dark:border-zinc-700',
};

const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
};

/**
 * Input component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = 'default', size = 'md', error, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full rounded-lg border text-[color:var(--foreground)] transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-0',
                        'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        variants[variant],
                        sizes[size],
                        error && 'border-red-500 focus:ring-red-500',
                        className,
                        leftIcon && 'pl-10',
                        rightIcon && 'pr-10'
                    )}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        {rightIcon}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

