import { useAnalyticsStore } from "./useAnalyticsStore";

/**
 * Hook for date range management
 */
export function useAnalyticsDateRange() {
    const dateRange = useAnalyticsStore((state) => state.dateRange);
    const setDateRange = useAnalyticsStore((state) => state.setDateRange);
    
    return {
        dateRange,
        setDateRange,
    };
}

/**
 * Hook for selected metric
 */
export function useSelectedMetric() {
    const selectedMetric = useAnalyticsStore((state) => state.selectedMetric);
    const setSelectedMetric = useAnalyticsStore((state) => state.setSelectedMetric);
    
    return {
        selectedMetric,
        setSelectedMetric,
    };
}
