/**
 * Attraction Type Definitions
 * Types for POI (Point of Interest) data from Amap API
 */

/**
 * Photo from Unsplash
 */
export interface Photo {
    /** Unique photo identifier */
    id: string;
    /** Full resolution URL */
    url: string;
    /** Thumbnail URL */
    thumbUrl: string;
    /** Alt text description */
    alt: string;
    /** Photographer credit */
    credit: {
        name: string;
        link: string;
    };
}

/**
 * Attraction/POI data
 */
export interface Attraction {
    /** Unique identifier */
    id: string;
    /** Attraction name */
    name: string;
    /** Location details */
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    /** Distance from user (meters) */
    distance?: number;
    /** Star rating (0-5) */
    rating?: number;
    /** Category name */
    category: string;
    /** Category tags */
    tags: string[];
    /** Associated photos from Unsplash */
    photos: Photo[];
    /** Contact phone */
    phone?: string;
    /** Business hours */
    openTime?: string;
    /** Average cost */
    cost?: string;
}

/**
 * Attraction search parameters
 */
export interface AttractionSearchParams {
    /** Search query */
    q?: string;
    /** Category filter */
    category?: string;
    /** Search radius in meters */
    radius?: number;
    /** Sort field */
    sort?: 'distance' | 'rating' | 'name';
    /** Page number */
    page?: number;
    /** User location */
    location?: {
        lat: number;
        lng: number;
    };
}

/**
 * Attraction API response
 */
export interface AttractionApiResponse {
    /** List of attractions */
    attractions: Attraction[];
    /** Total count */
    total: number;
    /** Current page */
    page: number;
    /** Has more results */
    hasMore: boolean;
}

/**
 * Category option for filtering
 */
export interface CategoryOption {
    /** Category code */
    code: string;
    /** Display label */
    label: string;
}

/**
 * Attraction categories
 */
export const ATTRACTION_CATEGORIES: CategoryOption[] = [
    { code: 'all', label: 'All' },
    { code: '110000', label: 'Scenic Spots' },
    { code: '110101', label: 'Parks' },
    { code: '140100', label: 'Museums' },
    { code: '110206', label: 'Temples' },
    { code: '110200', label: 'Historical Sites' },
];
