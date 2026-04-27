/**
 * Explore Page
 * Search and filter attractions
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, MapPinned, Sparkles } from 'lucide-react';
import { ExploreAttractions } from '@/components/features/attractions';
import { siteMetadata } from '@/app/config';

export const metadata: Metadata = {
    title: '探索 | Caius',
    description: '基于地理位置的周边探索，发现附近值得关注的去处',
    keywords: ['周边探索', '地理位置', '地图', 'LBS'],
    openGraph: {
        title: '探索 | Caius',
        description: '基于地理位置的周边探索，发现附近值得关注的去处',
        type: 'website',
        siteName: siteMetadata.name,
        locale: 'zh-CN',
    },
};

export default function ExplorePage() {
    return (
        <div className="page-shell">
            <section className="hero-panel hero-panel-compact">
                <div className="hero-orb hero-orb-secondary" />
                <div className="hero-grid" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">探索</p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                            发现附近值得关注的去处
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted)]">
                            地理位置驱动的周边探索
                        </p>
                    </div>

                    <div className="highlight-card animate-float-slow text-[color:var(--muted)]">
                        <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
                            <Sparkles className="h-4 w-4" />
                            探索方式
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                实时定位或手动输入，精准发现周边
                            </div>
                            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-[color:var(--foreground)] shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5">
                                关键词与分类搜索，高效规划行程
                            </div>
                            <Link href="/" className="inline-flex items-center gap-2 pt-2 font-semibold text-[color:var(--foreground)] transition hover:gap-3">
                                返回首页
                                <Compass className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel location-panel">
                <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    <MapPinned className="h-4 w-4" />
                    地图界面
                </div>
                <ExploreAttractions />
            </section>
        </div>
    );
}



