/**
 * About Page
 * Personal profile and contact information
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { Github, Mail, MapPin, NotebookTabs, Radar } from 'lucide-react';
import { authorInfo, siteMetadata } from '@/app/config';

export const metadata: Metadata = {
    title: '关于 | Caius',
    description: 'Caius 个人简介，后端开发，专注 Agent 工程化与微服务架构',
    keywords: ['关于', '个人简介', '后端开发', 'Agent 工程化', 'Caius'],
    openGraph: {
        title: '关于 | Caius',
        description: 'Caius 个人简介，后端开发，专注 Agent 工程化与微服务架构',
        type: 'website',
        siteName: siteMetadata.name,
        locale: 'zh-CN',
    },
};

const stack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Geo APIs'];

export default function AboutPage() {
    return (
        <div className="page-shell">
            <section className="hero-panel hero-panel-compact">
                <div className="hero-orb hero-orb-primary" />
                <div className="hero-grid" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">关于</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            Caius，技术实践与日常探索
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            构建经验的沉淀与对日常美学的观察
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href={authorInfo.github} target="_blank" rel="noreferrer noopener" className="action-link action-link-primary">
                                GitHub
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href={`mailto:${authorInfo.email}`} className="action-link action-link-secondary">
                                Email
                                <Mail className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="highlight-card animate-float-delayed text-[color:var(--muted)]">
                        <div className="space-y-4 text-sm">
                            <div className="inline-flex items-center gap-2 font-medium text-[color:var(--muted)]">
                                <MapPin className="h-4 w-4" />
                                坐标中国
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                                技术笔记沉淀可用经验，让知识保持生命力
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-950/5 dark:border-white/10 dark:bg-white/5">
                                关注产品、场景与日常中被忽略的细节之美
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="section-panel">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <NotebookTabs className="h-4 w-4" />
                        工作理念
                    </div>
                    <p className="mt-4 text-sm leading-8 text-[color:var(--muted)]">
                        有意识的构建、可追溯的思考、留有温度的表达。审慎写代码，在经验尚未冷却时记录，在屏幕之外保持好奇
                    </p>
                </div>

                <div className="section-panel">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <Radar className="h-4 w-4" />
                        技术栈
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {stack.map((item) => (
                            <Badge key={item} variant="outline" size="md">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

