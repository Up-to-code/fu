"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories, styleTypes } from "@/data";

interface ServiceSidebarProps {
    categoryId?: string;
    style?: string;
    status?: "active" | "draft";
    onCategoryChange?: (value: string) => void;
    onStyleChange?: (value: string) => void;
    onStatusChange?: (value: "active" | "draft") => void;
}

export function ServiceSidebar({
    categoryId,
    style,
    status = "active",
    onCategoryChange,
    onStyleChange,
    onStatusChange,
}: ServiceSidebarProps) {
    return (
        <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-bold text-[#242C5A]">الحالة</h3>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">نشر الخدمة</span>
                    <Switch
                        checked={status === "active"}
                        onCheckedChange={(checked) => onStatusChange?.(checked ? "active" : "draft")}
                    />
                </div>
            </div>

            {/* Category & Style */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-bold text-[#242C5A]">التصنيف</h3>
                <div className="space-y-2">
                    <Label className="text-sm">الفئة</Label>
                    <Select value={categoryId} onValueChange={onCategoryChange}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-sm">الستايل</Label>
                    <Select value={style} onValueChange={onStyleChange}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="اختر الستايل" />
                        </SelectTrigger>
                        <SelectContent>
                            {styleTypes.map((styleType) => (
                                <SelectItem key={styleType.id} value={styleType.id}>
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${styleType.color}`}>
                                        {styleType.name}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
