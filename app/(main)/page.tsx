/**
 * Homepage
 * Nearby attractions based on user location
 */

import { NearbyAttractions } from '@/components/features/attractions';

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

            {/* Nearby Attractions - Client Component */}
            <NearbyAttractions />
        </div>
    );
}
