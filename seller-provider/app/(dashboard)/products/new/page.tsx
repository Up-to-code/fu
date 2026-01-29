"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaManager, ProductCustomizationPanel, ProductFormErrorSummary, ProductOptions, ProductSection, ProductSidebar, ProductWizardHeader, QuickAddPresets, RichTextEditor, VariantsList, generateVariants, type Media, type Option, type ProductFormErrorItem, type Variant, type ProductWizardStep, type QuickPresetOption } from "../_components";
import { useProductActions } from "../_hooks";

export default function NewProductPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { createSellerProduct } = useProductActions();

    const steps: ProductWizardStep[] = useMemo(
        () => [
            { id: "basics", label: "الأساسيات" },
            { id: "media", label: "الوسائط والسعر" },
            { id: "options", label: "الخيارات والمتغيرات" },
        ],
        []
    );
    const activeStep = (searchParams.get("step") as ProductWizardStep["id"]) || "basics";

    const productFormSchema = useMemo(() => {
        const positiveNumberString = (message: string) =>
            z
                .string()
                .min(1, message)
                .refine((v) => Number.isFinite(Number(v)) && Number(v) > 0, message);

        const nonNegativeIntString = (message: string) =>
            z
                .string()
                .min(1, message)
                .refine((v) => Number.isFinite(Number(v)) && Number(v) >= 0, message);

        return z.object({
            name: z.string().min(2, "اسم المنتج مطلوب"),
            nameEn: z.string().min(2, "Product name is required"),
            description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
            categoryId: z.string().min(1, "الفئة مطلوبة"),
            price: positiveNumberString("السعر يجب أن يكون أكبر من صفر"),
            comparePrice: z
                .string()
                .optional()
                .refine(
                    (v) => !v || v.trim().length === 0 || (Number.isFinite(Number(v)) && Number(v) > 0),
                    "سعر المقارنة يجب أن يكون أكبر من صفر"
                ),
            stock: nonNegativeIntString("المخزون لا يمكن أن يكون سالباً"),
            sku: z.string().min(1, "رمز المنتج مطلوب"),
            style: z.string().optional(),
            status: z.enum(["active", "draft"]),
            image: z.string().min(1, "صورة واحدة على الأقل مطلوبة"),
            images: z.array(z.string()).min(1, "صورة واحدة على الأقل مطلوبة").max(5, "يمكن رفع 5 صور كحد أقصى"),
            video: z
                .string()
                .optional()
                .refine((v) => !v || v.trim().length === 0 || /^https?:\/\//.test(v), "رابط الفيديو غير صحيح"),
            videos: z.array(z.string()).optional(),
        });
    }, []);

    type ProductFormValues = z.infer<typeof productFormSchema>;

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            nameEn: "",
            description: "",
            categoryId: "",
            price: "",
            comparePrice: "",
            stock: "0",
            sku: "",
            style: "",
            status: "active",
            image: "",
            images: [],
            video: "",
            videos: [],
        },
        mode: "onSubmit",
    });

    const isSubmitting = form.formState.isSubmitting;
    const [options, setOptions] = useState<Option[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [media, setMedia] = useState<Media[]>([]);

    const handleMediaChange = (newMediaList: Media[]) => {
        setMedia(newMediaList);
        
        // Update form data
        const imageUrls = newMediaList.filter(m => m.type === "image").map(m => m.url);
        const videoUrls = newMediaList.filter(m => m.type === "video").map(m => m.url);

        form.setValue("image", imageUrls[0] || "", { shouldValidate: true });
        form.setValue("images", imageUrls, { shouldValidate: true });
        form.setValue("video", videoUrls[0] || "", { shouldValidate: true });
        form.setValue("videos", videoUrls, { shouldValidate: false });
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

    const handleVariantMediaAdd = (variantId: string, newMedia: Media) => {
        handleVariantChange(variantId, "media", [...variants.find(v => v.id === variantId)?.media || [], newMedia]);
    };

    const handleVariantMediaRemove = (variantId: string, mediaId: string) => {
        const variant = variants.find(v => v.id === variantId);
        if (variant) {
            handleVariantChange(variantId, "media", variant.media.filter(m => m.id !== mediaId));
        }
    };

    const optionNames = options.map(o => o.name);

    const errorItems: ProductFormErrorItem[] = useMemo(() => {
        const e = form.formState.errors;
        const items: ProductFormErrorItem[] = [];
        const push = (label: string, message: any, stepId: ProductFormErrorItem["stepId"], targetId: string) => {
            const msg = typeof message === "string" ? message : message?.message;
            if (!msg) return;
            items.push({ label, message: String(msg), stepId, targetId });
        };
        push("اسم المنتج (عربي)", e.name, "basics", "product-name-ar");
        push("اسم المنتج (إنجليزي)", e.nameEn, "basics", "product-name-en");
        push("الوصف", e.description, "basics", "product-description");
        push("الفئة", e.categoryId, "basics", "product-categoryId");
        push("السعر", e.price, "media", "product-price");
        push("سعر المقارنة", e.comparePrice, "media", "product-comparePrice");
        push("الوسائط", e.images, "media", "product-media");
        push("SKU", e.sku, "media", "product-sku");
        push("المخزون", e.stock, "media", "product-stock");
        return items;
    }, [form.formState.errors]);

    const setStep = (stepId: ProductWizardStep["id"]) => {
        router.replace(`${pathname}?step=${stepId}`);
    };

    const handleApplyPreset = (_presetId: string, presetOptions: QuickPresetOption[]) => {
        const merged = [...options];
        for (const p of presetOptions) {
            const existing = merged.find((o) => o.name === p.name);
            if (!existing) {
                merged.push({
                    id: Date.now().toString() + Math.random().toString(16).slice(2),
                    name: p.name,
                    values: p.values.map((v) => ({ value: v })),
                });
                continue;
            }
            const existingValues = new Set(existing.values.map((v) => v.value));
            const toAdd = p.values.filter((v) => !existingValues.has(v)).map((v) => ({ value: v }));
            existing.values = [...existing.values, ...toAdd];
        }
        handleOptionsChange(merged);
        toast.success("تمت إضافة الإعدادات الجاهزة");
    };

    const onSubmit = async (values: ProductFormValues) => {
        const mappedVariants = variants.map(v => ({
            combination: v.combination,
            price: parseFloat(v.price) || 0,
            stock: parseInt(v.stock) || 0,
            sku: v.sku || undefined,
            image: v.media.find(m => m.type === "image")?.url || undefined,
            images: v.media.filter(m => m.type === "image").map(m => m.url),
            isActive: true
        }));

        const images = values.images.length > 0 ? values.images : (values.image ? [values.image] : []);
        const mainImage = values.image || images[0] || "";
        const videos = values.videos && values.videos.length > 0 ? values.videos : (values.video ? [values.video] : []);
        const mainVideo = values.video?.trim() ? values.video : undefined;

        const res = await createSellerProduct({
            name: values.name,
            nameEn: values.nameEn || undefined,
            description: values.description || undefined,
            price: parseFloat(values.price),
            comparePrice: values.comparePrice?.trim() ? parseFloat(values.comparePrice) : undefined,
            stock: parseInt(values.stock) || 0,
            sku: values.sku || undefined,
            categoryId: values.categoryId ? (values.categoryId as any) : undefined,
            style: values.style || undefined,
            status: values.status,
            image: mainImage,
            images,
            video: mainVideo,
            videos,
            variants: mappedVariants,
        });

        toast.success("تم إنشاء المنتج");
        router.push(`/products/${(res as any).productId}/edit?step=options&tab=customization`);
    };
    
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-7xl mx-auto pb-28 md:pb-20" dir="rtl">
            <ProductWizardHeader
                backHref="/products"
                title="منتج جديد"
                subtitle="أضف منتج جديد إلى متجرك"
                steps={steps}
                activeStepId={activeStep}
                onStepChange={setStep}
                isSubmitting={isSubmitting}
                onSubmit={activeStep === "options" ? form.handleSubmit(onSubmit) : undefined}
                submitLabel={isSubmitting ? "جاري الحفظ..." : "حفظ المنتج"}
            />

            {form.formState.submitCount > 0 ? (
                <ProductFormErrorSummary items={errorItems} onStepChange={(s) => s && setStep(s)} />
            ) : null}

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {activeStep === "basics" && (
                        <ProductSection
                            title="المعلومات الأساسية"
                            subtitle="أدخل اسم المنتج ووصفه بشكل واضح"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>اسم المنتج (عربي) *</Label>
                                    <Input
                                        {...form.register("name")}
                                        id="product-name-ar"
                                        placeholder="اسم المنتج بالعربية"
                                        className="rounded-xl"
                                    />
                                    {form.formState.errors.name?.message ? (
                                        <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                                    ) : null}
                                </div>
                                <div className="space-y-2">
                                    <Label>اسم المنتج (إنجليزي) *</Label>
                                    <Input
                                        {...form.register("nameEn")}
                                        id="product-name-en"
                                        placeholder="Product name in English"
                                        className="rounded-xl"
                                    />
                                    {form.formState.errors.nameEn?.message ? (
                                        <p className="text-sm text-red-600">{form.formState.errors.nameEn.message}</p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>الوصف *</Label>
                                <RichTextEditor
                                    value={form.watch("description")}
                                    onChange={(value) => form.setValue("description", value, { shouldValidate: true })}
                                    placeholder="وصف المنتج..."
                                />
                                {form.formState.errors.description?.message ? (
                                    <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
                                ) : null}
                            </div>
                        </ProductSection>
                    )}

                    {activeStep === "media" && (
                        <>
                            <div id="product-media">
                                <MediaManager media={media} onChange={handleMediaChange} subtitle="حتى 5 صور وفيديو واحد" />
                            </div>
                            {form.formState.errors.images?.message ? (
                                <p className="text-sm text-red-600">{form.formState.errors.images.message as any}</p>
                            ) : null}
                        </>
                    )}

                    {activeStep === "options" && (
                        <>
                            <QuickAddPresets onApply={handleApplyPreset} />
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
                            <ProductCustomizationPanel />
                        </>
                    )}

                    <div className="hidden md:flex items-center justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => {
                                const idx = steps.findIndex((s) => s.id === activeStep);
                                if (idx > 0) setStep(steps[idx - 1].id);
                            }}
                            disabled={activeStep === "basics"}
                        >
                            السابق
                        </Button>
                        <Button
                            type="button"
                            className="rounded-xl"
                            onClick={() => {
                                const idx = steps.findIndex((s) => s.id === activeStep);
                                if (idx < steps.length - 1) setStep(steps[idx + 1].id);
                            }}
                            disabled={activeStep === "options"}
                        >
                            التالي
                        </Button>
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <ProductSidebar
                        categoryId={form.watch("categoryId")}
                        style={form.watch("style")}
                        price={form.watch("price")}
                        comparePrice={form.watch("comparePrice")}
                        sku={form.watch("sku")}
                        status={form.watch("status")}
                        onCategoryChange={(value) => form.setValue("categoryId", value, { shouldValidate: true })}
                        onStyleChange={(value) => form.setValue("style", value, { shouldValidate: false })}
                        onPriceChange={(value) => form.setValue("price", value, { shouldValidate: true })}
                        onComparePriceChange={(value) => form.setValue("comparePrice", value, { shouldValidate: true })}
                        onSkuChange={(value) => form.setValue("sku", value, { shouldValidate: true })}
                        onStatusChange={(value) => form.setValue("status", value, { shouldValidate: false })}
                    />
                    {form.formState.errors.categoryId?.message ? <p className="text-sm text-red-600 mt-2">{form.formState.errors.categoryId.message}</p> : null}
                    {form.formState.errors.price?.message ? <p className="text-sm text-red-600 mt-2">{form.formState.errors.price.message}</p> : null}
                    {form.formState.errors.sku?.message ? <p className="text-sm text-red-600 mt-2">{form.formState.errors.sku.message}</p> : null}
                    
                    {/* Stock field */}
                    <ProductSection title="المخزون الأساسي" subtitle="الكمية الافتراضية قبل تطبيق المتغيرات" className="mt-6">
                        <div className="space-y-2">
                            <Label className="text-sm">الكمية *</Label>
                            <Input
                                id="product-stock"
                                type="number"
                                value={form.watch("stock")}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    form.setValue("stock", e.target.value, { shouldValidate: true })
                                }
                                placeholder="0"
                                className="rounded-xl"
                            />
                            {form.formState.errors.stock?.message ? <p className="text-sm text-red-600">{form.formState.errors.stock.message}</p> : null}
                        </div>
                    </ProductSection>
                </div>
            </div>

            <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/90 backdrop-blur md:hidden" dir="rtl">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl flex-1"
                        onClick={() => {
                            const idx = steps.findIndex((s) => s.id === activeStep);
                            if (idx > 0) setStep(steps[idx - 1].id);
                        }}
                        disabled={activeStep === "basics"}
                    >
                        السابق
                    </Button>

                    {activeStep === "options" ? (
                        <Button
                            type="button"
                            className="rounded-xl flex-1"
                            disabled={isSubmitting}
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {isSubmitting ? "جاري الحفظ..." : "حفظ المنتج"}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            className="rounded-xl flex-1"
                            onClick={() => {
                                const idx = steps.findIndex((s) => s.id === activeStep);
                                if (idx < steps.length - 1) setStep(steps[idx + 1].id);
                            }}
                        >
                            التالي
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}
