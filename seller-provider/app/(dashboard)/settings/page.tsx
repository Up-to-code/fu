"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useUserSettings } from "./_hooks";
import { ProfileSection, NotificationsSection } from "./_components";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { Permission } from "@/lib/permissions";

const notificationSettings = [
    {
        id: "new-orders",
        title: "إشعارات الطلبات الجديدة",
        description: "استلام إشعار عند ورود طلب جديد",
        enabled: true,
    },
    {
        id: "low-stock",
        title: "تنبيهات المخزون",
        description: "استلام تنبيه عند انخفاض المخزون",
        enabled: true,
    },
    {
        id: "newsletter",
        title: "النشرة البريدية",
        description: "استلام تحديثات وأخبار المنصة",
        enabled: false,
    },
];

export default function SettingsPage() {
    const { user } = useUserSettings();

    return (
        <div className="space-y-8 max-w-3xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-[#242C5A]">الإعدادات</h1>
                <p className="text-gray-500">إدارة إعدادات حسابك ومتجرك</p>
            </div>

            {/* Profile Section */}
            <ProfileSection
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                phone={user.phone}
                initials={user.initials}
            />

            {/* Notifications Section */}
            <NotificationsSection settings={notificationSettings} />

            {/* Save Button */}
            <div className="flex justify-end">
                <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl px-8">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                </Button>
            </div>
        </div>
    );
}
