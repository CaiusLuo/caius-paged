/**
 * Application Constants
 * Centralized configuration values used throughout the app
 */

/**
 * Pagination settings
 */
export const PAGINATION = {
    /** Default page size for lists */
    DEFAULT_PAGE_SIZE: 10,

    /** Attractions per page */
    ATTRACTIONS_PER_PAGE: 20,

    /** Blog posts per page */
    BLOG_POSTS_PER_PAGE: 10,

    /** Maximum page size allowed */
    MAX_PAGE_SIZE: 50,
} as const;

/**
 * Default geolocation (Beijing, China)
 * Used when browser geolocation and IP geolocation both fail
 */
export const DEFAULT_LOCATION = {
    /** Beijing latitude */
    LAT: 39.9042,

    /** Beijing longitude */
    LNG: 116.4074,

    /** City name */
    CITY: 'Beijing',

    /** Country */
    COUNTRY: 'China',
} as const;

/**
 * Search configuration
 */
export const SEARCH = {
    /** Debounce delay for search input (ms) */
    DEBOUNCE_DELAY: 300,

    /** Minimum characters to trigger search */
    MIN_QUERY_LENGTH: 2,

    /** Maximum search results */
    MAX_RESULTS: 100,

    /** Default search radius in meters */
    DEFAULT_RADIUS: 5000,

    /** Available radius options (meters) */
    RADIUS_OPTIONS: [1000, 5000, 10000, 50000] as const,
} as const;

/**
 * Image settings
 */
export const IMAGE = {
    /** Placeholder blur data URL */
    PLACEHOLDER_BLUR: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgICAgIDAQAAAAAAAAAAAQIDBAURBgAhEjFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAICAgMAAAAAAAAAAAAAAAECAAMEESFBYf/aAAwDAQACEQMRAD8AqYjiuNxeSsZGCOZ7c0YjaSaVn8V79KNgDv57PPeI4xhMDkLmQx9IRWrkay2H82YyKo0o0xIA9DfQ555xUYOJ4mPSadPTHJmySZ//2Q==',

    /** Default image quality (1-100) */
    DEFAULT_QUALITY: 80,

    /** Thumbnail size */
    THUMBNAIL_SIZE: 400,

    /** Card image size */
    CARD_IMAGE_SIZE: 800,

    /** Full image size */
    FULL_IMAGE_SIZE: 1920,
} as const;

/**
 * Animation durations (ms)
 */
export const ANIMATION = {
    /** Fast animation */
    FAST: 150,

    /** Normal animation */
    NORMAL: 300,

    /** Slow animation */
    SLOW: 500,

    /** Page transition */
    PAGE_TRANSITION: 200,
} as const;

/**
 * Breakpoints for responsive design (px)
 * Matches Tailwind CSS defaults
 */
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

/**
 * Blog configuration
 */
export const BLOG = {
    /** Content directory relative to project root */
    CONTENT_DIR: 'content/blog',

    /** Additional notes directories relative to project root */
    FALLBACK_CONTENT_DIRS: ['../notes'] as const,

    /** Supported file extensions */
    FILE_EXTENSIONS: ['.md', '.mdx'] as const,

    /** Words per minute for reading time calculation */
    WORDS_PER_MINUTE: 200,

    /** Excerpt length (characters) */
    EXCERPT_LENGTH: 160,
} as const;

/**
 * SEO limits
 */
export const SEO = {
    /** Maximum title length */
    MAX_TITLE_LENGTH: 60,

    /** Maximum description length */
    MAX_DESCRIPTION_LENGTH: 160,

    /** Maximum keywords */
    MAX_KEYWORDS: 10,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Unable to connect. Please check your internet connection.',
    NOT_FOUND: 'The requested resource was not found.',
    RATE_LIMITED: 'Too many requests. Please wait a moment.',
    GEOLOCATION_DENIED: 'Location access was denied.',
    GEOLOCATION_UNAVAILABLE: 'Location information is unavailable.',
} as const;

