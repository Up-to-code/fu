// File: src/screens/search/_hooks/useSearchHistory.ts
// Purpose: Recent searches management

import { useState, useEffect } from 'react';
import { getSearchHistory, saveSearchHistory, clearSearchHistory as clearHistoryStorage } from '../../../lib/storage';

interface UseSearchHistoryReturn {
    recentSearches: string[];
    addSearch: (query: string) => Promise<void>;
    clearHistory: () => Promise<void>;
    isLoading: boolean;
}

const MAX_HISTORY = 10;

export const useSearchHistory = (): UseSearchHistoryReturn => {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const history = await getSearchHistory();
                setRecentSearches(history || []);
            } catch (error) {
                console.error('Error loading search history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadHistory();
    }, []);

    const addSearch = async (query: string) => {
        if (!query.trim()) return;

        const trimmedQuery = query.trim();
        setRecentSearches(prev => {
            const filtered = prev.filter(s => s !== trimmedQuery);
            const updated = [trimmedQuery, ...filtered].slice(0, MAX_HISTORY);
            saveSearchHistory(updated);
            return updated;
        });
    };

    const clearHistory = async () => {
        await clearHistoryStorage();
        setRecentSearches([]);
    };

    return {
        recentSearches,
        addSearch,
        clearHistory,
        isLoading,
    };
};
