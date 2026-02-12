/**
 * Attraction Grid Component
 * Display a grid of attraction cards
 */

import { AttractionCard } from './attraction-card';
import { SkeletonCard } from '@/components/ui';
import type { Attraction } from '@/types';

export interface AttractionGridProps {
    attractions: Attraction[];
    loading?: boolean;
    loadingCount?: number;
}

export function AttractionGrid({
    attractions,
    loading = false,
    loadingCount = 6,
}: AttractionGridProps) {
    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: loadingCount }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (attractions.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    No attractions found nearby.
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                    Try adjusting your location or search criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
    );
}
