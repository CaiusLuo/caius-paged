import { z } from 'zod';

// ============================================
// Schema Definitions
// ============================================

/**
 * Client-side environment variables (NEXT_PUBLIC_*)
 * These are exposed to the browser
 */
const clientEnvSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z
        .string()
        .url('Invalid site URL format')
        .default('http://localhost:3000'),

    NEXT_PUBLIC_API_BASE: z
        .string()
        .default('/api'),

    NEXT_PUBLIC_ENABLE_ANALYTICS: z
        .enum(['true', 'false'])
        .default('false'),
});

/**
 * Server-side environment variables
 * These are only available on the server
 */
const serverEnvSchema = z.object({
    // Unsplash API for photo search
    UNSPLASH_ACCESS_KEY: z
        .string()
        .optional()
        .describe('Unsplash API access key for photo search'),

    // Amap API for China POI search
    AMAP_API_KEY: z
        .string()
        .optional()
        .describe('Amap (Gaode) API key for POI search'),

    // Analytics ID (optional)
    ANALYTICS_ID: z
        .string()
        .optional()
        .describe('Analytics service ID'),

    // Node environment
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
});

// Combined schema
const envSchema = clientEnvSchema.merge(serverEnvSchema);

// ============================================
// Type Definitions
// ============================================

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type Env = ClientEnv & ServerEnv;

// ============================================
// Validation
// ============================================

/**
 * Validate and parse environment variables
 * Throws detailed error if validation fails
 */
function validateEnv(): Env {
    const envToValidate = {
        // Client env
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
        NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
        // Server env
        UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
        AMAP_API_KEY: process.env.AMAP_API_KEY,
        ANALYTICS_ID: process.env.ANALYTICS_ID,
        NODE_ENV: process.env.NODE_ENV,
    };

    const result = envSchema.safeParse(envToValidate);

    if (!result.success) {
        const errors = result.error.issues
            .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
            .join('\n');

        throw new Error(
            `Environment validation failed:\n${errors}\n\n` +
            `Please check your .env.local file.`
        );
    }

    return result.data;
}

// ============================================
// Exports
// ============================================

/** Validated environment variables */
export const env = validateEnv();

/** Check if running in development mode */
export const isDev = env.NODE_ENV === 'development';

/** Check if running in production mode */
export const isProd = env.NODE_ENV === 'production';

/** Check if running in test mode */
export const isTest = env.NODE_ENV === 'test';

/**
 * Get client-safe environment variables
 * Safe to expose to the browser
 */
export function getClientEnv(): ClientEnv {
    return {
        NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_API_BASE: env.NEXT_PUBLIC_API_BASE,
        NEXT_PUBLIC_ENABLE_ANALYTICS: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    };
}

/**
 * Check if Unsplash API is configured
 */
export function isUnsplashConfigured(): boolean {
    return Boolean(env.UNSPLASH_ACCESS_KEY);
}

/**
 * Check if Amap API is configured
 */
export function isAmapConfigured(): boolean {
    return Boolean(env.AMAP_API_KEY);
}

/**
 * Get Unsplash access key (server-only)
 * Throws if not configured
 */
export function getUnsplashKey(): string {
    if (!env.UNSPLASH_ACCESS_KEY) {
        throw new Error('UNSPLASH_ACCESS_KEY is not configured');
    }
    return env.UNSPLASH_ACCESS_KEY;
}

/**
 * Get Amap API key (server-only)
 * Throws if not configured
 */
export function getAmapKey(): string {
    if (!env.AMAP_API_KEY) {
        throw new Error('AMAP_API_KEY is not configured');
    }
    return env.AMAP_API_KEY;
}
