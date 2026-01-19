"use client";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

interface NotificationsSectionProps {
    settings: NotificationSetting[];
    onSettingChange?: (id: string, enabled: boolean) => void;
}

export function NotificationsSection({ settings, onSettingChange }: NotificationsSectionProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#242C5A] mb-6">الإشعارات</h2>
            <div className="space-y-4">
                {settings.map((setting, index) => (
                    <div key={setting.id}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{setting.title}</p>
                                <p className="text-sm text-gray-500">{setting.description}</p>
                            </div>
                            <Switch
                                defaultChecked={setting.enabled}
                                onCheckedChange={(checked) => onSettingChange?.(setting.id, checked)}
                            />
                        </div>
                        {index < settings.length - 1 && <Separator className="mt-4" />}
                    </div>
                ))}
            </div>
        </div>
    );
}
