/**
 * Unsplash API Client
 * Photo search service for attraction images
 */

import {
    unsplashConfig,
    buildUnsplashSearchUrl,
    getUnsplashHeaders,
    type UnsplashPhoto,
    type UnsplashSearchResponse,
} from '@/app/config/api/unsplash.config';
import { getUnsplashKey, isUnsplashConfigured } from '@/app/config/env.config';
import type { Photo } from '@/types';

/**
 * Search photos by keyword
 * @param query - Search query
 * @param options - Search options
 * @returns Array of photos
 */
export async function searchPhotos(
    query: string,
    options?: {
        page?: number;
        perPage?: number;
        orientation?: 'landscape' | 'portrait' | 'squarish';
    }
): Promise<Photo[]> {
    if (!isUnsplashConfigured()) {
        console.warn('Unsplash API not configured');
        return [];
    }

    const accessKey = getUnsplashKey();
    const url = buildUnsplashSearchUrl(query, options);
    const headers = getUnsplashHeaders(accessKey);

    try {
        const response = await fetch(url, {
            headers,
            next: {
                revalidate: 3600, // Cache for 1 hour
            },
        });

        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
        }

        const data: UnsplashSearchResponse = await response.json();

        return data.results.map(transformPhoto);
    } catch (error) {
        console.error('Failed to fetch photos from Unsplash:', error);
        return [];
    }
}

/**
 * Get a single photo by keyword (first result)
 * @param query - Search query
 * @returns Single photo or null
 */
export async function getPhotoByKeyword(query: string): Promise<Photo | null> {
    const photos = await searchPhotos(query, { perPage: 1 });
    return photos[0] || null;
}

/**
 * Get random photos
 * @param count - Number of photos to retrieve
 * @param query - Optional search query
 * @returns Array of photos
 */
export async function getRandomPhotos(
    count: number = 10,
    query?: string
): Promise<Photo[]> {
    if (!isUnsplashConfigured()) {
        console.warn('Unsplash API not configured');
        return [];
    }

    const accessKey = getUnsplashKey();
    const params = new URLSearchParams({
        count: String(count),
        orientation: 'landscape',
        content_filter: 'high',
    });

    if (query) {
        params.set('query', query);
    }

    const url = `${unsplashConfig.baseUrl}${unsplashConfig.endpoints.random}?${params}`;
    const headers = getUnsplashHeaders(accessKey);

    try {
        const response = await fetch(url, {
            headers,
            next: {
                revalidate: 3600,
            },
        });

        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status}`);
        }

        const data: UnsplashPhoto[] = await response.json();
        return data.map(transformPhoto);
    } catch (error) {
        console.error('Failed to fetch random photos from Unsplash:', error);
        return [];
    }
}

/**
 * Transform Unsplash photo to our Photo type
 */
function transformPhoto(photo: UnsplashPhoto): Photo {
    return {
        id: photo.id,
        url: photo.urls.regular,
        thumbUrl: photo.urls.small,
        alt: photo.alt_description || photo.description || '',
        credit: {
            name: photo.user.name,
            link: photo.user.links.html,
        },
    };
}
