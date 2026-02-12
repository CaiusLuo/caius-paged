/**
 * Homepage
 * Nearby attractions based on user location
 */

import { SkeletonCard } from '@/components/ui';

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                    Discover Nearby Attractions
                </h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                    Explore scenic spots, parks, and museums around you
                </p>
            </section>

            {/* Location Banner */}
            <section className="mb-8">
                <div className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Detecting your location...
                    </span>
                </div>
            </section>

            {/* Attractions Grid */}
            <section>
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Nearby Attractions
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
