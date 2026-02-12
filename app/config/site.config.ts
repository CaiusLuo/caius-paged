/**
 * Site Configuration
 * Site-wide metadata, author info, and navigation
 */

// ============================================
// Site Metadata
// ============================================

/**
 * Basic site information
 */
export const siteMetadata = {
    /** Site name */
    name: 'Caius Paged',

    /** Full site title */
    title: 'Caius | Personal Portfolio & Developer Profile',

    /** Site description */
    description: 'Explore nearby attractions and read technical insights',

    /** Site URL (from env or default) */
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

    /** Site language */
    locale: 'en-US',

    /** Site theme color */
    themeColor: '#18181b', // zinc-900
} as const;

// ============================================
// Author Information
// ============================================

/**
 * Site author details
 */
export const authorInfo = {
    name: 'Caius',
    email: 'luoxiongcai5@gmail.com',
    github: 'https://github.com/CaiusLuo',
    twitter: undefined, // Add if available
    linkedin: undefined, // Add if available
} as const;

// ============================================
// SEO Configuration
// ============================================

/**
 * SEO defaults for meta tags
 */
export const seoConfig = {
    /** Default page title */
    defaultTitle: siteMetadata.title,

    /** Title template for pages */
    titleTemplate: '%s | Caius',

    /** Default meta description */
    defaultDescription: siteMetadata.description,

    /** Open Graph defaults */
    openGraph: {
        type: 'website',
        siteName: siteMetadata.name,
        locale: siteMetadata.locale,
    },

    /** Twitter card defaults */
    twitter: {
        cardType: 'summary_large_image',
        handle: authorInfo.twitter,
    },
} as const;

// ============================================
// Navigation Configuration
// ============================================

/**
 * Navigation item type
 */
export interface NavItem {
    title: string;
    href: string;
    external?: boolean;
    icon?: string;
}

/**
 * Main navigation items
 */
export const mainNav: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Explore', href: '/explore' },
    { title: 'Blog', href: '/blog' },
    { title: 'About', href: '/about' },
];

/**
 * Footer navigation items
 */
export const footerNav: NavItem[] = [
    { title: 'GitHub', href: authorInfo.github, external: true },
    { title: 'RSS', href: '/rss.xml' },
];

/**
 * Social links for footer/about page
 */
export const socialLinks = [
    { name: 'GitHub', href: authorInfo.github, icon: 'github' },
    { name: 'Email', href: `mailto:${authorInfo.email}`, icon: 'mail' },
] as const;

// ============================================
// Theme Configuration
// ============================================

/**
 * Theme settings
 */
export const themeConfig = {
    /** Default theme mode */
    defaultTheme: 'system' as const,

    /** Available themes */
    themes: ['light', 'dark', 'system'] as const,

    /** Color scheme name (for Tailwind) */
    colorScheme: 'zinc',
} as const;

// ============================================
// Combined Export
// ============================================

/**
 * Complete site configuration
 */
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
