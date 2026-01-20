"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct, useProductForm } from "../../_hooks";
import { MediaManager, ProductOptions, ProductSidebar, RichTextEditor, VariantsList, generateVariants, type Media, type Option, type Variant } from "../../_components";

export default function EditProductPage() {
    const params = useParams();
    const productId = params.productId as string;
    const product = useProduct(productId);
    const { formData, updateField, errors, isSubmitting, handleSubmit } = useProductForm(productId, product);
    const [options, setOptions] = useState<Option[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [media, setMedia] = useState<Media[]>([]);

    useEffect(() => {
        if (product) {
            // Initialize media from product images
            const productMedia: Media[] = product.images.map((url, index) => ({
                id: `media-${index}`,
                url,
                type: "image",
            }));
            if (product.image && !productMedia.some(m => m.url === product.image)) {
                productMedia.unshift({
                    id: "media-main",
                    url: product.image,
                    type: "image",
                });
            }
            
            // Add videos if any
            if (product.videos && product.videos.length > 0) {
                 const videoMedia: Media[] = product.videos.map((url, index) => ({
                    id: `video-${index}`,
                    url,
                    type: "video",
                }));
                productMedia.push(...videoMedia);
            } else if (product.video) {
                 productMedia.push({
                    id: "video-main",
                    url: product.video!,
                    type: "video",
                });
            }
            setMedia(productMedia);
        }
    }, [product]);

    const handleMediaChange = (newMediaList: Media[]) => {
        setMedia(newMediaList);
        
        // Update form data
        const imageUrls = newMediaList.filter(m => m.type === "image").map(m => m.url);
        const videoUrls = newMediaList.filter(m => m.type === "video").map(m => m.url);
        
        updateField("image", imageUrls[0] || "");
        updateField("images", imageUrls);
        updateField("video", videoUrls[0] || "");
        updateField("videos", videoUrls);
    };

    const handleOptionsChange = (newOptions: Option[]) => {
        setOptions(newOptions);
        // Generate variants when options change
        const newVariants = generateVariants(newOptions, variants);
        setVariants(newVariants);
    };

    const handleVariantChange = (variantId: string, field: keyof Variant, value: string | Media[]) => {
        setVariants(variants.map(v => 
            v.id === variantId ? { ...v, [field]: value } : v
        ));
    };

    const handleVariantMediaAdd = (variantId: string, type: "image" | "video") => {
        const newMedia: Media = {
            id: Date.now().toString(),
            url: `https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&t=${Date.now()}`,
            type,
        };
        handleVariantChange(variantId, "media", [...variants.find(v => v.id === variantId)?.media || [], newMedia]);
    };

    const handleVariantMediaRemove = (variantId: string, mediaId: string) => {
        const variant = variants.find(v => v.id === variantId);
        if (variant) {
            handleVariantChange(variantId, "media", variant.media.filter(m => m.id !== mediaId));
        }
    };

    const optionNames = options.map(o => o.name);

    if (!product) {
        return (
            <div className="space-y-8 max-w-7xl mx-auto pb-20" dir="rtl">
                <div className="text-center py-12">
                    <p className="text-gray-500">المنتج غير موجود</p>
                    <Link href="/products">
                        <Button variant="outline" className="mt-4">
                            العودة إلى المنتجات
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
                    <Link href={`/products/${productId}`}>
                        <Button type="button" variant="ghost" size="icon" className="rounded-xl">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-[#242C5A]">تعديل المنتج</h1>
                        <p className="text-gray-500">{product.name}</p>
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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>اسم المنتج (عربي) *</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    placeholder="اسم المنتج بالعربية"
                                    className="rounded-xl"
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>اسم المنتج (إنجليزي) *</Label>
                                <Input
                                    value={formData.nameEn}
                                    onChange={(e) => updateField("nameEn", e.target.value)}
                                    placeholder="Product name in English"
                                    className="rounded-xl"
                                />
                                {errors.nameEn && <p className="text-sm text-red-600">{errors.nameEn}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>الوصف *</Label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(value) => updateField("description", value)}
                                placeholder="وصف المنتج..."
                            />
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>
                    </div>

                    {/* Media */}
                    <MediaManager
                        media={media}
                        onChange={handleMediaChange}
                    />
                    {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}

                    {/* Options & Variants */}
                    <ProductOptions options={options} onOptionsChange={handleOptionsChange} />
                    
                    {variants.length > 0 && (
                        <VariantsList
                            variants={variants}
                            optionNames={optionNames}
                            onVariantChange={handleVariantChange}
                            onAddMedia={handleVariantMediaAdd}
                            onRemoveMedia={handleVariantMediaRemove}
                        />
                    )}
                </div>

                {/* Sidebar */}
                <div>
                    <ProductSidebar
                        categoryId={formData.categoryId}
                        style={formData.style}
                        price={formData.price}
                        comparePrice={formData.comparePrice}
                        sku={formData.sku}
                        status={formData.status}
                        onCategoryChange={(value) => updateField("categoryId", value)}
                        onStyleChange={(value) => updateField("style", value)}
                        onPriceChange={(value) => updateField("price", value)}
                        onComparePriceChange={(value) => updateField("comparePrice", value)}
                        onSkuChange={(value) => updateField("sku", value)}
                        onStatusChange={(value) => updateField("status", value)}
                    />
                    {errors.categoryId && <p className="text-sm text-red-600 mt-2">{errors.categoryId}</p>}
                    {errors.price && <p className="text-sm text-red-600 mt-2">{errors.price}</p>}
                    {errors.sku && <p className="text-sm text-red-600 mt-2">{errors.sku}</p>}
                    
                    {/* Stock field */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 mt-6">
                        <h3 className="font-bold text-[#242C5A]">المخزون الأساسي</h3>
                        <div className="space-y-2">
                            <Label className="text-sm">الكمية *</Label>
                            <Input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => updateField("stock", e.target.value)}
                                placeholder="0"
                                className="rounded-xl"
                            />
                            {errors.stock && <p className="text-sm text-red-600">{errors.stock}</p>}
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
