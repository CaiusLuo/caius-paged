/**
 * Skeleton Component
 * Loading placeholder with animation
 */

import { cn } from '@/lib/utils';

export interface SkeletonProps {
    /** Element type */
    as?: 'div' | 'span' | 'p';
    /** Custom class */
    className?: string;
    /** Animation type */
    animation?: 'pulse' | 'wave' | 'none';
}

const animations = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
};

/**
 * Skeleton loading placeholder
 */
export function Skeleton({
    as: Component = 'div',
    className,
    animation = 'pulse',
}: SkeletonProps) {
    return (
        <Component
            className={cn(
                'bg-zinc-200 dark:bg-zinc-800 rounded',
                animations[animation],
                className
            )}
        />
    );
}

/**
 * Skeleton text line
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn('h-4', i === lines - 1 && 'w-3/4')}
                />
            ))}
        </div>
    );
}

/**
 * Skeleton card
 */
export function SkeletonCard() {
    return (
        <div className="rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
            <Skeleton className="aspect-video w-full" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    );
}

/**
 * Skeleton avatar
 */
export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
    };

    return <Skeleton className={cn('rounded-full', sizes[size])} />;
}
