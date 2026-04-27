'use client';

import { useEffect } from 'react';

const revealSelector = [
    '.notion-home > section',
    '.page-shell > section',
    '.subpage-hero-card',
    '.apple-card',
    '.resume-list',
    '.resume-detail-card',
].join(', ');

export function ScrollReveal() {
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

        document.documentElement.classList.add('reveal-ready');

        if (!('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('reveal-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                rootMargin: '0px 0px -12% 0px',
                threshold: 0.14,
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
            document.documentElement.classList.remove('reveal-ready');
        };
    }, []);

    return null;
}
