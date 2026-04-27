import type { Metadata } from 'next';
import { BookOpenText, Notebook, Radar } from 'lucide-react';
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
            <section className="subpage-hero">
                <div className="subpage-hero-copy">
                    <p className="section-kicker">Notes</p>
                    <h1>工程笔记</h1>
                    <p>后端开发、Agent 工程化、项目复盘与问题排查记录。</p>
                    <div className="subpage-tag-row">
                        {tags.length > 0 ? (
                            tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))
                        ) : (
                            <span>Markdown</span>
                        )}
                    </div>
                </div>

                <div className="subpage-hero-card">
                    <div className="subpage-card-topline">
                        <Notebook className="h-4 w-4" />
                        <span>Index</span>
                    </div>
                    <div className="subpage-metrics">
                        <div>
                            <strong>{posts.length}</strong>
                            <span>篇笔记</span>
                        </div>
                        <div>
                            <strong>{categories.length}</strong>
                            <span>个分类</span>
                        </div>
                        <div>
                            <strong>MD</strong>
                            <span>Markdown</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel apple-panel space-y-6">
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

            <section className="section-panel apple-panel grid gap-4 md:grid-cols-2">
                <div className="apple-card p-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Radar className="h-4 w-4" />
                        为什么写笔记
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                        鲜活的实践记忆而非模板化文章，技术细节与个人思考并存
                    </p>
                </div>
                <div className="apple-card p-6">
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
