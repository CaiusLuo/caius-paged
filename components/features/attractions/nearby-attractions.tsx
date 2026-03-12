/**
 * Nearby Attractions Client Component
 * Fetches user location and attractions on the client side
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { MapPin, RefreshCw, Sparkles } from 'lucide-react';
import { AttractionGrid } from '@/components/features/attractions';
import { Button, SkeletonCard } from '@/components/ui';
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

    const fetchLocationAndAttractions = useCallback(async () => {
        setLoading(true);
        setError(null);
        setLocationSource('loading');

        try {
            let userLocation: GeoLocation | null = null;
            let source: LocationSource = 'default';

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

    const locationDisplay = location?.city
        ? `${location.city}${location.country ? `, ${location.country}` : ''}`
        : location
            ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`
            : 'Detecting location...';

    return (
        <div className="space-y-6">
            <section className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-5 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                            <Sparkles className="h-3.5 w-3.5" />
                            Live nearby feed
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
                            <span className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-white dark:bg-white dark:text-zinc-950">
                                <MapPin className="h-4 w-4" />
                                {locationDisplay}
                            </span>
                            {locationSource !== 'browser' && locationSource !== 'loading' && (
                                <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] dark:border-white/10">
                                    {locationSource === 'ip' ? 'IP fallback' : 'Default city'}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="md"
                        onClick={fetchLocationAndAttractions}
                        disabled={loading}
                        className="rounded-full px-5"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh places
                    </Button>
                </div>
            </section>

            {error && (
                <section className="rounded-[1.4rem] border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/20">
                    <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                </section>
            )}

            <section>
                <div className="mb-5 flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-semibold text-[color:var(--foreground)]">Nearby attractions</h3>
                    {!loading && attractions.length > 0 && (
                        <span className="text-sm text-[color:var(--muted)]">
                            {attractions.length} result{attractions.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
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
