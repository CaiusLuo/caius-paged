/**
 * Homepage
 * Nearby attractions based on user location
 */

import { getUserLocation, getDefaultLocation } from '@/lib/api/geolocation';
import { searchNearbyAttractions } from '@/lib/api/amap';
import { AttractionGrid } from '@/components/features/attractions';

export default async function HomePage() {
    // Get user location with fallback chain
    let location = await getUserLocation();

    if (!location) {
        location = getDefaultLocation();
    }

    // Fetch nearby attractions based on location
    const attractions = await searchNearbyAttractions(
        { lat: location.lat, lng: location.lng },
        { radius: 5000 }
    );

    // Format location display
    const locationDisplay = location.city 
        ? `${location.city}, ${location.country || ''}`
        : `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`;

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
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Location: {locationDisplay}
                    </span>
                    {location.source !== 'browser' && (
                        <span className="text-xs text-zinc-500">
                            ({location.source === 'ip' ? 'IP-based' : 'Default'})
                        </span>
                    )}
                </div>
            </section>

            {/* Attractions Grid */}
            <section>
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Nearby Attractions
                </h2>
                <AttractionGrid attractions={attractions} />
            </section>
        </div>
    );
}
