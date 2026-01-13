import { Button } from "@/components/ui/button";
import { Bell, Trash2 } from "lucide-react";
import { type Notification } from "../_hooks";

interface NotificationItemProps {
    notification: Notification;
    onDelete: (id: string) => void;
    onMarkAsRead?: (id: string) => void;
}

export function NotificationItem({ notification, onDelete, onMarkAsRead }: NotificationItemProps) {
    return (
        <div
            className={`bg-white rounded-2xl border p-5 transition-all hover:border-[#242C5A]/20 ${notification.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50/30'
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1" onClick={() => onMarkAsRead?.(notification.id)}>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${notification.read ? 'bg-gray-100' : 'bg-blue-100'
                        }`}>
                        <Bell className={`h-5 w-5 ${notification.read ? 'text-gray-500' : 'text-blue-600'}`} />
                    </div>
                    <div className="space-y-1 flex-1">
                        <h3 className={`font-bold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                        </h3>
                        <p className="text-gray-500 text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => onDelete(notification.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
