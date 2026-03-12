import Link from 'next/link';
import {
    ArrowRight,
    Compass,
    Github,
    Mail,
    MapPinned,
    NotebookTabs,
    Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { NearbyAttractions } from '@/components/features/attractions';
import { authorInfo } from '@/app/config';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/content/blog';
import { formatDate } from '@/lib/utils';

const focusAreas = [
    {
        title: 'Agent Workflows',
        description: 'Shipping practical automation, debugging flows, and product experiments that stay grounded in delivery.',
    },
    {
        title: 'Full-Stack Systems',
        description: 'Building Next.js experiences that connect product polish with stable backend thinking and clean interfaces.',
    },
    {
        title: 'Technical Notes',
        description: 'Turning daily engineering problems into reusable write-ups so the learning compounds instead of disappearing.',
    },
];

const currentTracks = [
    'Location-aware interfaces',
    'Knowledge capture with Markdown notes',
    'Modern portfolio storytelling',
];

export default function HomePage() {
    const posts = getAllBlogPosts();
    const featuredPosts = getFeaturedBlogPosts(3);

    return (
        <div className="page-shell">
            <section className="hero-panel">
                <div className="hero-orb hero-orb-primary" />
                <div className="hero-orb hero-orb-secondary" />
                <div className="hero-grid" />

                <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-6">
                        <Badge variant="outline" size="md" className="hero-badge">
                            <Sparkles className="h-3.5 w-3.5" />
                            Personal portfolio, notes, and exploration lab
                        </Badge>

                        <div className="space-y-4">
                            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[color:var(--muted)]">
                                Caius / Full-stack builder
                            </p>
                            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
                                A personal homepage that leads with identity, then opens into notes and map-based discovery.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                                I build modern product interfaces, write down the engineering lessons that matter, and keep a live attraction search experience as part of the site.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/blog" className="action-link action-link-primary">
                                Browse notes
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="/explore" className="action-link action-link-secondary">
                                Open location search
                                <Compass className="h-4 w-4" />
                            </Link>
                            <Link href={authorInfo.github} className="action-link action-link-secondary" target="_blank" rel="noreferrer noopener">
                                GitHub
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href={`mailto:${authorInfo.email}`} className="action-link action-link-secondary">
                                Contact
                                <Mail className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="stat-card">
                                <span className="stat-value">{posts.length}</span>
                                <span className="stat-label">Published notes</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">3</span>
                                <span className="stat-label">Current focus tracks</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">24/7</span>
                                <span className="stat-label">Portfolio online</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 lg:pl-8">
                        <div className="highlight-card animate-float-slow">
                            <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                                <NotebookTabs className="h-4 w-4" />
                                Current tracks
                            </div>
                            <div className="mt-5 space-y-3">
                                {currentTracks.map((track) => (
                                    <div key={track} className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                        {track}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="highlight-card animate-float-delayed">
                            <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                                <MapPinned className="h-4 w-4" />
                                Site direction
                            </div>
                            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                                The homepage now acts as a personal landing page first. The location search stays available as a dedicated experience and as a live section below.
                            </p>
                            <Link href="/explore" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:gap-3">
                                Jump into explore
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {focusAreas.map((item, index) => (
                    <article key={item.title} className="section-panel stagger-card" style={{ animationDelay: `${index * 120}ms` }}>
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-400">0{index + 1}</p>
                        <h2 className="mt-5 text-2xl font-semibold text-[color:var(--foreground)]">{item.title}</h2>
                        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
                    </article>
                ))}
            </section>

            <section className="section-panel space-y-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-400">Latest writing</p>
                        <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">Featured technical notes</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                            Markdown notes are rendered as readable documents, so project learnings and troubleshooting records feel like a real knowledge base instead of plain text dumps.
                        </p>
                    </div>
                    <Link href="/blog" className="action-link action-link-secondary shrink-0">
                        View all notes
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {featuredPosts.length > 0 ? (
                    <div className="grid gap-4 lg:grid-cols-3">
                        {featuredPosts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${encodeURIComponent(post.slug)}`}
                                className="note-preview-card stagger-card"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-zinc-400">
                                    <span>{post.category}</span>
                                    <span>{formatDate(post.date)}</span>
                                </div>
                                <h3 className="mt-5 line-clamp-2 text-2xl font-semibold text-[color:var(--foreground)]">
                                    {post.title}
                                </h3>
                                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[color:var(--muted)]">
                                    {post.description}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="tag-pill">
                                            {tag}
                                        </span>
                                    ))}
                                    {post.tags.length === 0 && <span className="tag-pill">Markdown</span>}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[2rem] border border-dashed border-zinc-300/80 bg-white/60 px-6 py-10 text-sm text-[color:var(--muted)] dark:border-white/10 dark:bg-white/5">
                        No notes are published yet. Once Markdown files are available, they will appear here automatically.
                    </div>
                )}
            </section>

            <section className="section-panel location-panel">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-400">Location playground</p>
                        <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">Search nearby places without losing the personal homepage focus</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                            The original geo-based experience stays intact. It now sits as a secondary module on the homepage and remains fully available on the explore page.
                        </p>
                    </div>
                    <Link href="/explore" className="action-link action-link-primary shrink-0">
                        Open full explore page
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <NearbyAttractions />
            </section>
        </div>
    );
}


