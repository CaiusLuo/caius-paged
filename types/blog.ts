/**
 * Blog Type Definitions
 * Types for blog posts and content management
 */

/**
 * Blog post frontmatter
 */
export interface BlogFrontmatter {
    /** Post title */
    title?: string;
    /** Publication date (ISO string) */
    date?: string;
    /** Brief description for SEO and previews */
    description?: string;
    /** Content tags */
    tags?: string[];
    /** Content category */
    category?: string;
    /** Publication status */
    published?: boolean;
    /** Cover image path (optional) */
    cover?: string;
}

/**
 * Full blog post with content
 */
export interface BlogPost {
    /** URL-safe identifier */
    slug: string;
    /** Post title */
    title: string;
    /** Publication date (ISO string) */
    date: string;
    /** Brief description */
    description: string;
    /** Content tags */
    tags: string[];
    /** Content category */
    category: string;
    /** Cover image path (optional) */
    cover?: string;
    /** Rendered HTML content */
    content: string;
    /** Estimated reading time (minutes) */
    readingTime: number;
}

/**
 * Blog post summary for list views
 */
export interface BlogPostSummary {
    /** URL-safe identifier */
    slug: string;
    /** Post title */
    title: string;
    /** Publication date (ISO string) */
    date: string;
    /** Brief description */
    description: string;
    /** Content tags */
    tags: string[];
    /** Content category */
    category: string;
    /** Cover image path (optional) */
    cover?: string;
    /** Estimated reading time (minutes) */
    readingTime: number;
}

/**
 * Blog list/filter parameters
 */
export interface BlogListParams {
    /** Filter by tag */
    tag?: string;
    /** Filter by category */
    category?: string;
    /** Page number */
    page?: number;
    /** Include unpublished posts (admin only) */
    includeUnpublished?: boolean;
}

/**
 * Blog API response
 */
export interface BlogListResponse {
    /** List of blog posts */
    posts: BlogPostSummary[];
    /** Total count */
    total: number;
    /** Current page */
    page: number;
    /** Has more results */
    hasMore: boolean;
    /** Available tags */
    tags: string[];
    /** Available categories */
    categories: string[];
}

/**
 * Table of contents item
 */
export interface TocItem {
    /** Heading ID */
    id: string;
    /** Heading text */
    text: string;
    /** Heading level (1-6) */
    level: number;
    /** Child items */
    children?: TocItem[];
}

/**
 * Blog category option
 */
export interface BlogCategoryOption {
    /** Category slug */
    slug: string;
    /** Display label */
    label: string;
    /** Post count */
    count: number;
}
