/**
 * Format Utilities
 * Date, distance, and other formatting functions
 */

/**
 * Format distance in meters to human-readable string
 * @param distance - Distance in meters
 * @returns Formatted distance string (e.g., "1.2 km" or "500 m")
 */
export function formatDistance(distance: number): string {
    if (distance < 1000) {
        return `${Math.round(distance)} m`;
    }
    return `${(distance / 1000).toFixed(1)} km`;
}

/**
 * Format date to localized string
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string (e.g., "Feb 12, 2026")
 */
export function formatDate(
    date: string | Date,
    locale: string = 'en-US'
): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param date - Date object
 * @returns ISO date string
 */
export function formatIsoDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Calculate reading time in minutes
 * @param content - Text content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
    content: string,
    wordsPerMinute: number = 200
): number {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Format reading time to display string
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
    return `${minutes} min read`;
}

/**
 * Format number with thousands separator
 * @param num - Number to format
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
    return num.toLocaleString(locale);
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in meters
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371000; // Earth's radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Format rating to display string
 * @param rating - Rating value (0-5)
 * @returns Formatted rating string (e.g., "4.5")
 */
export function formatRating(rating: number | undefined): string {
    if (rating === undefined) return 'N/A';
    return rating.toFixed(1);
}
