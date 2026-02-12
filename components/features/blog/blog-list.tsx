/**
 * Blog List Component
 * Display a list of blog posts
 */

import { BlogCard } from './blog-card';
import { SkeletonCard } from '@/components/ui';
import type { BlogPostSummary } from '@/types';

export interface BlogListProps {
    posts: BlogPostSummary[];
    loading?: boolean;
    loadingCount?: number;
}

export function BlogList({
    posts,
    loading = false,
    loadingCount = 6,
}: BlogListProps) {
    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: loadingCount }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    No blog posts found.
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                    Check back later for new content.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}
