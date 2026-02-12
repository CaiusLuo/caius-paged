/**
 * Blog Card Component
 * Display a blog post summary in a card
 */

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Card, Badge, BadgeGroup } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatDate, formatReadingTime } from '@/lib/utils/format';
import type { BlogPostSummary } from '@/types';

export interface BlogCardProps {
    post: BlogPostSummary;
    className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <Card hoverable className={cn('group cursor-pointer', className)}>
                {/* Cover Image */}
                {post.cover && (
                    <div className="relative aspect-video overflow-hidden">
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-4">
                    {/* Category & Tags */}
                    <div className="mb-2">
                        <BadgeGroup>
                            <Badge variant="primary" size="sm">
                                {post.category}
                            </Badge>
                            {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} size="sm">
                                    {tag}
                                </Badge>
                            ))}
                        </BadgeGroup>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        {post.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatReadingTime(post.readingTime)}
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
