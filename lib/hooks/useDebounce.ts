/**
 * useDebounce Hook
 * Debounces a value with specified delay
 */

import { useState, useEffect } from 'react';
import { SEARCH } from '@/app/config/constants';

/**
 * Debounce a value with specified delay
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm);
 * 
 * useEffect(() => {
 *   // This effect runs after the user stops typing for 300ms
 *   searchAPI(debouncedSearch);
 * }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay ?? SEARCH.DEBOUNCE_DELAY);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
