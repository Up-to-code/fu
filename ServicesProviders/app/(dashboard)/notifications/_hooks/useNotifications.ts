import { useNotificationStore } from "./useNotificationStore";

/**
 * Hook to get all notifications with filters applied
 */
export function useNotifications() {
    const filteredNotifications = useNotificationStore((state) => state.getFilteredNotifications());
    return filteredNotifications;
}

/**
 * Hook for filter management
 */
export function useNotificationFilters() {
    const filters = useNotificationStore((state) => state.filters);
    const setFilters = useNotificationStore((state) => state.setFilters);
    const clearFilters = useNotificationStore((state) => state.clearFilters);
    
    return {
        filters,
        setFilters,
        clearFilters,
    };
}

/**
 * Hook for notification actions
 */
export function useNotificationActions() {
    const markAsRead = useNotificationStore((state) => state.markAsRead);
    const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
    const deleteNotification = useNotificationStore((state) => state.deleteNotification);
    
    return {
        markAsRead,
        markAllAsRead,
        deleteNotification,
    };
}

/**
 * Hook to get unread count
 */
export function useUnreadCount() {
    const unreadCount = useNotificationStore((state) => state.getUnreadCount());
    return unreadCount;
}
