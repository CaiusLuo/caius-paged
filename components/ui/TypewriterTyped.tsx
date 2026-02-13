"use client"

import { useEffect, useState, useCallback } from "react";

const colors = [
    '#007AFF', // System Blue
    '#34C759', // System Green
    '#FF9500', // System Orange
    '#FF2D55', // System Pink
    '#5856D6', // System Indigo
    '#FF3B30', // System Red
    '#AF52DE'  // System Purple
];

const strings = ['Caius Paged', 'Backend Intern', 'Agent Enthusiast', 'Travel Enthusiast'];

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
        : colors[(currentString.length - 1) % colors.length];

    const type = useCallback(() => {
        if (isDeleting) {
            if (currentCharIndex > 0) {
                setDisplayText(prev => prev.slice(0, -1));
                setCurrentCharIndex(prev => prev - 1);
            } else {
                setIsDeleting(false);
                setCurrentStringIndex(prev => (prev + 1) % strings.length);
            }
        } else {
            if (currentCharIndex < currentString.length) {
                const char = currentString[currentCharIndex];
                const color = colors[currentCharIndex % colors.length];
                setDisplayText(prev => [...prev, { char, color }]);
                setCurrentCharIndex(prev => prev + 1);
            } else {
                // Finished typing, wait then start deleting
                setTimeout(() => setIsDeleting(true), 1500);
            }
        }
    }, [currentCharIndex, currentString, isDeleting]);

    useEffect(() => {
        const timeout = setTimeout(type, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [type, isDeleting]);

    // Cursor blink effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[200px] font-bold">
            {displayText.map((item, index) => (
                <span key={index} style={{ color: item.color }}>
                    {item.char}
                </span>
            ))}
            <span
                style={{
                    color: isDeleting ? colors[(currentCharIndex - 1 + currentString.length) % colors.length] : nextCharColor,
                    opacity: cursorVisible ? 1 : 0,
                    transition: 'opacity 0.1s'
                }}
            >
                _
            </span>
        </div>
    );
}