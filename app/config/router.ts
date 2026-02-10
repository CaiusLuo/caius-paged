/**
 * 路由配置对象
 * 集中管理所有路由路径，避免硬编码字符串
 */
export const routes = {
    home: '/',

    // 探索/景点相关
    explore: {
        index: '/explore',
        nearby: '/explore/nearby',
        detail: (id: string) => `/explore/${id}`,
    },

    // 博客模块
    blog: {
        index: '/blog',
        detail: (slug: string) => `/blog/${slug}`,
        tag: (tag: string) => `/blog/tag/${tag}`,
        rss: '/blog/rss.xml',
    },

    // 关于界面
    about: '/about',

    // api 路由
    api: {
        attractions: {
            list: '/api/attractions',
            nearby: '/api/attractions/nearby',
            detail: (id: string) => `/api/attractions/${id}`,
        },
        blog: {
            list: '/api/blog',
            detail: (slug: string) => `/api/blog/${slug}`,
        },
    },
} as const;

// 路由元数据（用于导航高亮、权限等）
export const routeMetadata: Record<string, {
    title: string;
    description?: string;
    showInNav?: boolean;
}> = {
    [routes.home]: {
    title: "首页",
    description: "探索附近美景，阅读技术博客",
    showInNav: true,
    },
    [routes.explore.index]: {
    title: "探索",
    description: "发现周边的精彩景点",
    showInNav: true,
    },
    [routes.blog.index]: {
    title: "博客",
    description: "技术文章与学习笔记",
    showInNav: true,
    },
    [routes.about]: {
    title: "关于",
    description: "关于我和我的网站",
    showInNav: true,
    },
};

// 类型导出
export type Routes = typeof routes;