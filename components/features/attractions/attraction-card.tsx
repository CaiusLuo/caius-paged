/**
 * Attraction Card Component
 * Display a single attraction with photo and details
 */

import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Badge, BadgeGroup, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatDistance, formatRating } from '@/lib/utils/format';
import type { Attraction } from '@/types';

export interface AttractionCardProps {
    attraction: Attraction;
    className?: string;
}

export function AttractionCard({ attraction, className }: AttractionCardProps) {
    const photo = attraction.photos[0];

    return (
        <Card
            hoverable
            className={cn(
                'group cursor-pointer border border-zinc-200/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-white/5',
                className
            )}
        >
            <div className="relative aspect-video overflow-hidden">
                {photo ? (
                    <Image
                        src={photo.url}
                        alt={photo.alt || attraction.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                        <MapPin className="h-8 w-8 text-zinc-400" />
                    </div>
                )}

                {attraction.distance !== undefined && (
                    <div className="absolute left-3 top-3">
                        <Badge variant="primary" size="sm">
                            {formatDistance(attraction.distance)}
                        </Badge>
                    </div>
                )}
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
                        {attraction.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                        {attraction.location.address || 'No address available'}
                    </p>
                </div>

                {attraction.rating !== undefined && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
                        <Star className="h-4 w-4 fill-current" />
                        {formatRating(attraction.rating)}
                    </div>
                )}

                {attraction.tags.length > 0 && (
                    <BadgeGroup className="gap-2">
                        {attraction.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={`${tag}-${index}`} variant="outline" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </BadgeGroup>
                )}
            </div>
        </Card>
    );
}
