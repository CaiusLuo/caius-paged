/**
 * Blog API
 * GET /api/blog - Get blog posts
 */

import { NextRequest, NextResponse } from 'next/server';
import type { BlogListResponse } from '@/types';
import { PAGINATION } from '@/app/config/constants';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content/blog';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const slug = searchParams.get('slug');
        const tag = searchParams.get('tag') || undefined;
        const category = searchParams.get('category') || undefined;
        const page = parseInt(searchParams.get('page') || '1', 10);

        if (slug) {
            const post = getBlogPostBySlug(slug);

            if (!post) {
                return NextResponse.json({ error: 'Post not found' }, { status: 404 });
            }

            return NextResponse.json(post);
        }

        let posts = getAllBlogPosts();

        if (tag) {
            posts = posts.filter((post) => post.tags.includes(tag));
        }

        if (category) {
            posts = posts.filter((post) => post.category === category);
        }

        const allTags = [...new Set(posts.flatMap((post) => post.tags))];
        const allCategories = [...new Set(posts.map((post) => post.category))];
        const startIndex = (page - 1) * PAGINATION.BLOG_POSTS_PER_PAGE;
        const paginatedPosts = posts.slice(startIndex, startIndex + PAGINATION.BLOG_POSTS_PER_PAGE);

        const response: BlogListResponse = {
            posts: paginatedPosts,
            total: posts.length,
            page,
            hasMore: startIndex + PAGINATION.BLOG_POSTS_PER_PAGE < posts.length,
            tags: allTags,
            categories: allCategories,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Blog API error:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}
