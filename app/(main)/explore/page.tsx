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
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">Discovery</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            A map for finding nearby places and noticing the beauty of everyday life.
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            This page extends the same spirit as the homepage: sharing what I build, what I think about, and what feels worth exploring in daily life.
                        </p>
                    </div>

                    <div className="highlight-card animate-float-slow text-[color:var(--muted)]">
                        <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                            <Sparkles className="h-4 w-4" />
                            Ways to wander
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                Find nearby places with live or fallback location
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                Search with keywords and categories when you want a clearer plan
                            </div>
                            <Link href="/" className="inline-flex items-center gap-2 pt-2 font-semibold text-[color:var(--foreground)] transition hover:gap-3">
                                Back to home
                                <Compass className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel location-panel">
                <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    <MapPinned className="h-4 w-4" />
                    Map interface
                </div>
                <ExploreAttractions />
            </section>
        </div>
    );
}



