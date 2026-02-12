/**
 * Attractions Search API
 * GET /api/attractions - Search attractions by query
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchAttractionsByText, searchPhotos } from '@/lib/api';
import type { AttractionApiResponse } from '@/types';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q') || '';
        const category = searchParams.get('category') || undefined;
        const page = parseInt(searchParams.get('page') || '1', 10);

        // Search attractions using Amap
        const attractions = await searchAttractionsByText(query, {
            types: category,
            page,
        });

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
        console.error('Attractions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch attractions' },
            { status: 500 }
        );
    }
}
