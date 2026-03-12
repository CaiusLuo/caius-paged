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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: loadingCount }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="rounded-[1.75rem] border border-dashed border-zinc-300/80 bg-white/60 px-6 py-12 text-center dark:border-white/10 dark:bg-white/5">
                <p className="text-lg font-medium text-[color:var(--foreground)]">No notes found.</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                    Add Markdown files to the content folder and they will appear here automatically.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}
