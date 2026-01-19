"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Save, Info } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useService, useServiceForm } from "../../_hooks";
import { ServiceSidebar, MediaUpload, RichTextEditor, CustomPricedOptions, type Media } from "../../_components";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function EditServicePage() {
    const params = useParams();
    const serviceId = params.serviceId as string;
    const service = useService(serviceId);
    const { formData, updateField, errors, isSubmitting, handleSubmit } = useServiceForm(serviceId, service);
    const [media, setMedia] = useState<Media[]>([]);

    useEffect(() => {
        if (service) {
            // Initialize media from service images
            const serviceMedia: Media[] = service.images.map((url, index) => ({
                id: `media-${index}`,
                url,
                type: "image",
            }));
            if (service.image && !serviceMedia.some(m => m.url === service.image)) {
                serviceMedia.unshift({
                    id: "media-main",
                    url: service.image,
                    type: "image",
                });
            }
            setMedia(serviceMedia);
        }
    }, [service]);

    const handleMediaAdd = (type: "image" | "video") => {
        const newMedia: Media = {
            id: Date.now().toString(),
            url: `https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&t=${Date.now()}`,
            type,
        };
        const newMediaList = [...media, newMedia];
        setMedia(newMediaList);
        
        const imageUrls = newMediaList.map(m => m.url);
        updateField("image", imageUrls[0] || "");
        updateField("images", imageUrls);
    };

    const handleMediaRemove = (id: string) => {
        const newMediaList = media.filter(m => m.id !== id);
        setMedia(newMediaList);
        
        const imageUrls = newMediaList.map(m => m.url);
        updateField("image", imageUrls[0] || "");
        updateField("images", imageUrls);
    };

    if (!service) {
        return (
            <div className="space-y-8 max-w-7xl mx-auto pb-20" dir="rtl">
                <div className="text-center py-12">
                    <p className="text-gray-500">الخدمة غير موجودة</p>
                    <Link href="/services">
                        <Button variant="outline" className="mt-4">
                            العودة إلى الخدمات
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto pb-20" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/services/${serviceId}`}>
                        <Button type="button" variant="ghost" size="icon" className="rounded-xl">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-[#242C5A]">تعديل الخدمة</h1>
                        <p className="text-gray-500">{service.name}</p>
                    </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl">
                    <Save className="h-4 w-4 ml-2" />
                    {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                        <h2 className="text-lg font-bold text-[#242C5A]">المعلومات الأساسية</h2>
                        <div className="space-y-2">
                            <Label>عنوان الخدمة *</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="مثال: تصميم داخلي"
                                className="rounded-xl"
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>الوصف *</Label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(value) => updateField("description", value)}
                                placeholder="وصف الخدمة..."
                            />
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-[#242C5A]">نطاق السعر</h2>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-gray-400 hover:text-[#242C5A]">
                                            <Info className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        ضع أقل سعر ممكن للخدمة، ويمكنك وضع حد أعلى اختياري
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>الحد الأدنى (ر.س) *</Label>
                                <Input
                                    value={formData.minPrice}
                                    onChange={(e) => updateField("minPrice", e.target.value)}
                                    type="number"
                                    inputMode="decimal"
                                    placeholder="200"
                                    className="rounded-xl"
                                />
                                {errors.minPrice && <p className="text-sm text-red-600">{errors.minPrice}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>الحد الأعلى (اختياري)</Label>
                                <Input
                                    value={formData.maxPrice}
                                    onChange={(e) => updateField("maxPrice", e.target.value)}
                                    type="number"
                                    inputMode="decimal"
                                    placeholder="500"
                                    className="rounded-xl"
                                />
                                {errors.maxPrice && <p className="text-sm text-red-600">{errors.maxPrice}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <MediaUpload
                        media={media}
                        onAdd={handleMediaAdd}
                        onRemove={handleMediaRemove}
                    />
                    {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}

                    <CustomPricedOptions
                        options={formData.options}
                        onChange={(opts) => updateField("options", opts)}
                        error={errors.options}
                    />
                </div>

                {/* Sidebar */}
                <div>
                    <ServiceSidebar
                        categoryId={formData.categoryId}
                        style={formData.style}
                        status={formData.status}
                        onCategoryChange={(value) => updateField("categoryId", value)}
                        onStyleChange={(value) => updateField("style", value)}
                        onStatusChange={(value) => updateField("status", value)}
                    />
                    {errors.categoryId && <p className="text-sm text-red-600 mt-2">{errors.categoryId}</p>}
                    
                    {/* Duration Field */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 mt-6">
                        <h3 className="font-bold text-[#242C5A]">مدة التنفيذ</h3>
                        <div className="space-y-2">
                            <Label className="text-sm">المدة المتوقعة (بالأيام)</Label>
                            <Input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => updateField("duration", e.target.value)}
                                placeholder="مثال: 3"
                                className="rounded-xl"
                            />
                            {errors.duration && <p className="text-sm text-red-600">{errors.duration}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
                    {errors.submit}
                </div>
            )}
        </form>
    );
}
