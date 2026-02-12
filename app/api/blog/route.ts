/**
 * Blog API
 * GET /api/blog - Get blog posts
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogListResponse, BlogPostSummary, BlogFrontmatter } from '@/types';
import { BLOG } from '@/app/config/constants';
import { calculateReadingTime } from '@/lib/utils';

// Note: This is a placeholder implementation
// In production, you would use a proper markdown parser and caching

/**
 * Get all blog posts from content directory
 */
function getBlogPosts(): BlogPostSummary[] {
    const contentDir = path.join(process.cwd(), BLOG.CONTENT_DIR);

    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
        return [];
    }

    const files = fs.readdirSync(contentDir);
    const posts: BlogPostSummary[] = [];

    for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.mdx')) {
            continue;
        }

        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        try {
            const { data, content } = matter(fileContent);
            const frontmatter = data as BlogFrontmatter;
            const slug = file.replace(/\.(md|mdx)$/, '');

            posts.push({
                slug,
                title: frontmatter.title,
                date: frontmatter.date,
                description: frontmatter.description,
                tags: frontmatter.tags,
                category: frontmatter.category,
                cover: frontmatter.cover,
                readingTime: calculateReadingTime(content),
            });
        } catch (error) {
            console.error(`Error parsing ${file}:`, error);
        }
    }

    // Sort by date descending
    return posts.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tag = searchParams.get('tag') || undefined;
        const category = searchParams.get('category') || undefined;
        const page = parseInt(searchParams.get('page') || '1', 10);

        let posts = getBlogPosts();

        // Filter by tag
        if (tag) {
            posts = posts.filter((post) => post.tags.includes(tag));
        }

        // Filter by category
        if (category) {
            posts = posts.filter((post) => post.category === category);
        }

        // Only show published posts
        posts = posts.filter(() => true); // Add published filter when implemented

        // Extract unique tags and categories
        const allTags = [...new Set(posts.flatMap((post) => post.tags))];
        const allCategories = [...new Set(posts.map((post) => post.category))];

        // Paginate
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const paginatedPosts = posts.slice(startIndex, startIndex + pageSize);

        const response: BlogListResponse = {
            posts: paginatedPosts,
            total: posts.length,
            page,
            hasMore: startIndex + pageSize < posts.length,
            tags: allTags,
            categories: allCategories,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Blog API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}
