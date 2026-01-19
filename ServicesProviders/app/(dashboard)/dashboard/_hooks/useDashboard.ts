import { useDashboardStore } from "./useDashboardStore";

/**
 * Hook to get dashboard stats
 */
export function useDashboardStats() {
    const stats = useDashboardStore((state) => state.stats);
    return stats;
}

/**
 * Hook to get chart data
 */
export function useChartData() {
    const chartData = useDashboardStore((state) => state.chartData);
    return chartData;
}

/**
 * Hook for date range management
 */
export function useDateRange() {
    const dateRange = useDashboardStore((state) => state.dateRange);
    const setDateRange = useDashboardStore((state) => state.setDateRange);
    
    return {
        dateRange,
        setDateRange,
    };
}
