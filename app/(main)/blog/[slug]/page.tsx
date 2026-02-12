/**
 * Blog Post Detail Page
 * Display individual blog post
 */

import { Badge } from '@/components/ui';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Placeholder - will be replaced with actual post fetching
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Link */}
            <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
            </Link>

            <article className="mx-auto max-w-3xl">
                {/* Header */}
                <header className="mb-8">
                    <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="primary">Development</Badge>
                        <Badge>Next.js</Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                        Loading Post...
                    </h1>
                    <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Feb 12, 2026
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            5 min read
                        </span>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Loading blog post content...
                    </p>
                </div>
            </article>
        </div>
    );
}
