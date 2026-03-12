import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteMetadata } from '@/app/config';
import './globals.css';

const themeInitScript = `(() => {
    try {
        const storedTheme = localStorage.getItem('theme');
        const resolvedTheme = storedTheme === 'light' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    } catch {
        document.documentElement.classList.add('dark');
    }
})();`;

export const metadata: Metadata = {
    title: siteMetadata.title,
    description: siteMetadata.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </head>
            <body>
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
