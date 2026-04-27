/**
 * Explore Page
 * Search and filter attractions
 */

import type { Metadata } from 'next';
import { LocateFixed, MapPinned, Search } from 'lucide-react';
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
            <section className="subpage-hero">
                <div className="subpage-hero-copy">
                    <p className="section-kicker">Explore</p>
                    <h1>周边探索</h1>
                    <p>基于地理位置和关键词的地点检索界面。</p>
                </div>

                <div className="subpage-hero-card">
                    <div className="subpage-card-topline">
                        <MapPinned className="h-4 w-4" />
                        <span>Search Modes</span>
                    </div>
                    <div className="subpage-feature-list">
                        <div>
                            <LocateFixed className="h-4 w-4" />
                            <span>实时定位</span>
                        </div>
                        <div>
                            <Search className="h-4 w-4" />
                            <span>关键词检索</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-panel apple-panel location-panel">
                <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    <MapPinned className="h-4 w-4" />
                    地图界面
                </div>
                <ExploreAttractions />
            </section>
        </div>
    );
}

