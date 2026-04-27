import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Mail, NotebookPen } from 'lucide-react';
import { ResumeSwitcher } from '@/components/features/resume/resume-switcher';
import { authorInfo } from '@/app/config';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/content/blog';
import { formatDate } from '@/lib/utils';

const skills = [
    'Java',
    'Spring Boot',
    'Spring Cloud Alibaba',
    'Redis',
    'RabbitMQ',
    'RocketMQ',
    'GraphQL',
    'LangGraph',
    'MySQL',
    'Docker',
];

const profileStats = [
    { value: 'Agent', label: '后端工程化' },
    { value: 'Java', label: '微服务与高并发' },
    { value: 'MQ', label: '异步链路设计' },
];

const focusAreas = [
    {
        title: 'Agent Infrastructure',
        description: 'API 调度、GraphQL Resolver 优化、LangGraph 状态流转、LangSmith 链路追踪。',
    },
    {
        title: 'Backend Systems',
        description: 'Spring Cloud Alibaba、Gateway 鉴权、分布式 ID、多级缓存、异步落库。',
    },
    {
        title: 'Data Automation',
        description: 'XXL-Job 定时调度、RabbitMQ 削峰、Sharding-JDBC 分表、金融资讯 Bot。',
    },
];

export default function HomePage() {
    const posts = getAllBlogPosts();
    const featuredPosts = getFeaturedBlogPosts(3);

    return (
        <div className="notion-home">
            <section className="notion-hero">
                <div className="hero-copy">
                    <p className="eyebrow">Caius</p>
                    <div className="hero-self-image">
                        <Image
                            src="/caius-self-png.png"
                            alt="Caius profile introduction"
                            width={1055}
                            height={1491}
                            priority
                        />
                    </div>

                </div>

                <aside className="hero-resume-card" aria-label="Resume summary">
                    <div className="resume-paper-header">
                        <div className="resume-window-controls" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="resume-paper-tabs" aria-label="Profile tabs">
                            <span className="is-active">Profile</span>
                            <span>Stack</span>
                            <span>Systems</span>
                        </div>
                    </div>
                    <div className="resume-paper-body">
                        <div className="hero-card-tags" aria-label="Profile highlights">
                            <span>Agent Backend</span>
                            <span>Spring Cloud</span>
                            <span>Redis / MQ</span>
                            <span>GraphQL</span>
                        </div>

                        <p className="resume-paper-label">Resume Snapshot</p>
                        <h2>Backend / Agent</h2>
                        <p>
                            IMean.ai Agent 后端实习、IoT 平台后端实习、RedFolio 高并发内容社区、TodayStock 数据分析平台。
                        </p>
                        <div className="resume-paper-grid">
                            {profileStats.map((item) => (
                                <div key={item.label}>
                                    <strong>{item.value}</strong>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="resume-card-actions">
                            <Link href="#experience" className="notion-button notion-button-primary">
                                查看经历
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="/blog" className="notion-button notion-button-secondary">
                                技术笔记
                                <NotebookPen className="h-4 w-4" />
                            </Link>
                            <Link href={authorInfo.github} className="notion-button notion-button-secondary" target="_blank" rel="noreferrer noopener">
                                GitHub
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href={`mailto:${authorInfo.email}`} className="notion-button notion-button-secondary">
                                联系我
                                <Mail className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </aside>
            </section>

            <section className="notion-section skill-section">
                <div className="section-heading">
                    <p className="section-kicker">Stack</p>
                    <div>
                        <h2>技术关键词</h2>
                    </div>
                </div>
                <div className="tech-orbit-strip" aria-label="Core stack loop">
                    <div>
                        {[...skills, ...skills].map((skill, index) => (
                            <span key={`${skill}-${index}`}>{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="sr-only">
                    {skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                    ))}
                </div>
            </section>

            <section className="focus-grid">
                {focusAreas.map((area, index) => (
                    <article key={area.title} className="notion-card apple-card" style={{ animationDelay: `${index * 90}ms` }}>
                        <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                        <h2>{area.title}</h2>
                        <p>{area.description}</p>
                    </article>
                ))}
            </section>

            <ResumeSwitcher />

            <section className="notion-section writing-section">
                <div className="section-heading">
                    <p className="section-kicker">Writing</p>
                    <div>
                        <h2>技术笔记</h2>
                        <p>{posts.length} 篇工程记录、问题复盘与项目笔记。</p>
                    </div>
                    <Link href="/blog" className="notion-button notion-button-secondary">
                        全部笔记
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="writing-grid">
                    {featuredPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${encodeURIComponent(post.slug)}`} className="writing-card apple-card">
                            <span>{post.category} · {formatDate(post.date)}</span>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
