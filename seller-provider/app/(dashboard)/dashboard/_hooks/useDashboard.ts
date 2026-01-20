import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

/**
 * Hook to get dashboard stats
 */
export function useDashboardStats(dateRange?: DateRange) {
    const from = dateRange?.from ? dateRange.from.getTime() : undefined;
    const to = dateRange?.to ? dateRange.to.getTime() : undefined;

    const stats = useQuery(api.dashboard.getDashboardStats, { from, to });

    return stats || {
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0,
        trends: {
            revenue: 0,
            orders: 0,
            products: 0,
            customers: 0,
        }
    };
}

/**
 * Hook to get chart data
 */
export function useChartData(dateRange?: DateRange) {
    const from = dateRange?.from ? dateRange.from.getTime() : undefined;
    const to = dateRange?.to ? dateRange.to.getTime() : undefined;

    const chartData = useQuery(api.dashboard.getRevenueChartData, { from, to });

    return chartData || [];
}

/**
 * Hook to get sales by category
 */
export function useSalesByCategory(dateRange?: DateRange) {
    const from = dateRange?.from ? dateRange.from.getTime() : undefined;
    const to = dateRange?.to ? dateRange.to.getTime() : undefined;

    const data = useQuery(api.dashboard.getSalesByCategory, { from, to });

    return data || [];
}

/**
 * Helper for default date range
 */
export function getDefaultDateRange(): DateRange {
    const now = new Date();
    return {
        from: startOfMonth(subMonths(now, 1)), // Last month
        to: endOfMonth(now),
    };
}
