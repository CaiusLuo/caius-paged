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
        document.documentElement.classList.add('reveal-ready');

        const markVisible = (element: Element) => {
            element.classList.add('reveal-visible');
        };

        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll<HTMLElement>(revealSelector).forEach(markVisible);
            return;
        }

        const observed = new WeakSet<Element>();
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

        const observeElement = (element: Element) => {
            if (observed.has(element) || element.classList.contains('reveal-visible')) {
                return;
            }

            observed.add(element);
            observer.observe(element);
        };

        const observeTree = (root: ParentNode) => {
            if (root instanceof Element && root.matches(revealSelector)) {
                observeElement(root);
            }

            root.querySelectorAll?.(revealSelector).forEach(observeElement);
        };

        observeTree(document);

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element) {
                        observeTree(node);
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            mutationObserver.disconnect();
            observer.disconnect();
            document.documentElement.classList.remove('reveal-ready');
        };
    }, []);

    return null;
}
