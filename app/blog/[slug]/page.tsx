/**
 * Blog Post Detail Page
 * Display individual blog post
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge, BadgeGroup } from '@/components/ui';
import { MarkdownContent } from '@/components/features/blog';
import { getBlogPostBySlug } from '@/lib/content/blog';
import { formatDate, formatReadingTime } from '@/lib/utils/format';

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="page-shell">
            <article className="section-panel mx-auto max-w-4xl overflow-hidden">
                <div className="mb-8 space-y-6 border-b border-zinc-200/70 pb-8 dark:border-white/10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]">
                        <ArrowLeft className="h-4 w-4" />
                        Back to notes
                    </Link>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {formatDate(post.date)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                {formatReadingTime(post.readingTime)}
                            </span>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            {post.title}
                        </h1>
                        <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            {post.description}
                        </p>
                    </div>

                    <BadgeGroup className="gap-2">
                        <Badge variant="primary" size="sm">
                            {post.category}
                        </Badge>
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </BadgeGroup>
                </div>

                <MarkdownContent content={post.content} />
            </article>
        </div>
    );
}
