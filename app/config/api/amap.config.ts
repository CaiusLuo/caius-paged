/**
 * Amap (Gaode Maps) API Configuration
 * POI search and geocoding service for China
 * 
 * @see https://lbs.amap.com/api/webservice/guide/api/search
 * 
 * Rate Limits:
 * - Free tier: 5,000 requests/day
 */

import { apiDefaults } from './base.config';

/**
 * Amap API endpoints
 */
export const amapEndpoints = {
    /** Address to coordinates */
    geocode: '/geocode/geo',

    /** Coordinates to address */
    reverseGeocode: '/geocode/regeo',

    /** Search POIs around a location */
    placeAround: '/place/around',

    /** Text-based POI search */
    placeText: '/place/text',

    /** POI detail by ID */
    placeDetail: '/place/detail',
} as const;

/**
 * Amap POI category types
 * @see https://lbs.amap.com/api/webservice/download
 */
export const amapPoiTypes = {
    /** All scenic spots */
    scenic: '110000',

    /** Parks and squares */
    park: '110101',

    /** Museums */
    museum: '140100',

    /** Temples and religious sites */
    temple: '110206',

    /** Historical sites */
    historical: '110200',

    /** Natural scenery */
    nature: '110103',

    /** Amusement parks */
    amusement: '110104',
} as const;

/**
 * Combined scenic categories for search
 */
export const amapScenicTypes = Object.values(amapPoiTypes).join('|');

/**
 * Amap API configuration
 */
export const amapConfig = {
    /** Base URL for Amap API */
    baseUrl: 'https://restapi.amap.com/v3',

    /** Request timeout (ms) */
    timeout: apiDefaults.timeout,

    /** Retry configuration */
    retryCount: apiDefaults.retryCount,

    /** API endpoints */
    endpoints: amapEndpoints,

    /** POI category types */
    poiTypes: amapPoiTypes,

    /** Default search parameters */
    defaultParams: {
        /** Default search radius in meters */
        radius: 5000,

        /** Results per page */
        offset: 20,

        /** Response format */
        output: 'json' as const,

        /** Include extension info */
        extensions: 'all' as const,
    },
} as const;

/**
 * Build Amap nearby search URL
 */
export function buildAmapNearbyUrl(
    apiKey: string,
    location: { lat: number; lng: number },
    options?: {
        radius?: number;
        types?: string;
        offset?: number;
        page?: number;
    }
): string {
    const params = new URLSearchParams({
        key: apiKey,
        location: `${location.lng},${location.lat}`,
        radius: String(options?.radius ?? amapConfig.defaultParams.radius),
        types: options?.types ?? amapScenicTypes,
        offset: String(options?.offset ?? amapConfig.defaultParams.offset),
        page: String(options?.page ?? 1),
        output: amapConfig.defaultParams.output,
        extensions: amapConfig.defaultParams.extensions,
    });

    return `${amapConfig.baseUrl}${amapConfig.endpoints.placeAround}?${params}`;
}

/**
 * Build Amap text search URL
 */
export function buildAmapSearchUrl(
    apiKey: string,
    keywords: string,
    options?: {
        city?: string;
        types?: string;
        offset?: number;
        page?: number;
    }
): string {
    const params = new URLSearchParams({
        key: apiKey,
        keywords,
        types: options?.types ?? amapScenicTypes,
        offset: String(options?.offset ?? amapConfig.defaultParams.offset),
        page: String(options?.page ?? 1),
        output: amapConfig.defaultParams.output,
        extensions: amapConfig.defaultParams.extensions,
    });

    if (options?.city) {
        params.set('city', options.city);
    }

    return `${amapConfig.baseUrl}${amapConfig.endpoints.placeText}?${params}`;
}

/**
 * Type definitions for Amap API responses
 */
export interface AmapPoi {
    id: string;
    name: string;
    type: string;
    typecode: string;
    address: string;
    location: string; // "lng,lat" format
    tel?: string;
    distance?: string;
    biz_ext?: {
        rating?: string;
        cost?: string;
        open_time?: string;
    };
    photos?: Array<{
        title: string;
        url: string;
    }>;
}

export interface AmapSearchResponse {
    status: '0' | '1';
    count: string;
    info: string;
    pois: AmapPoi[];
}

/**
 * Parse Amap location string to coordinates
 */
export function parseAmapLocation(location: string): { lat: number; lng: number } {
    const [lng, lat] = location.split(',').map(Number);
    return { lat, lng };
}
