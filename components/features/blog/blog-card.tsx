/**
 * Blog Card Component
 * Display a blog post summary in a card
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Badge, BadgeGroup, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatDate, formatReadingTime } from '@/lib/utils/format';
import type { BlogPostSummary } from '@/types';

export interface BlogCardProps {
    post: BlogPostSummary;
    className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
    return (
        <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="block h-full">
            <Card
                hoverable
                className={cn(
                    'apple-card group flex h-full flex-col',
                    className
                )}
            >
                {post.cover && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                <div className="flex h-full flex-col p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <Badge variant="primary" size="sm">
                            {post.category}
                        </Badge>
                        <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground)]" />
                    </div>

                    <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
                        {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[color:var(--muted)]">
                        {post.description}
                    </p>

                    <BadgeGroup className="mt-5 gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">
                                {tag}
                            </Badge>
                        ))}
                        {post.tags.length === 0 && (
                            <Badge variant="outline" size="sm">
                                Markdown
                            </Badge>
                        )}
                    </BadgeGroup>

                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--muted)]">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(post.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {formatReadingTime(post.readingTime)}
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
