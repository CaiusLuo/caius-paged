/**
 * Cache Configuration
 * Caching strategies for different resources
 * 
 * Used with Next.js fetch() revalidation and custom caching
 */

/**
 * Cache TTL values in seconds
 */
export const CACHE_TTL = {
    /** Very short cache for frequently changing data */
    SHORT: 60, // 1 minute

    /** Medium cache for semi-dynamic data */
    MEDIUM: 300, // 5 minutes

    /** Long cache for relatively static data */
    LONG: 3600, // 1 hour

    /** Very long cache for rarely changing data */
    EXTENDED: 86400, // 24 hours

    /** Static content cache */
    STATIC: 604800, // 7 days
} as const;

/**
 * Resource-specific cache configuration
 */
export const cacheConfig = {
    /**
     * Attractions caching
     */
    attractions: {
        /** Attractions list cache (5 minutes) */
        list: CACHE_TTL.MEDIUM,

        /** Nearby attractions cache (5 minutes) */
        nearby: CACHE_TTL.MEDIUM,

        /** Single attraction detail cache (30 minutes) */
        detail: CACHE_TTL.LONG / 2,

        /** Search results cache (1 minute) */
        search: CACHE_TTL.SHORT,
    },

    /**
     * Blog caching
     */
    blog: {
        /** Blog post list cache (1 hour) */
        list: CACHE_TTL.LONG,

        /** Single blog post cache (24 hours) */
        detail: CACHE_TTL.EXTENDED,

        /** Blog tags/categories cache (1 hour) */
        metadata: CACHE_TTL.LONG,
    },

    /**
     * External API response caching
     */
    api: {
        /** Unsplash photo cache (1 hour) */
        unsplash: CACHE_TTL.LONG,

        /** Amap POI cache (5 minutes) */
        amap: CACHE_TTL.MEDIUM,

        /** IP geolocation cache (24 hours) */
        geolocation: CACHE_TTL.EXTENDED,
    },

    /**
     * Static assets caching
     */
    static: {
        /** Images cache (7 days) */
        images: CACHE_TTL.STATIC,

        /** Fonts cache (7 days) */
        fonts: CACHE_TTL.STATIC,
    },
} as const;

/**
 * Next.js fetch revalidation options
 */
export const revalidateOptions = {
    /** Force cache - never revalidate */
    forceCache: { cache: 'force-cache' } as const,

    /** No store - always fetch fresh */
    noStore: { cache: 'no-store' } as const,

    /** Revalidate after specific seconds */
    revalidate: (seconds: number) => ({
        next: { revalidate: seconds },
    }),
} as const;

/**
 * Cache key generators for consistent cache key naming
 */
export const cacheKeys = {
    attractions: {
        list: (page: number) => `attractions:list:${page}`,
        nearby: (lat: number, lng: number, radius: number) =>
            `attractions:nearby:${lat.toFixed(4)},${lng.toFixed(4)}:${radius}`,
        detail: (id: string) => `attractions:detail:${id}`,
        search: (query: string, page: number) =>
            `attractions:search:${query.toLowerCase()}:${page}`,
    },

    blog: {
        list: (page: number) => `blog:list:${page}`,
        detail: (slug: string) => `blog:detail:${slug}`,
        tag: (tag: string, page: number) => `blog:tag:${tag}:${page}`,
    },

    photos: {
        search: (query: string) => `photos:search:${query.toLowerCase()}`,
    },
} as const;

/**
 * Cache control header builders
 */
export const cacheHeaders = {
    /** Public cache with max-age */
    public: (maxAge: number) =>
        `public, max-age=${maxAge}, s-maxage=${maxAge}`,

    /** Private cache (browser only) */
    private: (maxAge: number) =>
        `private, max-age=${maxAge}`,

    /** No cache */
    noCache: 'no-cache, no-store, must-revalidate',

    /** Immutable (for static assets) */
    immutable: (maxAge: number) =>
        `public, max-age=${maxAge}, immutable`,
} as const;

export type CacheConfig = typeof cacheConfig;
