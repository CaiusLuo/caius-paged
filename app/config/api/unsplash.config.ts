/**
 * Unsplash API Configuration
 * Photo search service for attraction images
 * 
 * @see https://unsplash.com/documentation
 * 
 * Rate Limits:
 * - Demo: 50 requests/hour
 * - Production: 5,000 requests/hour
 */

import { apiDefaults } from './base.config';

/**
 * Unsplash API endpoints
 */
export const unsplashEndpoints = {
    /** Search photos by keyword */
    search: '/search/photos',

    /** Get random photos */
    random: '/photos/random',

    /** Get photo by ID */
    detail: (id: string) => `/photos/${id}`,

    /** Get user's photos */
    userPhotos: (username: string) => `/users/${username}/photos`,
} as const;

/**
 * Unsplash API configuration
 */
export const unsplashConfig = {
    /** Base URL for Unsplash API */
    baseUrl: 'https://api.unsplash.com',

    /** Request timeout (ms) */
    timeout: apiDefaults.timeout,

    /** Retry configuration */
    retryCount: apiDefaults.retryCount,

    /** API endpoints */
    endpoints: unsplashEndpoints,

    /** Default search parameters */
    defaultParams: {
        /** Results per page */
        perPage: 10,

        /** Image orientation preference */
        orientation: 'landscape' as const,

        /** Content filter */
        contentFilter: 'high' as const,
    },
} as const;

/**
 * Get Unsplash authorization header
 * Requires UNSPLASH_ACCESS_KEY environment variable
 */
export function getUnsplashHeaders(accessKey: string): HeadersInit {
    return {
        ...apiDefaults.headers,
        'Authorization': `Client-ID ${accessKey}`,
    };
}

/**
 * Build Unsplash search URL with parameters
 */
export function buildUnsplashSearchUrl(
    query: string,
    options?: {
        page?: number;
        perPage?: number;
        orientation?: 'landscape' | 'portrait' | 'squarish';
    }
): string {
    const params = new URLSearchParams({
        query,
        page: String(options?.page ?? 1),
        per_page: String(options?.perPage ?? unsplashConfig.defaultParams.perPage),
        orientation: options?.orientation ?? unsplashConfig.defaultParams.orientation,
        content_filter: unsplashConfig.defaultParams.contentFilter,
    });

    return `${unsplashConfig.baseUrl}${unsplashConfig.endpoints.search}?${params}`;
}

/**
 * Type definitions for Unsplash API responses
 */
export interface UnsplashPhoto {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string | null;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    user: {
        id: string;
        username: string;
        name: string;
        portfolio_url: string | null;
        links: {
            html: string;
        };
    };
}

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: UnsplashPhoto[];
}
