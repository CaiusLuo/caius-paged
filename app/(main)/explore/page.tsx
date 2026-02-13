/**
 * Explore Page
 * Search and filter attractions
 */

import { ExploreAttractions } from '@/components/features/attractions';

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

            {/* Search and Results */}
            <ExploreAttractions />
        </div>
    );
}
