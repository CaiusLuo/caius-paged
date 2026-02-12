/**
 * Explore Page
 * Search and filter attractions
 */

import { Input, SkeletonCard } from '@/components/ui';
import { Search } from 'lucide-react';

export default function ExplorePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    Explore Attractions
                </h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Search for attractions by name, category, or location
                </p>
            </section>

            {/* Search Bar */}
            <section className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                        <Input
                            placeholder="Search attractions..."
                            leftIcon={<Search className="h-4 w-4" />}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                            <option value="all">All Categories</option>
                            <option value="scenic">Scenic Spots</option>
                            <option value="park">Parks</option>
                            <option value="museum">Museums</option>
                            <option value="temple">Temples</option>
                        </select>
                        <select className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                            <option value="5000">5 km</option>
                            <option value="10000">10 km</option>
                            <option value="50000">50 km</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section>
                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                    Showing results near your location
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
