/**
 * useGeolocation Hook
 * React hook for browser geolocation with fallback
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_LOCATION } from '@/app/config/constants';
import type { GeoLocation } from '@/app/config/api/geolocation.config';

/**
 * Geolocation state
 */
interface GeolocationState {
    /** Current location */
    location: GeoLocation | null;
    /** Loading state */
    loading: boolean;
    /** Error message */
    error: string | null;
}

/**
 * Geolocation options
 */
interface UseGeolocationOptions {
    /** Request location on mount */
    requestOnMount?: boolean;
    /** Enable high accuracy (GPS) */
    enableHighAccuracy?: boolean;
    /** Timeout in milliseconds */
    timeout?: number;
    /** Maximum age of cached position */
    maximumAge?: number;
}

/**
 * Get user's geolocation with fallback
 * @param options - Geolocation options
 * @returns Geolocation state and request function
 * 
 * @example
 * const { location, loading, error, requestLocation } = useGeolocation();
 * 
 * // Request location on button click
 * <button onClick={requestLocation}>Get Location</button>
 */
export function useGeolocation(options: UseGeolocationOptions = {}) {
    const {
        requestOnMount = true,
        enableHighAccuracy = true,
        timeout = 10000,
        maximumAge = 300000, // 5 minutes
    } = options;

    const [state, setState] = useState<GeolocationState>({
        location: null,
        loading: false,
        error: null,
    });

    /**
     * Get location from IP as fallback
     */
    const getIpLocation = useCallback(async (): Promise<GeoLocation> => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) {
                throw new Error('IP location failed');
            }
            const data = await response.json();
            return {
                lat: data.latitude,
                lng: data.longitude,
                city: data.city,
                country: data.country,
                source: 'ip',
            };
        } catch {
            // Return default location (Beijing)
            return {
                lat: DEFAULT_LOCATION.LAT,
                lng: DEFAULT_LOCATION.LNG,
                city: DEFAULT_LOCATION.CITY,
                country: DEFAULT_LOCATION.COUNTRY,
                source: 'default',
            };
        }
    }, []);

    /**
     * Request geolocation
     */
    const requestLocation = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Try browser geolocation first
        if (navigator.geolocation) {
            try {
                const position = await new Promise<GeolocationPosition>(
                    (resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            resolve,
                            reject,
                            {
                                enableHighAccuracy,
                                timeout,
                                maximumAge,
                            }
                        );
                    }
                );

                setState({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        source: 'browser',
                    },
                    loading: false,
                    error: null,
                });
                return;
            } catch (err) {
                // Browser geolocation failed, fall back to IP
                console.warn('Browser geolocation failed:', err);
            }
        }

        // Fall back to IP geolocation
        const ipLocation = await getIpLocation();
        setState({
            location: ipLocation,
            loading: false,
            error: null,
        });
    }, [enableHighAccuracy, timeout, maximumAge, getIpLocation]);

    /**
     * Get default location
     */
    const getDefaultLocation = useCallback((): GeoLocation => ({
        lat: DEFAULT_LOCATION.LAT,
        lng: DEFAULT_LOCATION.LNG,
        city: DEFAULT_LOCATION.CITY,
        country: DEFAULT_LOCATION.COUNTRY,
        source: 'default',
    }), []);

    // Request location on mount if enabled
    useEffect(() => {
        if (requestOnMount) {
            requestLocation();
        }
    }, [requestOnMount, requestLocation]);

    return {
        ...state,
        requestLocation,
        getDefaultLocation,
    };
}
