/**
 * Geolocation Configuration
 * Browser geolocation and IP-based fallback services
 */

import { apiDefaults } from './base.config';

/**
 * IP Geolocation API configuration (ipapi.co)
 * Free tier: 1,000 requests/day
 * No API key required for basic usage
 */
export const ipLocationConfig = {
    /** Base URL for IP geolocation */
    baseUrl: 'https://ipapi.co',

    /** Request timeout (ms) - shorter for fallback */
    timeout: 5000,

    /** API endpoint */
    endpoint: '/json',

    /** Full URL */
    get url() {
        return `${this.baseUrl}${this.endpoint}`;
    },
} as const;

/**
 * Browser Geolocation API options
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
 */
export const browserGeolocationOptions: PositionOptions = {
    /** Use high accuracy (GPS) if available */
    enableHighAccuracy: false,

    /** Maximum age of cached position (ms) */
    maximumAge: 5 * 60 * 1000, // 5 minutes

    /** Timeout for getting position (ms) */
    timeout: 10000,
};

/**
 * Geolocation error codes
 */
export const geolocationErrors = {
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
} as const;

/**
 * Geolocation error messages
 */
export const geolocationErrorMessages: Record<number, string> = {
    [geolocationErrors.PERMISSION_DENIED]: 'User denied geolocation permission',
    [geolocationErrors.POSITION_UNAVAILABLE]: 'Position information unavailable',
    [geolocationErrors.TIMEOUT]: 'Geolocation request timed out',
};

/**
 * Type definitions for IP geolocation response
 */
export interface IpLocationResponse {
    ip: string;
    city: string;
    region: string;
    region_code: string;
    country: string;
    country_code: string;
    country_name: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    org: string;
    asn: string;
}

/**
 * Standardized location interface
 */
export interface GeoLocation {
    lat: number;
    lng: number;
    accuracy?: number;
    source: 'browser' | 'ip' | 'default';
    city?: string;
    country?: string;
}

/**
 * Geolocation configuration
 */
export const geolocationConfig = {
    /** IP-based location service */
    ipLocation: ipLocationConfig,

    /** Browser geolocation options */
    browserOptions: browserGeolocationOptions,

    /** Error codes and messages */
    errors: geolocationErrors,
    errorMessages: geolocationErrorMessages,

    /** Retry configuration */
    retryCount: 1, // Fewer retries for geolocation
    retryDelay: apiDefaults.retryDelay,
} as const;

/**
 * Check if browser geolocation is available
 */
export function isBrowserGeolocationAvailable(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}
