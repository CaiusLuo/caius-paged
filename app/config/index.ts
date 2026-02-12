/**
 * Configuration Module Exports
 * Central export point for all application configurations
 */

// ============================================
// Site Configuration
// ============================================
export {
  siteConfig,
  siteMetadata,
  authorInfo,
  seoConfig,
  mainNav,
  footerNav,
  socialLinks,
  themeConfig,
  type SiteConfig,
  type NavItem,
} from './site.config';

// ============================================
// Environment Configuration
// ============================================
export {
  env,
  isDev,
  isProd,
  isTest,
  getClientEnv,
  isUnsplashConfigured,
  isAmapConfigured,
  getUnsplashKey,
  getAmapKey,
  type ClientEnv,
  type ServerEnv,
  type Env,
} from './env.config';

// ============================================
// Routes Configuration
// ============================================
export {
  routes,
  routeMetadata,
  isActiveRoute,
  getRouteMetadata,
  buildUrl,
  type Routes,
  type RouteMetadata,
} from './routes.config';

// ============================================
// Cache Configuration
// ============================================
export {
  CACHE_TTL,
  cacheConfig,
  revalidateOptions,
  cacheKeys,
  cacheHeaders,
  type CacheConfig,
} from './cache.config';

// ============================================
// Constants
// ============================================
export {
  PAGINATION,
  DEFAULT_LOCATION,
  SEARCH,
  IMAGE,
  ANIMATION,
  BREAKPOINTS,
  BLOG,
  SEO,
  ERROR_MESSAGES,
} from './constants';

// ============================================
// API Configurations
// ============================================
export {
  // Base
  apiDefaults,
  httpStatus,
  createApiError,
  type ApiErrorType,
  type ApiError,
  // Unsplash
  unsplashConfig,
  unsplashEndpoints,
  getUnsplashHeaders,
  buildUnsplashSearchUrl,
  type UnsplashPhoto,
  type UnsplashSearchResponse,
  // Amap
  amapConfig,
  amapEndpoints,
  amapPoiTypes,
  amapScenicTypes,
  buildAmapNearbyUrl,
  buildAmapSearchUrl,
  parseAmapLocation,
  type AmapPoi,
  type AmapSearchResponse,
  // Geolocation
  geolocationConfig,
  ipLocationConfig,
  browserGeolocationOptions,
  geolocationErrors,
  geolocationErrorMessages,
  isBrowserGeolocationAvailable,
  type IpLocationResponse,
  type GeoLocation,
} from './api/index';
