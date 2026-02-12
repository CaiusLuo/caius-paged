/**
 * Navigation Component
 * Reusable navigation with active state
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/app/config';

export interface NavProps {
    items: NavItem[];
    className?: string;
    onItemClick?: () => void;
}

export function Nav({ items, className, onItemClick }: NavProps) {
    const pathname = usePathname();

    return (
        <nav className={cn('flex items-center gap-6', className)}>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50',
                        pathname === item.href
                            ? 'text-zinc-900 dark:text-zinc-50'
                            : 'text-zinc-600 dark:text-zinc-400'
                    )}
                    onClick={onItemClick}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
