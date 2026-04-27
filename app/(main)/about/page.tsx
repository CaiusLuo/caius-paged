/**
 * About Page
 * Personal profile and contact information
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui';
import { BriefcaseBusiness, Github, Layers3, Mail, NotebookTabs, Radar } from 'lucide-react';
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

const experienceSummary = [
    {
        icon: BriefcaseBusiness,
        label: '实习经历',
        title: 'IMean.ai / 智测云联',
        description: 'Agent 后端、GraphQL 优化、IoT 消息处理、多租户与异步入库链路。',
    },
    {
        icon: Layers3,
        label: '项目经历',
        title: 'RedFolio / TodayStock / Bot',
        description: '高并发内容社区、股票数据分析平台、金融资讯订阅与自动化推送工具。',
    },
];

export default function AboutPage() {
    return (
        <div className="page-shell">
            <section className="subpage-hero">
                <div className="subpage-hero-copy">
                    <p className="section-kicker">About</p>
                    <h1>Caius</h1>
                    <p>后端开发，关注 Agent 工程化、微服务架构、缓存与消息链路。</p>
                </div>

                <div className="subpage-hero-card">
                    <div className="subpage-card-topline">
                        <Radar className="h-4 w-4" />
                        <span>Contact</span>
                    </div>
                    <div className="subpage-action-grid">
                        <Link href={authorInfo.github} target="_blank" rel="noreferrer noopener" className="notion-button notion-button-primary">
                            GitHub
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link href={`mailto:${authorInfo.email}`} className="notion-button notion-button-secondary">
                            Email
                            <Mail className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="about-summary-grid">
                {experienceSummary.map((item) => {
                    const Icon = item.icon;

                    return (
                        <article key={item.label} className="apple-card about-summary-card">
                            <div className="subpage-card-topline">
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </div>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </article>
                    );
                })}
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="section-panel apple-panel">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                        <NotebookTabs className="h-4 w-4" />
                        工作理念
                    </div>
                    <p className="mt-4 text-sm leading-8 text-[color:var(--muted)]">
                        有意识的构建、可追溯的思考、留有温度的表达。审慎写代码，在经验尚未冷却时记录，在屏幕之外保持好奇
                    </p>
                </div>

                <div className="section-panel apple-panel">
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
