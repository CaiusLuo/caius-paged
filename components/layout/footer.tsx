/**
 * Footer Component
 * Site footer with navigation and copyright
 */

import Link from 'next/link';
import { Github, Mail } from 'lucide-react';
import { footerNav, siteConfig, socialLinks } from '@/app/config';

const iconMap = {
    github: Github,
    mail: Mail,
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-3 pb-6 pt-2">
            <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 rounded-[2rem] border border-zinc-200/70 bg-white/75 px-6 py-6 shadow-lg shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1119]/75 md:flex-row md:items-center md:justify-between">
                <div>
                    <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-white">
                        {siteConfig.metadata.name}
                    </Link>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                        Personal homepage, technical notes, and location-aware exploration.
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-400">
                        {currentYear} {siteConfig.author.name}
                    </p>
                </div>

                <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {footerNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            className="transition hover:text-zinc-950 dark:hover:text-white"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {socialLinks.map((link) => {
                        const Icon = iconMap[link.icon as keyof typeof iconMap];
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/70 bg-white/70 text-zinc-700 transition hover:-translate-y-0.5 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white"
                                aria-label={link.name}
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
