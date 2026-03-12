'use client';

import { useEffect, useState } from 'react';

const colors = ['#0f766e', '#f97316', '#0284c7', '#dc2626'];
const strings = ['Caius Paged', 'Personal Portfolio', 'Technical Notes', 'Explore Lab'];

interface CharItem {
    char: string;
    color: string;
}

export default function TypewriterTyped() {
    const [displayText, setDisplayText] = useState<CharItem[]>([]);
    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    const currentString = strings[currentStringIndex];
    const nextCharColor = !isDeleting && currentCharIndex < currentString.length
        ? colors[currentCharIndex % colors.length]
        : colors[(Math.max(currentCharIndex - 1, 0)) % colors.length];

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            if (isDeleting) {
                if (currentCharIndex > 0) {
                    setDisplayText((previous) => previous.slice(0, -1));
                    setCurrentCharIndex((previous) => previous - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentStringIndex((previous) => (previous + 1) % strings.length);
                }
                return;
            }

            if (currentCharIndex < currentString.length) {
                const char = currentString[currentCharIndex];
                const color = colors[currentCharIndex % colors.length];
                setDisplayText((previous) => [...previous, { char, color }]);
                setCurrentCharIndex((previous) => previous + 1);
                return;
            }

            setIsDeleting(true);
        }, isDeleting ? 55 : currentCharIndex === currentString.length ? 1400 : 95);

        return () => window.clearTimeout(timeout);
    }, [currentCharIndex, currentString, isDeleting]);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setCursorVisible((previous) => !previous);
        }, 530);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <div className="w-[18ch] overflow-hidden whitespace-nowrap text-sm font-semibold tracking-[0.12em] text-zinc-900 dark:text-white sm:text-base">
            {displayText.map((item, index) => (
                <span key={`${item.char}-${index}`} style={{ color: item.color }}>
                    {item.char}
                </span>
            ))}
            <span
                style={{
                    color: nextCharColor,
                    opacity: cursorVisible ? 1 : 0,
                    transition: 'opacity 0.1s',
                }}
            >
                _
            </span>
        </div>
    );
}

