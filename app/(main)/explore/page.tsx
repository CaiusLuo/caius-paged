/**
 * Explore Page
 * Search and filter attractions
 */

import Link from 'next/link';
import { Compass, MapPinned, Sparkles } from 'lucide-react';
import { ExploreAttractions } from '@/components/features/attractions';

export default function ExplorePage() {
    return (
        <div className="page-shell">
            <section className="hero-panel hero-panel-compact">
                <div className="hero-orb hero-orb-secondary" />
                <div className="hero-grid" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">Explore</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            Search attractions by keyword, category, and live location.
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            The original location-based interface is preserved here as a dedicated workspace, while the homepage now introduces you first and the tools second.
                        </p>
                    </div>

                    <div className="highlight-card animate-float-slow text-[color:var(--muted)]">
                        <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                            <Sparkles className="h-4 w-4" />
                            Explore modes
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                Nearby search with browser or fallback location
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                Keyword search with category filters
                            </div>
                            <Link href="/" className="inline-flex items-center gap-2 pt-2 font-semibold text-[color:var(--foreground)] transition hover:gap-3">
                                Back to homepage
                                <Compass className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel location-panel">
                <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    <MapPinned className="h-4 w-4" />
                    Search interface
                </div>
                <ExploreAttractions />
            </section>
        </div>
    );
}
