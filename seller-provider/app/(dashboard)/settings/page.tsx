"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useUserSettings } from "./_hooks";
import { ProfileSection, NotificationsSection } from "./_components";
import { useState, useEffect } from "react";

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
    const { user, updateProfile, isLoading } = useUserSettings();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<any>({});
    
    // Update local form data when user data loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            await updateProfile({
                name: formData.name,
                phone: formData.phone,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Extract first/last name from full name for display/edit if needed
    // Or just pass name
    
    return (
        <div className="space-y-8 max-w-3xl mx-auto" dir="rtl">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-[#242C5A]">الإعدادات</h1>
                <p className="text-gray-500">إدارة إعدادات حسابك ومتجرك</p>
            </div>

            {/* Profile Section */}
            <ProfileSection
                firstName={formData.name?.split(' ')[0] || ""}
                lastName={formData.name?.split(' ').slice(1).join(' ') || ""}
                email={formData.email || ""}
                phone={formData.phone || ""}
                initials={formData.name?.substring(0, 2).toUpperCase() || "??"}
                onFirstNameChange={(val) => setFormData((prev: any) => ({ ...prev, name: `${val} ${prev.name?.split(' ').slice(1).join(' ') || ''}`.trim() }))}
                onLastNameChange={(val) => setFormData((prev: any) => ({ ...prev, name: `${prev.name?.split(' ')[0] || ''} ${val}`.trim() }))}
                onPhoneChange={(val) => setFormData((prev: any) => ({ ...prev, phone: val }))}
                // Email is usually read-only or handled separately
            />

            {/* Notifications Section */}
            <NotificationsSection settings={notificationSettings} />

            {/* Save Button */}
            <div className="flex justify-end">
                <Button 
                    className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl px-8"
                    onClick={handleSave}
                    disabled={isSubmitting || isLoading}
                >
                    <Save className="h-4 w-4 ml-2" />
                    {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
            </div>
        </div>
    );
}
