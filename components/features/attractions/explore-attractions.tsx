/**
 * Explore Attractions Client Component
 * Default: nearby attractions based on location
 * Search: keyword-based search via button click
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { Compass, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import { AttractionGrid } from '@/components/features/attractions';
import { Button, Input, SkeletonCard } from '@/components/ui';
import { DEFAULT_LOCATION } from '@/app/config/constants';
import { ATTRACTION_CATEGORIES } from '@/types';
import type { Attraction, AttractionApiResponse } from '@/types';
import type { GeoLocation } from '@/app/config/api/geolocation.config';

const RADIUS_OPTIONS = [
    { value: 1000, label: '1 km' },
    { value: 5000, label: '5 km' },
    { value: 10000, label: '10 km' },
    { value: 50000, label: '50 km' },
];

type SearchMode = 'nearby' | 'keyword';

export function ExploreAttractions() {
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [radius, setRadius] = useState(5000);
    const [searchMode, setSearchMode] = useState<SearchMode>('nearby');

    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getLocation() {
            try {
                if (navigator.geolocation) {
                    try {
                        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, {
                                enableHighAccuracy: false,
                                timeout: 5000,
                                maximumAge: 300000,
                            });
                        });

                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            source: 'browser',
                        });
                        return;
                    } catch {
                        console.log('Browser geolocation denied');
                    }
                }

                const ipResponse = await fetch('/api/geolocation');
                if (ipResponse.ok) {
                    const ipLocation = await ipResponse.json();
                    setLocation(ipLocation);
                    return;
                }

                setLocation({
                    lat: DEFAULT_LOCATION.LAT,
                    lng: DEFAULT_LOCATION.LNG,
                    city: DEFAULT_LOCATION.CITY,
                    country: DEFAULT_LOCATION.COUNTRY,
                    source: 'default',
                });
            } catch {
                setLocation({
                    lat: DEFAULT_LOCATION.LAT,
                    lng: DEFAULT_LOCATION.LNG,
                    city: DEFAULT_LOCATION.CITY,
                    country: DEFAULT_LOCATION.COUNTRY,
                    source: 'default',
                });
            }
        }

        getLocation();
    }, []);

    const fetchNearbyAttractions = useCallback(async () => {
        if (!location) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.set('lat', String(location.lat));
            params.set('lng', String(location.lng));
            params.set('radius', String(radius));

            if (category !== 'all') {
                params.set('category', category);
            }

            const response = await fetch(`/api/attractions/nearby?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch attractions');
            }

            const data: AttractionApiResponse = await response.json();
            setAttractions(data.attractions);
        } catch (err) {
            console.error('Error fetching nearby attractions:', err);
            setError('Failed to load attractions. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [category, location, radius]);

    const searchAttractionsByKeyword = useCallback(async (keyword: string) => {
        if (!keyword.trim()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.set('q', keyword.trim());

            if (category !== 'all') {
                params.set('category', category);
            }

            const response = await fetch(`/api/attractions?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to search attractions');
            }

            const data: AttractionApiResponse = await response.json();
            setAttractions(data.attractions);
        } catch (err) {
            console.error('Error searching attractions:', err);
            setError('Failed to search attractions. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        if (searchMode === 'nearby' && location) {
            fetchNearbyAttractions();
        }
    }, [fetchNearbyAttractions, location, searchMode]);

    useEffect(() => {
        if (searchMode === 'keyword' && searchQuery) {
            searchAttractionsByKeyword(searchQuery);
        }
    }, [searchAttractionsByKeyword, searchMode, searchQuery]);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        setQuery('');
        setSearchMode('nearby');
    }, []);

    const handleSearch = useCallback(() => {
        if (!query.trim()) {
            clearSearch();
            return;
        }

        setSearchQuery(query.trim());
        setSearchMode('keyword');
    }, [clearSearch, query]);

    const locationDisplay = location?.city
        ? `${location.city}${location.country ? `, ${location.country}` : ''}`
        : location
            ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`
            : 'Detecting location...';

    return (
        <div className="space-y-6">
            <section className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-5 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        Search controls
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="flex-1">
                            <Input
                                placeholder="Search attractions by name..."
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                leftIcon={<Search className="h-4 w-4" />}
                                className="h-12 rounded-full border-zinc-200/80 bg-white/80 pr-5 dark:border-white/10 dark:bg-white/5"
                            />
                        </div>
                        <Button onClick={handleSearch} loading={loading && searchMode === 'keyword'} className="h-12 rounded-full px-6">
                            Search
                        </Button>
                        {searchMode === 'keyword' && (
                            <Button variant="outline" onClick={clearSearch} className="h-12 rounded-full px-5 dark:border-white/10 dark:bg-white/5">
                                <X className="h-4 w-4" />
                                Reset
                            </Button>
                        )}
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <label className="space-y-2 text-sm text-[color:var(--muted)]">
                            <span>Category</span>
                            <select
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="h-12 w-full rounded-2xl border border-zinc-200/80 bg-white/80 px-4 text-sm text-[color:var(--foreground)] outline-none transition focus:border-zinc-400 dark:border-white/10 dark:bg-white/5"
                            >
                                {ATTRACTION_CATEGORIES.map((cat) => (
                                    <option key={cat.code} value={cat.code}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-2 text-sm text-[color:var(--muted)]">
                            <span>Radius</span>
                            <select
                                value={radius}
                                onChange={(event) => setRadius(Number(event.target.value))}
                                disabled={searchMode !== 'nearby'}
                                className="h-12 w-full rounded-2xl border border-zinc-200/80 bg-white/80 px-4 text-sm text-[color:var(--foreground)] outline-none transition focus:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5"
                            >
                                {RADIUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
            </section>

            <section className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-5 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
                        <span className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-white dark:bg-white dark:text-zinc-950">
                            {searchMode === 'nearby' ? <MapPin className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                            {searchMode === 'nearby' ? `Nearby: ${locationDisplay}` : `Keyword: "${searchQuery}"`}
                        </span>
                        {searchMode === 'nearby' && location?.source === 'default' && (
                            <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] dark:border-white/10">
                                Default location
                            </span>
                        )}
                    </div>
                    {!loading && attractions.length > 0 && (
                        <span className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)]">
                            <Compass className="h-4 w-4" />
                            {attractions.length} result{attractions.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </section>

            {error && (
                <section className="rounded-[1.4rem] border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/20">
                    <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                </section>
            )}

            <section>
                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <AttractionGrid attractions={attractions} />
                )}
            </section>
        </div>
    );
}

