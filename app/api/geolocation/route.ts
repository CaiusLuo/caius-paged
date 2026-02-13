/**
 * Geolocation API
 * GET /api/geolocation - Get user location from client IP
 */

import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCATION } from '@/app/config/constants';
import type { GeoLocation } from '@/app/config/api/geolocation.config';

/**
 * Get client IP from request headers
 * Works with Vercel, Cloudflare, and standard proxies
 */
function getClientIP(request: NextRequest): string | null {
    // Vercel
    const xForwardedFor = request.headers.get('x-forwarded-for');
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0].trim();
    }

    // Cloudflare
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    // Standard proxy
    const xRealIP = request.headers.get('x-real-ip');
    if (xRealIP) {
        return xRealIP;
    }

    return null;
}

export async function GET(request: NextRequest) {
    try {
        const clientIP = getClientIP(request);

        if (!clientIP) {
            // No client IP available, return default location
            const defaultLocation: GeoLocation = {
                lat: DEFAULT_LOCATION.LAT,
                lng: DEFAULT_LOCATION.LNG,
                city: DEFAULT_LOCATION.CITY,
                country: DEFAULT_LOCATION.COUNTRY,
                source: 'default',
            };
            return NextResponse.json(defaultLocation);
        }

        // Use ipapi.co with the client's IP
        const response = await fetch(`https://ipapi.co/${clientIP}/json/`, {
            next: {
                revalidate: 3600, // Cache for 1 hour
            },
        });

        if (!response.ok) {
            console.warn(`IP geolocation API returned ${response.status}`);
            const defaultLocation: GeoLocation = {
                lat: DEFAULT_LOCATION.LAT,
                lng: DEFAULT_LOCATION.LNG,
                city: DEFAULT_LOCATION.CITY,
                country: DEFAULT_LOCATION.COUNTRY,
                source: 'default',
            };
            return NextResponse.json(defaultLocation);
        }

        const data = await response.json();

        if (!data.latitude || !data.longitude) {
            const defaultLocation: GeoLocation = {
                lat: DEFAULT_LOCATION.LAT,
                lng: DEFAULT_LOCATION.LNG,
                city: DEFAULT_LOCATION.CITY,
                country: DEFAULT_LOCATION.COUNTRY,
                source: 'default',
            };
            return NextResponse.json(defaultLocation);
        }

        const location: GeoLocation = {
            lat: data.latitude,
            lng: data.longitude,
            city: data.city,
            country: data.country,
            source: 'ip',
        };

        return NextResponse.json(location);
    } catch (error) {
        console.error('Geolocation API error:', error);

        const defaultLocation: GeoLocation = {
            lat: DEFAULT_LOCATION.LAT,
            lng: DEFAULT_LOCATION.LNG,
            city: DEFAULT_LOCATION.CITY,
            country: DEFAULT_LOCATION.COUNTRY,
            source: 'default',
        };
        return NextResponse.json(defaultLocation);
    }
}
