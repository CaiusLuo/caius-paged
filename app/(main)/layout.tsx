/**
 * Main Layout
 * Shared layout with header and footer
 */

import { Header, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/layout/scroll-reveal';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <ScrollReveal />
        </div>
    );
}
