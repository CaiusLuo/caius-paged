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

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--background)]/85 px-3 py-3 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between">
                <Link href="/" className="flex shrink-0 items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-sm font-bold text-[color:var(--foreground)]">
                        C
                    </div>
                    <span className="text-sm font-semibold text-[color:var(--foreground)] sm:text-base">
                        Caius
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                pathname === item.href
                                    ? 'bg-[color:var(--foreground)] text-[color:var(--background)]'
                                    : 'text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]'
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] md:hidden"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="mx-auto mt-3 flex w-full max-w-[1120px] flex-col gap-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-2 shadow-lg shadow-zinc-950/5 md:hidden">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                                pathname === item.href
                                    ? 'bg-[color:var(--foreground)] text-[color:var(--background)]'
                                    : 'text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]'
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
