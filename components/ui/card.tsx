/* eslint-disable @next/next/no-img-element */
/**
 * Card Component
 * Reusable card container with variants
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Card variant */
    variant?: 'default' | 'outline' | 'elevated';
    /** Hoverable state */
    hoverable?: boolean;
}

const variants = {
    default: 'bg-white dark:bg-zinc-900',
    outline: 'border border-zinc-200 bg-transparent dark:border-zinc-800',
    elevated: 'bg-white shadow-lg dark:bg-zinc-900',
};

/**
 * Card component
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hoverable, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl overflow-hidden',
                    variants[variant],
                    hoverable && 'transition-all hover:shadow-lg hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

/**
 * Card Header
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-4 border-b border-zinc-100 dark:border-zinc-800', className)} {...props} />
    )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-4', className)} {...props} />
    )
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-4 border-t border-zinc-100 dark:border-zinc-800', className)} {...props} />
    )
);

CardFooter.displayName = 'CardFooter';

/**
 * Card Image
 */
export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    aspectRatio?: 'video' | 'square' | 'portrait';
}

const aspectRatios = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
};

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
    ({ className, src, alt, aspectRatio = 'video', ...props }, ref) => (
        <div ref={ref} className={cn('relative overflow-hidden', aspectRatios[aspectRatio], className)} {...props}>
            <img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
            />
        </div>
    )
);

CardImage.displayName = 'CardImage';
