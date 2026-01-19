import { create } from "zustand";

type AnalyticsStore = {
    dateRange: {
        from: Date | undefined;
        to: Date | undefined;
    };
    selectedMetric: string;
    
    // Actions
    setDateRange: (from: Date | undefined, to: Date | undefined) => void;
    setSelectedMetric: (metric: string) => void;
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
    dateRange: {
        from: undefined,
        to: undefined,
    },
    selectedMetric: "revenue",
    
    setDateRange: (from, to) => set({ dateRange: { from, to } }),
    setSelectedMetric: (metric) => set({ selectedMetric: metric }),
}));
