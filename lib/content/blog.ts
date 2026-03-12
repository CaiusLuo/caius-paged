import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { BLOG } from '@/app/config/constants';
import type { BlogFrontmatter, BlogPost, BlogPostSummary } from '@/types';
import { calculateReadingTime, formatIsoDate, truncateText } from '@/lib/utils';

type SourceKind = 'content' | 'notes';

interface BlogEntry extends BlogPost {
    published: boolean;
    source: SourceKind;
}

interface ContentDirectory {
    dir: string;
    source: SourceKind;
}

const CONTENT_DIRECTORIES: ContentDirectory[] = [
    {
        dir: path.join(process.cwd(), BLOG.CONTENT_DIR),
        source: 'content',
    },
    ...BLOG.FALLBACK_CONTENT_DIRS.map((dir) => ({
        dir: path.resolve(process.cwd(), dir),
        source: 'notes' as const,
    })),
];

function getMarkdownFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) {
        return [];
    }

    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((file) => BLOG.FILE_EXTENSIONS.some((extension) => file.endsWith(extension)))
        .map((file) => path.join(dir, file));
}

function toFrontmatter(data: unknown): BlogFrontmatter {
    if (!data || typeof data !== 'object') {
        return {};
    }

    return data as BlogFrontmatter;
}

function getSlug(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
}

function stripMarkdown(markdown: string): string {
    return markdown
        .replace(/^---[\s\S]*?---/, '')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^>\s?/gm, '')
        .replace(/^[-*+]\s+/gm, '')
        .replace(/^\d+\.\s+/gm, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        .replace(/~~([^~]+)~~/g, '$1')
        .replace(/\r?\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getTitle(frontmatter: BlogFrontmatter, filePath: string, content: string): string {
    if (frontmatter.title?.trim()) {
        return frontmatter.title.trim();
    }

    const firstHeading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
    if (firstHeading) {
        return firstHeading;
    }

    const basename = getSlug(filePath);
    return basename.replace(/^(\d{4}-\d{2}-\d{2})[\s_-]*/, '').trim() || basename;
}

function getDate(frontmatter: BlogFrontmatter, filePath: string): string {
    const frontmatterDate = frontmatter.date ? new Date(frontmatter.date) : null;
    if (frontmatterDate && !Number.isNaN(frontmatterDate.getTime())) {
        return formatIsoDate(frontmatterDate);
    }

    const fileDate = getSlug(filePath).match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
    if (fileDate) {
        return fileDate;
    }

    const stats = fs.statSync(filePath);
    return formatIsoDate(stats.mtime);
}

function getDescription(frontmatter: BlogFrontmatter, content: string): string {
    if (frontmatter.description?.trim()) {
        return frontmatter.description.trim();
    }

    const excerpt = stripMarkdown(content);
    return truncateText(excerpt, BLOG.EXCERPT_LENGTH);
}

function getTags(frontmatter: BlogFrontmatter): string[] {
    if (!Array.isArray(frontmatter.tags)) {
        return [];
    }

    return frontmatter.tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
}

function getCategory(frontmatter: BlogFrontmatter, source: SourceKind): string {
    if (frontmatter.category?.trim()) {
        return frontmatter.category.trim();
    }

    return source === 'notes' ? 'Technical Notes' : 'Portfolio Journal';
}

function readEntry(filePath: string, source: SourceKind): BlogEntry | null {
    try {
        const file = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(file);
        const frontmatter = toFrontmatter(data);
        const textContent = stripMarkdown(content);

        return {
            slug: getSlug(filePath),
            title: getTitle(frontmatter, filePath, content),
            date: getDate(frontmatter, filePath),
            description: getDescription(frontmatter, content),
            tags: getTags(frontmatter),
            category: getCategory(frontmatter, source),
            cover: frontmatter.cover,
            content,
            readingTime: calculateReadingTime(textContent || content),
            published: frontmatter.published ?? true,
            source,
        };
    } catch (error) {
        console.error(`Failed to parse markdown file: ${filePath}`, error);
        return null;
    }
}

function sortByDateDescending<T extends { date: string }>(entries: T[]): T[] {
    return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function collectEntries(): BlogEntry[] {
    const entries = new Map<string, BlogEntry>();

    for (const directory of CONTENT_DIRECTORIES) {
        for (const filePath of getMarkdownFiles(directory.dir)) {
            const entry = readEntry(filePath, directory.source);

            if (!entry || entries.has(entry.slug)) {
                continue;
            }

            entries.set(entry.slug, entry);
        }
    }

    return sortByDateDescending(Array.from(entries.values()));
}

export function getAllBlogPosts(options?: { includeUnpublished?: boolean }): BlogPostSummary[] {
    const includeUnpublished = options?.includeUnpublished ?? false;

    return collectEntries()
        .filter((entry) => includeUnpublished || entry.published)
        .map((entry) => ({
            slug: entry.slug,
            title: entry.title,
            date: entry.date,
            description: entry.description,
            tags: entry.tags,
            category: entry.category,
            cover: entry.cover,
            readingTime: entry.readingTime,
        }));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    const normalizedSlug = decodeURIComponent(slug);
    const entry = collectEntries().find((post) => post.slug === normalizedSlug && post.published);

    if (!entry) {
        return null;
    }

    return {
        slug: entry.slug,
        title: entry.title,
        date: entry.date,
        description: entry.description,
        tags: entry.tags,
        category: entry.category,
        cover: entry.cover,
        content: entry.content,
        readingTime: entry.readingTime,
    };
}

export function getFeaturedBlogPosts(limit: number = 3): BlogPostSummary[] {
    return getAllBlogPosts().slice(0, limit);
}


