/**
 * Explore Attractions Client Component
 * Default: nearby attractions based on location
 * Search: keyword-based search via button click
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { AttractionGrid } from '@/components/features/attractions';
import { SkeletonCard, Input, Button } from '@/components/ui';
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
    // Search state
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Actual search query after button click
    const [category, setCategory] = useState('all');
    const [radius, setRadius] = useState(5000);
    const [searchMode, setSearchMode] = useState<SearchMode>('nearby');

    // Data state
    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Get user location on mount
     */
    useEffect(() => {
        async function getLocation() {
            try {
                // Try browser geolocation
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

                // Fallback to IP geolocation
                const ipResponse = await fetch('/api/geolocation');
                if (ipResponse.ok) {
                    const ipLocation = await ipResponse.json();
                    setLocation(ipLocation);
                    return;
                }

                // Default location
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

    /**
     * Fetch nearby attractions (location-based)
     */
    const fetchNearbyAttractions = useCallback(async () => {
        if (!location) return;

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.set('lat', String(location.lat));
            params.set('lng', String(location.lng));
            params.set('radius', String(radius));

            if (category && category !== 'all') {
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
    }, [location, category, radius]);

    /**
     * Search attractions by keyword (not location-based)
     */
    const searchAttractionsByKeyword = useCallback(async (keyword: string) => {
        if (!keyword.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.set('q', keyword.trim());

            if (category && category !== 'all') {
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

    /**
     * Clear search and return to nearby mode
     */
    const clearSearch = useCallback(() => {
        setSearchQuery('');
        setQuery('');
        setSearchMode('nearby');
    }, []);

    /**
     * Handle search button click
     */
    const handleSearch = useCallback(() => {
        if (query.trim()) {
            setSearchQuery(query.trim());
            setSearchMode('keyword');
            // Directly call search instead of relying on useEffect
            searchAttractionsByKeyword(query.trim());
        } else {
            // If empty query, go back to nearby mode
            clearSearch();
        }
    }, [query, clearSearch, searchAttractionsByKeyword]);

    /**
     * Fetch nearby attractions when location/radius changes (nearby mode only)
     */
    useEffect(() => {
        if (searchMode === 'nearby' && location) {
            fetchNearbyAttractions();
        }
    }, [searchMode, location, fetchNearbyAttractions]);

    /**
     * Search by keyword when searchQuery changes (keyword mode)
     * Note: This is now handled directly in handleSearch, keeping for re-fetch scenarios
     */
    useEffect(() => {
        if (searchMode === 'keyword' && searchQuery) {
            searchAttractionsByKeyword(searchQuery);
        }
    }, [searchMode, searchQuery, searchAttractionsByKeyword]);

    /**
     * Re-fetch when category changes in keyword mode
     */
    useEffect(() => {
        if (searchMode === 'keyword' && searchQuery) {
            searchAttractionsByKeyword(searchQuery);
        }
    }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

    // Location display
    const locationDisplay = location?.city
        ? `${location.city}${location.country ? `, ${location.country}` : ''}`
        : location
            ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`
            : 'Detecting location...';

    return (
        <>
            {/* Search Bar */}
            <section className="mb-8">
                <div className="flex flex-col gap-4">
                    {/* Search Input with Button */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Input
                                placeholder="Search attractions by name..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                leftIcon={<Search className="h-4 w-4" />}
                            />
                        </div>
                        <Button onClick={handleSearch} disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                        {searchMode === 'keyword' && (
                            <Button variant="outline" onClick={clearSearch}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-500">Category:</span>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                            >
                                {ATTRACTION_CATEGORIES.map((cat) => (
                                    <option key={cat.code} value={cat.code}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Radius Filter (only in nearby mode) */}
                        {searchMode === 'nearby' && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-zinc-500">Radius:</span>
                                <select
                                    value={radius}
                                    onChange={(e) => setRadius(Number(e.target.value))}
                                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                                >
                                    {RADIUS_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Location Info (only in nearby mode) */}
            {searchMode === 'nearby' && (
                <section className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <MapPin className="h-4 w-4" />
                        <span>Nearby: {locationDisplay}</span>
                        {location?.source === 'default' && (
                            <span className="text-xs text-zinc-500">(Default location)</span>
                        )}
                    </div>
                </section>
            )}

            {/* Search Mode Indicator */}
            {searchMode === 'keyword' && searchQuery && (
                <section className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <Search className="h-4 w-4" />
                        <span>
                            Keyword search: <strong className="text-zinc-900 dark:text-zinc-50">&quot;{searchQuery}&quot;</strong>
                        </span>
                    </div>
                </section>
            )}

            {/* Error State */}
            {error && (
                <section className="mb-8">
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                </section>
            )}

            {/* Results */}
            <section>
                {/* Results count */}
                {!loading && attractions.length > 0 && (
                    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                        Found {attractions.length} attraction{attractions.length !== 1 ? 's' : ''}
                        {searchMode === 'keyword' && ` for "${searchQuery}"`}
                    </p>
                )}

                {/* Loading state */}
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <AttractionGrid attractions={attractions} />
                )}
            </section>
        </>
    );
}
