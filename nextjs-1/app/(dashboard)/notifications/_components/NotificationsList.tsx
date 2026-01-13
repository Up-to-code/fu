import { Bell } from "lucide-react";
import { type Notification } from "../_hooks";
import { NotificationItem } from "./NotificationItem";

interface NotificationsListProps {
    notifications: Notification[];
    onDelete: (id: string) => void;
    onMarkAsRead?: (id: string) => void;
}

export function NotificationsList({ notifications, onDelete, onMarkAsRead }: NotificationsListProps) {
    if (notifications.length === 0) {
        return (
            <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">لا توجد إشعارات</h3>
                <p className="text-gray-500">ستظهر إشعاراتك هنا</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDelete={onDelete}
                    onMarkAsRead={onMarkAsRead}
                />
            ))}
        </div>
    );
}
