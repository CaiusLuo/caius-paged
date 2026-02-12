/**
 * Base API Configuration
 * Shared settings for all external API integrations
 */

export const apiDefaults = {
    /** Default request timeout in milliseconds */
    timeout: 10000,

    /** Number of retry attempts for failed requests */
    retryCount: 2,

    /** Delay between retries in milliseconds */
    retryDelay: 1000,

    /** Default request headers */
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
} as const;

/**
 * HTTP status codes for error handling
 */
export const httpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    RATE_LIMITED: 429,
    SERVER_ERROR: 500,
} as const;

/**
 * API error types for consistent error handling
 */
export type ApiErrorType =
    | 'NETWORK_ERROR'
    | 'TIMEOUT_ERROR'
    | 'RATE_LIMIT_ERROR'
    | 'AUTH_ERROR'
    | 'NOT_FOUND_ERROR'
    | 'VALIDATION_ERROR'
    | 'SERVER_ERROR'
    | 'UNKNOWN_ERROR';

/**
 * Standard API error structure
 */
export interface ApiError {
    type: ApiErrorType;
    message: string;
    statusCode?: number;
    details?: unknown;
}

/**
 * Create a standardized API error
 */
export function createApiError(
    type: ApiErrorType,
    message: string,
    statusCode?: number,
    details?: unknown
): ApiError {
    return { type, message, statusCode, details };
}
