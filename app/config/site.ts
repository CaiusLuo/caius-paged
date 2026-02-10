export const siteConfig = {
    // base info
    name: "caiusPaged",
    title: "Caius | Personal Portfolio & Developer Profile",
    description: "探索身边美好与技术分享的个人网站",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

    // author info
    author: {
        name: "Caius",
        email: "luoxiongcai5@gmail.com",
        github: "https://github.com/CaiusLuo",
    },

    // default seo
    seo:{
        defaultTitle: "Caius | Personal Portfolio & Developer Profile",
        titleTemplate: "%s | Caius",
        defaultDescription: "Discover nearby beautiful scenery and share technical experience",
    },

    // pageination
    pagination: {
        pageSize: 10,
        attractionsPerPage: 20,
    },

    // theme config
    theme: {
        defaultTheme: 'system',
        colorScheme: 'zinc',
    },

    navigation:{
        mainNav: [
            { title: "Home", href: "/" },
            { title: "Explore", href: "/explore" },
            { title: "Blog", href: "/blog" },
            { title: "About", href: "/about" },
        ],
        footerNav: [
             { title: "GitHub", href: "https://github.com/CaiusLuo", external: true },
         { title: "RSS", href: "/rss.xml" },
        ],
    },
} as const;

export type SiteConfig = typeof siteConfig;