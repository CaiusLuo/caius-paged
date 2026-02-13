/**
 * Nearby Attractions Client Component
 * Fetches user location and attractions on the client side
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import { AttractionGrid } from '@/components/features/attractions';
import { SkeletonCard, Button } from '@/components/ui';
import { DEFAULT_LOCATION } from '@/app/config/constants';
import type { Attraction, AttractionApiResponse } from '@/types';
import type { GeoLocation } from '@/app/config/api/geolocation.config';

type LocationSource = 'browser' | 'ip' | 'default' | 'loading';

export function NearbyAttractions() {
    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [locationSource, setLocationSource] = useState<LocationSource>('loading');
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Get user location and fetch attractions
     */
    const fetchLocationAndAttractions = useCallback(async () => {
        setLoading(true);
        setError(null);
        setLocationSource('loading');

        try {
            // Step 1: Try to get location
            let userLocation: GeoLocation | null = null;
            let source: LocationSource = 'default';

            // Try browser geolocation first
            if (navigator.geolocation) {
                try {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 300000,
                        });
                    });

                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        source: 'browser',
                    };
                    source = 'browser';
                } catch {
                    console.log('Browser geolocation denied or unavailable, falling back to IP...');
                }
            }

            // Fallback to IP geolocation via our API
            if (!userLocation) {
                try {
                    const ipResponse = await fetch('/api/geolocation');
                    if (ipResponse.ok) {
                        userLocation = await ipResponse.json();
                        source = 'ip';
                    }
                } catch {
                    console.log('IP geolocation failed');
                }
            }

            // Final fallback to default location
            if (!userLocation) {
                userLocation = {
                    lat: DEFAULT_LOCATION.LAT,
                    lng: DEFAULT_LOCATION.LNG,
                    city: DEFAULT_LOCATION.CITY,
                    country: DEFAULT_LOCATION.COUNTRY,
                    source: 'default',
                };
                source = 'default';
            }

            setLocation(userLocation);
            setLocationSource(source);

            // Step 2: Fetch attractions based on location
            const attractionsUrl = new URL('/api/attractions/nearby', window.location.origin);
            attractionsUrl.searchParams.set('lat', String(userLocation.lat));
            attractionsUrl.searchParams.set('lng', String(userLocation.lng));
            attractionsUrl.searchParams.set('radius', '5000');

            const attractionsResponse = await fetch(attractionsUrl.toString());

            if (!attractionsResponse.ok) {
                throw new Error('Failed to fetch attractions');
            }

            const data: AttractionApiResponse = await attractionsResponse.json();
            setAttractions(data.attractions);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load attractions. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocationAndAttractions();
    }, [fetchLocationAndAttractions]);

    // Format location display
    const locationDisplay = location?.city
        ? `${location.city}${location.country ? `, ${location.country}` : ''}`
        : location
            ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`
            : 'Detecting...';

    return (
        <>
            {/* Location Banner */}
            <section className="mb-8">
                <div className="flex items-center justify-center gap-4 rounded-lg bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Location: {locationDisplay}
                        </span>
                        {locationSource !== 'browser' && locationSource !== 'loading' && (
                            <span className="text-xs text-zinc-500">
                                ({locationSource === 'ip' ? 'IP-based' : 'Default'})
                            </span>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchLocationAndAttractions}
                        disabled={loading}
                        className="gap-1"
                    >
                        <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </section>

            {/* Error State */}
            {error && (
                <section className="mb-8">
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                </section>
            )}

            {/* Attractions Grid */}
            <section>
                <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Nearby Attractions
                </h2>
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
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
