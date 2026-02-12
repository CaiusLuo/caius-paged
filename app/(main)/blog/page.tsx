/**
 * Blog List Page
 * Display all blog posts
 */

import { SkeletonCard } from '@/components/ui';

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    Blog
                </h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Technical insights, tutorials, and development notes
                </p>
            </section>

            {/* Filter Tags */}
            <section className="mb-8">
                <div className="flex flex-wrap gap-2">
                    <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                        All
                    </button>
                    <button className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
                        Next.js
                    </button>
                    <button className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
                        React
                    </button>
                    <button className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
                        TypeScript
                    </button>
                </div>
            </section>

            {/* Blog Posts */}
            <section>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
