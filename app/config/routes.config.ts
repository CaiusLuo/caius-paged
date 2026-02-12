/**
 * Routes Configuration
 * Centralized route definitions to avoid hardcoded strings
 */

// ============================================
// Route Definitions
// ============================================

/**
 * Application routes
 * Use these instead of hardcoded path strings
 */
export const routes = {
    /** Homepage */
    home: '/',

    /** Explore/Attractions routes */
    explore: {
        index: '/explore',
        search: (query: string) => `/explore?q=${encodeURIComponent(query)}`,
        detail: (id: string) => `/explore/${id}`,
    },

    /** Blog routes */
    blog: {
        index: '/blog',
        post: (slug: string) => `/blog/${slug}`,
        tag: (tag: string) => `/blog/tag/${encodeURIComponent(tag)}`,
        category: (category: string) => `/blog/category/${encodeURIComponent(category)}`,
        rss: '/rss.xml',
    },

    /** About page */
    about: '/about',

    /** API routes */
    api: {
        attractions: {
            list: '/api/attractions',
            nearby: '/api/attractions/nearby',
            search: '/api/attractions/search',
            detail: (id: string) => `/api/attractions/${id}`,
        },
        blog: {
            list: '/api/blog',
            detail: (slug: string) => `/api/blog/${slug}`,
            tags: '/api/blog/tags',
        },
        geolocation: '/api/geolocation',
    },
} as const;

// ============================================
// Route Metadata
// ============================================

/**
 * Route metadata for SEO and navigation
 */
export interface RouteMetadata {
    title: string;
    description?: string;
    showInNav?: boolean;
    keywords?: string[];
}

/**
 * Metadata for each route
 */
export const routeMetadata: Record<string, RouteMetadata> = {
    [routes.home]: {
        title: 'Home',
        description: 'Discover nearby attractions based on your location',
        showInNav: true,
        keywords: ['attractions', 'nearby', 'explore', 'location'],
    },
    [routes.explore.index]: {
        title: 'Explore',
        description: 'Search and discover amazing attractions',
        showInNav: true,
        keywords: ['search', 'attractions', 'discover', 'explore'],
    },
    [routes.blog.index]: {
        title: 'Blog',
        description: 'Technical articles and development insights',
        showInNav: true,
        keywords: ['blog', 'articles', 'tech', 'development'],
    },
    [routes.about]: {
        title: 'About',
        description: 'Learn more about me and this project',
        showInNav: true,
        keywords: ['about', 'portfolio', 'developer'],
    },
};

// ============================================
// Route Helpers
// ============================================

/**
 * Check if a path matches a route
 */
export function isActiveRoute(currentPath: string, route: string): boolean {
    if (route === '/') {
        return currentPath === '/';
    }
    return currentPath.startsWith(route);
}

/**
 * Get route metadata by path
 */
export function getRouteMetadata(path: string): RouteMetadata | undefined {
    // Exact match first
    if (routeMetadata[path]) {
        return routeMetadata[path];
    }

    // Check for parent route match
    const parentPath = path.split('/').slice(0, 2).join('/');
    return routeMetadata[parentPath];
}

/**
 * Build URL with query parameters
 */
export function buildUrl(
    basePath: string,
    params?: Record<string, string | number | undefined>
): string {
    if (!params) return basePath;

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.set(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
}

// ============================================
// Type Exports
// ============================================

export type Routes = typeof routes;
