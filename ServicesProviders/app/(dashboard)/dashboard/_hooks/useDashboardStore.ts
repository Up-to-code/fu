import { create } from "zustand";
import { dashboardStats, revenueChartData } from "@/data";

export type DashboardStats = typeof dashboardStats;
export type ChartData = typeof revenueChartData;

type DashboardStore = {
    dateRange: {
        from: Date | undefined;
        to: Date | undefined;
    };
    stats: DashboardStats;
    chartData: ChartData;
    
    // Actions
    setDateRange: (from: Date | undefined, to: Date | undefined) => void;
    setStats: (stats: DashboardStats) => void;
    setChartData: (data: ChartData) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
    dateRange: {
        from: undefined,
        to: undefined,
    },
    stats: dashboardStats,
    chartData: revenueChartData,
    
    setDateRange: (from, to) => set({ dateRange: { from, to } }),
    setStats: (stats) => set({ stats }),
    setChartData: (data) => set({ chartData: data }),
}));
