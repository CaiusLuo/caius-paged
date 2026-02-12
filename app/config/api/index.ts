/**
 * API Configuration Exports
 * Central export point for all API-related configurations
 */

// Base configuration
export {
    apiDefaults,
    httpStatus,
    createApiError,
    type ApiErrorType,
    type ApiError,
} from './base.config';

// Unsplash API
export {
    unsplashConfig,
    unsplashEndpoints,
    getUnsplashHeaders,
    buildUnsplashSearchUrl,
    type UnsplashPhoto,
    type UnsplashSearchResponse,
} from './unsplash.config';

// Amap API
export {
    amapConfig,
    amapEndpoints,
    amapPoiTypes,
    amapScenicTypes,
    buildAmapNearbyUrl,
    buildAmapSearchUrl,
    parseAmapLocation,
    type AmapPoi,
    type AmapSearchResponse,
} from './amap.config';

// Geolocation
export {
    geolocationConfig,
    ipLocationConfig,
    browserGeolocationOptions,
    geolocationErrors,
    geolocationErrorMessages,
    isBrowserGeolocationAvailable,
    type IpLocationResponse,
    type GeoLocation,
} from './geolocation.config';
