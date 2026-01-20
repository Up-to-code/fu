"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check } from "lucide-react";
import { useNotifications, useNotificationActions } from "./_hooks";
import { NotificationsList } from "./_components";

export default function NotificationsPage() {
    const notifications = useNotifications();
    const { markAllAsRead, deleteNotification } = useNotificationActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setNotificationToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (notificationToDelete) {
            deleteNotification(notificationToDelete);
            setDeleteDialogOpen(false);
            setNotificationToDelete(null);
        }
    };

    return (
        <>
            <div className="space-y-8 max-w-3xl mx-auto" dir="rtl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-[#242C5A]">الإشعارات</h1>
                        <p className="text-gray-500">جميع إشعاراتك في مكان واحد</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="rounded-xl"
                            onClick={markAllAsRead}
                        >
                            <Check className="h-4 w-4 ml-2" />
                            تحديد الكل كمقروء
                        </Button>
                    </div>
                </div>

                {/* Notifications List */}
                <NotificationsList
                    notifications={notifications}
                    onDelete={handleDeleteClick}
                />
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>حذف الإشعار</AlertDialogTitle>
                        <AlertDialogDescription>
                            هل أنت متأكد من حذف هذا الإشعار؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            حذف
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
