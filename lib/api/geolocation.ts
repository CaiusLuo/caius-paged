/**
 * Geolocation Service
 * Browser geolocation and IP-based location fallback
 */

import {
    ipLocationConfig,
    type IpLocationResponse,
    type GeoLocation,
} from '@/app/config/api/geolocation.config';
import { DEFAULT_LOCATION } from '@/app/config/constants';

/**
 * Get user location from browser geolocation API
 * @returns Promise with location or error
 */
export function getBrowserLocation(): Promise<GeoLocation> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    source: 'browser',
                });
            },
            (error) => {
                let message = 'Unknown geolocation error';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location access was denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information is unavailable';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out';
                        break;
                }
                reject(new Error(message));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes cache
            }
        );
    });
}

/**
 * Get location from IP address
 * @returns Promise with location or null
 */
export async function getIpLocation(): Promise<GeoLocation | null> {
    try {
        const response = await fetch(ipLocationConfig.endpoint, {
            next: {
                revalidate: 3600, // Cache for 1 hour
            },
        });

        if (!response.ok) {
            throw new Error(`IP location API error: ${response.status}`);
        }

        const data: IpLocationResponse = await response.json();

        if (!data.latitude || !data.longitude) {
            return null;
        }

        return {
            lat: data.latitude,
            lng: data.longitude,
            city: data.city,
            country: data.country,
            source: 'ip',
        };
    } catch (error) {
        console.error('Failed to get IP location:', error);
        return null;
    }
}

/**
 * Get user location with fallback chain
 * 1. Try browser geolocation
 * 2. Fall back to IP geolocation
 * 3. Use default location (Beijing)
 * @returns Location object
 */
export async function getUserLocation(): Promise<GeoLocation> {
    // Try browser geolocation first (client-side only)
    if (typeof window !== 'undefined' && navigator.geolocation) {
        try {
            const location = await getBrowserLocation();
            return location;
        } catch (error) {
            console.warn('Browser geolocation failed:', error);
        }
    }

    // Fall back to IP geolocation
    const ipLocation = await getIpLocation();
    if (ipLocation) {
        return ipLocation;
    }

    // Return default location (Beijing)
    return {
        lat: DEFAULT_LOCATION.LAT,
        lng: DEFAULT_LOCATION.LNG,
        city: DEFAULT_LOCATION.CITY,
        country: DEFAULT_LOCATION.COUNTRY,
        source: 'default',
    };
}

/**
 * Check if browser geolocation is available
 */
export function isGeolocationAvailable(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

/**
 * Get default location
 */
export function getDefaultLocation(): GeoLocation {
    return {
        lat: DEFAULT_LOCATION.LAT,
        lng: DEFAULT_LOCATION.LNG,
        city: DEFAULT_LOCATION.CITY,
        country: DEFAULT_LOCATION.COUNTRY,
        source: 'default',
    };
}
