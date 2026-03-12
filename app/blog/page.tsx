import Link from 'next/link';
import { ArrowRight, BookOpenText, Notebook, Radar } from 'lucide-react';
import { BlogList } from '@/components/features/blog';
import { getAllBlogPosts } from '@/lib/content/blog';

export default function BlogPage() {
    const posts = getAllBlogPosts();
    const tags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 8);
    const categories = [...new Set(posts.map((post) => post.category))];

    return (
        <div className="page-shell">
            <section className="hero-panel hero-panel-compact">
                <div className="hero-orb hero-orb-primary" />
                <div className="hero-grid" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">Notes & reflections</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            Technical notes, project write-ups, and reflections rendered directly from Markdown.
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            A place to share engineering lessons, working notes, and thoughts worth keeping close.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {tags.length > 0 ? (
                                tags.map((tag) => (
                                    <span key={tag} className="tag-pill">
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="tag-pill">Markdown</span>
                            )}
                        </div>
                    </div>

                    <div className="highlight-card animate-float-delayed">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-[color:var(--muted)]">
                                <Notebook className="h-4 w-4" />
                                Reading snapshot
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                                <div className="stat-card">
                                    <span className="stat-value">{posts.length}</span>
                                    <span className="stat-label">Entries</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-value">{categories.length}</span>
                                    <span className="stat-label">Categories</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-value">MD</span>
                                    <span className="stat-label">Native format</span>
                                </div>
                            </div>
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:gap-3">
                                Back to home
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">All writing</h2>
                        <p className="mt-2 text-sm text-[color:var(--muted)]">
                            Browse troubleshooting records, architecture thinking, and reflections from building and everyday life.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                        <BookOpenText className="h-4 w-4" />
                        Readable Markdown archive
                    </div>
                </div>

                <BlogList posts={posts} />
            </section>

            <section className="section-panel grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-6 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Radar className="h-4 w-4" />
                        Why this page matters
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                        These notes are meant to feel like living memory instead of placeholder posts, so the writing can carry both technical detail and personal thought.
                    </p>
                </div>
                <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-6 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Notebook className="h-4 w-4" />
                        How the writing stays close
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                        The site reads local content directly, making it easy to keep sharing ideas, project notes, and reflections without extra publishing overhead.
                    </p>
                </div>
            </section>
        </div>
    );
}

