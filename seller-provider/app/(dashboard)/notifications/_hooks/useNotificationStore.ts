import { create } from "zustand";
import { notifications as initialNotifications } from "@/data";

export type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
};

type NotificationFilters = {
    read?: boolean;
};

type NotificationStore = {
    notifications: Notification[];
    filters: NotificationFilters;
    
    // Actions
    setNotifications: (notifications: Notification[]) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: string) => void;
    setFilters: (filters: Partial<NotificationFilters>) => void;
    clearFilters: () => void;
    
    // Selectors
    getFilteredNotifications: () => Notification[];
    getUnreadCount: () => number;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: initialNotifications as Notification[],
    filters: {},
    
    setNotifications: (notifications) => set({ notifications }),
    
    markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
        ),
    })),
    
    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
    
    deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
    })),
    
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
    })),
    
    clearFilters: () => set({ filters: {} }),
    
    getFilteredNotifications: () => {
        const state = get();
        let filtered = state.notifications;
        
        // Apply filters
        if (state.filters.read !== undefined) {
            filtered = filtered.filter((n) => n.read === state.filters.read);
        }
        
        return filtered;
    },
    
    getUnreadCount: () => {
        const state = get();
        return state.notifications.filter((n) => !n.read).length;
    },
}));
