import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenText, Notebook, Radar } from 'lucide-react';
import { BlogList } from '@/components/features/blog';
import { getAllBlogPosts } from '@/lib/content/blog';
import { siteMetadata } from '@/app/config';

export const metadata: Metadata = {
    title: '技术笔记 | Caius',
    description: '技术笔记、项目复盘与工程记录，分享后端开发、Agent 工程化与架构设计的实践经验。',
    keywords: ['技术笔记', '后端开发', 'Agent 工程化', '微服务', '架构设计', '工程实践'],
    openGraph: {
        title: '技术笔记 | Caius',
        description: '技术笔记、项目复盘与工程记录，分享后端开发、Agent 工程化与架构设计的实践经验。',
        type: 'website',
        siteName: siteMetadata.name,
        locale: 'zh-CN',
    },
};

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
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">笔记</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            工程实践与思考，用 Markdown 记录
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            技术笔记、项目复盘、值得保留的经验
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
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm font-medium text-[color:var(--muted)]">
                                <Notebook className="h-4 w-4" />
                                阅读速览
                            </div>
                            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                                <div className="stat-card">
                                    <span className="stat-value">{posts.length}</span>
                                    <span className="stat-label">篇</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-value">{categories.length}</span>
                                    <span className="stat-label">分类</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-value">MD</span>
                                    <span className="stat-label">格式</span>
                                </div>
                            </div>
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:gap-3">
                                返回首页
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">全部笔记</h2>
                        <p className="mt-2 text-sm text-[color:var(--muted)]">
                            排查记录、架构思考、项目复盘
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                        <BookOpenText className="h-4 w-4" />
                        可读的 Markdown 归档
                    </div>
                </div>

                <BlogList posts={posts} />
            </section>

            <section className="section-panel grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-6 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Radar className="h-4 w-4" />
                        为什么写笔记
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                        鲜活的实践记忆而非模板化文章，技术细节与个人思考并存
                    </p>
                </div>
                <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-6 shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Notebook className="h-4 w-4" />
                        内容如何保持更新
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                        直接读取本地 Markdown，无额外发布流程，随时记录
                    </p>
                </div>
            </section>
        </div>
    );
}

