/**
 * Attractions Search API
 * GET /api/attractions - Search attractions by query
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchAttractionsByText, searchPhotos } from '@/lib/api';
import type { Attraction, AttractionApiResponse, AttractionSearchParams } from '@/types';

function sortAttractions(attractions: Attraction[], sort: AttractionSearchParams['sort']) {
    const items = [...attractions];

    switch (sort) {
        case 'name':
            return items.sort((a, b) => a.name.localeCompare(b.name));
        case 'distance':
            return items.sort((a, b) => (a.distance ?? Number.POSITIVE_INFINITY) - (b.distance ?? Number.POSITIVE_INFINITY));
        case 'rating':
        default:
            return items.sort((a, b) => (b.rating ?? Number.NEGATIVE_INFINITY) - (a.rating ?? Number.NEGATIVE_INFINITY));
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q') || '';
        const category = searchParams.get('category') || undefined;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const sort = (searchParams.get('sort') as AttractionSearchParams['sort'] | null) || 'rating';

        const attractions = await searchAttractionsByText(query, {
            types: category,
            page,
        });

        const enrichedAttractions = await Promise.all(
            attractions.map(async (attraction) => {
                if (attraction.photos.length === 0) {
                    const photos = await searchPhotos(attraction.name, { perPage: 1 });
                    return { ...attraction, photos };
                }
                return attraction;
            })
        );

        const sortedAttractions = sortAttractions(enrichedAttractions, sort);

        const response: AttractionApiResponse = {
            attractions: sortedAttractions,
            total: sortedAttractions.length,
            page,
            hasMore: attractions.length === 21,
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
