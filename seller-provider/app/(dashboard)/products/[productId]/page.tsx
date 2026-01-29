"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { ArrowRight, Edit, Eye, Package, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import { useProduct, useProductActions } from "../_hooks";
import { productStatuses } from "@/data";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const getStatusBadge = (status: string) => {
    const statusInfo = productStatuses.find(s => s.id === status);
    if (statusInfo) {
        return <Badge className={`${statusInfo.color} hover:${statusInfo.color}`}>{statusInfo.name}</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.productId as string;
    const product = useProduct(productId);
    const { deleteSellerProduct } = useProductActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    // Variant Selection State
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const customization = useQuery(
        api.sellerCustomization.getProductCustomization,
        product ? { productId: productId as Id<"sellerProducts"> } : "skip"
    );
    const resolved = useQuery(
        api.sellerCustomization.resolveSellerVariantCached,
        customization ? { productId: productId as Id<"sellerProducts">, selectedOptions } : "skip"
    );
    const warmCache = useMutation(api.sellerCustomization.warmSellerVariantCache);
    const trackResolve = useMutation(api.sellerCustomization.trackCustomizationResolve);
    const resolveStartedAtRef = useRef<number | null>(null);

    const availableOptions = useMemo(() => {
        if (customization?.optionGroups?.length && customization?.optionValues?.length) {
            const groups = customization.optionGroups.filter((g: any) => g.isActive);
            const values = customization.optionValues.filter((v: any) => v.isActive);
            const map: Record<string, { name: string; type: string; values: Array<{ valueKey: string; label: string; hex?: string }> }> = {};

            for (const g of groups) {
                map[g.key] = { name: g.name, type: g.type, values: [] };
            }

            for (const v of values) {
                const g = groups.find((gg: any) => gg._id === v.groupId);
                if (!g) continue;
                map[g.key]?.values.push({ valueKey: v.valueKey, label: v.label, hex: v.hex });
            }

            for (const k of Object.keys(map)) {
                map[k].values.sort((a, b) => a.label.localeCompare(b.label));
            }

            return map;
        }

        if (!product?.variants?.length) return {};
        const options: Record<string, { name: string; type: string; values: Array<{ valueKey: string; label: string }> }> = {};
        product.variants.forEach((variant: any) => {
            Object.entries(variant.combination).forEach(([key, value]) => {
                if (!options[key]) options[key] = { name: key, type: "custom", values: [] };
                if (!options[key].values.some((v) => v.valueKey === value)) {
                    options[key].values.push({ valueKey: value as string, label: value as string });
                }
            });
        });
        return options;
    }, [customization, product]);

    // Get current display data (Variant or Base Product)
    const displayData = useMemo(() => {
        if (resolved) {
            const images = (resolved.images ?? []).filter(Boolean);
            return {
                name: product?.name,
                sku: resolved.sku ?? product?.sku,
                price: resolved.price ?? product?.price,
                basePrice: product?.price,
                stock: resolved.stock ?? product?.stock,
                description: product?.description,
                images,
                videos: product?.videos || [],
                image: images[0] || product?.image,
                video: product?.video,
                isVariant: Boolean(resolved.variantId),
                selection: resolved.selection,
                computedPrice: resolved.computedPrice,
            };
        }
        return {
            name: product?.name,
            sku: product?.sku,
            price: product?.price,
            basePrice: product?.price,
            stock: product?.stock,
            description: product?.description,
            images: product?.images || [],
            videos: product?.videos || [],
            image: product?.image,
            video: product?.video,
            isVariant: false,
            selection: selectedOptions,
            computedPrice: undefined,
        };
    }, [product, resolved, selectedOptions]);

    const handleOptionSelect = (key: string, value: string) => {
        resolveStartedAtRef.current = Date.now();
        setSelectedOptions(prev => {
            const next = { ...prev };
            if (next[key] === value) {
                delete next[key]; // Deselect
            } else {
                next[key] = value;
            }
            return next;
        });
    };

    useEffect(() => {
        const started = resolveStartedAtRef.current;
        if (!resolved || started === null) return;
        if (!resolved.combinationKey) return;

        const durationMs = Date.now() - started;
        resolveStartedAtRef.current = null;

        void trackResolve({
            productId: productId as Id<"sellerProducts">,
            combinationKey: resolved.combinationKey,
            durationMs,
            cacheHit: Boolean((resolved as any).cacheHit),
        });

        if (!(resolved as any).cacheHit) {
            void warmCache({ productId: productId as Id<"sellerProducts">, selectedOptions });
        }
    }, [resolved?.combinationKey, (resolved as any)?.cacheHit, productId, selectedOptions, trackResolve, warmCache]);

    const handleDelete = async () => {
        if (product) {
            await deleteSellerProduct({ productId: productId as any });
            setDeleteDialogOpen(false);
            router.push("/products");
        }
    };

    if (!product) {
        return (
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
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
        <>
            <div className="space-y-8 max-w-5xl mx-auto pb-20" dir="rtl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/products">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-primary">{displayData.name}</h1>
                            <p className="text-gray-500">SKU: {displayData.sku}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/products/${productId}/edit?tab=customization`}>
                            <Button className="rounded-xl">
                                <Edit className="h-4 w-4 ml-2" />
                                تعديل المنتج
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images & Videos */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {displayData.images.length > 0 ? (
                                    displayData.images.map((img: string, index: number) => (
                                        <div key={`img-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                            <Image src={img} alt={displayData.name || ""} fill className="object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        {displayData.image && (
                                            <Image src={displayData.image} alt={displayData.name || ""} fill className="object-cover" />
                                        )}
                                    </div>
                                )}
                                
                                {/* Videos */}
                                {displayData.video && (
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <video src={displayData.video} controls className="w-full h-full object-cover" />
                                        <Badge className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70">فيديو رئيسي</Badge>
                                    </div>
                                )}
                                {displayData.videos?.map((vid: string, index: number) => (
                                    <div key={`vid-${index}`} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <video src={vid} controls className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-primary mb-4">الوصف</h2>
                            <p className="text-gray-600 leading-relaxed">{displayData.description}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Price */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الحالة</span>
                                {getStatusBadge(product.status)}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">التصنيف</span>
                                <span className="font-medium">{product.categoryId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">الستايل</span>
                                <span className="font-medium">{product.style}</span>
                            </div>
                            
                            {/* Variant Selector */}
                            {Object.keys(availableOptions).length > 0 && (
                                <div className="border-t border-gray-100 pt-4 space-y-4">
                                    {Object.entries(availableOptions).map(([key, cfg]) => (
                                        <div key={key} className="space-y-2">
                                            <span className="text-sm font-medium text-gray-700">{cfg.name}</span>
                                            <div className="flex flex-wrap gap-2">
                                                {cfg.values.map((value: any) => {
                                                    const isSelected = selectedOptions[key] === value.valueKey;
                                                    const isColor = cfg.type === "color" && typeof value.hex === "string" && value.hex.length > 0;
                                                    return (
                                                        <button
                                                            key={value.valueKey}
                                                            type="button"
                                                            aria-pressed={isSelected}
                                                            onClick={() => handleOptionSelect(key, value.valueKey)}
                                                            className={cn(
                                                                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                                                                isSelected
                                                                    ? "border-primary bg-primary/5 text-primary"
                                                                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                                            )}
                                                        >
                                                            {isColor ? (
                                                                <span
                                                                    className="h-4 w-4 rounded-full border border-gray-200"
                                                                    style={{ backgroundColor: value.hex }}
                                                                />
                                                            ) : null}
                                                            <span>{value.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-primary">{displayData.price?.toLocaleString()} ر.س</span>
                                    {typeof displayData.basePrice === "number" &&
                                    typeof displayData.price === "number" &&
                                    displayData.price !== displayData.basePrice ? (
                                        <Badge variant="outline" className="text-xs">
                                            {displayData.price > displayData.basePrice ? "+" : ""}
                                            {(displayData.price - displayData.basePrice).toLocaleString()} ر.س
                                        </Badge>
                                    ) : null}
                                    {product.comparePrice && product.comparePrice > (displayData.price || 0) && !displayData.isVariant && (
                                        <span className="text-lg text-gray-400 line-through">{product.comparePrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Package className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primary">{displayData.stock}</p>
                                    <p className="text-sm text-gray-500">في المخزون</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        {(product.sales !== undefined || product.views !== undefined) && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                                <h3 className="font-bold text-primary">الإحصائيات</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.sales !== undefined && (
                                        <div className="p-4 rounded-xl bg-gray-50 text-center">
                                            <ShoppingCart className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-primary">{product.sales}</p>
                                            <p className="text-xs text-gray-500">مبيعات</p>
                                        </div>
                                    )}
                                    {product.views !== undefined && (
                                        <div className="p-4 rounded-xl bg-gray-50 text-center">
                                            <Eye className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-primary">{product.views}</p>
                                            <p className="text-xs text-gray-500">مشاهدة</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>حذف المنتج</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="space-y-3">
                                <p>هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">المنتج</span>
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-gray-500">SKU</span>
                                        <span className="font-medium text-gray-900">{product.sku ?? "-"}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-gray-500">السعر</span>
                                        <span className="font-medium text-gray-900">{product.price?.toLocaleString()} ر.س</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-gray-500">المخزون</span>
                                        <span className="font-medium text-gray-900">{product.stock}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-gray-500">الحالة</span>
                                        <span>{getStatusBadge(product.status)}</span>
                                    </div>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <Link href={`/products/${productId}/edit?tab=customization`}>
                            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                تعديل بدل الحذف
                            </Button>
                        </Link>
                        <AlertDialogAction
                            onClick={handleDelete}
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
