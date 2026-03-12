/**
 * Header Component
 * Site header with logo and navigation
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mainNav } from '@/app/config';
import { ThemeToggle } from './theme-toggle';
import TypewriterTyped from '../ui/TypewriterTyped';

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 px-3 py-3">
            <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between rounded-full border border-zinc-200/70 bg-white/75 px-4 py-3 shadow-lg shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1119]/75">
                <Link href="/" className="flex shrink-0 items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.55)]" />
                    <TypewriterTyped />
                </Link>

                <nav className="hidden items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 p-1 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5 md:flex">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                                pathname === item.href
                                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white'
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/70 bg-white/70 text-zinc-700 transition hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white md:hidden"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="mx-auto mt-3 flex w-full max-w-[1180px] flex-col gap-2 rounded-[1.5rem] border border-zinc-200/70 bg-white/85 p-3 shadow-lg shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1119]/90 md:hidden">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                                pathname === item.href
                                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white'
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}

