"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { styleTypes } from "@/data";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/lib/auth/hooks";

interface ProductSidebarProps {
    categoryId?: string;
    style?: string;
    price?: string;
    comparePrice?: string;
    sku?: string;
    status?: "active" | "draft";
    onCategoryChange?: (value: string) => void;
    onStyleChange?: (value: string) => void;
    onPriceChange?: (value: string) => void;
    onComparePriceChange?: (value: string) => void;
    onSkuChange?: (value: string) => void;
    onStatusChange?: (value: "active" | "draft") => void;
}

export function ProductSidebar({
    categoryId,
    style,
    price,
    comparePrice,
    sku,
    status = "active",
    onCategoryChange,
    onStyleChange,
    onPriceChange,
    onComparePriceChange,
    onSkuChange,
    onStatusChange,
}: ProductSidebarProps) {
    const { user } = useAuth();
    const categoriesPage = useQuery(
        api.sellerCategories.listSellerCategories,
        user?.id ? { providerId: user.id, includeDeleted: false } : "skip"
    );
    const categories = (categoriesPage?.page ?? []) as any[];

    return (
        <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-bold text-[#242C5A]">الحالة</h3>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">نشر المنتج</span>
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
                                <SelectItem key={cat._id as string} value={cat._id as string}>
                                    {(cat.icon as string) ?? "📦"} {cat.name as string}
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

            {/* Pricing */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-bold text-[#242C5A]">السعر الأساسي</h3>
                <p className="text-xs text-gray-400">يُستخدم عند عدم وجود متغيرات</p>
                <div className="space-y-2">
                    <Label className="text-sm">السعر (ر.س)</Label>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => onPriceChange?.(e.target.value)}
                        placeholder="0.00"
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm">سعر المقارنة</Label>
                    <Input
                        type="number"
                        value={comparePrice}
                        onChange={(e) => onComparePriceChange?.(e.target.value)}
                        placeholder="0.00"
                        className="rounded-xl"
                    />
                </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-bold text-[#242C5A]">المخزون</h3>
                <div className="space-y-2">
                    <Label className="text-sm">SKU الأساسي</Label>
                    <Input
                        value={sku}
                        onChange={(e) => onSkuChange?.(e.target.value)}
                        placeholder="PROD-001"
                        className="rounded-xl"
                    />
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">تتبع المخزون</span>
                    <Switch defaultChecked />
                </div>
            </div>
        </div>
    );
}
