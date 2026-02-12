/**
 * Footer Component
 * Site footer with navigation and copyright
 */

import Link from 'next/link';
import { siteConfig, footerNav, socialLinks } from '@/app/config';
import { Github, Mail } from 'lucide-react';

const iconMap = {
    github: Github,
    mail: Mail,
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <Link href="/" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            {siteConfig.metadata.name}
                        </Link>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            &copy; {currentYear} {siteConfig.author.name}. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                        {footerNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener noreferrer' : undefined}
                                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link) => {
                            const Icon = iconMap[link.icon as keyof typeof iconMap];
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md p-2 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                                    aria-label={link.name}
                                >
                                    {Icon && <Icon className="h-5 w-5" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
