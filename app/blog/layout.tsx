/**
 * Blog Layout
 * Wraps blog pages with the main layout
 */

import MainLayout from '@/app/(main)/layout';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}