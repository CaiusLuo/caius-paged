/**
 * Nearby Attractions API
 * GET /api/attractions/nearby - Get attractions near a location
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchNearbyAttractions, searchPhotos } from '@/lib/api';
import { DEFAULT_LOCATION } from '@/app/config/constants';
import type { AttractionApiResponse } from '@/types';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const lat = parseFloat(searchParams.get('lat') || String(DEFAULT_LOCATION.LAT));
        const lng = parseFloat(searchParams.get('lng') || String(DEFAULT_LOCATION.LNG));
        const radius = parseInt(searchParams.get('radius') || '5000', 10);
        const category = searchParams.get('category') || undefined;
        const page = parseInt(searchParams.get('page') || '1', 10);

        // Search nearby attractions using Amap
        const attractions = await searchNearbyAttractions(
            { lat, lng },
            {
                radius,
                types: category,
                page,
            }
        );

        // Enrich with photos from Unsplash
        const enrichedAttractions = await Promise.all(
            attractions.map(async (attraction) => {
                if (attraction.photos.length === 0) {
                    const photos = await searchPhotos(attraction.name, { perPage: 1 });
                    return { ...attraction, photos };
                }
                return attraction;
            })
        );

        const response: AttractionApiResponse = {
            attractions: enrichedAttractions,
            total: attractions.length,
            page,
            hasMore: attractions.length === 20,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Nearby attractions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch nearby attractions' },
            { status: 500 }
        );
    }
}
