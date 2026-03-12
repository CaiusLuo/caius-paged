/**
 * Theme Toggle Component
 * Dark/light mode switcher
 */

'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

function applyThemeToDocument(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
}

let currentTheme: Theme = 'light';
const listeners = new Set<() => void>();

function getTheme(): Theme {
    return currentTheme;
}

function setThemeValue(theme: Theme) {
    currentTheme = theme;
    listeners.forEach((listener) => listener());
}

function subscribeToTheme(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getClientSnapshot() {
    return true;
}

function getServerSnapshot() {
    return false;
}

export function ThemeToggle() {
    const isClient = useSyncExternalStore(
        () => () => {},
        getClientSnapshot,
        getServerSnapshot
    );

    const theme = useSyncExternalStore(
        subscribeToTheme,
        getTheme,
        () => 'light' as Theme
    );

    useEffect(() => {
        const savedTheme = (localStorage.getItem('theme') as Theme | null) || 'light';
        setThemeValue(savedTheme);
        applyThemeToDocument(savedTheme);
    }, []);

    const handleThemeChange = useCallback((newTheme: Theme) => {
        setThemeValue(newTheme);
        localStorage.setItem('theme', newTheme);
        applyThemeToDocument(newTheme);
    }, []);

    if (!isClient) {
        return (
            <div className="flex items-center gap-1 rounded-md bg-zinc-100 p-1 dark:bg-zinc-800">
                <div className="h-7 w-7" />
                <div className="h-7 w-7" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 rounded-md bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
                onClick={() => handleThemeChange('light')}
                className={cn(
                    'rounded-md p-1.5 transition-colors',
                    theme === 'light'
                        ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                )}
                aria-label="Light theme"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => handleThemeChange('dark')}
                className={cn(
                    'rounded-md p-1.5 transition-colors',
                    theme === 'dark'
                        ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                )}
                aria-label="Dark theme"
            >
                <Moon className="h-4 w-4" />
            </button>
        </div>
    );
}

