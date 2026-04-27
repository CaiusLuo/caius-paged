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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: loadingCount }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (attractions.length === 0) {
        return (
            <div className="apple-card border-dashed px-6 py-12 text-center">
                <p className="text-lg font-medium text-[color:var(--foreground)]">No attractions found.</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                    Try switching between nearby mode and keyword mode, or adjust the current filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
        </div>
    );
}
