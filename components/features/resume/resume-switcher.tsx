'use client';

import { useMemo, useState } from 'react';
import { BriefcaseBusiness, ChevronRight, Code2, Layers3 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ResumeItem = {
    title: string;
    role: string;
    period?: string;
    meta: string;
    summary: string;
    tags: string[];
    highlights: string[];
};

const internships: ResumeItem[] = [
    {
        title: 'IMean.ai / 跨越星空',
        role: 'Agent 后端开发实习生',
        period: '2025.11 - 2026.02',
        meta: '杭州 · Agent 后端 / API 调度 / GraphQL / LangGraph',
        summary:
            '参与 Agent 基础设施后端开发，围绕多源 API 稳定性、POI 数据检索性能、Agent 状态流转和跨服务调用链路做工程化优化。',
        tags: ['Redis', 'GraphQL', 'DataLoader', 'GeoHash', 'LangGraph', 'LangSmith'],
        highlights: [
            '设计高可用 API 路由管理器，基于 Redis 污点记录与动态轮询策略处理三方图片源配额和异常切流。',
            '引入 DataLoader 与 BatchGet 合并 GraphQL Resolver 请求，减少多实体 POI 关联查询里的 N+1 问题。',
            '基于 GeoHash 区域锁和 destinationId 业务锁限制重复请求与周期性更新，降低重复写入和并发冲突。',
            '参与 Flight-Agent 工程化建设，使用 LangGraph 设计多级状态机，并通过 LangSmith 定位链路和状态异常。',
        ],
    },
    {
        title: '智测云联（青岛）智能科技有限公司',
        role: 'Java 后端开发实习生',
        period: '2025.07 - 2025.10',
        meta: 'IoT 后端 / MQTT / 多租户 / 异步入库 / 部署优化',
        summary:
            '参与物联网云平台后端开发，负责设备消息接入、多租户数据模型设计与消息异步处理链路建设。',
        tags: ['Java', 'Spring Boot', 'MQTT', 'Redis', 'RabbitMQ', 'MySQL', 'Docker'],
        highlights: [
            '设计并实现 MQTT 消息监听模块，支持设备上线、心跳、数据上报等事件异步接入。',
            '使用 Redis + RabbitMQ 构建设备上报消息解耦链路，降低主链路阻塞和数据库瞬时写入压力。',
            '基于租户、服务、设备模型设计多租户隔离机制，实现租户数据和设备资源动态绑定。',
            '参与 MySQL、Ruoyi、Docker 部署流程调整，优化项目部署结构和服务维护方式。',
        ],
    },
];

const projects: ResumeItem[] = [
    {
        title: 'RedFolio 红笺书',
        role: 'Java 后端开发',
        period: '2025.03 - 2025.05',
        meta: '高并发内容社区 / 微服务 / 高并发读写',
        summary:
            '基于 Spring Cloud Alibaba 构建内容社区平台，支持笔记发布、点赞、收藏、关注等核心功能。',
        tags: ['Spring Cloud Alibaba', 'Nacos', 'Gateway', 'Redis', 'Caffeine', 'RocketMQ', 'MinIO'],
        highlights: [
            '通过 Gateway 实现统一路由、统一鉴权与用户身份透传，并使用 Feign 完成服务间调用。',
            '设计分布式 ID 生成服务，支持 Leaf 号段模式与雪花算法，使用双 Buffer 降低号段切换抖动。',
            '构建 Redis + Caffeine 多级缓存体系，并通过 RocketMQ 广播或 Redis Pub/Sub 同步本地缓存失效。',
            '基于 Bloom Filter、ZSET 与 Lua 脚本优化点赞链路，实现去重、计数更新和异步落库。',
        ],
    },
    {
        title: 'TodayStock',
        role: 'Java 后端开发',
        period: '2024.11 - 2025.01',
        meta: '股票数据采集 / 可视化 / 定时任务 / MQ / 分库分表',
        summary:
            '基于 Spring Boot 构建股票数据采集、清洗、入库与可视化分析平台，支持行情数据定时采集和图表展示。',
        tags: ['Spring Boot', 'RabbitMQ', 'XXL-Job', 'Sharding-JDBC', 'Redis', 'Caffeine', 'ECharts'],
        highlights: [
            '使用 XXL-Job 搭建统一任务调度中心，支持任务日志查看、失败重试和调度状态管理。',
            '通过 RabbitMQ 解耦采集、清洗、入库流程，降低数据库瞬时写入峰值压力。',
            '基于 Sharding-JDBC 按时间与股票代码水平分表，优化大数据量行情写入和查询。',
            '使用 Redis + Caffeine 缓存热点行情和查询结果，提升接口响应稳定性。',
        ],
    },
    {
        title: '纳指链接 BOT',
        role: 'Python 后端开发',
        period: '2025.11 - 至今',
        meta: 'Agent 工具 / 金融资讯订阅 / 自动化推送',
        summary:
            '基于 Python 构建金融资讯订阅与推送工具，支持纳指行情获取、新闻分析、订阅用户管理和多平台推送。',
        tags: ['Python', 'CrewAI', 'yfinance', 'Tavily', 'PostgreSQL', 'APScheduler', 'Telegram Bot'],
        highlights: [
            '使用 CrewAI 搭建多 Agent 协作链路，拆分行情获取、新闻检索、内容分析和消息生成任务。',
            '使用 yfinance 和 Tavily 获取行情数据与相关新闻，生成推送平台格式的总结内容。',
            '使用 PostgreSQL 持久化订阅用户信息，并通过 APScheduler 实现每日定时推送。',
            '接入飞书 Webhook 与 Telegram Bot，支持群消息推送和用户指令交互。',
        ],
    },
    {
        title: 'MyBlog 个人博客系统',
        role: 'Java 后端开发',
        meta: '前后端分离 / 文件存储 / 全文检索 / 自动化部署',
        summary:
            '基于 Spring Boot + Vue3 构建个人博客系统，支持用户认证、文章发布、文件上传、全文检索和后台管理。',
        tags: ['Spring Boot', 'Vue3', 'Spring Security', 'JWT', 'MinIO', 'Lucene', 'Jenkins'],
        highlights: [
            '使用 Spring Security + JWT 实现用户登录认证与接口权限控制。',
            '集成 MinIO 管理博客图片和附件，统一处理对象存储能力。',
            '使用 Lucene 构建文章全文检索能力，支持关键词搜索与高亮展示。',
            '集成 Jenkins + Nginx 实现自动化构建、部署和线上发布。',
        ],
    },
];

const groups = {
    internship: {
        label: '实习经历',
        icon: BriefcaseBusiness,
        items: internships,
    },
    project: {
        label: '项目经历',
        icon: Layers3,
        items: projects,
    },
};

type GroupKey = keyof typeof groups;

export function ResumeSwitcher() {
    const [activeGroup, setActiveGroup] = useState<GroupKey>('internship');
    const [activeIndex, setActiveIndex] = useState(0);

    const currentGroup = groups[activeGroup];
    const activeItem = currentGroup.items[activeIndex] ?? currentGroup.items[0];
    const ActiveIcon = currentGroup.icon;

    const totalHighlights = useMemo(
        () => currentGroup.items.reduce((count, item) => count + item.highlights.length, 0),
        [currentGroup.items]
    );

    function selectGroup(group: GroupKey) {
        setActiveGroup(group);
        setActiveIndex(0);
    }

    return (
        <section className="notion-section resume-switcher" id="experience">
            <div className="section-heading">
                <p className="section-kicker">Experience</p>
                <div>
                    <h2>实习与项目经历</h2>
                </div>
            </div>

            <div className="resume-tabs" role="tablist" aria-label="Resume sections">
                {(Object.keys(groups) as GroupKey[]).map((key) => {
                    const group = groups[key];
                    const Icon = group.icon;

                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={activeGroup === key}
                            className={cn('resume-tab', activeGroup === key && 'is-active')}
                            onClick={() => selectGroup(key)}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{group.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="resume-layout">
                <div className="resume-list" aria-label={`${currentGroup.label}列表`}>
                    <div className="resume-list-summary">
                        <ActiveIcon className="h-4 w-4" />
                        <span>{currentGroup.items.length} 段经历</span>
                        <span>{totalHighlights} 个关键动作</span>
                    </div>

                    {currentGroup.items.map((item, index) => (
                        <button
                            key={item.title}
                            type="button"
                            className={cn('resume-list-card', activeIndex === index && 'is-active')}
                            onClick={() => setActiveIndex(index)}
                        >
                            <span className="resume-card-index">{String(index + 1).padStart(2, '0')}</span>
                            <span>
                                <strong>{item.title}</strong>
                                <small>{item.role}</small>
                            </span>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    ))}
                </div>

                <article key={`${activeGroup}-${activeItem.title}`} className="resume-detail-card">
                    <div className="resume-detail-topline">
                        <span>{currentGroup.label}</span>
                        {activeItem.period && <time>{activeItem.period}</time>}
                    </div>

                    <div className="resume-detail-title">
                        <Code2 className="h-5 w-5" />
                        <div>
                            <h3>{activeItem.title}</h3>
                            <p>{activeItem.role}</p>
                        </div>
                    </div>

                    <p className="resume-meta">{activeItem.meta}</p>
                    <p className="resume-summary">{activeItem.summary}</p>

                    <div className="resume-tags" aria-label="技术关键词">
                        {activeItem.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>

                    <ul className="resume-highlights">
                        {activeItem.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>
                </article>
            </div>
        </section>
    );
}
