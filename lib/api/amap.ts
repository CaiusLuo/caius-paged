/**
 * Amap (Gaode Maps) API Client
 * POI search and geocoding service for China
 */

import {
    amapConfig,
    buildAmapNearbyUrl,
    buildAmapSearchUrl,
    parseAmapLocation,
    type AmapPoi,
    type AmapSearchResponse,
} from '@/app/config/api/amap.config';
import { getAmapKey, isAmapConfigured } from '@/app/config/env.config';
import type { Attraction } from '@/types';

/**
 * Search nearby attractions
 * @param location - User location (lat, lng)
 * @param options - Search options
 * @returns Array of attractions
 */
export async function searchNearbyAttractions(
    location: { lat: number; lng: number },
    options?: {
        radius?: number;
        types?: string;
        offset?: number;
        page?: number;
    }
): Promise<Attraction[]> {
    if (!isAmapConfigured()) {
        console.warn('Amap API not configured');
        return [];
    }

    const apiKey = getAmapKey();
    const url = buildAmapNearbyUrl(apiKey, location, options);

    try {
        const response = await fetch(url, {
            next: {
                revalidate: 300, // Cache for 5 minutes
            },
        });

        if (!response.ok) {
            throw new Error(`Amap API error: ${response.status}`);
        }

        const data: AmapSearchResponse = await response.json();

        if (data.status !== '1') {
            throw new Error(`Amap API error: ${data.info}`);
        }

        return data.pois.map((poi) => transformPoiToAttraction(poi, location));
    } catch (error) {
        console.error('Failed to fetch nearby attractions from Amap:', error);
        return [];
    }
}

/**
 * Search attractions by text query
 * @param keywords - Search keywords
 * @param options - Search options
 * @returns Array of attractions
 */
export async function searchAttractionsByText(
    keywords: string,
    options?: {
        city?: string;
        types?: string;
        offset?: number;
        page?: number;
    }
): Promise<Attraction[]> {
    if (!isAmapConfigured()) {
        console.warn('Amap API not configured');
        return [];
    }

    const apiKey = getAmapKey();
    const url = buildAmapSearchUrl(apiKey, keywords, options);

    try {
        const response = await fetch(url, {
            next: {
                revalidate: 300,
            },
        });

        if (!response.ok) {
            throw new Error(`Amap API error: ${response.status}`);
        }

        const data: AmapSearchResponse = await response.json();

        if (data.status !== '1') {
            throw new Error(`Amap API error: ${data.info}`);
        }

        return data.pois.map((poi) => transformPoiToAttraction(poi));
    } catch (error) {
        console.error('Failed to search attractions from Amap:', error);
        return [];
    }
}

/**
 * Get attraction detail by ID
 * @param id - POI ID
 * @returns Attraction or null
 */
export async function getAttractionById(id: string): Promise<Attraction | null> {
    if (!isAmapConfigured()) {
        console.warn('Amap API not configured');
        return null;
    }

    const apiKey = getAmapKey();
    const params = new URLSearchParams({
        key: apiKey,
        id,
        output: 'json',
        extensions: 'all',
    });

    const url = `${amapConfig.baseUrl}${amapConfig.endpoints.placeDetail}?${params}`;

    try {
        const response = await fetch(url, {
            next: {
                revalidate: 1800, // Cache for 30 minutes
            },
        });

        if (!response.ok) {
            throw new Error(`Amap API error: ${response.status}`);
        }

        const data: AmapSearchResponse = await response.json();

        if (data.status !== '1' || data.pois.length === 0) {
            return null;
        }

        return transformPoiToAttraction(data.pois[0]);
    } catch (error) {
        console.error('Failed to fetch attraction detail from Amap:', error);
        return null;
    }
}

/**
 * Transform Amap POI to Attraction type
 */
function transformPoiToAttraction(
    poi: AmapPoi,
    userLocation?: { lat: number; lng: number }
): Attraction {
    const coords = parseAmapLocation(poi.location);

    // Calculate distance if user location is provided
    let distance: number | undefined;
    if (userLocation && poi.distance) {
        distance = parseFloat(poi.distance);
    }

    return {
        id: poi.id,
        name: poi.name,
        location: {
            lat: coords.lat,
            lng: coords.lng,
            address: poi.address || '',
        },
        distance,
        rating: poi.biz_ext?.rating ? parseFloat(poi.biz_ext.rating) : undefined,
        category: poi.type.split(';')[0] || 'Attraction',
        tags: poi.type.split(';'),
        photos: poi.photos?.map((p) => ({
            id: p.url,
            url: p.url,
            thumbUrl: p.url,
            alt: p.title || poi.name,
            credit: { name: 'Amap', link: 'https://amap.com' },
        })) || [],
        phone: poi.tel,
        openTime: poi.biz_ext?.open_time,
        cost: poi.biz_ext?.cost,
    };
}
