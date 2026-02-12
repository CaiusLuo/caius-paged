/**
 * Attraction Card Component
 * Display a single attraction with photo and details
 */

import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Card, Badge, BadgeGroup } from '@/components/ui';
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
        <Card hoverable className={cn('group cursor-pointer', className)}>
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
                {photo ? (
                    <Image
                        src={photo.url}
                        alt={photo.alt || attraction.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                        <MapPin className="h-8 w-8 text-zinc-400" />
                    </div>
                )}

                {/* Distance Badge */}
                {attraction.distance !== undefined && (
                    <div className="absolute bottom-2 left-2">
                        <Badge variant="primary" size="sm">
                            {formatDistance(attraction.distance)}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {attraction.name}
                </h3>

                <p className="mb-2 line-clamp-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {attraction.location.address || 'No address available'}
                </p>

                {/* Rating */}
                {attraction.rating !== undefined && (
                    <div className="mb-2 flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                            {formatRating(attraction.rating)}
                        </span>
                    </div>
                )}

                {/* Tags */}
                {attraction.tags.length > 0 && (
                    <BadgeGroup>
                        {attraction.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="default" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </BadgeGroup>
                )}
            </div>
        </Card>
    );
}
