/**
 * Site Configuration
 * Site-wide metadata, author info, and navigation
 */

export const siteMetadata = {
    name: 'Caius Paged',
    title: 'Caius | Backend Developer & Agent Engineering',
    description: 'A clean personal portfolio for backend development, Agent engineering, internships, projects, and technical notes.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    locale: 'en-US',
    themeColor: '#0f172a',
} as const;

export const authorInfo = {
    name: 'Caius',
    email: 'luoxiongcai5@gmail.com',
    github: 'https://github.com/CaiusLuo',
    twitter: undefined,
    linkedin: undefined,
} as const;

export const seoConfig = {
    defaultTitle: siteMetadata.title,
    titleTemplate: '%s | Caius',
    defaultDescription: siteMetadata.description,
    openGraph: {
        type: 'website',
        siteName: siteMetadata.name,
        locale: siteMetadata.locale,
    },
    twitter: {
        cardType: 'summary_large_image',
        handle: authorInfo.twitter,
    },
} as const;

export interface NavItem {
    title: string;
    href: string;
    external?: boolean;
    icon?: string;
}

export const mainNav: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Notes', href: '/blog' },
    { title: 'Explore', href: '/explore' },
    { title: 'About', href: '/about' },
];

export const footerNav: NavItem[] = [
    { title: 'Notes', href: '/blog' },
    { title: 'GitHub', href: authorInfo.github, external: true },
];

export const socialLinks = [
    { name: 'GitHub', href: authorInfo.github, icon: 'github' },
    { name: 'Email', href: `mailto:${authorInfo.email}`, icon: 'mail' },
] as const;

export const themeConfig = {
    defaultTheme: 'light' as const,
    themes: ['light', 'dark'] as const,
    colorScheme: 'zinc',
} as const;

export const siteConfig = {
    metadata: siteMetadata,
    author: authorInfo,
    seo: seoConfig,
    navigation: {
        main: mainNav,
        footer: footerNav,
        social: socialLinks,
    },
    theme: themeConfig,
} as const;

export type SiteConfig = typeof siteConfig;



