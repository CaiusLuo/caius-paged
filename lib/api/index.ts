/**
 * API Clients Export
 * Central export point for all API client functions
 */

export {
    searchPhotos,
    getPhotoByKeyword,
    getRandomPhotos,
} from './unsplash';

export {
    searchNearbyAttractions,
    searchAttractionsByText,
    getAttractionById,
} from './amap';

export {
    getBrowserLocation,
    getIpLocation,
    getUserLocation,
    isGeolocationAvailable,
    getDefaultLocation,
} from './geolocation';
