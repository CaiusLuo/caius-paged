/**
 * ClassName Utility
 * Combines clsx and tailwind-merge for optimal className handling
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS conflict resolution
 * 
 * @example
 * cn('px-2 py-1', 'p-4') // 'p-4' (px-2 py-1 overridden by p-4)
 * cn('text-red-500', condition && 'text-blue-500') // conditional classes
 * cn(['base-class'], { 'active': isActive }) // various input types
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
