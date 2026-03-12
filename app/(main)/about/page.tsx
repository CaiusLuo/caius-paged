/**
 * About Page
 * Personal profile and contact information
 */

import Link from 'next/link';
import { Badge } from '@/components/ui';
import { Github, Mail, MapPin, NotebookTabs, Radar } from 'lucide-react';
import { authorInfo } from '@/app/config';

const stack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Geo APIs'];

export default function AboutPage() {
    return (
        <div className="page-shell">
            <section className="hero-panel hero-panel-compact">
                <div className="hero-orb hero-orb-primary" />
                <div className="hero-grid" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">About</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            Caius builds product-facing interfaces, documents engineering work, and experiments with location-aware tools.
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            This site is designed as a living personal homepage: portfolio first, notes second, and interactive utilities close behind.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href={authorInfo.github} target="_blank" rel="noreferrer noopener" className="action-link action-link-primary">
                                GitHub
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href={`mailto:${authorInfo.email}`} className="action-link action-link-secondary">
                                Email
                                <Mail className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="highlight-card animate-float-delayed text-[color:var(--muted)]">
                        <div className="space-y-4 text-sm">
                            <div className="inline-flex items-center gap-2 font-medium text-[color:var(--muted)]">
                                <MapPin className="h-4 w-4" />
                                Based in China
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                                Writing technical notes as reusable project memory.
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                                Using portfolio pages to showcase real product capabilities.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="section-panel">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <NotebookTabs className="h-4 w-4" />
                        Working style
                    </div>
                    <p className="mt-4 text-sm leading-8 text-[color:var(--muted)]">
                        I like interfaces that feel intentional, readable, and useful on day one. That means building with a product mindset, keeping the technical details close, and capturing the lessons while the work is still fresh.
                    </p>
                </div>

                <div className="section-panel">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Radar className="h-4 w-4" />
                        Stack
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {stack.map((item) => (
                            <Badge key={item} variant="outline" size="md">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
